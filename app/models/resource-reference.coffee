`import DS from 'ember-data'`

ResourceReference = DS.Model.extend {
  reference: DS.attr('string')
  display: DS.attr('string')
}

`export default ResourceReference`
