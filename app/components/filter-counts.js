import Component from 'ember-component';
import computed from 'ember-computed';
import service from 'ember-service/inject';
import run from 'ember-runloop';

export default Component.extend({
  classNames: ['filter-counts'],

  ajax: service(),

  patientCount: 0,
  conditionCount: 0,
  encounterCount: 0,
  timeSpan: 'year',
  group: null,
  loading: false,

  _registeredParent: null,

  characteristics: computed.reads('group.characteristic'),

  init() {
    this._super(...arguments);

    run.scheduleOnce('actions', this, this._registerWithParent);
  },

  _registerWithParent() {
    let parent = this.get('parentView');
    parent.registerFilterCounts(this);
    this.set('_registeredParent', parent);
  },

  willDestroyElement() {
    let parent = this.get('_registeredParent');
    if (parent) {
      parent.unregisterFilterCounts(this);
    }
  },

  updateCounts() {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }

    this.set('loading', true);

    let group = this.get('group');

    let request = this.get('ajax').request('/InstaCountAll', {
      type: 'POST',
      data: JSON.stringify(group ? group.serialize() : {}),
      contentType: 'application/json'
    });

    request.then((res) => {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }

      this.set('patientCount', res.patients);
      this.set('conditionCount', res.conditions);
      this.set('encounterCount', res.encounters);
      this.set('loading', false);
    });

    request.catch(() => {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }

      this.set('patientCount', 0);
      this.set('conditionCount', 0);
      this.set('encounterCount', 0);
      this.set('loading', false);
    });
  }
});
