import Controller from 'ember-controller';
import computed from 'ember-computed';
import { A } from 'ember-array/utils';

export default Controller.extend({
  queryParams: ['page', { currentAssessment: 'risk_assessment' }],

  page: 1,

  populations: [],
  currentAssessment: 'Stroke', // default
  patientSearch: '',
  currentPatient: null,
  selectedCategory: null,
  sortBy: 'riskScore',
  sortDescending: true,
  sortByTypeInput: 'name', // default
  showAddInterventionModal: false,
  riskLowValue: 1,
  riskHighValue: 4,
  interventionTypes: [],

  totalPatients: computed.reads('model.patients.meta.total'),

  sortByType: computed('sortByTypeInput', {
    get() {
      if (this.get('sortByTypeInput') === 'notifications') {
        return ['notifications.count', 'computedAge'];
      }
      if (this.get('sortByTypeInput') === 'name') {
        return ['fullName'];
      }
    }
  }),

  selectedPopulations: computed({
    get() {
      return [];
    }
  }),

  riskAssessments: computed({
    get() {
      // TODO: get this list from the backend
      return ['Stroke', 'Negative Outcome'];
    }
  }),

  populationPatients: computed('selectedPopulations.[]', {
    get() {
      let selectedPopulations = this.get('selectedPopulations');
      if (selectedPopulations.length === 0) {
        return this.get('model.patients');
      }

      let patients = new A([]);
      selectedPopulations.forEach(function(population) {
        population.get('groupList').then((groupList) => {
          patients.addObjects(groupList.get('patientids'));
        });
      });

      return patients;
    }
  }),

  filteredPatients: computed('populationPatients.[]', 'patientSearch', {
    get() {
      let rx = new RegExp(this.get('patientSearch'), 'gi');
      return this.get('populationPatients').filter(function(p) {
        return p.get('fullName').toString().match(rx);
      });
    }
  }),

  sortedPatients: computed('filteredPatients.[]', 'sortByType', {
    get() {
      return this.get('filteredPatients').sortBy(...this.get('sortByType'));
    }
  }),

  actions: {
    selectRiskAssessment(assessment) {
      this.set('currentAssessment', assessment);
      this.set('selectedCategory', null);
    },

    togglePopulation(population, active) {
      if (active) {
        this.get('selectedPopulations').pushObject(population);
      } else {
        this.get('selectedPopulations').removeObject(population);
      }
    },

    selectPatient(patient) {
      this.set('currentPatient', patient);
      this.set('selectedCategory', null);
    },

    selectCategory(category) {
      this.set('selectedCategory', category);
    },

    setRiskScore(lowValue, highValue) {
      this.set('riskLowValue', lowValue);
      this.set('riskHighValue', highValue);
    },

    selectSortBy(sortBy, sortDescending) {
      this.set('sortBy', sortBy);
      this.set('sortDescending', sortDescending);
    },

    openAddInterventionModal() {
      this.toggleProperty('showAddInterventionModal');
    },

    hideAddInterventionModal() {
      this.set('showAddInterventionModal', false);
    },

    setPage(page) {
      this.set('page', page);
    }
  }
});
