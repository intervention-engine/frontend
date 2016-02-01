import Ember from 'ember';
import { helper } from 'ember-helper';

const { uuid } = Ember;

export function generateUuid([base]/*, hash*/) {
  return `${base}${uuid()}`;
}

export default helper(generateUuid);
