`import DS from 'ember-data'`

ApplicationSerializer = DS.JSONSerializer.extend(DS.EmbeddedRecordsMixin,
  serializeIntoHash: (hash, type, record, options) ->
    Ember.merge(hash, this.serialize(record, options))

  keyForAttribute: (key, relationship) ->
    return Ember.String.capitalize(key)

  extract: (store, type, payload, id, requestType) ->
    return [] if payload == null
    if payload.resourceType == "Bundle"
      console.log "Bundle came in"
      payload = payload.entry || []
    payload.id ?= id || Em.generateGuid({}, type.typeKey)
    @_super(store, type, payload, id, requestType)

  normalize: (type, hash, prop) ->
    # console.log "#{type.typeKey} #{hash.id}"
    # Because FHIR resources have embedded stuff without IDs we're going to generate them
    if hash.content
      hash.content.id ?= hash.id ||hash.Identifier || Em.generateGuid({}, type.typeKey)
      @_super(type, hash.content, prop)
    else
      hash.id ?= hash.Identifier || Em.generateGuid({}, type.typeKey)
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
