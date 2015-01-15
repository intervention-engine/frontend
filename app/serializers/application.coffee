`import DS from 'ember-data'`

ApplicationSerializer = DS.JSONSerializer.extend(DS.EmbeddedRecordsMixin,
  serializeIntoHash: (hash, type, record, options) ->
    Ember.merge(hash, this.serialize(record, options))

  keyForAttribute: (key, relationship) ->
    return Ember.String.capitalize(key)

  extract: (store, type, payload, id, requestType) ->
    normalizedPayload = {}
  #   # Because the server returns NULL if no filters...
  #   # TODO Is this misbehavior on the server side?
  #   debugger
  #   return [] if payload == null
    normalizedPayload[Ember.String.pluralize(type.typeKey)] = payload.Entries||payload
    @_super(store, type, payload, id, requestType)

  normalize: (type, hash, prop) ->
    # Because FHIR resources have embedded stuff without IDs we're going to generate them
    hash.id ?= Em.generateGuid({}, type.typeKey)
    @_super(type, hash, prop)
  # serializeAttribute: (record, json, key, attribute) ->
    # Because of the way FHIR handles values we have to munge the JSON a little
    # if key =="value"
    #   value = record.get('value')
    #   switch typeof value
    #     when "string"
    #       json.valuestring = value
    #     when "number"
    #       json.value = value
    #     when "object"
    #       json.valuerange = value
    #   console.log json
    # else
      # @_super(record, json, key, attribute)
)

`export default ApplicationSerializer`