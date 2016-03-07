import Ember from 'ember';
import computed from 'ember-computed';
import FilterComponentMixin from '../mixins/filter-component';

export default Ember.Component.extend(FilterComponentMixin, {
  checkboxBaseName: 'gender-filter',

  genders: ['male', 'female', 'unknown', 'other'],

  genderValue: computed('characteristic.valueCodeableConcept.coding.firstObject.code', {
    get() {
      return this.get('characteristic.valueCodeableConcept.coding.firstObject.code');
    },

    set(keyName, value) {
      this.set('characteristic.valueCodeableConcept.coding.firstObject.code', value);
      this.attrs.onChange();
      return value;
    }
  })
});
