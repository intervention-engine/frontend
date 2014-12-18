App.Pane = DS.Model.extend
  icon: DS.attr("string", {defaultValue: "fa-user"})
  items: DS.hasMany('emberItems')



App.PaneSerializer = App.ApplicationSerializer.extend
    attrs:
        items : {embedded: 'always'}
