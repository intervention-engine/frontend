`import { test, moduleForModel} from 'ember-qunit'`

moduleForModel 'patient', 'Patient', {
  # Specify the other units that are required for this test.
  needs: ['adapter:application', 'serializer:application','model:identifier',
        'serializer:patient',
        'model:human-name',
        'model:contact-point',
        'model:address',
        'model:codeable-concept',
        'model:attachment',
        'model:patient-contact-component',
        'model:patient-animal-component',
        'model:patient-communication-component',
        'model:patient-link-component',
        'model:period',
        'model:coding',
        'model:encounter',
        'model:encounter-participant-component',
        'model:quantity',
        'model:encounter-hospitalization-component',
        'model:encounter-location-component',
        'model:condition',
        'model:condition-stage-component',
        'model:condition-evidence-component',
        'model:condition-location-component',
        'model:condition-due-to-component',
        'model:condition-occurred-following-component',
        'model:medication-statement',
        'model:medication-statement-dosage-component',
        'model:notification-count',
        'model:range',
        'model:appointment',
        'model:appointment-participant-component',
        'model:risk-assessment',
        'model:reference',
        'model:encounter-status-history-component',
        'model:pie',
        'model:risk-assessment-prediction-component'
      ]
}

test 'fullName', ->
  store = @store()
  patient = null
  Ember.run ->
    patient = store.createRecord('patient', {})
    patient.get('name').pushObject(store.createRecord('human-name',   {
        "use": "official",
        "family": [
          "Donald"
        ],
        "given": [
          "Duck"
        ]
      }))
    equal patient.get('fullName'), 'Donald, Duck', 'Full name is correct'


test 'computedGender is correct for males', ->
  patient = @subject({'gender':'male'})
  equal patient.get('computedGender'), "Male"

test 'computedGender is correct for females', ->
  patient = @subject({'gender':'female'})
  equal patient.get('computedGender'), "Female"

test 'computedAge is correct', ->
  patient = @subject({'birthDate':'6/9/1934'})
  computedAge = moment.duration({to: moment(), from: moment(patient.get('birthDate'))}).years()
  equal patient.get('computedAge'), computedAge

test 'inpatientAdmissions empty', ->
  store = @store()
  patient = null
  admissions = null
  Ember.run ->
    patient = store.createRecord('patient', {})
    # Create an Inpatient Admission
    encounter = store.createRecord('encounter', {})
    codeableConcept = store.createRecord('codeable-concept', {})
    coding = store.createRecord('coding', {
      "system": "http://www.ama-assn.org/go/cpt",
      "code": "99201",
      "display": "Outpatient Encounter"
    })
    codeableConcept.get('coding').pushObject(coding)
    encounter.get('type').pushObject(codeableConcept)
    patient.get('encounters').pushObject(encounter)

    equal patient.get('inpatientAdmissions.length'), 0, '0 Inpatient Admissions are returned'

test 'correctly computes inpatient admissions', ->
  store = @store()
  patient = null
  admissions = null
  Ember.run ->
    patient = store.createRecord('patient', {})
    # Create an Inpatient Admission
    encounter = store.createRecord('encounter', {})
    codeableConcept = store.createRecord('codeable-concept', {})
    coding = store.createRecord('coding', {
      "system": "http://www.ama-assn.org/go/cpt",
      "code": "99221",
      "display": "Inpatient Encounter"
    })
    codeableConcept.get('coding').pushObject(coding)
    encounter.get('type').pushObject(codeableConcept)
    patient.get('encounters').pushObject(encounter)

    ia = patient.get('inpatientAdmissions')
    equal ia.get('length'), 1, 'One inpatient encounters are returned'

test 'correctly identify active conditions', ->
  store = @store()
  patient = null
  Ember.run ->
    patient = store.createRecord('patient', {})
    # Create an Inpatient Admission
    condition = store.createRecord('condition', {})
    codeableConcept = store.createRecord('codeable-concept', {})
    coding = store.createRecord('coding', {
      "system": "http://hl7.org/fhir/sid/icd-9",
      "code": "305.00",
      "text": "Diagnosis, Active: Alcohol and Drug Dependence"
    })
    codeableConcept.get('coding').pushObject(coding)
    condition.set('code', codeableConcept)
    condition.set("onsetDate", "2012-10-03T08:00:00-04:00")
    patient.get('conditions').pushObject(condition)

    condition = store.createRecord('condition', {})
    codeableConcept = store.createRecord('codeable-concept', {})
    coding = store.createRecord('coding', {
      "system": "http://hl7.org/fhir/sid/icd-9",
      "code": "305.00",
      "text": "Diagnosis, Active: Alcohol and Drug Dependence"
    })
    codeableConcept.get('coding').pushObject(coding)
    condition.set('code', codeableConcept)
    condition.set("onsetDate", "2012-10-03T08:00:00-04:00")
    condition.set("abatementDate", "2013-10-03T08:00:00-04:00")
    patient.get('conditions').pushObject(condition)

    equal patient.get('conditions.length'), 2
    equal patient.get('activeConditions.length'), 1

#
# test 'notification count is correct', ->
#   store = @store()
#   patient = null
#   Ember.run ->
#     store.findAll('notificationCount')
#     patient = store.find('patient', 1)
#   patient.then ->
#     Ember.RSVP.allSettled([
#         patient.get('notificationCount'),
#     ]).then ->
#       hasNotifications = patient.get('hasNotifications')
#       notificationCount = patient.get('notificationCount').get("count")
#       equal hasNotifications, true
#       equal notificationCount, 7
