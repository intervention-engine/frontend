import Ember from 'ember';

export default function(propertyName) {
  return Ember.computed(propertyName, function() {
    if (this.get(propertyName)) {
      return true;
    }
    return null;
  });
}
