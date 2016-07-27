import Ember from 'ember';
import run from 'ember-runloop';

export default Ember.Mixin.create({
  codeChangedObserver: Ember.observer('characteristic.valueCodeableConcept.coding.@each.system', 'characteristic.valueCodeableConcept.coding.@each.code', function() {
    run.debounce(this, this.attrs.onChange, 150);
  }),

  // since we're not using 2 way binding on the select-fx component, the only way
  // to set the default value to ICD-9 is to use an observer
  onToggle(active) {
    this._super(active);

    if (active) {
      this.send('selectCodingSystem', this.get('characteristic.valueCodeableConcept.coding.firstObject'), this.get('codingSystems.firstObject.system'));
    }
  },

  actions: {
    selectCodingSystem(coding, codeSystem) {
      let codingSystem = this.get('codingSystems').findBy('system', codeSystem);

      coding.set('system', codingSystem.url);
      coding.set('display', codingSystem.system);
    },

    addCode(context) {
      let conditionCoding = context.get('store').createRecord('coding');
      conditionCoding.set('system', this.get('codingSystems.firstObject').url);
      conditionCoding.set('display', this.get('codingSystems.firstObject').system);
      context.get('coding').pushObject(conditionCoding);
    },

    removeCode(context, code) {
      context.get('coding').removeObject(code);
    }
  }
});
