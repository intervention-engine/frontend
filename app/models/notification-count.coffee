`import DS from 'ember-data'`

NotificationCount = DS.Model.extend(
  patient: DS.belongsTo('patient', async:true, inverse:'notificationCount')
  count: DS.attr('number')
)

`export default NotificationCount`
