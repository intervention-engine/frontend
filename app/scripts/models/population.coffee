App.Population = DS.Model.extend
  filters: DS.hasMany('filter')


App.Filter = DS.Model.extend
  type: DS.attr("string")
