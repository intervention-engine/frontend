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

  selectedScheduleDate: computed({
    get() {
      return new Date();
    }
  }),
  schedulePanelOpen: false,

  huddles: computed({
    get() {
      return [];
    }
  }),

  didInsertElement() {
    this._super(...arguments);
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
    if (this.picker) {
      this.picker.destroy();
      this.picker = null;
    }
  },

  setScheduleStyles: observer('huddles.@each.date', function setScheduleStyles() {
    this.resetStylesheet();

    let huddles = this.get('huddles');
    let { sheet } = this.sheet;

    for (let i = 0; i < huddles.length; i++) {
      let date = moment(huddles[i].get('date'));

      let year = date.year();
      let month = date.month();
      let day = date.date();

      addCSSRule(sheet, `#patientViewerPikadayCalendar [data-pika-year="${year}"][data-pika-month="${month}"][data-pika-day="${day}"]`, 'border: 1px dashed #5D8FAE');
    }
  }),

  futureHuddles: computed('huddles.@each.date', {
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
    toggleScheduleChevron() {
      this.toggleProperty('schedulePanelOpen');
    }
  }
});
