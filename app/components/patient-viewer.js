import Component from 'ember-component';
import computed from 'ember-computed';
import observer from 'ember-metal/observer';
import HasStylesheetMixin from 'ember-on-fhir/mixins/has-stylesheet';
import { addCSSRule } from 'ember-on-fhir/utils/create-stylesheet';
import { isTodayOrAfter } from 'ember-on-fhir/helpers/is-today-or-after';
import moment from 'moment';
import Pikaday from 'pikaday';
import DS from 'ember-data';

export default Component.extend(HasStylesheetMixin, {
  patient: null,
  riskAssessments: null,
  currentAssessment: null,
  naRiskAssessment: computed('patientRisks.[]', {
    get() {
      let firstRisk = this.get('patientRisks.firstObject');
      if (firstRisk) {
        let code = firstRisk.get('prediction.firstObject.probabilityCodeableConcept.coding.firstObject');
        if (code) {
          return code.get('system') === 'http://snomed.info/sct' && code.get('code') === '385432009';
        }
      }

      return false;
    }
  }),
  selectedCategory: null,
  oldCategoryName: null,
  nextScheduledHuddle: null,
  displayEditHuddleModal: false,
  displayClearDiscussedModal: false,
  selectedPatientRisk: null,

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

  patientRisks: computed('currentAssessment', 'patient.sortedRisks.[]', {
    get() {
      return this.get('patient.sortedRisks').filterBy('prediction.firstObject.outcome.displayText', this.get('currentAssessment'));
    }
  }),

  selectedPatientRiskOrLast: computed('selectedPatientRisk', 'patientRisks.lastObject', {
    get() {
      return this.get('selectedPatientRisk') || this.get('patientRisks.lastObject');
    }
  }),

  pie: computed('currentAssessment', 'selectedPatientRiskOrLast', function pie() {
    let selectedPatientRiskOrLast = this.get('selectedPatientRiskOrLast');

    if (selectedPatientRiskOrLast == null) {
      return null;
    }

    let promise = selectedPatientRiskOrLast.get('pie').then((pie) => {
      let oldCategoryName = this.get('oldCategoryName');

      if (oldCategoryName) {
        let slices = pie.get('sliceArray');
        let slice = slices.findBy('name', oldCategoryName);
        this.attrs.selectCategory(slice);

        this.set('oldCategoryName', null);
      }

      return pie;
    });

    return DS.PromiseObject.create({ promise });
  }),

  slices: computed('selectedPatientRiskOrLast', 'pie', 'pie.isFulfilled', function() {
    let selectedPatientRiskOrLast = this.get('selectedPatientRiskOrLast');
    if (selectedPatientRiskOrLast == null) {
      return [];
    }

    return this.get('pie.sliceArray') || [];
  }),

  hasRisks: computed('patientRisks.length', 'naRiskAssessment', {
    get() {
      if (this.get('naRiskAssessment')) {
        return false;
      }

      return this.get('patientRisks.length') > 0;
    }
  }),

  computedRisk: computed('patient.currentRisk', 'currentAssessment', function() {
    let currentAssessment = this.get('currentAssessment');
    let risks = this.get('patient.currentRisk');

    if (currentAssessment && risks.length > 0) {
      return risks.filterBy('key', currentAssessment)[0].value.get('value');
    }

    return 0;
  }),

  noRiskAssessmentReason: computed('naRiskAssessment', function() {
    return this.get('naRiskAssessment') ? 'Risk Assessment Not Applicable' : 'No Risk Assessment';
  }),

  actions: {
    closeReviewPatientModal() {
      this.set('displayClearDiscussedModal', false);
      this.notifyPropertyChange('nextScheduledHuddle');
    },

    closeEditHuddleModal() {
      this.set('displayEditHuddleModal', false);
      this.attrs.refreshHuddles();
    },

    setSelectedRisk(risk) {
      let selectedCategory = this.get('selectedCategory');
      this.set('oldCategoryName', selectedCategory == null ? null : selectedCategory.name);
      this.set('selectedPatientRisk', risk);
      this.attrs.selectCategory(null);
    }
  }
});
