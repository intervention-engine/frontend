import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent("patient-summary", {
  needs: ['model:identifier',
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
        'model:reference',
        'model:patient',
        'model:risk-assessment',
        'model:risk-assessment-prediction-component',
        'model:encounter-status-history-component',
        'model:pie',
        'model:slice'
      ]
});

test("risksWithBirthdayStart should add a risk assessment at birth", function(assert){
  let component = this.subject();
  let store = this.container.lookup('store:main');

  Ember.run(function(){
    let patient = store.createRecord('patient', {birthDate: new Date('2000-01-01')});
    let risk = store.createRecord('risk-assessment', {date: new Date('2010-01-01')});
    let riskCode = store.createRecord("codeable-concept", {text: "Stroke"});
    let rapc = store.createRecord("risk-assessment-prediction-component", {probabilityDecimal: 3.0});
    rapc.set('outcome', riskCode);
    risk.get('prediction').pushObject(rapc);
    patient.get('risks').pushObject(risk);
    component.set('patient', patient);
    component.set('currentAssessment', 'Stroke');
    assert.equal(patient.get("risks.length"), 1);
    let rwbs = component.get("risksWithBirthdayStart");
    assert.equal(rwbs.get('length'), 2);
  });
});
