import Ember from 'ember';
import DS from 'ember-data';
import Patient from 'ember-fhir-adapter/models/patient';

let IEPatient = Patient.extend({
  encounters: DS.hasMany('encounter', {"async": true}),



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
  })

});

export default IEPatient;
