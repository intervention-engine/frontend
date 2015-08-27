import Ember from 'ember';
import DS from 'ember-data';

let Pie = DS.Model.extend({
  slices: DS.hasMany('slices', {embedded: true}),

  sliceArray: Ember.computed('slices', function() {
    return this.get('slices').map(function(slice) {
      return {weight: slice.get('weight'), value: slice.get('value'), name: slice.get('name'), maxValue: slice.get('maxValue')};
    });
  })
});

export default Pie;
