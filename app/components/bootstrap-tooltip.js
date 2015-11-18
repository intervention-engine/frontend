import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tooltip: '',
  tooltipPlacement: 'top',
  tooltipTrigger: 'hover focus',

  config: computed({
    get() {
      return {
        container: 'body',
        placement: this.get('tooltipPlacement'),
        title: () => {
          return this.get('tooltip');
        },
        trigger: this.get('tooltipTrigger')
      };
    }
  }),

  didInsertElement() {
    this.$().tooltip(this.get('config'));
  },

  willDestroyElement() {
    this.$().tooltip('destroy');
  }
});
