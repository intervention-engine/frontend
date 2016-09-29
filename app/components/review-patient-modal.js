import Component from 'ember-component';
import service from 'ember-service/inject';
import computed from 'ember-computed';

export default Component.extend({
  ajax: service(),

  huddle: null,
  patient: null,
  skippable: false,

  modalTitle: computed('skippable', function modalTitle() {
    return `Mark Patient as Discussed${this.get('skippable') ? '?' : ''}`;
  }),

  huddlePatient: computed('huddle', 'patient', {
    get() {
      return this.get('huddle.patients').findBy('patientId', this.get('patient.id'));
    }
  }),

  reviewDate: computed({
    get() {
      return new Date();
    }
  }),

  actions: {
    save(event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      this.get('huddlePatient').set('reviewed', this.get('reviewDate'));

      let huddle = this.get('huddle');
      let promise = this.get('ajax').request(`/Group/${huddle.get('id')}`, {
        data: JSON.stringify(huddle.toFhirJson()),
        type: 'PUT',
        contentType: 'application/json; charset=UTF-8'
      });

      promise.then(() => {
        if (this.get('skippable')) {
          this.attrs.onSkip();
        } else {
          this.attrs.onClose();
        }
      });
      promise.catch(() => {
        this.get('huddlePatient').set('reviewed', null);
        alert('Failed to save to the server, please try your request again');
      });
    }
  }
});
