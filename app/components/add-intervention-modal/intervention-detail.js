import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['intervention-list-group-item'],
  classNameBindings: ['_active:active'],

  _registeredParent: null,
  _active: false,

  intervention: null,
  detail: '',

  init() {
    this._super(...arguments);
    Ember.run.scheduleOnce('actions', this, this._registerWithParent);
  },

  click() {
    this.attrs.expand(this);
  },

  slideUp() {
    this.$('.collapsible-panel').slideUp();
    this.set('_active', false);
  },

  slideDown() {
    this.$('.collapsible-panel').slideDown();
    this.set('_active', true);
  },

  _registerWithParent() {
    this.attrs.registerDetailItem(this);
  }
});
