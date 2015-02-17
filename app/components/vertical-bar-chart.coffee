`import Ember from 'ember'`

VerticalBarChartComponent = Ember.Component.extend
  data: []
  didInsertElement: ->
    svg = d3.select(@element).select("svg")
    padding = 5
    @width = 600 - padding * 2
    @height = 200 - padding * 2
    data = @data
    @barScale = d3.scale.ordinal()
      .domain(d3.range(0, data.length))
      .rangeRoundBands([padding, @width], (@bandPadding||0))
    @heightScale = d3.scale.linear()
      .domain([0, d3.max(data, (d) -> d.value)])
      .range([padding, @height])
    @opacityScale = d3.scale.linear()
      .domain([0, d3.max(data, (d) -> d.value)])
      .range([.2, 1])
    @g = svg.append("g")
    gEnter = @g.selectAll("rect")
      .data(data)
      .enter()
    gEnter.append("rect")
      .attr("x", (d,i) => @barScale(i))
      .attr("y", (d) => @height )
      .attr("width", @barScale.rangeBand())
      .attr("height", 0)
      .attr("fill-opacity", (d) => @opacityScale(d.value))
    @g.selectAll("rect")
      .transition()
      .attr("x", (d,i) => @barScale(i))
      .attr("y", (d) => @height - @heightScale(d.value))
      .attr("width", @barScale.rangeBand())
      .attr("height", (d) => @heightScale(d.value))
      .attr("fill-opacity", (d) => @opacityScale(d.value))

  updateGraph:(->
    @g.selectAll("rect")
      .data(@data)
      .transition()
      .attr("x", (d,i) => @barScale(i))
      .attr("y", (d) => @height - @heightScale(d.value))
      .attr("width", @barScale.rangeBand())
      .attr("height", (d) => @heightScale(d.value))
      .attr("fill-opacity", (d) => @opacityScale(d.value))
    ).observes('data')


`export default VerticalBarChartComponent`
