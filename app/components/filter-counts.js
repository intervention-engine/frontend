import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['filter-counts', 'col-sm-8'],

  patientCount: 0,
  conditionCount: 0,
  encounterCount: 0,
  timeSpan: 'year',
  group: null,
  loading: false,

  characteristics: Ember.computed.reads('group.characteristic'),

  _updateCountsObserver: Ember.observer('characteristics.@each.countableRollup', function() {
    Ember.run.debounce(this, this._updateCounts, 150);
  }).on('init'),

  _updateCounts() {
    if (this.isDestroyed) {
      return;
    }

    this.set('loading', true);

    let group = this.get('group');

    let request = Ember.$.post("/InstaCountAll", JSON.stringify(group ? group.serialize() : {}));
    request.then((res) => {
      let response = JSON.parse(res);
      this.set('patientCount', response.patients);
      this.set('conditionCount', response.conditions);
      this.set('encounterCount', response.encounters);
      this.set('loading', false);
    }, () => {
      this.set('patientCount', 0);
      this.set('conditionCount', 0);
      this.set('encounterCount', 0);
      this.set('loading', false);
    });
  }
});
