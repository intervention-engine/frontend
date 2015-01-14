`import Ember from 'ember'`

addFilterPane = (context, pane) ->
  switch pane
    when "patient"
      newPane = context.store.createRecord("pane", {id: Ember.generateGuid({},"pane")})
      ageParam = context.store.createRecord("extension", {id: Ember.generateGuid({}, "extension"), url: "http://interventionengine.org/patientage", value: 18})
      ageFilter = context.store.createRecord("ember-item", {id: Ember.generateGuid({},"ember-item"), parameter: ageParam, componentName: "age-filter"})
      genderParam = context.store.createRecord("extension", {id: Ember.generateGuid({}, "extension"), url: "http://interventionengine.org/patientgender", valueString: "M"})
      genderFilter = context.store.createRecord("ember-item", {id: Ember.generateGuid({},"ember-item"), parameter: genderParam, componentName: "gender-filter"})
      newPane.get('items').pushObjects([genderFilter])
      context.currentModel.get('panes').pushObject(newPane)
    when "encounter"
      newPane = context.store.createRecord("pane", {id: Ember.generateGuid({},"pane"), icon:"fa-hospital-o"})
      codeParam = context.store.createRecord("extension", {id: Ember.generateGuid({}, "extension"), url: "http://interventionengine.org/encounterCode"})
      codeFilter = context.store.createRecord("ember-item", {id: Ember.generateGuid({},"ember-item"), parameter: codeParam, componentName: "encounter-code-filter"})
      newPane.get('items').pushObjects([codeFilter])
      context.currentModel.get('panes').pushObject(newPane)
    when "condition"
      newPane = context.store.createRecord("pane", {id: Ember.generateGuid({},"pane"), icon:"icon-med-clipboard"})
      codeFilter = context.store.createRecord("ember-item", {id: Ember.generateGuid({},"ember-item"), componentName: "condition-code-filter"})
      newPane.get('items').pushObjects([codeFilter])
      context.currentModel.get('panes').pushObject(newPane)
    else
      return

`export default addFilterPane`
