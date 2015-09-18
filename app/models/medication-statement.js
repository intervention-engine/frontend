import Ember from 'ember';
import CodeableMixin from '../mixins/codeable';
import DateableMixin from '../mixins/dateable';
import MedicationStatement from 'ember-fhir-adapter/models/medication-statement';

const displayNameRegex = /^[^:]+:\s*(.*)\s*\(Code List:.*\)$/;

let IEMedicationStatement = MedicationStatement.extend(CodeableMixin, DateableMixin, {
  text: Ember.computed('medicationCodeableConcept', function() {
    let text = this.get('medicationCodeableConcept').toString();
    let matches = text.match(displayNameRegex);

    if (!Ember.isNone(matches) && matches[1]) {
      return matches[1];
    }

    return text;
  }),

  endDate: Ember.computed.reads('effectivePeriod.end'),
  startDate: Ember.computed.reads('effectivePeriod.start')
});

export default IEMedicationStatement;
