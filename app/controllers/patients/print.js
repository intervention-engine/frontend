import Controller from 'ember-controller';
import computed from 'ember-computed';

export default Controller.extend({
  queryParams: ['sortBy', 'sortDescending', 'assessment', 'huddleId', 'groupId', 'name'],

  assessment: 'Catastrophic Health Event',
  sortBy: null,
  sortDescending: null,
  huddleId: null,
  groupId: null,
  name: null,

  currentHuddle: computed('huddleId', 'model.huddles', function currentHuddle() {
    let huddleId = this.get('huddleId');
    if (huddleId) {
      return this.get('model.huddles').findBy('id', huddleId);
    }
  }),

  risksByPatient: computed('model.risks', function risksByPatient() {
    return this.get('model.risks').reduce(risksByPatientReducer, {});
  }),

  sortByDisplayText: computed('sortBy', 'sortDescending', function sortByDisplayText() {
    let sortBy = this.get('sortBy');
    let sortDescending = this.get('sortDescending') === 'true';
    let text = '';

    if (sortBy === 'name,birthdate') {
      text = 'Name';
    } else if (sortBy === 'birthdate,name') {
      text = 'Age';
      sortDescending = !sortDescending;
    } else if (sortBy === 'gender,name') {
      text = 'Gender';
    }

    return `${text} (${sortDescending ? 'descending' : 'ascending'})`;
  }),

  actions: {
    closeWindow(event) {
      event.preventDefault();
      window.close();
    },

    print(event) {
      event.preventDefault();
      window.print();
    }
  }
});

function risksByPatientReducer(memo, item) {
  let patientId = (item.get('subject.reference') || '').replace(/^Patient\//, '');
  return Object.assign(memo, {
    [patientId]: item
  });
}
