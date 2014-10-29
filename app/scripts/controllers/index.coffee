App.IndexController = Ember.ArrayController.extend
  metrics: [
    {value: 'test', label: 'test'}
  ]

  dimensions: {}

  _crossfilter: null

  groups: {}

  numRecords: ( -> @get('content.length')).property('content.length')

  _createDimensions: ->
    self = this

    content = Ember.get(this, 'content')

    @set('dimensions.code', @_crossfilter.dimension((d)-> d.get('reason.coding').getEach('code')[0]||0))
    @set('dimensions.date', @_crossfilter.dimension((d)->
      start_date = d.get('period.start.time')
      return start_date
      # new Date(start_date.getMonth()+1+"/"+1+"/"+start_date.getFullYear())
    ))
    # @set('dimensions.day', @_crossfilter.dimension((d)->
    #   start_date = d.get('period.start.time')
    #   return new Date(start_date.getMonth()+1+"/"+start_date.getDate()+"/"+start_date.getFullYear())
    # ))
    # @set('dimensions.year', @_crossfilter.dimension((d)->
    #   start_date = d.get('period.start.time')
    #   return start_date.getFullYear()
    # ))

  _createGroups: ->
    @set('groups.all', @_crossfilter.groupAll())
    @set('groups.code', @get('dimensions.code').group() )
    @set('groups.day', @get('dimensions.date')
      .group((g) -> new Date(g.getMonth()+1+"/"+g.getDate()+"/"+g.getFullYear()).getTime())
      .order((g) -> g.key)
    )
    @set('groups.month', @get('dimensions.date')
      .group((g) -> new Date(g.getMonth()+1+"/"+1+"/"+g.getFullYear()).getTime())
      .order((g) -> g.key)
    )
    @set('groups.year', @get('dimensions.date')
      .group((g) -> g.getFullYear())
      .order((g) -> g.key)
    )



  _createCrossfilter: ->
    content = @get 'content.content'
    Ember.removeObserver(this, 'content.length', this, '_createCrossfilter')
    @_crossfilter = window.crossfilter(content)
    @_createDimensions()
    @_createGroups()

  init: ->
    @_super()
    Ember.addObserver(this, 'content.length', this, '_createCrossfilter')

  actions:
    applyFilter: (name, values) ->
      f = @get('dimensions')[name]
      if values?
        f.filter(values)
      else
        f.filterAll()
      @set 'content', f.top(Infinity)

    setGrouping: (grouping) ->
      @set 'grouping', grouping

  grouping: 'month'

  groupSet: (->
    @get('groups')[@get("grouping")].top(Infinity)
  ).property('grouping', 'content.length')

  barsPath: (->
    groups = @get('groups')[@get('grouping')].top(Infinity)
    width = 626;
    height = 111;
    xScale = d3.scale.linear()
      .domain([0, groups.length])
      .range([0, width])
    yScale = d3.scale.linear()
      .domain(d3.extent(groups, (d) -> d.value))
      .range([height-10,10])

    path = d3.svg.area()
      .x((d,i) -> xScale(i))
      .y1((d) -> yScale(d.value))
      .y0(yScale(0))
      .interpolate('step')

    return path(groups)

    ).property('content.length', 'grouping')
