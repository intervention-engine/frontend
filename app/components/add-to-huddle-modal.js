import Component from 'ember-component';
import computed from 'ember-computed';
import service from 'ember-service/inject';
import { schedule } from 'ember-runloop';
import moment from 'moment';
import HasStylesheetMixin from 'ember-on-fhir/mixins/has-stylesheet';
import Huddle, { parseHuddles } from 'ember-on-fhir/models/huddle';
import { REASON_CODES } from 'ember-on-fhir/models/huddle-patient';
import { addCSSRule } from 'ember-on-fhir/utils/create-stylesheet';

export default Component.extend(HasStylesheetMixin, {
  ajax: service(),
  store: service(),

  defaultDate: null,
  huddle: null,
  huddles: null,
  patientHuddles: null, // master huddle list from the patient viewer controller

  huddleDate: computed('defaultDate', {
    get() {
      return this.get('defaultDate') || new Date();
    }
  }),

  huddleLeader: computed('huddle.displayLeader', {
    get() {
      let huddle = this.get('huddle');
      if (huddle != null) {
        return huddle.get('displayLeader');
      }
      return '';
    }
  }),

  huddleReasonText: computed('huddle', {
    get() {
      let huddle = this.get('huddle');
      if (huddle != null) {
        return huddle.getHuddlePatient(this.get('patient')).get('reasonText');
      }
      return '';
    }
  }),

  patient: null,
  isLoading: true,
  huddleLeaderDisabled: computed.notEmpty('existingHuddle'),

  huddleReasonTextDisabled: computed('patientInExistingHuddle', {
    get() {
      if (this.get('patientInExistingHuddle')) {
        let huddlePatient = this.get('existingHuddle').getHuddlePatient(this.get('patient'));
        return huddlePatient.get('reason') !== REASON_CODES.MANUAL_ADDITION;
      }

      return false;
    }
  }),

  formSaving: false,

  saveBtnDisabled: computed('formSaving', 'patientInExistingHuddle', 'huddleReasonText', {
    get() {
      if (this.get('formSaving')) {
        return true;
      }

      if (this.get('patientInExistingHuddle')) {
        let huddlePatient = this.get('existingHuddle').getHuddlePatient(this.get('patient'));
        if (huddlePatient.get('reason') === REASON_CODES.MANUAL_ADDITION) {
          return huddlePatient.get('reasonText') === this.get('huddleReasonText');
        }

        return true;
      }

      return false;
    }
  }),

  removeBtnDisabled: computed.alias('formSaving'),

  title: computed('huddle', {
    get() {
      if (this.get('huddle') == null) {
        return 'Add to Huddle';
      } else {
        return 'Edit Huddle Patient';
      }
    }
  }).readOnly(),

  existingHuddle: computed('huddles.[]', 'huddleDate', {
    get() {
      let huddleDate = moment(this.get('huddleDate'));
      let huddles = this.get('huddles');
      let huddle = null;

      for (let i = 0; i < huddles.length; i++) {
        if (huddleDate.isSame(huddles[i].get('date'), 'day')) {
          huddle = huddles[i];
          break;
        }
      }

      return huddle;
    }
  }),

  patientInExistingHuddle: computed('existingHuddle', 'patient.id', {
    get() {
      let existingHuddle = this.get('existingHuddle');
      if (existingHuddle == null) {
        return;
      }

      let patientId = this.get('patient.id');
      return existingHuddle.get('patientIds').contains(patientId);
    }
  }),

  init() {
    this._super(...arguments);

    this.get('ajax').request('/Group', {
      data: {
        code: 'http://interventionengine.org/fhir/cs/huddle|HUDDLE'
      }
    }).then((response) => {
      this.set('isLoading', false);
      this.set('huddles', parseHuddles(response.entry || []));
      schedule('afterRender', this, this.setStyles);
    });
  },

  setStyles() {
    let huddles = this.get('huddles');
    let patient = this.get('patient');
    let pikadayThemeName = `${this.elementId}-pikaday`;
    let { sheet } = this.sheet;

    for (let i = 0; i < huddles.length; i++) {
      let date = moment(huddles[i].get('date'));
      let year = date.year();
      let month = date.month();
      let day = date.date();

      let cssRule = 'border: 1px dashed #5D8FAE; border-radius: 3px;';
      if (huddles[i].hasPatient(patient)) {
        cssRule = 'background-color: #5D8FAE; color: #fff; border-radius: 3px; box-shadow: inset 0 1px 3px #53809c';
      }

      addCSSRule(sheet, `.${pikadayThemeName} [data-pika-year="${year}"][data-pika-month="${month}"][data-pika-day="${day}"]`, cssRule);
    }
  },

  rescheduleHuddles() {
    return this.get('ajax').request('/ScheduleHuddles');
  },

  deleteHuddle() {
    let huddle = this.get('huddle');
    if (huddle == null) {
      return;
    }

    return this.get('ajax').request(`/Group/${huddle.get('id')}`, {
      type: 'DELETE',
      contentType: 'application/json; charset=UTF-8'
    });
  },

  actions: {
    save(event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      this.set('formSaving', true);

      let patient = this.get('patient');
      let huddle = this.get('existingHuddle');
      let newHuddle = false;

      if (huddle == null) {
        huddle = Huddle.create({
          date: this.get('huddleDate'),
          leader: `Practitioner/${this.get('huddleLeader')}`,
          name: moment(this.get('huddleDate')).format('MMMM D, YYYY') // TODO: change this
        });

        newHuddle = true;
      }

      huddle.addPatient(patient, this.get('huddleReasonText'));

      let url = newHuddle ? '/Group' : `/Group/${huddle.get('id')}`;
      let type = newHuddle ? 'POST' : 'PUT';

      this.get('ajax').request(url, {
        data: JSON.stringify(huddle.toFhirJson()),
        type,
        contentType: 'application/json; charset=UTF-8'
      }).then((response) => {
        if (newHuddle) {
          huddle.set('id', response.id);
        }

        this.get('patientHuddles').pushObject(huddle);

        let oldHuddle = this.get('huddle');
        if (oldHuddle != null && oldHuddle.get('id') !== huddle.get('id')) {
          let promise;
          if (oldHuddle.get('patients.length') === 1) {
            // simple case, huddle has only one patient: destroy the huddle
            promise = this.deleteHuddle();
          } else {
            oldHuddle.removePatient(patient);
            promise = this.get('ajax').request(`/Group/${oldHuddle.get('id')}`, {
              data: JSON.stringify(oldHuddle.toFhirJson()),
              type: 'PUT',
              contentType: 'application/json; charset=UTF-8'
            });
          }

          promise.then(() => {
            this.get('patientHuddles').removeObject(oldHuddle);
            this.rescheduleHuddles().finally(this.attrs.onClose);
          });

          return;
        }

        this.rescheduleHuddles().finally(this.attrs.onClose);
      }).catch(() => {
        alert('Failed to save huddle, please try your request again');
        this.set('formSaving', false);
      });
    },

    removePatientFromHuddle(event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      let huddle = this.get('huddle');
      if (huddle == null) {
        return;
      }

      this.set('formSaving', true);

      let patient = this.get('patient');
      let promise;

      if (huddle.get('patients.length') === 1) {
        // simple case, huddle has only one patient: destroy the huddle
        promise = this.deleteHuddle();
      } else {
        huddle.removePatient(patient);
        promise = this.get('ajax').request(`/Group/${huddle.get('id')}`, {
          data: JSON.stringify(huddle.toFhirJson()),
          type: 'PUT',
          contentType: 'application/json; charset=UTF-8'
        });
      }

      promise.then(() => {
        this.get('patientHuddles').removeObject(huddle);
        this.rescheduleHuddles().finally(this.attrs.onClose);
      }).catch(() => {
        alert('Failed to save huddle, please try your request again');
        this.set('formSaving', false);
      });
    }
  }
});
