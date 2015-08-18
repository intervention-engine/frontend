import Ember from 'ember';
import DS from 'ember-data';
import Patient from 'ember-fhir-adapter/models/patient';

let IEPatient = Patient.extend({
  encounters: DS.hasMany('encounter', {"async": true}),
  conditions: DS.hasMany('condition', {"async": true}),
  medications: DS.hasMany('medicationStatement', {"async": true}),
  appointments: DS.hasMany('appointment', {"async": true}),
  risks: DS.hasMany('riskAssessment', {"async": true}),
  notifications: DS.belongsTo('notificationCount', {"async": true, inverse: 'patient'}),


  fullName: Ember.computed("name", function(){
    let firstHumanName = this.get("name");
    if (firstHumanName) {
      return `${firstHumanName.get('firstObject.family')}, ${firstHumanName.get('firstObject.given')}`;
    }
    return "Unknown";
  }),

  computedAge: Ember.computed("birthDate", function(){
    return moment().diff(moment(this.get('birthDate')), 'years');
  }),

  computedGender: Ember.computed("gender", function(){
    return this.get('gender').capitalize();
  }),

  inpatientAdmissions: Ember.computed.filter("encounters", function(item){
    return  item.hasCode('type', {code: '99221', system: 'http://www.ama-assn.org/go/cpt'}) ||
            item.hasCode('type', {code: '99222', system: 'http://www.ama-assn.org/go/cpt'}) ||
            item.hasCode('type', {code: '99223', system: 'http://www.ama-assn.org/go/cpt'});
  }),

  events: Ember.computed("encounters", "conditions", "medications", function(){
    var events =  Ember.A([]);
    this.get('encounters').map(function(e){
      let patient_event = e.store.createRecord('patient-event', {event: e, type: "encounter"});
      events.push(patient_event);
      if(e.hasOccured('endDate')){
        let patient_event = e.store.createRecord('patient-event', {event: e, type: "encounter", isEnd: true});
        events.push(patient_event);
      }
    });
    this.get('conditions').map(function(e){
      let patient_event = e.store.createRecord('patient-event', {event: e, type: "condition"});
      events.push(patient_event);
      if(e.hasOccured('endDate')){
        let patient_event = e.store.createRecord('patient-event', {event: e, type: "condition", isEnd: true});
        events.push(patient_event);
      }
    });
    this.get('medications').map(function(e){
      let patient_event = e.store.createRecord('patient-event', {event: e, type: "medication"});
      events.push(patient_event);
      if(e.hasOccured('endDate')){
        let patient_event = e.store.createRecord('patient-event', {event: e, type: "medication", isEnd: true});
        events.push(patient_event);
      }
    });
    return events.sortBy('effectiveDate').reverse();
  }),

  activeMedications: Ember.computed.filter("medications", function(med){
    return med.isActive('endDate');
  }),

  activeConditions: Ember.computed.filter("conditions", function(cond){
    return cond.isActive('endDate');
  }),

  futureAppointments: Ember.computed.filter("appointments", function(appointment){
    return !appointment.hasOccured('start');
  }),

  sortedRisks: Ember.computed('risks', function(){
    return this.get('risks').sortBy('date');
  }),

  risksByOutcome: Ember.computed('sortedRisks', function(){
    let nest = d3.nest();
    nest.key(function(el){
      return el.get('prediction.firstObject.outcome.text');
    });
    return nest.entries(this.get('sortedRisks'));
  }),

   currentRisk: Ember.computed('risksByOutcome', function(){
    return this.get('risksByOutcome').map(function(risk){
      return {key: risk.key, value:risk.values[risk.values.length - 1 ]};
    });
  }),

  computedRisk: Ember.computed('currentRisk', function(){
    let risks =  this.get('currentRisk');
    if (risks.length > 0) {
      return risks.filterBy('key', 'Stroke')[0].value.get('value');
    }
    return 0;
  }),

  risksWithBirthdayStart: Ember.computed('sortedRisks', 'birthDate', function(){
    let birthRisk = this.get('store').createRecord("risk-assessment", {date: this.get('birthDate')})
    let riskCode = this.get('store').createRecord("codeable-concept", {text: "Stroke"});
    let rapc = this.get('store').createRecord("risk-assessment-prediction-component", {probabilityDecimal: 0});
    rapc.set('outcome', riskCode);
    birthRisk.get('prediction').pushObject(rapc);
    let risks = [birthRisk];
    risks.pushObjects(this.get('sortedRisks'));
    return risks.filterBy('prediction.firstObject.outcome.text', "Stroke");
  }),

  slices: Ember.computed('sortedRisks.@each.pie', function(){
    let risk = this.get('sortedRisks').filterBy('prediction.firstObject.outcome.text', "Stroke").get('lastObject');
    if (risk) {
      return risk.get('pie').get('sliceArray');
    } else {
      return [
      {name: 'medications', title: 'Medications', value: 0, weight: 1},
      {name: 'conditions', title: 'Conditions', value: 0, weight: 2},
      {name: 'readmissions', title: 'Readmissions', value: 0, weight: 1},
      {name: 'utilization', title: 'Utilizations', value: 5, weight: 0.5},
      {name: 'social_barriers', title: 'Social Barriers', value: 2, weight: 1},
      {name: 'falls', title: 'Falls', value: 1, weight: 1}
      ];
    }
  })
});

export default IEPatient;
