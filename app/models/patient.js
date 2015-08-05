import Ember from 'ember';
import DS from 'ember-data';
import Patient from 'ember-fhir-adapter/models/patient';

let IEPatient = Patient.extend({
  encounters: DS.hasMany('encounter', {"async": true}),
  conditions: DS.hasMany('condition', {"async": true}),
  medications: DS.hasMany('medicationStatement', {"async": true}),
  appointments: DS.hasMany('appointment', {"async": true}),
  risks: DS.hasMany('riskAssessment', {"async": true}),


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

  slices: Ember.computed('sortedRisks.@each.pie', function(){
    let risk = this.get('sortedRisks.firstObject');
    if (risk) {
      let slices = risk.get('pie').get('slices')
      if (slices) {
        return slices.map(function(slice){
          return {weight: slice.get('weight'), value: slice.get('value'), name: slice.get('name')}
        });
      } else {
        return [];
      };

    } else {
      return [
      {name: 'medications', title: 'Medications', value: 0, weight: 1},
      {name: 'conditions', title: 'Conditions', value: 0, weight: 2},
      {name: 'readmissions', title: 'Readmissions', value: 0, weight: 1},
      {name: 'utilization', title: 'Utilizations', value: 5, weight: .5},
      {name: 'social_barriers', title: 'Social Barriers', value: 2, weight: 1},
      {name: 'falls', title: 'Falls', value: 1, weight: 1}
      ];
    };

  })

});

export default IEPatient;
