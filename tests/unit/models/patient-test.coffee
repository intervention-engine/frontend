`import { test, moduleForModel} from 'ember-qunit'`
`import Pretender from 'pretender'`

server = null

moduleForModel 'patient', 'Patient', {
  # Specify the other units that are required for this test.
  needs: ['adapter:application', 'serializer:application',
   'serializer:patient', 'model:identifier', 'model:human-name',
   'model:contact-point', 'model:address',
   'model:codeable-concept', 'serializer:codeable-concept', 'model:attachment',
   'model:contact', 'model:animal', 'model:reference',
   'model:link', 'model:condition',
   'model:observation', 'model:encounter', 'serializer:encounter',
   'model:medicationStatement', 'model:period',
   'model:resource-reference', 'model:coding', 'serializer:coding',
   'model:location', 'model:quantity',
   'model:participant', 'model:hospitalization',
   'model:dosage', 'model:medication', 'model:accomodation']
  setup: ->
    server = new Pretender ->
      @get '/Patient/', (request) ->
        all =  JSON.stringify({
          resourceType: 'Bundle',
          entry: [{content: {id: 1, Name: [{ Family: ["A"], Given: ["BH_Adult"]}]}}]
        })
        [200, {"Content-Type": "application/json"}, all]
      @get '/Patient/1', (request) ->
        all =  JSON.stringify({id: 1, Name: [{ Family: ["A"], Given: ["BH_Adult"]}]})
        [200, {"Content-Type": "application/json"}, all]
      @get '/Encounter', (request) ->
        all =  JSON.stringify({
          resourceType: 'Bundle',
          entry: [
            {
              content: {id: 1, Type: [{Coding: [{System: "http://www.ama-assn.org/go/cpt", Code: "99221"}], Text: "Inpatient Encounter"}],
              Period: {Start: "2012-10-01T08:00:00-04:00", End: "2012-10-01T09:00:00-04:00"}}
            }
          ]
          })
        [200, {"Content-Type": "application/json"}, all]
}

test 'fullName', ->
  store = @store()
  model = null
  Ember.run ->
    model = store.find('patient', 1)
  model.then ->
    equal model.get('fullName'), 'A, BH_Adult', 'Full name is correct'

test 'inpatientAdmissions', ->
  store = @store()
  patient = null
  admissions = null
  Ember.run ->
    patient = store.find('patient', 1)
  patient.then ->
    patient.get('encounters').then ->
      ia = patient.get('inpatientAdmissions')
      equal ia.get('length'), 1, 'One inpatient encounter is returned'
