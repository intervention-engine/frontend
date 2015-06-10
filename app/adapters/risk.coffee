`import DS from 'ember-data'`
`import ApplicationAdapter from './application'`

RiskAdapter = ApplicationAdapter.extend(
  buildURL: (modelName, id, snapshot, requestType, query) ->
    # TODO Figure out a method of specifying the risk model to use.
    return this.urlPrefix() + "/Patient?_query=risk&MedicationStatement=count&MedicationStatementWeight=1&Condition=count&ConditionWeight=1&min=5"
)

`export default RiskAdapter`
