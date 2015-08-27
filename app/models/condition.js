import Ember from 'ember';
import CodeableMixin from '../mixins/codeable';
import DateableMixin from '../mixins/dateable';
import Condition from 'ember-fhir-adapter/models/condition';

let IECondition = Condition.extend(CodeableMixin, DateableMixin, {
  text: Ember.computed.oneWay('code', function(){
    return this.get('code').toString().match(/:\s+([^(]+)\s+\(/)[1]||this.get('code').toString();
  }),
  endDate: Ember.computed.oneWay('abatementDate', function(){
    return this.get('abatementDate');
  }),
  startDate: Ember.computed.oneWay('onsetDateTime', function(){
    return this.get('onsetDateTime');
  })
});

export default IECondition;
