import Ember from 'ember';

const { isNone } = Ember;

export default Ember.Controller.extend({
  populations: [],
  currentAssessment: "Stroke", // default
  selectedCategory: null,
  patientSearch: '',

  currentPatient: null,

  riskAssessments: Ember.computed('currentPatient.risksByOutcome.[]', function() {
    if (isNone(this.get('currentPatient.risksByOutcome'))) {
      return [];
    }

    return this.get('currentPatient.risksByOutcome').mapBy('key');
  }),

  selectedItems: Ember.computed.filterBy('model.populations', 'selected', true),
    selectedItemsCount: (function() {
    return this.get('selectedItems.length');
  }).property('selectedItems.[]'),

  patients: Ember.computed('selectedItems.@each', function() {
    if (this.get('selectedItemsCount') === 0) {
      return this.get('model.patients');
    } else {
      console.error("This code path is broken until testing with IE server");
      return this.get('model.patients');
    }
  }),

  sortedPatients: Ember.computed('patients.@each.notifications.count', function() {
    return this.get('patients').sortBy('notifications.count', 'computedAge').reverse();
  }),

  filteredPatients: Ember.computed('sortedPatients', 'patientSearch', function() {
    let rx = new RegExp(this.get("patientSearch"), "gi");
    return this.get('sortedPatients').filter(function(p) {
      return p.get("fullName").toString().match(rx);
    });
  }),

  actions: {
    switchAssessment: function(assessment) {
      this.set("currentAssessment", assessment);
    },

    selectPatient(patient) {
      this.set('currentPatient', patient);
    }
  }
});
