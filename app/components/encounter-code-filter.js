import Ember from 'ember';
import FilterComponentMixin from '../mixins/filter-component';
import ConditionEncounterCodeFiltersMixin from '../mixins/condition-encounter-code-filters';

export default Ember.Component.extend(FilterComponentMixin, ConditionEncounterCodeFiltersMixin, {
  checkboxBaseName: 'encounter-filter',

  codingSystems: [
    { url: 'http://www.ama-assn.org/go/cpt', system: 'CPT' },
    { url: 'http://snomed.info/sct', system: 'SNOMED CT' }
  ]
});
