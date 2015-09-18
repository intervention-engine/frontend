import Ember from 'ember';
import DS from 'ember-data';

let Pie = DS.Model.extend({
  slices: DS.hasMany('slices', {embedded: true}),

  sliceArray: Ember.computed('slices.[]', function() {
    let maxWeight = Math.max.apply(Math, this.get('slices').mapBy('weight'));

    return this.get('slices').map(function(slice) {
      return {
        weight: slice.get('weight'),
        value: slice.get('value'),
        name: slice.get('name'),
        maxValue: slice.get('maxValue'),
        maxWeight
      };
    });
  })
});

export default Pie;
