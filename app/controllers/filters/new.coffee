`import Ember from 'ember'`

FiltersNewController = Ember.Controller.extend({
  hasFilterPane: (->
    @get('model.panes.length') > 0
  ).property('model.panes.length')
})

`export default FiltersNewController`
