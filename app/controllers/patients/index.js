import Controller from 'ember-controller';
import computed from 'ember-computed';
import run from 'ember-runloop';

export default Controller.extend({
  queryParams: ['page', { currentAssessment: 'risk_assessment' }, 'sortBy', 'sortDescending', 'groupId', 'huddleId'],

  page: 1,
  perPage: 8,

  currentAssessment: 'Stroke', // default
  selectedPopulation: computed('groupId', {
    get() {
      let groupId = this.get('groupId');
      if (groupId == null || groupId === '') {
        return null;
      }

      return this.get('populations').findBy('id', groupId);
    }
  }),
  selectedHuddle: computed('huddleId', {
    get() {
      let huddleId = this.get('huddleId');
      if (huddleId == null || huddleId === '') {
        return null;
      }

      return this.get('model.huddles').findBy('id', this.get('huddleId'));
    }
  }),
  patientSearch: '',
  currentPatient: null,
  sortBy: 'name,birthdate',
  sortDescending: false,
  riskLowValue: 1,
  riskHighValue: 4,
  interventionTypes: [],
  huddleId: '',
  groupId: '',

  populations: computed('model.groups.[]', {
    get() {
      return this.get('model.groups').filter((group) => {
        let code = group.get('code.coding.firstObject.code');
        return code == null || code.toUpperCase() !== 'HUDDLE';
      });
    }
  }),

  huddlePatientIds: computed('selectedHuddle', {
    get() {
      let selectedHuddle = this.get('selectedHuddle');
      if (selectedHuddle == null) {
        return [];
      }
      return selectedHuddle.get('patients').mapBy('patientId');
    }
  }),

  totalPatients: computed('model.patients.meta.total', 'selectedPopulation', 'populationPatients.length', function totalPatients() {
    let selectedPopulation = this.get('selectedPopulation');
    if (selectedPopulation == null) {
      return this.get('model.patients.meta.total');
    }

    return this.get('populationPatients.length');
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

  refetch() {
    run(() => {
      this.set('page', 1);

      let patientsRemoteArray = this.get('model.patients');
      patientsRemoteArray.set('sortBy', this.get('sortBy'));
      patientsRemoteArray.set('sortDescending', this.get('sortDescending'));
      patientsRemoteArray.set('groupId', this.get('groupId'));
      patientsRemoteArray.set('patientIds', this.get('huddlePatientIds'));
      patientsRemoteArray.set('page', 1);
      patientsRemoteArray.pageChanged();
    });
  },

  actions: {
    selectRiskAssessment(assessment) {
      this.set('currentAssessment', assessment);
    },

    selectHuddle(huddle) {
      this.set('selectedHuddle', huddle);
      this.set('huddleId', huddle ? huddle.get('id') : '');

      this.refetch();
    },

    togglePopulation(population, active) {
      if (active) {
        this.set('groupId', population.get('id'));
      } else {
        this.set('groupId', '');
      }

      this.refetch();
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

      this.set('sortBy', sortBy);
      this.set('sortDescending', sortDescending);

      this.refetch();
    },

    setPage(page) {
      this.set('page', page);
    }
  }
});
