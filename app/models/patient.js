import Ember from 'ember';
import DS from 'ember-data';
import Patient from 'ember-fhir-adapter/models/patient';
import { uniqBy } from '../helpers/uniqBy';
import moment from 'moment';

export default Patient.extend({
  encounters: DS.hasMany('encounter', { 'async': true }),
  conditions: DS.hasMany('condition', { 'async': true }),
  medications: DS.hasMany('medication-statement', { 'async': true }),
  appointments: DS.hasMany('appointment', { 'async': true }),
  risks: DS.hasMany('risk-assessment', { 'async': true }),
  name: DS.hasMany('human-name', { async: false }),
  notifications: DS.belongsTo('notification-count', { 'async': true, inverse: 'patient' }),
  location: 'Home', // TODO: hook up

  fullName: Ember.computed('name', function() {
    let firstHumanName = this.get('name');
    if (firstHumanName) {
      return `${firstHumanName.get('firstObject.family')}, ${firstHumanName.get('firstObject.given')}`;
    }
    return 'Unknown';
  }),

  computedAge: Ember.computed('birthDate', function() {
    return moment().diff(moment(this.get('birthDate')), 'years');
  }),

  computedGender: Ember.computed('gender', function() {
    let gender = this.get('gender');
    if (gender !== undefined) {
      return gender.capitalize();
    } else {
      return '';
    }
  }),

  inpatientAdmissions: Ember.computed.filter('encounters', function(item) {
    return item.hasCode('type', { code: '99221', system: 'http://www.ama-assn.org/go/cpt' }) ||
           item.hasCode('type', { code: '99222', system: 'http://www.ama-assn.org/go/cpt' }) ||
           item.hasCode('type', { code: '99223', system: 'http://www.ama-assn.org/go/cpt' });
  }),

  events: Ember.computed('encounters.[]', 'conditions.[]', 'medications.[]', 'sortedRisks.[]', function() {
    let events =  Ember.A([]);

    this.get('encounters').map(function(e) {
      let patientEvent = e.store.createRecord('patient-event', { event: e, type: 'encounter' });
      events.push(patientEvent);

      if (e.hasOccured('endDate')) {
        let patientEvent = e.store.createRecord('patient-event', { event: e, type: 'encounter', isEnd: true });
        events.push(patientEvent);
      }
    });

    this.get('conditions').map(function(e) {
      if (e.get('verificationStatus') === 'confirmed') {
        let patientEvent = e.store.createRecord('patient-event', { event: e, type: 'condition' });
        events.push(patientEvent);

        if (e.hasOccured('endDate')) {
          let patientEvent = e.store.createRecord('patient-event', { event: e, type: 'condition', isEnd: true });
          events.push(patientEvent);
        }
      }
    });

    this.get('medications').map(function(e) {
      let patientEvent = e.store.createRecord('patient-event', { event: e, type: 'medication' });
      events.push(patientEvent);
      if (e.hasOccured('endDate')) {
        let patientEvent = e.store.createRecord('patient-event', { event: e, type: 'medication', isEnd: true });
        events.push(patientEvent);
      }
    });

    this.get('risksByOutcome').map(function(outcome) {
      let riskTransitions = outcome.values.map(function(e, i) {
        let previousRisk = outcome.values[i - 1];

        if (!previousRisk) {
          let displayText = `Risk of '${outcome.key}' started at ${e.get('value')}`;
          return e.store.createRecord('risk-event', { event: e, displayText, deltaRisk: e.get('value') , type: 'riskIncreased' });
        }

        let deltaRisk = e.get('value') - previousRisk.get('value');
        let direction = deltaRisk > 0 ? 'increased' : 'decreased';
        let displayText = `Risk of '${outcome.key}' ${direction} from ${previousRisk.get('value')} to ${e.get('value')}`;
        return e.store.createRecord('risk-event', { event: e, displayText, deltaRisk , type: `risk${direction.capitalize()}` });
      });

      events.push(...riskTransitions.filter((e) => e.get('deltaRisk') !== 0));
    });

    return events.sortBy('effectiveDate').reverse();
  }),

  activeMedications: Ember.computed.filter('medications', function(med) {
    return med.isActive('endDate');
  }),

  uniqueActiveMedications: Ember.computed('activeMedications', function() {
    return uniqBy(this.get('activeMedications').toArray(), 'displayText');
  }),

  activeConditions: Ember.computed.filter('conditions', function(cond) {
    return cond.isActive('endDate') && cond.get('verificationStatus') === 'confirmed';
  }),

  uniqueActiveConditions: Ember.computed('activeConditions', function() {
    return uniqBy(this.get('activeConditions').toArray(), 'displayText');
  }),

  futureAppointments: Ember.computed.filter('appointments', function(appointment) {
    return !appointment.hasOccured('start');
  }),

  sortedRisks: Ember.computed('risks.[]', function() {
    return this.get('risks').sortBy('date');
  }),

  risksByOutcome: Ember.computed('sortedRisks.[]', function() {
    let nest = d3.nest();
    nest.key(function(el) {
      return el.get('prediction.firstObject.outcome.displayText');
    });
    return nest.entries(this.get('sortedRisks'));
  }),

  currentRisk: Ember.computed('risksByOutcome', function() {
    return this.get('risksByOutcome').map(function(risk) {
      return { key: risk.key, value: risk.values[risk.values.length - 1] };
    });
  })
});
