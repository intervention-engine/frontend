`import Ember from 'ember'`

FiltersNewController = Ember.Controller.extend({
  # returns true if filter description has at least 1 filter pane and false if not
  hasFilterPane: (->
    @get('model.panes.length') > 0
  ).property('model.panes.length')
})

`export default FiltersNewController`
