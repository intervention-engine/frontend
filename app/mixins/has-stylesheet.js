import Mixin from 'ember-metal/mixin';
import createStylesheet from 'ember-on-fhir/utils/create-stylesheet';

export default Mixin.create({
  didInsertElement() {
    this._super(...arguments);
    this.sheet = createStylesheet();
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.sheet) {
      document.head.removeChild(this.sheet);
      this.sheet = null;
    }
  },

  resetStylesheet() {
    if (this.sheet) {
      document.head.removeChild(this.sheet);
    }
    this.sheet = createStylesheet();
  }
});
