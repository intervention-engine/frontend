import Component from 'ember-component';
import service from 'ember-service/inject';
import computed from 'ember-computed';

export default Component.extend({
  ajax: service(),

  huddle: null,
  patient: null,

  huddlePatient: computed('huddle', 'patient', {
    get() {
      return this.get('huddle.patients').findBy('patientId', this.get('patient.id'));
    }
  }),

  actions: {
    save(event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      this.get('huddlePatient').set('reviewed', null);

      let huddle = this.get('huddle');
      let promise = this.get('ajax').request(`/Group/${huddle.get('id')}`, {
        data: JSON.stringify(huddle.toFhirJson()),
        type: 'PUT',
        contentType: 'application/json; charset=UTF-8'
      });

      promise.then(() => this.attrs.onClose());
      promise.catch(() => {
        this.get('huddlePatient').set('reviewed', null);
        alert('Failed to save to the server, please try your request again');
      });
    }
  }
});
