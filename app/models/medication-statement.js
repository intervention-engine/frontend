import Ember from 'ember';
import CodeableMixin from '../mixins/codeable';
import DateableMixin from '../mixins/dateable';
import MedicationStatement from 'ember-fhir-adapter/models/medication-statement';

let IEMedicationStatement = MedicationStatement.extend(CodeableMixin, DateableMixin, {
  text: Ember.computed.oneWay('medicationCodeableConcept', function(){
    return this.get('medicationCodeableConcept').toString().match(/:\s+([^(]+)\s+\(/)[1]||this.get('medicationCodeableConcept').toString();
  }),
  endDate: Ember.computed.oneWay('effectivePeriod.end', function(){
    return this.get('effectivePeriod.end');
  }),
  startDate: Ember.computed.oneWay('effectivePeriod.start', function(){
    return this.get('effectivePeriod.start');
  })
});

export default IEMedicationStatement;
