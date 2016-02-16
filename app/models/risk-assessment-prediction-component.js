import DS from 'ember-data';
import RiskAssessmentPredictionComponent from 'ember-fhir-adapter/models/risk-assessment-prediction-component';

export default RiskAssessmentPredictionComponent.extend({
  outcome: DS.belongsTo('codeable-concept'),
  probabilityRange: DS.belongsTo('range'),
  probabilityCodeableConcept: DS.belongsTo('codeable-concept'),
  whenPeriod: DS.belongsTo('period'),
  whenRange: DS.belongsTo('range')
});
