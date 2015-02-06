`import Ember from 'ember'`

barChart = (selection) ->
  selection.each (data) ->
    padding = 5
    width = 600 - padding * 2
    height = 200 - padding * 2
    barScale = d3.scale.ordinal()
      .domain(d3.range(0, data.length))
      .rangeRoundBands([padding, width], .1)
    heightScale = d3.scale.linear()
      .domain([0, d3.max(data, (d) -> d.value)])
      .range([padding, height])
    opacityScale = d3.scale.linear()
      .domain([0, d3.max(data, (d) -> d.value)])
      .range([.2, 1])
    svg = d3.select(this)
    g = svg.append("g")
    gEnter = g.selectAll("rect")
      .data(data)
      .enter()
    gEnter.append("rect")
      .attr("x", (d,i) -> barScale(i))
      .attr("y", (d) -> height )
      .attr("width", barScale.rangeBand())
      .attr("height", 0)
      .attr("fill-opacity", (d) -> opacityScale(d.value))
    g.selectAll("rect")
      .transition()
      .duration(1000)
      .attr("x", (d,i) -> barScale(i))
      .attr("y", (d) -> height - heightScale(d.value))
      .attr("width", barScale.rangeBand())
      .attr("height", (d) -> heightScale(d.value))
      .attr("fill-opacity", (d) -> opacityScale(d.value))








`export default barChart`
