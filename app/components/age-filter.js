import Ember from 'ember';
import FilterComponentMixin from '../mixins/filter-component';

export default Ember.Component.extend(FilterComponentMixin, {
  checkboxBaseName: 'age-filter',

  timePeriods: ['years', 'months', 'weeks', 'days'],
  comparators: ['between', 'exactly', 'less than', 'less than or equal to', 'greater than', 'greater than or equal to'],

  selectedTimePeriod: 'years',
  selectedComparator: 'between',
  highValueExists: Ember.computed.equal('selectedComparator', 'between'),

  actions: {
    selectTimePeriod(period) {
      this.set('selectedTimePeriod', period);
    },

    selectComparator(comparator) {
      this.set('selectedComparator', comparator);
    }
  }
});
