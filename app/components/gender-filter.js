import Ember from 'ember';
import FilterComponentMixin from '../mixins/filter-component';

export default Ember.Component.extend(FilterComponentMixin, {
  checkboxBaseName: 'gender-filter',

  genders: ["male", "female", "unknown", "other"]
});
