import Ember from 'ember';
import CodeableMixin from '../mixins/codeable';
import DateableMixin from '../mixins/dateable';
import Encounter from 'ember-fhir-adapter/models/encounter';

let IEEncounter = Encounter.extend(CodeableMixin, DateableMixin, {
  text: Ember.computed('type', function(){
    let code = this.get('type.firstObject');
    if (code) {
        return code.toString();//.match(/:\s+([^(]+)\s+\(/)[1]||code.toString();
    }
    return "unknown";

  }),
  endDate: Ember.computed.oneWay('period.end', function(){
    return this.get('period.end');
  }),
  startDate: Ember.computed.oneWay('period.start', function(){
    return this.get('period.start');
  })
});

export default IEEncounter;
