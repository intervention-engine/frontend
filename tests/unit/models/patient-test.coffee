`import { test, moduleForModel} from 'ember-qunit'`
`import patient_1_encounters from '../../fixtures/encounters/patient1'`
`import patient_1 from '../../fixtures/patients/patient1'`
`import Pretender from 'pretender'`

server = null
testData = {}


moduleForModel 'patient', 'Patient', {
  # Specify the other units that are required for this test.
  needs: ['adapter:application', 'serializer:application','model:identifier',
        'model:human-name',
        'model:contact-point',
        'model:address',
        'model:codeable-concept',
        'model:attachment',
        'model:patient-contact-component',
        'model:patient-animal-component',
        'model:patient-communication-component',
        'model:reference',
        'model:reference',
        'model:patient-link-component',
        'model:period',
        'model:coding',
        'model:encounter',
        'model:encounter-status-history-component',
        'model:encounter-participant-component',
        'model:quantity',
        'model:encounter-hospitalization-component',
        'model:encounter-location-component'
      ]
  setup: ->
    # Because for some reason QUnit doesn't seem to let you access variables unless they are set in here...
    testData = {};
    testData['patient_1'] = patient_1
    testData['patient_1_encounters'] = patient_1_encounters
    server = new Pretender ->
      @get '/Patient/', (request) ->
        all =  JSON.stringify({
          resourceType: 'Bundle',
          entry: [{content: {id: 1, Name: [{ Family: ["A"], Given: ["BH_Adult"]}]}}]
        })
        [200, {"Content-Type": "application/json"}, all]
      @get '/Patient/1', (request) ->
        all =  JSON.stringify(testData.patient_1)
        [200, {"Content-Type": "application/json"}, all]
      @get '/Patient/2', (request) ->
        all =  JSON.stringify({id: 2, Name: [{ Family: ["B"], Given: ["BH_Adult"]}]})
        [200, {"Content-Type": "application/json"}, all]
      @get '/Encounter', (request) ->
        switch request.queryParams['patient:Patient']
          when "1"
            all = JSON.stringify(testData.patient_1_encounters)
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
      @get '/Notification-count', (request) ->
        all =  JSON.stringify([
          { patient: "1", count: 7 },
          { patient: "2", count: 3 }
        ])
        [200, {"Content-Type": "application/json"}, all]
}

test 'fullName', ->
  store = @store()
  model = null
  Ember.run ->
    model = store.find('patient', 1)
  model.then ->
    equal model.get('fullName'), 'Donald, Duck', 'Full name is correct'

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


test 'notification count is correct', ->
  store = @store()
  patient = null
  Ember.run ->
    store.findAll('notificationCount')
    patient = store.find('patient', 1)
  patient.then ->
    Ember.RSVP.allSettled([
        patient.get('notificationCount'),
    ]).then ->
      hasNotifications = patient.get('hasNotifications')
      notificationCount = patient.get('notificationCount').get("count")
      equal hasNotifications, true
      equal notificationCount, 7
