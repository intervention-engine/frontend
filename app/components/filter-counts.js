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

    let request = Ember.$.ajax({url: "/InstaCountAll",
                                type: "POST",
                                data: JSON.stringify(group ? group.serialize() : {}),
                                contentType: "application/json"});
    request.then((res) => {
      this.set('patientCount', res.patients);
      this.set('conditionCount', res.conditions);
      this.set('encounterCount', res.encounters);
      this.set('loading', false);
    }, () => {
      this.set('patientCount', 0);
      this.set('conditionCount', 0);
      this.set('encounterCount', 0);
      this.set('loading', false);
    });
  }
});
