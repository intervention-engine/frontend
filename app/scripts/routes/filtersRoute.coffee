App.FiltersNewRoute = Em.Route.extend
  model: ->
    @store.createRecord('filter')

  actions:
    saveFilter: ->

      @currentModel.buildQuery()
      @currentModel.save()
      @transitionTo("filters.index")



    addPane: (pane) ->
      App.AddFilterPane(@, pane)


# App.FiltersNewController = Em.Controller.extend
#   filters: (-> Em.A()).property()

App.FiltersShowRoute = Em.Route.extend
  model: (params) ->
    @store.find('filter', params.id)
  afterModel: (filter) ->
    query = DS.PromiseObject.create({promise: $.get(filter.get('url'))})
    query.then(() ->
      console.log query.content.Response.Total
      filter.set('results', query.content.Response.Total)
    )
  actions:
    saveFilter: ->
      @currentModel.buildQuery()
      @currentModel.save()
      @transitionTo("filters.index")

    addPane: (pane) ->
      App.AddFilterPane(@, pane)



App.FiltersIndexRoute = Em.Route.extend
  model: ->
    @store.findAll("filter")#.filterBy("isNew", false)


# Contains all the logic for adding a pane to the filter builder
App.AddFilterPane = (context, pane) ->
  switch pane
    when "patient"
      newPane = context.store.createRecord("pane", {id: Em.generateGuid({},"pane")})
      ageParam = context.store.createRecord("extension", {id: Em.generateGuid({}, "extension"), url: "http://interventionengine.org/patientage", value: 18})
      ageFilter = context.store.createRecord("emberItem", {id: Em.generateGuid({},"emberItem"), parameter: ageParam, template:"partials/_ageFilter"})
      genderParam = context.store.createRecord("extension", {id: Em.generateGuid({}, "extension"), url: "http://interventionengine.org/patientgender", valueString: "M"})
      genderFilter = context.store.createRecord("emberItem", {id: Em.generateGuid({},"emberItem"), parameter: genderParam, template:"partials/_genderFilter"})
      newPane.get('items').pushObjects([genderFilter])
      context.currentModel.get('panes').pushObject(newPane)
    when "encounter"
      newPane = context.store.createRecord("pane", {id: Em.generateGuid({},"pane"), icon:"fa-stethoscope"})
      codeParam = context.store.createRecord("extension", {id: Em.generateGuid({}, "extension"), url: "http://interventionengine.org/encounterCode"})
      codeFilter = context.store.createRecord("emberItem", {id: Em.generateGuid({},"emberItem"), parameter: codeParam, template:"partials/_encounterCodeFilter"})
      newPane.get('items').pushObjects([codeFilter])
      context.currentModel.get('panes').pushObject(newPane)
    when "condition"
      newPane = context.store.createRecord("pane", {id: Em.generateGuid({},"pane"), icon:"icon-med-clipboard"})
      codeFilter = context.store.createRecord("emberItem", {id: Em.generateGuid({},"emberItem"), template:"partials/_conditionCodeFilter"})
      newPane.get('items').pushObjects([codeFilter])
      context.currentModel.get('panes').pushObject(newPane)

    else
      return
