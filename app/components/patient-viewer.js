import Component from 'ember-component';
import computed from 'ember-computed';
import observer from 'ember-metal/observer';
import HasStylesheetMixin from 'ember-on-fhir/mixins/has-stylesheet';
import { addCSSRule } from 'ember-on-fhir/utils/create-stylesheet';
import { isTodayOrAfter } from 'ember-on-fhir/helpers/is-today-or-after';
import moment from 'moment';
import Pikaday from 'pikaday';

export default Component.extend(HasStylesheetMixin, {
  patient: null,
  riskAssessments: null,
  currentAssessment: null,
  selectedCategory: null,
  nextScheduledHuddle: null,
  displayEditHuddleModal: false,
  displayClearDiscussedModal: false,

  selectedScheduleDate: computed({
    get() {
      return new Date();
    }
  }),

  huddles: computed({
    get() {
      return [];
    }
  }),

  init() {
    this._super(...arguments);
    this.unreviewedHuddles = {};
  },

  didInsertElement() {
    this._super(...arguments);
    this.attrs.registerPatientViewer(this);

    this.picker = new Pikaday({
      defaultDate: this.get('selectedScheduleDate'),
      setDefaultDate: true,
      onSelect: (date) => {
        this.set('selectedScheduleDate', date);
      }
    });
    let field = document.getElementById('patientViewerPikadayCalendar');
    field.appendChild(this.picker.el);

    this.setScheduleStyles();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.attrs.unregisterPatientViewer();
    if (this.picker) {
      this.picker.destroy();
      this.picker = null;
    }
  },

  setScheduleStyles: observer('huddles.@each.date', 'nextScheduledHuddle', function setScheduleStyles() {
    this.resetStylesheet();

    let huddles = this.get('huddles');
    let patient = this.get('patient');
    let { sheet } = this.sheet;

    for (let i = 0; i < huddles.length; i++) {
      let date = moment(huddles[i].get('date'));
      let patientReviewed = huddles[i].patientReviewed(patient);

      let year = date.year();
      let month = date.month();
      let day = date.date();

      let backgroundColor = '#5D8FAE';
      let boxShadow = '#53809c';
      if (patientReviewed) {
        backgroundColor = '#5C5C5C';
        boxShadow = '#525252';
      }

      let cssRule = `background-color: ${backgroundColor}; color: #fff; border-radius: 3px; box-shadow: inset 0 1px 3px ${boxShadow};`;
      addCSSRule(sheet, `#patientViewerPikadayCalendar [data-pika-year="${year}"][data-pika-month="${month}"][data-pika-day="${day}"]`, cssRule);
    }
  }),

  futureHuddles: computed('huddles.@each.date', 'nextScheduledHuddle', {
    get() {
      return this.get('huddles').filter((huddle) => isTodayOrAfter([huddle.get('date')])).sort((a, b) => a.get('date') - b.get('date'));
    }
  }),

  futureDisplayHuddle: computed('futureHuddles.[]', {
    get() {
      return this.get('futureHuddles').objectAt(0);
    }
  }),

  selectedScheduleHuddle: computed('huddles.@each.date', 'selectedScheduleDate', {
    get() {
      let selectedScheduleDate = this.get('selectedScheduleDate');
      if (selectedScheduleDate == null) {
        return;
      }

      let huddles = this.get('huddles');
      selectedScheduleDate = moment(selectedScheduleDate);

      for (let i = 0; i < huddles.length; i++) {
        let huddle = huddles[i];
        if (selectedScheduleDate.isSame(huddle.get('date'), 'day')) {
          return huddle;
        }
      }
    }
  }),

  selectedScheduleHuddlePatient: computed('selectedScheduleHuddle', 'patient', {
    get() {
      let selectedScheduleHuddle = this.get('selectedScheduleHuddle');
      if (selectedScheduleHuddle == null) {
        return;
      }

      return selectedScheduleHuddle.get('patients').findBy('patientId', this.get('patient.id'));
    }
  }),

  slices: computed('currentAssessment', 'patient.sortedRisks.@each.pie', function() {
    let currentAssessment = this.get('currentAssessment');
    if (currentAssessment) {
      let risk = this.get('patient.sortedRisks').filterBy('prediction.firstObject.outcome.displayText', this.get('currentAssessment')).get('lastObject');
      if (risk) {
        return risk.get('pie').get('sliceArray');
      }
    }

    return [
      { name: 'medications', title: 'Medications', value: 0, weight: 1 },
      { name: 'conditions', title: 'Conditions', value: 0, weight: 2 },
      { name: 'readmissions', title: 'Readmissions', value: 0, weight: 1 },
      { name: 'utilization', title: 'Utilizations', value: 5, weight: 0.5 },
      { name: 'social_barriers', title: 'Social Barriers', value: 2, weight: 1 },
      { name: 'falls', title: 'Falls', value: 1, weight: 1 }
    ];
  }),

  computedRisk: computed('patient.currentRisk', 'currentAssessment', function() {
    let currentAssessment = this.get('currentAssessment');
    let risks = this.get('patient.currentRisk');

    if (currentAssessment && risks.length > 0) {
      return risks.filterBy('key', currentAssessment)[0].value.get('value');
    }

    return 0;
  }),

  actions: {
    closeReviewPatientModal() {
      this.set('displayClearDiscussedModal', false);
      this.notifyPropertyChange('nextScheduledHuddle');
    },

    closeEditHuddleModal() {
      this.set('displayEditHuddleModal', false);
      this.attrs.refreshHuddles();
    }
  }
});
