App.FiltersNewController = Em.Controller.extend({
  hasFilterPane: (->
    @get('model.panes.length') > 0
  ).property('model.panes.length')
})