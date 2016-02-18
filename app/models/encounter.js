import Ember from 'ember';
import CodeableMixin from '../mixins/codeable';
import DateableMixin from '../mixins/dateable';
import Encounter from 'ember-fhir-adapter/models/encounter';

const codeListRegex = /^(.+)\(Code List:.*\)$/;

export default Encounter.extend(CodeableMixin, DateableMixin, {
  displayText: Ember.computed('type.firstObject.displayText', function() {
    let code = this.get('type.firstObject.displayText');
    if (code) {
      let matches = code.match(codeListRegex);
      if (!Ember.isNone(matches) && matches[1]) {
        return matches[1];
      }

      return code;
    }

    return 'unknown';
  }),

  endDate: Ember.computed.reads('period.end'),
  startDate: Ember.computed.reads('period.start')
});
