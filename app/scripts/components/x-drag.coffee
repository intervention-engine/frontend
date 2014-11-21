App.XDragComponent = Em.Component.extend
  dragStart: (event) ->
    event.dataTransfer.setData("text/data", @get("type"))
