import Ember from 'ember';

const { computed, generateGuid } = Ember;

export default Ember.Component.extend({
  filterName: computed({
    get() {
      return this.get('group.name') || '';
    },

    set(key, newValue) {
      return newValue;
    }
  }),
  group: null,
  panes: null,

  hasFilterPane: computed.gt('panes.length', 0),

  patientAgeObject: { type: 'age-filter' },
  patientGenderObject: { type: 'gender-filter' },
  conditionObject: { type: 'condition-code-filter' },
  encounterObject: { type: 'encounter-code-filter' },

  canAddAgeFilter: computed('panes.@each.type', function() {
    return !this.get('panes').mapBy('type').contains('age-filter');
  }),

  canAddGenderFilter: computed('panes.@each.type', function() {
    return !this.get('panes').mapBy('type').contains('gender-filter');
  }),

  init() {
    this.set('panes', this.get('group.characteristic').map((characteristic) => {
      return { type: characteristic.get('filter'), characteristic };
    }));
    this._super(...arguments);
  },

  actions: {
    saveFilter: function() {
      this.set('group.name', this.get('filterName') || generateGuid({}, "Population "));
      this.get('group').save().then(() => {
        this.attrs.onSave();
      });
    },

    addPane: function(pane) {
      this.get('panes').addObject(Ember.Object.create(pane));
    },

    removePane: function(pane) {
      this.get('panes').removeObject(pane);
    }
  }
});
