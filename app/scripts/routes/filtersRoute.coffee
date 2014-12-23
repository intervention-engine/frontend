App.FiltersNewRoute = Em.Route.extend
  model: ->
    @store.createRecord('filter')

  actions:
    saveFilter: ->

      @currentModel.buildQuery()
      # @currentModel.set("query", @store.createRecord("query"))
      # for pane in panes
      #   params = pane.toParams()
      #   for param in params
      #     p = @store.createRecord("extension", param)
      #     @currentModel.get("query.parameter").pushRecord(p)
      console.log JSON.stringify(@currentModel.serialize())
      @currentModel.save()
      @transitionTo("filters.index")



    addPane: (pane) ->
      switch pane
        when "patient"
          newPane = @store.createRecord("pane", {id: Em.generateGuid({},"pane")})
          ageParam = @store.createRecord("extension", {id: Em.generateGuid({}, "extension"), url: "http://interventionengine.org/patientage", valueRange: {low: {value:0}, high: {value:18}}})
          ageFilter = @store.createRecord("emberItem", {id: Em.generateGuid({},"emberItem"), parameter: ageParam, template:"partials/_ageFilter"})
          genderParam = @store.createRecord("extension", {id: Em.generateGuid({}, "extension"), url: "http://interventionengine.org/patientgender", valueString: "M"})
          genderFilter = @store.createRecord("emberItem", {id: Em.generateGuid({},"emberItem"), parameter: genderParam, template:"partials/_genderFilter"})
          newPane.get('items').pushObjects([genderFilter])
          @currentModel.get('panes').pushObject(newPane)
        when "encounter"
          newPane = @store.createRecord("pane", {id: Em.generateGuid({},"pane"), icon:"fa-stethoscope"})
          codeFilter = @store.createRecord("emberItem", {id: Em.generateGuid({},"emberItem"), template:"partials/_codeFilter"})
          newPane.get('items').pushObjects([codeFilter])
          @currentModel.get('panes').pushObject(newPane)
        when "condition"
          newPane = @store.createRecord("pane", {id: Em.generateGuid({},"pane"), icon:"icon-med-clipboard"})
          codeFilter = @store.createRecord("emberItem", {id: Em.generateGuid({},"emberItem"), template:"partials/_codeFilter"})
          newPane.get('items').pushObjects([codeFilter])
          @currentModel.get('panes').pushObject(newPane)

        else
          return


# App.FiltersNewController = Em.Controller.extend
#   filters: (-> Em.A()).property()

App.FiltersShowRoute = Em.Route.extend
  model: (params) ->
    @store.find('filter', params.id)
  actions:
    saveFilter: ->

      @currentModel.buildQuery()
      @currentModel.save()
      @transitionTo("filters.index")
    addPane: (pane) ->
      switch pane
        when "patient"
          newPane = @store.createRecord("pane", {id: Em.generateGuid({},"pane")})
          ageParam = @store.createRecord("extension", {id: Em.generateGuid({}, "extension"), url: "http://interventionengine.org/patientage", value: 18})
          ageFilter = @store.createRecord("emberItem", {id: Em.generateGuid({},"emberItem"), parameter: ageParam, template:"partials/_ageFilter"})
          genderParam = @store.createRecord("extension", {id: Em.generateGuid({}, "extension"), url: "http://interventionengine.org/patientgender", valueString: "M"})
          genderFilter = @store.createRecord("emberItem", {id: Em.generateGuid({},"emberItem"), parameter: genderParam, template:"partials/_genderFilter"})
          newPane.get('items').pushObjects([genderFilter])
          @currentModel.get('panes').pushObject(newPane)
        when "encounter"
          newPane = @store.createRecord("pane", {id: Em.generateGuid({},"pane"), icon:"fa-stethoscope"})
          codeFilter = @store.createRecord("emberItem", {id: Em.generateGuid({},"emberItem"), template:"partials/_codeFilter"})
          newPane.get('items').pushObjects([codeFilter])
          @currentModel.get('panes').pushObject(newPane)
        when "condition"
          newPane = @store.createRecord("pane", {id: Em.generateGuid({},"pane"), icon:"icon-med-clipboard"})
          codeFilter = @store.createRecord("emberItem", {id: Em.generateGuid({},"emberItem"), template:"partials/_codeFilter"})
          newPane.get('items').pushObjects([codeFilter])
          @currentModel.get('panes').pushObject(newPane)

        else
          return



App.FiltersIndexRoute = Em.Route.extend
  model: ->
    @store.findAll("filter")#.filterBy("isNew", false)
