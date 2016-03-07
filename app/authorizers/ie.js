import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  authorize(data, block) {
    let { token } = data;
    if (!Ember.isEmpty(token)) {
      block('Authorization', token);
    }
  }
});
