import Component from 'ember-component';
import computed from 'ember-computed';

export default Component.extend({
  tagName: 'i',
  attributeBindings: ['ariaHidden:aria-hidden'],
  classNames: ['form-control-feedback', 'form-control-feedback-clear'],
  classNameBindings: ['iconClassNames'],

  ariaHidden: true,
  errors: computed({
    get() {
      return [];
    }
  }),
  displayErrors: false,

  iconClassNames: computed('displayErrors', 'errors.length', function iconClassNames() {
    let classNames = [];
    if (this.get('errors').length === 0) {
      classNames.push('fa-check');
    } else if (this.get('displayErrors')) {
      classNames.push('fa-times');
    }

    if (classNames.length > 0) {
      classNames.unshift('fa');
    }

    return classNames.join(' ');
  }),

  errorMessages: computed('errors.[]', function errorMessages() {
    return this.get('errors').join('; ');
  }),

  didInsertElement() {
    this._super(...arguments);

    this.$().tooltip({
      container: document.body,
      placement: 'right',
      title: () => {
        if (!this.get('displayErrors')) {
          return '';
        }

        return this.get('errorMessages');
      }
    });
  },

  willDestroyElement() {
    this._super(...arguments);

    if (this.isDestroyed) {
      return;
    }

    this.$().tooltip('destroy');
  }
});
