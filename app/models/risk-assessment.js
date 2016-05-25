import Ember from 'ember';
import DS from 'ember-data';
import DateableMixin from '../mixins/dateable';
import RiskAssessment from 'ember-fhir-adapter/models/risk-assessment';

export default RiskAssessment.extend(DateableMixin, {
  displayText: Ember.computed('prediction.firstObject', function() {
    return `${this.get('prediction.firstObject.outcome.displayText')} - ${this.get('value')}`;
  }),
  startDate: Ember.computed.reads('date'),
  pie: DS.belongsTo('pie', { async: true }),
  value: Ember.computed.reads('prediction.firstObject.probabilityDecimal')
});
