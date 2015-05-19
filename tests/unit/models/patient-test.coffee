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
   'model:dosage', 'model:medication', 'model:accomodation', 'model:event']
  setup: ->
    server = new Pretender ->
      @get '/Patient/', (request) ->
        all =  JSON.stringify({
          resourceType: 'Bundle',
          entry: [{content: {id: 1, Name: [{ Family: ["A"], Given: ["BH_Adult"]}]}}]
        })
        [200, {"Content-Type": "application/json"}, all]
      @get '/Patient/1', (request) ->
        all =  JSON.stringify({
          id: 1,
          Name: [{ Family: ["A"], Given: ["BH_Adult"]}],
          Gender: {Coding: [{System: "http://hl7.org/fhir/v3/AdministrativeGender", Code: "M"}]},
          BirthDate: "1969-12-31"
        })
        [200, {"Content-Type": "application/json"}, all]
      @get '/Patient/2', (request) ->
        all =  JSON.stringify({id: 2, Name: [{ Family: ["B"], Given: ["BH_Adult"]}]})
        [200, {"Content-Type": "application/json"}, all]
      @get '/Encounter', (request) ->
        switch request.queryParams['subject:Patient']
          when "1"
            all =  JSON.stringify({
              resourceType: 'Bundle',
              entry: [
                {
                  content: {id: 1, Type: [{Coding: [{System: "http://www.ama-assn.org/go/cpt", Code: "99221"}], Text: "Inpatient Encounter"}],
                  Period: {Start: "2012-10-01T08:00:00-04:00", End: "2012-10-01T09:00:00-04:00"}}
                },
                {
                  content: {id: 2, Type: [{Coding: [{System: "http://www.ama-assn.org/go/cpt", Code: "99221"}], Text: "Inpatient Readmission Encounter"}],
                  Period: {Start: "2012-10-03T08:00:00-04:00", End: "2012-10-03T09:00:00-04:00"}}
                },
                {
                  content: {id: 3, Type: [{Coding: [{System: "http://www.ama-assn.org/go/cpt", Code: "99201"}], Text: "Outpatient Office Visit"}],
                  Period: {Start: "2012-10-03T08:00:00-04:00", End: "2012-10-03T09:00:00-04:00"}}
                }
              ]
              })
          when "2"
            all = JSON.stringify({
              resourceType: "Bundle"
              entry: []
            })
        [200, {"Content-Type": "application/json"}, all]
      @get '/Condition', (request) ->
        switch request.queryParams['subject:Patient']
          when "1"
            all =  JSON.stringify({
              resourceType: 'Bundle',
              entry: [
                {
                  content: {
                    id: 1
                    Code: [{Coding: [{System: "http://hl7.org/fhir/sid/icd-9", Code: "305.00"}], Text: "Diagnosis, Active: Alcohol and Drug Dependence"}]
                    OnsetDate: "2012-10-03T08:00:00-04:00"
                  }
                },
                {
                  content: {
                    id: 2
                    Code: [{Coding: [{System: "http://hl7.org/fhir/sid/icd-9", Code: "305.00"}], Text: "Diagnosis, Active: Alcohol and Drug Dependence"}]
                    OnsetDate: "2012-10-03T08:00:00-04:00",
                    AbatementDate: "2012-11-03T08:00:00-04:00"
                  }
                }
              ]
              })
        [200, {"Content-Type": "application/json"}, all]


      @get '/MedicationStatement', (request) ->
        switch request.queryParams['patient:Patient']
          when "1"
            all =  JSON.stringify({
              resourceType: 'Bundle',
              entry: [
                {
                  content: {
                    id: 1
                    WhenGiven: {Start: "2012-10-03T08:00:00-04:00", End: "2012-10-03T09:00:00-04:00"}
                  }
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
      equal ia.get('length'), 2, 'Two inpatient encounters are returned'

test 'readmissions', ->
  store = @store()
  patient = null
  admissions = null
  Ember.run ->
    patient = store.find('patient', 1)
  patient.then ->
    patient.get('encounters').then ->
      readmissions = patient.get('readmissions')
      equal readmissions, 1, '1 readmission'

test 'readmissions empty', ->
  store = @store()
  patient = null
  admissions = null
  Ember.run ->
    patient = store.find('patient', 2)
  patient.then ->
    patient.get('encounters').then ->
      readmissions = patient.get('readmissions')
      equal readmissions, 0, '0 readmissions'

test 'inpatientAdmissions empty', ->
  store = @store()
  patient = null
  admissions = null
  Ember.run ->
    patient = store.find('patient', 2)
  patient.then ->
    patient.get('encounters').then ->
      ia = patient.get('inpatientAdmissions')
      equal ia.get('length'), 0, '0 Inpatient Admissions are returned'

test 'conditions load', ->
  store = @store()
  patient = null
  admissions = null
  Ember.run ->
    patient = store.find('patient', 1)
  patient.then ->
    patient.get('conditions').then ->
      equal patient.get('conditions.length'), 2

test 'medications load', ->
  store = @store()
  patient = null
  admissions = null
  Ember.run ->
    patient = store.find('patient', 1)
  patient.then ->
    patient.get('medications').then ->
      equal patient.get('medications.length'), 1

test 'active conditions', ->
  store = @store()
  patient = null
  admissions = null
  Ember.run ->
    patient = store.find('patient', 1)
  patient.then ->
    patient.get('conditions').then ->
      equal patient.get('conditions.length'), 2
      equal patient.get('activeConditions.length'), 1

test 'categoryDisplay data is correct', ->
  store = @store()
  patient = null
  admissions = null
  Ember.run ->
    patient = store.find('patient', 1)
  patient.then ->
    Ember.RSVP.allSettled([
        patient.get('conditions'),
        patient.get('medications'),
        patient.get('encounters')
      ]).then ->
      wheel = patient.get('categoryDisplay')
      equal wheel.filterBy('name', 'conditions')?[0].risk, 2
      equal wheel.filterBy('name', 'medications')?[0].risk, 1
      equal wheel.filterBy('name', 'inpatientAdmissions')?[0].risk, 2
      equal wheel.filterBy('name', 'readmissions')?[0].risk, 1

test 'computedRisk is correct', ->
  store = @store()
  patient = null
  admissions = null
  Ember.run ->
    patient = store.find('patient', 1)
  patient.then ->
    Ember.RSVP.allSettled([
        patient.get('conditions'),
        patient.get('medications'),
        patient.get('encounters')
      ]).then ->
      equal patient.get('computedRisk'), 2

test 'computedGender is correct for males', ->
  store = @store()
  patient = null
  admissions = null
  Ember.run ->
    patient = store.find('patient', 1)
  patient.then ->
    equal patient.get('computedGender'), "male"

test 'computedGender is correct for other', ->
  store = @store()
  patient = null
  admissions = null
  Ember.run ->
    patient = store.find('patient', 2)
  patient.then ->
    equal patient.get('computedGender'), "other"

test 'computedAge is correct', ->
  store = @store()
  patient = null
  admissions = null
  Ember.run ->
    patient = store.find('patient', 1)
  patient.then ->
    # We're doing this so that this test doesn't break when the patient gets older
    computedAge = moment.duration({to: moment(), from: moment(patient.get('birthDate'))}).years()
    equal patient.get('computedAge'), computedAge

test 'risk calculation is correct', ->
  store = @store()
  patient = null
  Ember.run ->
    patient = store.find('patient', 1)
  patient.then ->
    Ember.RSVP.allSettled([
        patient.get('conditions'),
        patient.get('medications')
    ]).then ->
      events = patient.get('events')
      risks = patient.get('risks')
      equal risks.length, 6
