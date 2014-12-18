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



    addPane: (pane) ->
      switch pane
        when "patient"
          newPane = @store.createRecord("pane", {id: Em.generateGuid({},"pane")})
          # ageFilter = @store.createRecord("emberItem", {id: Em.generateGuid({},"emberItem"), filterType: "Patient Age", template:"partials/_ageFilter"})
          genderParam = @store.createRecord("extension", {id: Em.generateGuid({}, "extension"), url: "http://interventionengine.org/patientgender", value: "M"})
          genderFilter = @store.createRecord("emberItem", {id: Em.generateGuid({},"emberItem"), parameter: genderParam, filterType: "Patient Gender", template:"partials/_genderFilter"})
          newPane.get('items').pushObjects([genderFilter])
          @currentModel.get('panes').pushObject(newPane)
        when "encounter"
          newPane = @store.createRecord("pane", {id: Em.generateGuid({},"pane"), icon:"fa-stethoscope"})
          codeFilter = @store.createRecord("emberItem", {id: Em.generateGuid({},"emberItem"), filterType: "Encounter Code", template:"partials/_codeFilter"})
          newPane.get('items').pushObjects([codeFilter])
          @currentModel.get('panes').pushObject(newPane)
        when "condition"
          newPane = @store.createRecord("pane", {id: Em.generateGuid({},"pane"), icon:"icon-med-clipboard"})
          codeFilter = @store.createRecord("emberItem", {id: Em.generateGuid({},"emberItem"), filterType: "Condition Code", template:"partials/_codeFilter"})
          newPane.get('items').pushObjects([codeFilter])
          @currentModel.get('panes').pushObject(newPane)

        else
          return


# App.FiltersNewController = Em.Controller.extend
#   filters: (-> Em.A()).property()
