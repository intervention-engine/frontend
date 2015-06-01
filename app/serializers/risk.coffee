`import ApplicationSerializer from './application'`

RiskSerializer = ApplicationSerializer.extend(
  normalize: (type, hash, prop) ->
    newHash = {patient: hash.Id, risk:hash.Value.Risk}
    @_super(type, newHash, prop)
)

`export default RiskSerializer`
