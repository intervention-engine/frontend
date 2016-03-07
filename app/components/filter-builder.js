import Ember from 'ember';
import Component from 'ember-component';
import run from 'ember-runloop';
import service from 'ember-service/inject';

const { computed, generateGuid } = Ember;

export default Component.extend({
  routing: service('-routing'),

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

  _filterCounts: null,

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

  registerFilterCounts(filterCounts) {
    this.set('_filterCounts', filterCounts);
    filterCounts.updateCounts();
  },

  unregisterFilterCounts(filterCounts) {
    let currentFilterCounts = this.get('_filterCounts');
    if (currentFilterCounts === filterCounts) {
      this.set('_filterCounts', null);
    }
  },

  _updateCounts() {
    let filterCounts = this.get('_filterCounts');
    if (filterCounts) {
      filterCounts.updateCounts();
    }
  },

  actions: {
    saveFilter() {
      this.set('group.name', this.get('filterName') || generateGuid({}, 'Population '));
      this.get('group').save().then(() => {
        this.get('routing').transitionTo('patients.index');
      });
    },

    addPane(pane) {
      this.get('panes').addObject(Ember.Object.create(pane));
    },

    removePane(pane) {
      this.get('panes').removeObject(pane);
    },

    updateCounts() {
      run.later(this, this._updateCounts);
    }
  }
});
