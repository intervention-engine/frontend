import Ember from 'ember';

export default Ember.Mixin.create({
  characteristic: null,
  checkboxBaseName: null,

  active: Ember.computed.notEmpty('characteristic'),

  checkboxName: Ember.computed('checkboxBaseName', function() {
    return `checkbox-${this.get('checkboxBaseName')}-${Ember.guidFor({})}`;
  }),

  checkboxChecked: Ember.computed('active', function() {
    if (this.get('active')) {
      return true;
    }
    return null;
  }),

  onToggle(/* active */) {
    // no-op
  },

  actions: {
    toggle() {
      if (this.get('active')) {
        this.attrs.destroyCharacteristic();
        this.onToggle(false);
      } else {
        this.attrs.createCharacteristic();
        this.onToggle(true);
      }
    }
  }
});
