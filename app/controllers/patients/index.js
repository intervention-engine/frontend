import Controller from 'ember-controller';
import computed from 'ember-computed';
import run from 'ember-runloop';
import { A } from 'ember-array/utils';

export default Controller.extend({
  queryParams: ['page', { currentAssessment: 'risk_assessment' },  'sortBy', 'sortDescending', 'groupId'],

  page: 1,
  perPage: 8,

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
      return this.get('model.patients');
    }
  }),

  sortedPatients: computed('filteredPatients.@each.fullName', function sortedPatients() {
    return this.get('filteredPatients');
  }),

  filteredPatients: computed('populationPatients.[]', 'patientSearch', {
    get() {
      let rx = new RegExp(this.get('patientSearch'), 'gi');
      return this.get('populationPatients').filter(function(p) {
        return p.get('fullName').toString().match(rx);
      });
    }
  }),

  sortParams: computed('sortBy', 'sortDescending', {
    get() {
      let sortBy = this.get('sortBy');
      let sortDescending = this.get('sortDescending');

      if (sortBy == null) {
        return {};
      }

      let sortDir = sortDescending ? 'desc' : 'asc';
      return {
        [`_sort:${sortDir}`]: sortBy
      };
    }
  }),

  groupParams: computed('groupId', {
    get() {
      let groupId = this.get('groupId')
      return groupId?{'_query':'group', 'groupId': groupId}:{}
    }
  }),

  queryParams: computed('sortParams', 'groupParams', {
    get() {
      return Object.assign({},this.get('groupParams'), this.get('sortParams'))
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
        this.set('groupId', '')
      }

      run(() => {
        this.set('page', 1);
        let patientsRemoteArray = this.get('model.patients');
        patientsRemoteArray.set('otherParams', this.get('queryParams'))
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
        this.set('sortBy', sortBy);
        this.set('sortDescending', sortDescending);
        this.set('page', 1);

        this.set('page', 1);
        let patientsRemoteArray = this.get('model.patients');
        patientsRemoteArray.set('otherParams', this.get('queryParams'))
        patientsRemoteArray.set('page', 1);
        patientsRemoteArray.pageChanged();
      });
    },

    setPage(page) {
      this.set('page', page);
    }
  }
});
