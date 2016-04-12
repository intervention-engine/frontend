import Component from 'ember-component';
import computed from 'ember-computed';
import service from 'ember-service/inject';
import { schedule } from 'ember-runloop';
import moment from 'moment';
import HasStylesheetMixin from 'ember-on-fhir/mixins/has-stylesheet';
import Huddle, { parseHuddles } from 'ember-on-fhir/models/huddle';
import { addCSSRule } from 'ember-on-fhir/utils/create-stylesheet';

export default Component.extend(HasStylesheetMixin, {
  ajax: service(),
  store: service(),

  defaultDate: null,
  huddles: null,
  patientHuddles: null, // master huddle list from the patient viewer controller
  huddleDate: computed('defaultDate', {
    get() {
      return this.get('defaultDate') || new Date();
    }
  }),
  huddleLeader: '',
  patient: null,
  isLoading: true,
  huddleLeaderDisabled: computed.notEmpty('existingHuddle'),
  formSaving: false,
  saveBtnDisabled: computed.or('formSaving', 'patientInExistingHuddle'),

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
        // member: `Patient/${this.get('patient.id')}`
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

  actions: {
    save(event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      this.set('formSaving', true);

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

      huddle.addPatient(this.get('patient'));

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
        this.rescheduleHuddles().finally(this.attrs.onClose);
      }).catch(() => {
        alert('Failed to save huddle, please try your request again');
        this.set('formSaving', false);
      });
    }
  }
});
