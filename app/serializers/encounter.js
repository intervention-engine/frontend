import ApplicationSerializer from 'ember-fhir-adapter/serializers/application';

export default ApplicationSerializer.extend({
  attrs: {
    identifier: { embedded: 'always' },
    statusHistory:  { embedded: 'always' },
    type: { embedded: 'always' },
    patient: { embedded: 'always' },
    episodeOfCare: { embedded: 'always' },
    incomingReferralRequest: { embedded: 'always' },
    participant:  { embedded: 'always' },
    fulfills: { embedded: 'always' },
    period: { embedded: 'always' },
    // 'length': { embedded: 'always' }, // This is commented out because we don't currently use it and it causes things to break see Issue https://github.com/emberjs/ember.js/issues/12094
    reason: { embedded: 'always' },
    indication: { embedded: 'always' },
    priority: { embedded: 'always' },
    hospitalization:  { embedded: 'always' },
    location:  { embedded: 'always' },
    serviceProvider: { embedded: 'always' },
    partOf: { embedded: 'always' }
  }
});
