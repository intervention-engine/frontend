App.XDropComponent = Ember.Component.extend
  dragOver: (event) ->
    event.preventDefault()

  dragEnter: (event) ->
    if $.inArray("text/data", event.dataTransfer.types) >= 0
      @set('droppable', true)
  dragLeave: ->
    @set('droppable', false)
  drop: (event) ->
    @set('droppable', false)
    data = event.dataTransfer.getData('text/data')
    # Handle the case of garbage drop.
    return if data == ""
    @sendAction('action', data)
  actions:
    removePane: (pane)->
      @model.get("panes").removeObject(pane)
