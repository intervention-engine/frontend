import Ember from 'ember';
import CodeableMixin from '../mixins/codeable';
import GroupCharacteristicComponent from 'ember-fhir-adapter/models/group-characteristic-component';

export default GroupCharacteristicComponent.extend(CodeableMixin, {
  filter: Ember.computed('code', function() {
    if (this.hasCode('code', { code: '21612-7', system: 'http://loinc.org' })) {
      return 'age-filter';
    }

    if (this.hasCode('code', { code: '21840-4', system: 'http://loinc.org' })) {
      return 'gender-filter';
    }

    if (this.hasCode('code', { code: '11450-4', system: 'http://loinc.org' })) {
      return 'condition-code-filter';
    }

    if (this.hasCode('code', { code: '46240-8', system: 'http://loinc.org' })) {
      return 'encounter-code-filter';
    }
  }),

  icon: Ember.computed('filter', function() {
    let filter = this.get('filter');

    if (filter === 'age-filter') {
      return 'fa-birthday-cake';
    } else if (filter === 'gender-filter') {
      return 'fa-user';
    } else if (filter === 'condition-code-filter') {
      return 'icon-med-clipboard';
    } else if (filter === 'encounter-code-filter') {
      return 'fa-hospital-o';
    }

    return 'fa-user';
  })
});
