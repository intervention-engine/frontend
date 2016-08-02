import Controller from 'ember-controller';
import computed from 'ember-computed';
import observer from 'ember-metal/observer';
import service from 'ember-service/inject';
import controller from 'ember-controller/inject';
import run from 'ember-runloop';

import { parseHuddles } from 'ember-on-fhir/models/huddle';

export default Controller.extend({
  indexController: controller('patients.index'),
  ajax: service(),

  currentAssessment: 'Catastrophic Health Event',
  selectedCategory: null,
  showAddInterventionModal: false,
  showAddHuddleModal: false,
  showReviewPatientModal: false,
  defaultAddHuddleDate: null,

  patientViewerComponent: null,

  huddles: computed({
    get() {
      return [];
    }
  }),
  huddlePatients: computed.alias('indexController.model.patients'),
  huddleCount: computed.alias('indexController.model.patients.meta.total'),
  huddleOffset: computed.alias('huddlePatients.paramsForBackend._offset'),
  
  currentPatientIndex: computed('huddlePatients', 'model', 'nextPatient', {
    get() {
      return this.get('huddlePatients').indexOf(this.get('model')) + 1 + this.get('huddleOffset');
    }
  }),

  nextPatient: computed('currentPatientIndex', {
    get() {
      let params = this.get('indexController.model.patients.searchParams');
      let index = this.get('currentPatientIndex');


      return this.store.find('patient', Object.assign(params, {_count:1, _offset:index}))
    }
  }),

  prevPatient: computed('currentPatientIndex', {
    get() {
      return this.store.find('patient', {_offset: this.get('currentPatientIndex') - 2, _count:1 } )
    }
  }),

  riskAssessments: computed({
    get() {
      // TODO: get this list from the backend
      return ['Catastrophic Health Event'];
    }
  }),

  refreshHuddles() {
    this.get('ajax').request('/Group', {
      data: {
        code: 'http://interventionengine.org/fhir/cs/huddle|HUDDLE',
        member: `Patient/${this.get('model.id')}`
      }
    }).then((response) => {
      this.set('huddles', parseHuddles(response.entry || []));
    });
  },

  actions: {
    changeCurrentPatientIndex(amount){
      this.set('currentPatientIndex', this.get('currentPatientIndex') + amount);
    },

    setRiskAssessment(riskAssessment) {
      this.set('currentAssessment', riskAssessment);
      this.set('selectedCategory', null);
    },

    selectCategory(category) {
      this.set('selectedCategory', category);
    },

    openAddInterventionModal() {
      this.set('showAddInterventionModal', true);
    },

    hideAddInterventionModal() {
      this.set('showAddInterventionModal', false);
    },

    openAddHuddleModal(date) {
      this.set('showAddHuddleModal', true);
      this.set('defaultAddHuddleDate', date);
    },

    hideAddHuddleModal() {
      this.set('showAddHuddleModal', false);
      this.refreshHuddles();
    },

    refreshHuddles() {
      this.refreshHuddles();
    },

    openReviewPatientModal(huddle) {
      this.set('showReviewPatientModal', true);
      this.set('reviewPatientHuddle', huddle);
    },

    hideReviewPatientModal() {
      this.set('showReviewPatientModal', false);
      let patientViewer = this.get('patientViewerComponent');
      if (patientViewer) {
        patientViewer.notifyPropertyChange('nextScheduledHuddle');
      }
    },

    registerPatientViewer(component) {
      this.set('patientViewerComponent', component);
    },

    unregisterPatientViewer() {
      this.set('patientViewerComponent', null);
    },

    nextPatient() {
      this.set('selectedCategory', null);
    }
  }
});
