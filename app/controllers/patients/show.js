import Controller from 'ember-controller';
import computed from 'ember-computed';
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
  nextPatient: computed('currentPatientIndex', 'huddlePatients.firstObject', {
    get() {
      let nextIndex = this.get('huddlePatients').indexOf(this.get('model')) + 1;
      // This handles the edge case of navigating to a patient on the next page
      if (nextIndex >= this.get('huddlePatients.length')) {
        return run(() => {
          let currentPage = this.get('huddlePatients.page');
          this.get('huddlePatients').set('page', currentPage + 1);
          this.get('indexController').set('page', currentPage + 1);
          return this.get('huddlePatients').get('firstObject');
        });
      }
      return this.get('huddlePatients').toArray()[nextIndex];
    }
  }),

  prevPatient: computed('currentPatientIndex', {
    get() {

      // In the case that we have the patient loaded, let's just return it and be done. 

      let prevIndex = this.get('currentPatientIndex') - 1;
      let prevPatient = this.get('huddlePatients').toArray()[prevIndex - 1];
      console.debug(prevPatient)
      if (prevPatient) {
        return prevPatient
      }
      
      // If we're on the first page we 
      let currentPage = this.get('huddlePatients.page');
      if (currentPage > 1) {
        let serializer = this.store.serializerFor('patient')
        let url = new URL(this.get('huddlePatients.meta.link').findBy('relation', 'previous').url)
        console.debug(url)
        return this.get('model')
        // // Because the prev/next links are full URL we have to strip the host off. 
        // return this.get('ajax').request(url.pathname + url.search).then(function(res) {
        //   debugger
        //   return this.set('prevPatient', res.entry.reverse()[0].resource.id);
        // });
        
      }
      // Return nothing, this means we are on the first patient and don't want to display an arrow
      return null
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
