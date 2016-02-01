import Mixin from 'ember-metal/mixin';
import { isEmberArray } from 'ember-array/utils';

export default Mixin.create({
  hasCode(field, code) {
    let thing = this.get(field);
    if (isEmberArray(thing)) {
      let matchedCodes = thing.map((c) => c.hasCode(code));

      return matchedCodes.any((d) => d);
    } else if (thing.get('content.hasCode')) {
      return thing.get('content.hasCode').call(thing.get('content'), code);
    } else {
      return thing.hasCode(code);
    }
  }
});
