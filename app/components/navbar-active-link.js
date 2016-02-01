import Component from 'ember-component';
import computed from 'ember-computed';
import run from 'ember-runloop';

export default Component.extend({
  tagName: 'li',
  classNameBindings: ['active'],

  active: computed('childLinkViews.firstObject.active', function active() {
    return this.get('childLinkViews.firstObject.active');
  }),

  init() {
    this._super(...arguments);
    this.set('childLinkViews', []);
  },

  didRender() {
    this._super(...arguments);

    run.schedule('afterRender', this, function() {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }

      let childLinkElements = this.$('a.ember-view');
      let childLinkViews = childLinkElements.toArray().map((view) => this._viewRegistry[view.id]);

      this.set('childLinkViews', childLinkViews);
    });
  }
});
