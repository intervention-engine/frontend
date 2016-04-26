import Ember from 'ember';
import FilterComponentMixin from '../mixins/filter-component';
import ConditionEncounterCodeFiltersMixin from '../mixins/condition-encounter-code-filters';

export default Ember.Component.extend(FilterComponentMixin, ConditionEncounterCodeFiltersMixin, {
  checkboxBaseName: 'condition-filter',

  codingSystems: [
    { url: 'http://hl7.org/fhir/sid/icd-9', system: 'ICD-9' },
    { url: 'http://hl7.org/fhir/sid/icd-10', system: 'ICD-10' }
  ]
});
