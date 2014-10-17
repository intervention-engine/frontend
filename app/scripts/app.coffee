App = window.App = Ember.Application.create()

App.IndexController = Ember.ArrayController.extend
  data: []

  actions:
    modelData: (modelName) ->
      modelData = []
      App[modelName].eachAttribute (name, meta) -> modelData.push name
      
      @set('data', modelData)



App.ApplicationSerializer = DS.RESTSerializer.extend DS.EmbeddedRecordsMixin,

  normalize: (type, hash, prop) ->
    # Because FHIR resources have embedded stuff without IDs we're going to generate them
    hash.id ?= Em.generateGuid({}, type)
    @_super(type, hash, prop)

# Order and include as you please.
require 'scripts/controllers/*'
require 'scripts/store'
require 'scripts/models/*'
require 'scripts/routes/*'
require 'scripts/components/*'
require 'scripts/views/*'
require 'scripts/router'
