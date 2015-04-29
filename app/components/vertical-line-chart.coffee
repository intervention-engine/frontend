
`import Ember from 'ember'`

VerticalLineChartComponent = Ember.Component.extend
  data: []
  didInsertElement: ->

    svg = d3.select(@element).select("svg")
    data = this.data
    padding = 5
    @width = (this.width||600) - padding * 2
    @height = (this.height||200) - padding * 2
    svg.attr("viewBox", "0 0 #{@width} #{@height}")
    @positionScale = d3.time.scale()
      .domain([new Date(2011, 1, 1), new Date()])
      .range([padding, @width])
    @heightScale = d3.scale.linear()
      .domain([0, 6])
      .range([padding, @height])

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
    d3.select(@element).select("svg g path").transition().attr("d", @generator(@data))
    ).observes('data')

`export default VerticalLineChartComponent`
