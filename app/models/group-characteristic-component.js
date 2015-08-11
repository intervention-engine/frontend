import Ember from 'ember';
import CodeableMixin from '../mixins/codeable';
import GroupCharacteristicComponent from 'ember-fhir-adapter/models/group-characteristic-component';

let IEGroupCharacteristicComponent = GroupCharacteristicComponent.extend(CodeableMixin, {
  filter: Ember.computed('code', function() {
    if (this.hasCode("code", {code: "21612-7", system: "http://loinc.org"})) {
      return "age-filter"
    };

    if (this.hasCode("code", {code: "21840-4", system: "http://loinc.org"})) {
      return "gender-filter"
    };

    if (this.hasCode("code", {code: "11450-4", system: "http://loinc.org"})) {
      return "condition-code-filter"
    };

    if (this.hasCode("code", {code: "46240-8", system: "http://loinc.org"})) {
      return "encounter-code-filter"
    };
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
  })
});

export default IEGroupCharacteristicComponent;