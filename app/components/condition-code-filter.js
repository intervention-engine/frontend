import Ember from 'ember';
import FilterComponentMixin from '../mixins/filter-component';
import ConditionEncounterCodeFiltersMixin from '../mixins/condition-encounter-code-filters';

export default Ember.Component.extend(FilterComponentMixin, ConditionEncounterCodeFiltersMixin, {
  checkboxBaseName: 'condition-filter',
});
