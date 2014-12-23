App.Router.map ->
  # Add your routes here
  @resource 'filters', ->
    @route 'new'
    @route 'show', path: ':id'
