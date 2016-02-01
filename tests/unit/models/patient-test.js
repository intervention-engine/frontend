import { moduleForModel, test } from 'ember-qunit';
import run from 'ember-runloop';
import moment from 'moment';

moduleForModel('patient', 'Unit | Model | patient', {
  // Specify the other units that are required for this test.
  needs: [
    'adapter:application', 'serializer:application','model:identifier',
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
    'model:risk-assessment-prediction-component',
    'service:session'
  ]
});

test('fullName', function(assert) {
  let store = this.store();

  run(() => {
    let patient = store.createRecord('patient', {});
    patient.get('name').pushObject(store.createRecord('human-name', {
      'use': 'official',
      'family': ['Donald'],
      'given': ['Duck']
    }));

    assert.equal(patient.get('fullName'), 'Donald, Duck', 'Full name is correct');
  });
});

test('computedGender is correct for males', function(assert) {
  let patient = this.subject({
    'gender': 'male'
  });
  assert.equal(patient.get('computedGender'), 'Male');
});

test('computedGender is correct for females', function(assert) {
  let patient = this.subject({
    'gender': 'female'
  });
  assert.equal(patient.get('computedGender'), 'Female');
});

test('computedAge is correct', function(assert) {
  let patient = this.subject({
    'birthDate': '6/9/1934'
  });

  let computedAge = moment.duration({
    to: moment(),
    from: moment(patient.get('birthDate'))
  }).years();

  assert.equal(patient.get('computedAge'), computedAge);
});

test('inpatientAdmissions empty', function(assert) {
  let store = this.store();

  run(() => {
    let patient = store.createRecord('patient', {});
    let encounter = store.createRecord('encounter', {});
    let codeableConcept = store.createRecord('codeable-concept', {});
    let coding = store.createRecord('coding', {
      'system': 'http://www.ama-assn.org/go/cpt',
      'code': '99201',
      'display': 'Outpatient Encounter'
    });

    codeableConcept.get('coding').pushObject(coding);
    encounter.get('type').pushObject(codeableConcept);
    patient.get('encounters').pushObject(encounter);

    assert.equal(patient.get('inpatientAdmissions.length'), 0, '0 Inpatient Admissions are returned');
  });
});

test('correctly computes inpatient admissions', function(assert) {
  let store = this.store();

  run(() => {
    let patient = store.createRecord('patient', {});
    let encounter = store.createRecord('encounter', {});
    let codeableConcept = store.createRecord('codeable-concept', {});
    let coding = store.createRecord('coding', {
      'system': 'http://www.ama-assn.org/go/cpt',
      'code': '99221',
      'display': 'Inpatient Encounter'
    });

    codeableConcept.get('coding').pushObject(coding);
    encounter.get('type').pushObject(codeableConcept);
    patient.get('encounters').pushObject(encounter);

    let ia = patient.get('inpatientAdmissions');
    assert.equal(ia.get('length'), 1, 'One inpatient encounters are returned');
  });
});

test('correctly identify active conditions', function(assert) {
  let store = this.store();

  run(() => {
    let patient = store.createRecord('patient', {});
    let condition = store.createRecord('condition', {});
    let codeableConcept = store.createRecord('codeable-concept', {});
    let coding = store.createRecord('coding', {
      'system': 'http://hl7.org/fhir/sid/icd-9',
      'code': '305.00',
      'text': 'Diagnosis, Active: Alcohol and Drug Dependence'
    });

    codeableConcept.get('coding').pushObject(coding);
    condition.set('code', codeableConcept);
    condition.set('onsetDate', '2012-10-03T08:00:00-04:00');
    condition.set('verificationStatus', 'confirmed');
    patient.get('conditions').pushObject(condition);

    condition = store.createRecord('condition', {});
    codeableConcept = store.createRecord('codeable-concept', {});
    coding = store.createRecord('coding', {
      'system': 'http://hl7.org/fhir/sid/icd-9',
      'code': '305.00',
      'text': 'Diagnosis, Active: Alcohol and Drug Dependence'
    });

    codeableConcept.get('coding').pushObject(coding);
    condition.set('code', codeableConcept);
    condition.set('onsetDate', '2012-10-03T08:00:00-04:00');
    condition.set('abatementDateTime', '2013-10-03T08:00:00-04:00');
    condition.set('verificationStatus', 'confirmed');
    patient.get('conditions').pushObject(condition);

    assert.equal(patient.get('conditions.length'), 2);
    assert.equal(patient.get('activeConditions.length'), 1);
  });
});
