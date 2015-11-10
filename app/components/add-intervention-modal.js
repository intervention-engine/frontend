import Ember from 'ember';
import trueNullProperty from 'ember-on-fhir/utils/true-null-property';

const { computed } = Ember;
const interventionTypes = [
  {'iconClassnames': 'fa fa-calendar', 'name': 'Schedule Appointment'},
  {'iconClassnames': 'fa fa-home', 'name': 'Home Visit'},
  {'iconClassnames': 'fa fa-phone', 'name': 'Phone Call'},
  {'iconClassnames': 'icon-medication', 'name': 'Medication'},
  {'iconClassnames': 'fa fa-cutlery', 'name': 'Diet'},
  {'iconClassnames': 'fa fa-heartbeat', 'name': 'Exercise'}
];

export default Ember.Component.extend({
  interventionTypes,

  _items: null,
  _selectedItem: null,

  init() {
    this._super(...arguments);
    this._items = new Ember.A();
  },

  hasNoSelectedItem: computed.empty('_selectedItem'),
  saveBtnDisabled: trueNullProperty('hasNoSelectedItem'),

  actions: {
    registerDetailItem(item) {
      this.get('_items').addObject(item);
    },

    expandItem(item) {
      let selectedItem = this.get('_selectedItem');

      if (selectedItem === item) {
        return;
      } else if (selectedItem) {
        selectedItem.slideUp();
      }

      this.set('_selectedItem', item);
      item.slideDown();
    },

    save() {
      let selectedItem = this.get('_selectedItem');
      if (!selectedItem) {
        return;
      }

      let intervention = selectedItem.get('intervention.name');
      let detail = selectedItem.get('detail');

      console.log('SAVE: intervention(%s), detail(%s)', intervention, detail);

      // TODO: create intervention here
      // `intervention` is the `name` attribute from above (e.g., "Home Visit")
      // `detail` is the text typed in the text area (can be empty)
    }
  }
});
