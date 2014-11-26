App.FiltersNewRoute = Em.Route.extend
  model: ->
    @store.createRecord('filter')

  actions:
    updateFilter: (data) ->
      # debugger
      @controller.get('params').pushObject(data)
      console.log @controller.get('params')
      # @currentModel.get("params").addObject(@store.createRecord("param", {id: Em.generateGuid({}, "param"), template: data}))
App.FiltersNewController = Em.Controller.extend
  params: (-> Em.A()).property()
