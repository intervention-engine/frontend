window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchMessage: "The `initialize` method for Application initializer 'ember-data' should take only one argument - `App`, an instance of an `Application`." },
    { handler: "silence", matchMessage: "Using the injected `container` is deprecated. Please use the `getOwner` helper instead to access the owner of this object." },
    { handler: "silence", matchMessage: "Using `ApplicationInstance.container.lookup` is deprecated. Please use `ApplicationInstance.lookup` instead." },
    { handler: "silence", matchMessage: "this.resource() is deprecated. Use this.route('name', { resetNamespace: true }, function () {}) instead." },
    { handler: "silence", matchMessage: "The default behavior of shouldReloadAll will change in Ember Data 2.0 to always return false when there is at least one \"group\" record in the store. If you would like to preserve the current behavior please override shouldReloadAll in your adapter:application and return true." },
    { handler: "silence", matchMessage: "Your custom serializer uses the old version of the Serializer API, with `extract` hooks. Please upgrade your serializers to the new Serializer API using `normalizeResponse` hooks instead." },
    { handler: "silence", matchMessage: "`store.setMetadataFor()` has been deprecated. Please return meta from your serializer's `extractMeta` hook." },
    { handler: "silence", matchMessage: "Usage of `typeKey` has been deprecated and will be removed in Ember Data 2.0. It has been replaced by `modelName` on the model class." },
    { handler: "silence", matchMessage: "store.push(type, data) has been deprecated. Please provide a JSON-API document object as the first and only argument to store.push." },
    { handler: "silence", matchMessage: "In Ember Data 2.0, relationships will be asynchronous by default. You must set `prediction: DS.hasMany('risk-assessment-prediction-component', { async: false })` if you wish for a relationship remain synchronous." },
    { handler: "silence", matchMessage: "In Ember Data 2.0, relationships will be asynchronous by default. You must set `outcome: DS.belongsTo('codeable-concept', { async: false })` if you wish for a relationship remain synchronous." },
    { handler: "silence", matchMessage: /Providing the `container` property to <ember-on-fhir@model:[^>]*> is deprecated. Please use `Ember\.setOwner` or `owner\.ownerInjection\(\)` instead to provide an owner to the instance being created/ }
  ]
};
