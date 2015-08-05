import Ember from 'ember';
import RiskAssessment from 'ember-fhir-adapter/models/risk-assessment';

let IERiskAssessment = RiskAssessment.extend({
  value: Ember.computed.oneWay("prediction.firstObject.probabilityDecimal", function(){
    return this.get('prediction.firstObject.probabilityDecimal');
  })
});

export default IERiskAssessment;
