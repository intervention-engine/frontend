import Ember from 'ember';

export default Ember.Component.extend({
  filterName: null,
  group: null,
  panes: null,

  hasFilterPane: Ember.computed.gt('panes.length', 0),

  patientAgeObject: { type: 'age-filter' },
  patientGenderObject: { type: 'gender-filter' },
  conditionObject: { type: 'condition-code-filter' },
  encounterObject: { type: 'encounter-code-filter' },

  canAddAgeFilter: Ember.computed('panes.@each.type', function() {
    return !this.get('panes').mapBy('type').contains('age-filter');
  }),

  canAddGenderFilter: Ember.computed('panes.@each.type', function() {
    return !this.get('panes').mapBy('type').contains('gender-filter');
  }),

  init() {
    this.set('panes', Ember.A());
    this._super(...arguments);
  },

  actions: {
    saveFilter: function() {
      this.get('group').set("name", this.get('filterName') || Ember.generateGuid({}, "Population "));
      this.get('group').save().then(() => {
        this.transitionTo("filters.index");
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
