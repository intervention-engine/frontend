import Ember from 'ember';
import CodeableMixin from '../mixins/codeable';
import GroupCharacteristicComponent from 'ember-fhir-adapter/models/group-characteristic-component';

let IEGroupCharacteristicComponent = GroupCharacteristicComponent.extend(CodeableMixin, {
  filter: Ember.computed('code', function() {
    if (this.hasCode("code", {code: "21612-7", system: "http://loinc.org"})) {
      return "age-filter";
    }

    if (this.hasCode("code", {code: "21840-4", system: "http://loinc.org"})) {
      return "gender-filter";
    }

    if (this.hasCode("code", {code: "11450-4", system: "http://loinc.org"})) {
      return "condition-code-filter";
    }

    if (this.hasCode("code", {code: "46240-8", system: "http://loinc.org"})) {
      return "encounter-code-filter";
    }
  }),

  icon: Ember.computed('filter', function() {
    var icon = 'fa-user';
    switch (this.get('filter')) {
    case 'age-filter':
      icon = 'fa-birthday-cake';
      break;
    case 'gender-filter':
      icon = 'fa-user';
      break;
    case 'condition-code-filter':
      icon = 'icon-med-clipboard';
      break;
    case 'encounter-code-filter':
      icon = 'fa-hospital-o';
      break;
    default:
      icon = 'fa-user';
    }
    return icon;
  }),

  // `countableRollup` is used to trigger the update in the filter counts component since Ember does not support nested
  // @each listeners (such as group.characteristic.@each.valueRange.low.value, etc)
  countableRollup: Ember.computed(
    'valueRange.low.value',
    'valueRange.high.value',
    'valueCodeableConcept.coding.@each.code',
    'valueCodeableConcept.coding.@each.system',
    function() {
      let coding = this.get('valueCodeableConcept.coding') || [];
      let codes = coding.mapBy('code').join('_');
      let systems = coding.mapBy('system').join('_');

      return `${this.get('valueRange.low.value')}-${this.get('valueRange.high.value')}-${codes}-${systems}`;
    }
  ),

  // http://guides.emberjs.com/v1.10.0/object-model/observers/#toc_unconsumed-computed-properties-do-not-trigger-observers
  // > If you need to observe a computed property but aren't currently retrieving it, just get it in your init method.
  countableRollupObserver: Ember.observer('countableRollup', function() {
    this.get('countableRollup');
  }).on('init')
});

export default IEGroupCharacteristicComponent;
