`import Ember from 'ember'`

XDragComponent = Ember.Component.extend(
  dragStart: (event) ->
    event.dataTransfer.setData("text/data", @get("templatePath"))
)

`export default XDragComponent`
