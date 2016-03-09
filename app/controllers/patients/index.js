import Controller from 'ember-controller';
import computed from 'ember-computed';
import run from 'ember-runloop';
import { A } from 'ember-array/utils';

export default Controller.extend({
  // queryParams: ['page', { currentAssessment: 'risk_assessment' },  'sortBy', 'sortDescending', 'groupId'],

  page: 1,
  perPage: 8,

  currentAssessment: 'Stroke', // default
  selectedHuddle: null,
  patientSearch: '',
  currentPatient: null,
  sortBy: 'family',
  sortDescending: false,
  riskLowValue: 1,
  riskHighValue: 4,
  interventionTypes: [],
  groupId: '',

  totalPatients: computed('model.patients.meta.total', 'selectedPopulations.length', 'populationPatients.length', function totalPatients() {
    let selectedPopulationsCount = this.get('selectedPopulations.length');
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

  populationPatients: computed.reads('model.patients'),

  sortedPatients: computed.reads('filteredPatients'),

  filteredPatients: computed('populationPatients.[]', 'patientSearch', {
    get() {
      let rx = new RegExp(this.get('patientSearch'), 'gi');
      return this.get('populationPatients').filter(function(p) {
        return p.get('fullName').toString().match(rx);
      });
    }
  }),

  groupParams: computed('groupId', {
    get() {
      let groupId = this.get('groupId');
      return groupId ? { '_query': 'group', groupId } : {};
    }
  }),

  actions: {
    selectRiskAssessment(assessment) {
      this.set('currentAssessment', assessment);
    },

    selectHuddle(huddle) {
      this.set('selectedHuddle', huddle);
    },

    togglePopulation(population, active) {
      if (active) {
        this.set('selectedPopulations', A([population]));
        this.set('groupId', population.get('id'));

      } else {
        this.get('selectedPopulations').removeObject(population);
        this.set('groupId', '');
      }

      run(() => {
        this.set('page', 1);
        let groupId = this.get('groupId');
        let patientsRemoteArray = this.get('model.patients');
        patientsRemoteArray.set('sortBy', this.get('sortBy'));
        patientsRemoteArray.set('sortDescending', this.get('sortDescending'));
        patientsRemoteArray.set('otherParams', groupId ? { '_query': 'group', groupId } : {});
        console.log(patientsRemoteArray.get('paramsForBackend'));
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
        patientsRemoteArray.set('sortBy', this.get('sortBy'));
        patientsRemoteArray.set('sortDescending', this.get('sortDescending'));
        patientsRemoteArray.set('otherParams', this.get('groupParams'));
        patientsRemoteArray.set('page', 1);
        patientsRemoteArray.pageChanged();
      });
    },

    setPage(page) {
      this.set('page', page);
    }
  }
});
