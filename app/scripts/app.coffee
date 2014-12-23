App = window.App = Ember.Application.create()

App.ApplicationSerializer = DS.RESTSerializer.extend DS.EmbeddedRecordsMixin,
  serializeIntoHash: (hash, type, record, options) ->
    Ember.merge(hash, this.serialize(record, options))

  keyForAttribute: (key, relationship) ->
    return Ember.String.capitalize(key)

  extract: (store, type, payload, id, requestType) ->
    normalizedPayload = {}
    # Because the server returns NULL if no filters...
    # TODO Is this misbehavior on the server side?
    return [] if payload == null
    normalizedPayload[Ember.String.pluralize(Ember.String.camelize(type.toString().split(".")[1]))] = payload.Entries||payload
    @_super(store, type, normalizedPayload, id, requestType)

  normalize: (type, hash, prop) ->
    # Because FHIR resources have embedded stuff without IDs we're going to generate them
    hash.id ?= Em.generateGuid({}, type)
    @_super(type, hash, prop)
  serializeAttribute: (record, json, key, attribute) ->
    # Because of the way FHIR handles values we have to munge the JSON a little
    if key =="value"
      value = record.get('value')
      switch typeof value
        when "string"
          json.valuestring = value
        when "number"
          json.value = value
        when "object"
          json.valuerange = value
    else
      @_super(record, json, key, attribute)


# Order and include as you please.

require 'scripts/helpers'


require 'scripts/controllers/*'
require 'scripts/store'
require 'scripts/models/*'
require 'scripts/routes/*'
require 'scripts/components/*'
require 'scripts/views/*'
require 'scripts/router'
