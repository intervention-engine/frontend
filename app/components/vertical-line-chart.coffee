
`import Ember from 'ember'`

VerticalLineChartComponent = Ember.Component.extend
  data: []
  offset: 0
  offsetTime: 6
  offsetUnit: 'month'
  didInsertElement: ->

    svg = d3.select(@element).select("svg")
    data = this.data
    padding = 5
    @width = (this.width||600) - padding * 2
    @height = (this.height||200) - padding * 2
    svg.attr("viewBox", "0 0 #{@width} #{@height}")
    @positionScale = d3.time.scale()
      # [moment().subtract(@offsetTime, @offsetUnit).toDate(), new Date()]
      .domain(d3.extent(data, (d) -> d.effectiveDate))
      .range([padding, @width])
    @heightScale = d3.scale.linear()
      .domain([0, 6])
      .range([padding+@offset, @height])

    if @area
      @generator = d3.svg.area()
        .x((d) -> @positionScale(d.effectiveDate))
        .y0(@height)
        .y1((d) -> @height - @heightScale(d.value))
        .interpolate(@interpolate||"step")
    else
      @generator = d3.svg.line()
        .x((d) -> @positionScale(d.effectiveDate))
        .y((d) -> @height - @heightScale(d.value))
        .interpolate(@interpolate||"step")


    window.heightScale = @heightScale
    g = svg.append("g")
      .append("path")
      .attr("d", @generator(data))
  updateGraph:(->
    data = this.data
    padding = 5
    @positionScale = d3.time.scale()
      # [moment().subtract(@offsetTime, @offsetUnit).toDate(), new Date()]
      .domain(d3.extent(data, (d) -> d.effectiveDate))
      .range([padding, @width])
    if @area
      @generator = d3.svg.area()
        .x((d) -> @positionScale(d.effectiveDate))
        .y0(@height)
        .y1((d) -> @height - @heightScale(d.value))
        .interpolate(@interpolate||"step")
    else
      @generator = d3.svg.line()
        .x((d) -> @positionScale(d.effectiveDate))
        .y((d) -> @height - @heightScale(d.value))
        .interpolate(@interpolate||"step")
    d3.select(@element).select("svg g path").transition().attr("d", @generator(@data))
    ).observes('data', 'offsetTime', 'offsetUnit')

`export default VerticalLineChartComponent`
