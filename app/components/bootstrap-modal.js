import Ember from 'ember';
import trueNullProperty from '../utils/true-null-property';

export default Ember.Component.extend({
  classNames: ['modal'],
  classNameBindings: ['fade'],
  fade: false,
  title: null,
  okBtnTitle: 'Close',
  submitBtnTitle: null,
  formClass: '',
  submitBtnClass: 'btn-primary',
  disableSubmitBtn: false,
  submitBtnDisabled: trueNullProperty('disableSubmitBtn'),
  displaySubmitBtn: Ember.computed.notEmpty('submitBtnTitle'),
  displayCloseBtn: Ember.computed.notEmpty('okBtnTitle'),

  _setup: Ember.on('didInsertElement', function() {
    this.$().modal().one('hidden.bs.modal', (function(_this) {
      return function() {
        _this.sendAction('close');
      };
    })(this));
  }),

  actions: {
    close: function() {
      this.$().modal('hide');
    },

    submit: function() {
      this.sendAction('submit');
    }
  }
});
