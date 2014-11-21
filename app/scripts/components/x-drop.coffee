App.XDropComponent = Ember.Component.extend
  dragOver: (event) ->
    event.preventDefault()
  drop: (event) ->
    data = event.dataTransfer.getData('text/data')
    console.log data
    @sendAction('filterAdded', data)
