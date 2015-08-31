import Ember from 'ember';
import $ from 'jquery';

const { isNone } = Ember;
const { SelectFx } = window;

export default Ember.Component.extend({
  tagName: 'span',
  placeholder: null,
  options: null,
  value: null,
  _selectFx: null,

  proxiedOptions: Ember.computed('options.[]', 'value', function() {
    let value = this.get('value');
    return this.get('options').map(function(currentValue) {
      return {
        value: currentValue,
        selected: value === currentValue ? true : null
      };
    });
  }),

  placeholderSelected: Ember.computed('placeholder', 'value', function() {
    if (isNone(this.get('value'))) {
      return true;
    }
    return null;
  }),

  _setup: Ember.on('didInsertElement', function() {
    let element = $(this.element).find('select')[0];
    this._selectFx = new SelectFx(element, {
      onChange: (value) => {
        this.sendAction('onChange', value);
      }
    });
  })
});
