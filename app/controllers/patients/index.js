import Controller from 'ember-controller';
import computed from 'ember-computed';
import run from 'ember-runloop';
import { A } from 'ember-array/utils';

export default Controller.extend({
  queryParams: ['page', { currentAssessment: 'risk_assessment' },  'sortBy', 'sortDescending', 'groupId'],

  page: 1,

  populations: [],
  currentAssessment: 'Stroke', // default
  patientSearch: '',
  currentPatient: null,
  sortBy: 'family',
  sortDescending: false,
  riskLowValue: 1,
  riskHighValue: 4,
  interventionTypes: [],
  groupId : '',



  totalPatients: computed('model.patients.meta.total', 'selectedPopulations.length', 'populationPatients.length', function totalPatients() {
    let selectedPopulationsCount = 0//this.get('selectedPopulations.length');
    if (selectedPopulationsCount === 0) {
      return this.get('model.patients.meta.total');
    }

    return this.get('populationPatients.length');
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
      // if (selectedPopulations.length === 0) {
        return this.get('model.patients');
      // }

      let patients = new A([]);
      selectedPopulations.forEach(function(population) {
        population.get('groupList').then((groupList) => {
          patients.addObjects(groupList.get('patientids'));
        });
      });

      return patients;
    }
  }),

  sortedPatients: computed('selectedPopulations.length', 'filteredPatients.@each.fullName', function sortedPatients() {
    // if (this.get('selectedPopulations.length') === 0) {
      return this.get('filteredPatients');
    // }
    //
    // return this.get('filteredPatients').sortBy('fullName');
  }),

  filteredPatients: computed('populationPatients.[]', 'patientSearch', {
    get() {
      let rx = new RegExp(this.get('patientSearch'), 'gi');
      return this.get('populationPatients').filter(function(p) {
        return p.get('fullName').toString().match(rx);
      });
    }
  }),

  actions: {
    selectRiskAssessment(assessment) {
      this.set('currentAssessment', assessment);
    },

    togglePopulation(population, active) {
      if (active) {
        this.get('selectedPopulations').pushObject(population);
        this.set('groupId', population.get('id'))


      } else {
        this.get('selectedPopulations').removeObject(population);
        this.set('groupId', null)
      }

      run(() => {

        let patientsRemoteArray = this.get('model.patients');
        let groupId = this.get('groupId')
        this.set('page', 1);

        // patientsRemoteArray.set('sortBy', sortBy);
        // patientsRemoteArray.set('sortDescending', sortDescending);
        patientsRemoteArray.set('groupId', groupId);
        patientsRemoteArray.set('page', 1);
        patientsRemoteArray.pageChanged();
      });

    },

    setRiskScore(lowValue, highValue) {
      this.set('riskLowValue', lowValue);
      this.set('riskHighValue', highValue);
    },

    selectSortBy(sortBy, sortDescending) {
      let currentSortBy = this.get('sortBy');
      let currentSortDesc = this.get('sortDescending');

      // do nothing if nothing has changed
      if (currentSortBy === sortBy && currentSortDesc === sortDescending) {
        return;
      }

      run(() => {
        let patientsRemoteArray = this.get('model.patients');

        this.set('sortBy', sortBy);
        this.set('sortDescending', sortDescending);
        this.set('page', 1);

        patientsRemoteArray.set('sortBy', sortBy);
        patientsRemoteArray.set('sortDescending', sortDescending);
        patientsRemoteArray.set('page', 1);
        patientsRemoteArray.set('groupId', this.get('groupId'));
        patientsRemoteArray.pageChanged();
      });
    },

    setPage(page) {
      this.set('page', page);
    }
  }
});
