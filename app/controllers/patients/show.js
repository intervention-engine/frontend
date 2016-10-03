import Controller from 'ember-controller';
import computed from 'ember-computed';
import service from 'ember-service/inject';
import controller from 'ember-controller/inject';
import { parseHuddles } from 'ember-on-fhir/models/huddle';

export default Controller.extend({
  indexController: controller('patients.index'),
  ajax: service(),

  currentAssessment: 'Catastrophic Health Event',
  selectedCategory: null,
  showAddInterventionModal: false,
  showAddHuddleModal: false,
  showReviewPatientModal: false,
  reviewPatientModalSkippable: false,
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
      return this.store.find('patient', Object.assign(params, { _count: 1, _offset: index }));
    }
  }),

  prevPatient: computed('currentPatientIndex', {
    get() {
      let params = this.get('indexController.model.patients.searchParams');
      let index = this.get('currentPatientIndex');
      return this.store.find('patient', Object.assign(params, { _count: 1, _offset: index - 2 }));
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
    moveToNextPatient(skip = false) {
      let newIndex = this.get('currentPatientIndex') + 1;
      if (newIndex > this.get('huddleCount')) {
        return;
      }

      let selectedHuddleId = this.get('indexController.selectedHuddle.id');
      let selectedHuddle = selectedHuddleId ? this.get('huddles').findBy('id', selectedHuddleId) : null;
      let patientReviewed = true;
      if (selectedHuddle != null) {
        patientReviewed = selectedHuddle.patientReviewed(this.get('model'));
      }

      if (!skip && !patientReviewed) {
        this.set('reviewPatientModalSkippable', true);
        this.set('showReviewPatientModal', true);
        this.set('reviewPatientHuddle', selectedHuddle);

        return;
      }

      this.set('reviewPatientModalSkippable', false);
      this.set('showReviewPatientModal', false);

      this.get('nextPatient').then((nextPatient) => {
        this.set('currentPatientIndex', newIndex);
        this.transitionToRoute('patients.show', nextPatient.get('firstObject'));
      });
    },

    moveToPrevPatient() {
      let newIndex = this.get('currentPatientIndex') - 1;
      if (newIndex <= 0) {
        return;
      }

      this.get('prevPatient').then((prevPatient) => {
        this.set('currentPatientIndex', newIndex);
        this.transitionToRoute('patients.show', prevPatient.get('firstObject'));
      });
    },

    changeCurrentPatientIndex(amount) {
      let newIndex = this.get('currentPatientIndex') + amount;
      if (newIndex > this.get('huddleCount') || newIndex <= 0) {
        return;
      }
      this.set('currentPatientIndex', newIndex);
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
      this.set('reviewPatientModalSkippable', false);
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
