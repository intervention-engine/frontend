`import Ember from 'ember'`

XDropComponent = Ember.Component.extend(
  dragOver: (event) ->
    event.preventDefault()

  dragEnter: (event) ->
    if event.dataTransfer.types.contains("text/data")
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
)

`export default XDropComponent`
