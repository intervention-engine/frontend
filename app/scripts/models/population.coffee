App.Filter = DS.Model.extend
  params: DS.hasMany('param')


App.Param = DS.Model.extend
  template: DS.attr("string")
