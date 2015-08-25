import Ember from 'ember';
import FilterComponentMixin from '../mixins/filter-component';

export default Ember.Component.extend(FilterComponentMixin, {
  checkboxBaseName: 'age-filter',

  timePeriods: ['years', 'months', 'weeks', 'days'],
  comparators: ['between', 'exactly', 'less than', 'less than or equal to', 'greater than', 'greater than or equal to'],
});
