import Ember from 'ember';
import CodeableMixin from '../mixins/codeable';
import DateableMixin from '../mixins/dateable';
import Condition from 'ember-fhir-adapter/models/condition';

const displayNameRegex = /^[^:]+:\s*(.*)\s*\(Code List:.*\)$/;

export default Condition.extend(CodeableMixin, DateableMixin, {
  displayText: Ember.computed('code.displayText', function() {
    let code = this.get('code.displayText');
    let matches = code.match(displayNameRegex);

    if (!Ember.isNone(matches) && matches[1]) {
      return matches[1];
    }

    return code;
  }),

  endDate: Ember.computed.reads('abatementDateTime'),
  startDate: Ember.computed.reads('onsetDateTime')
});
