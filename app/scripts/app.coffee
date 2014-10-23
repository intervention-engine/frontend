App = window.App = Ember.Application.create()


App.ApplicationSerializer = DS.RESTSerializer.extend DS.EmbeddedRecordsMixin,

  keyForAttribute: (key, relationship) ->
    return Ember.String.capitalize(key)

  extract: (store, type, payload, id, requestType) ->
    normalizedPayload = {}
    normalizedPayload[Ember.String.pluralize(Ember.String.camelize(type.toString().split(".")[1]))] = payload
    @_super(store, type, normalizedPayload, id, requestType)

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
