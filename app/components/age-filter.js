import Component from 'ember-component';
import computed from 'ember-computed';
import FilterComponentMixin from '../mixins/filter-component';

export default Component.extend(FilterComponentMixin, {
  checkboxBaseName: 'age-filter',

  timePeriods: ['years', 'months', 'weeks', 'days'],
  comparators: ['between', 'exactly', 'less than', 'less than or equal to', 'greater than', 'greater than or equal to'],

  selectedTimePeriod: 'years',
  selectedComparator: 'between',
  highValueExists: computed.equal('selectedComparator', 'between'),

  lowValue: computed({
    get() {
      return 0;
    },

    set(key, newValue) {
      if (newValue !== null && newValue !== undefined) {
        let characteristic = this.get('characteristic');
        if (characteristic) {
          characteristic.set('valueRange.low.value', newValue);
        }
      }

      return newValue;
    }
  }),

  highValue: computed({
    get() {
    },

    set(key, newValue) {
      if (newValue !== null && newValue !== undefined) {
        let characteristic = this.get('characteristic');
        if (characteristic) {
          characteristic.set('valueRange.high.value', newValue);
        }
      }

      return newValue;
    }
  }),

  init() {
    this._super(...arguments);
    this.set('lowValue', this.get('characteristic.valueRange.low.value'));
    this.set('highValue', this.get('characteristic.valueRange.high.value'));
  },

  onToggle(active) {
    if (active) {
      this.set('lowValue', this.get('characteristic.valueRange.low.value'));
      this.set('highValue', this.get('characteristic.valueRange.high.value'));
    }
  },

  actions: {
    updateValue(field, event) {
      this.set(field, event.target.value);
      this.attrs.onChange();
    },

    selectTimePeriod(period) {
      this.set('selectedTimePeriod', period);
      this.attrs.onChange();
    },

    selectComparator(comparator) {
      this.set('selectedComparator', comparator);
      this.attrs.onChange();
    }
  }
});
