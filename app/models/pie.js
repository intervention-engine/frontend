import Ember from 'ember';
import DS from 'ember-data';

let Pie = DS.Model.extend({
  slices: DS.hasMany('slices', {embedded: true})
})

export default Pie;