import Ember from 'ember';

export default Ember.Controller.extend({
  populations: [],
  currentAssessment: "Stroke", // default
  patientSearch: '',
  currentPatient: null,
  selectedCategory: null,
  sortByTypeInput: "name", // default
  showAddInterventionModal: false,
  interventionTypes: [],

  sortByType: Ember.computed('sortByTypeInput', function() {
    if (this.get('sortByTypeInput') === 'notifications') {
      return ['notifications.count', 'computedAge'];
    }
    if (this.get('sortByTypeInput') === 'name') {
      return ['fullName'];
    }
  }),

  selectedPopulations: Ember.computed.filterBy('model.populations', 'selected', true),

  riskAssessments: Ember.computed(function() {
    // TODO: get this list from the backend
    return ['Stroke', 'Negative Outcome'];
  }),

  populationPatients: Ember.computed('selectedPopulations.[]', function() {
    let selectedPopulations = this.get('selectedPopulations');
    if (selectedPopulations.length === 0) {
      return this.get('model.patients');
    }

    let patients = Ember.A();
    selectedPopulations.forEach(function(population) {
      population.get('groupList').then((groupList) => {
        patients.addObjects(groupList.get('patientids'));
      });
    });

    return patients;
  }),

  filteredPatients: Ember.computed('populationPatients.[]', 'patientSearch', function() {
    let rx = new RegExp(this.get("patientSearch"), "gi");
    return this.get('populationPatients').filter(function(p) {
      return p.get("fullName").toString().match(rx);
    });
  }),

  sortedPatients: Ember.computed('filteredPatients.[]', 'sortByType', function() {
    return this.get('filteredPatients').sortBy(...this.get('sortByType'));
  }),

  actions: {
    selectRiskAssessment(assessment) {
      this.set("currentAssessment", assessment);
      this.set('selectedCategory', null);
    },

    selectPatient(patient) {
      this.set('currentPatient', patient);
      this.set('selectedCategory', null);
    },

    selectCategory(category) {
      this.set('selectedCategory', category);
    },

    openAddInterventionModal() {
      this.toggleProperty('showAddInterventionModal');
    },

    hideAddInterventionModal() {
      this.set('showAddInterventionModal', false);
    }
  }
});
