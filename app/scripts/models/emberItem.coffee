App.EmberItem = DS.Model.extend
  parameter: DS.belongsTo("extension")
  active: DS.attr("boolean", { defaultValue: false })
  filterType: DS.attr()
  template: DS.attr()

App.EmberItemSerializer = App.ApplicationSerializer.extend
  attrs:
    parameter: {embedded: 'always'}
