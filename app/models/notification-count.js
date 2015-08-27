import DS from 'ember-data';

let NotificationCount = DS.Model.extend({
patient: DS.belongsTo('patient', {async:true, inverse:'notifications'}),
  count: DS.attr('number')
});

export default NotificationCount;
