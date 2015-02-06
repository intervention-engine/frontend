`import Ember from 'ember'`

lineChart = (selection) ->
  selection.each (data) ->
    padding = 5
    width = 600 - padding * 2
    height = 200 - padding * 2
    positionScale = d3.scale.ordinal()
      .domain(d3.range(0, data.length))
      .rangeRoundBands([padding, width], .1)
    heightScale = d3.scale.linear()
      .domain([0, d3.max(data, (d) -> d.value)])
      .range([padding, height])

    areaGenerator = d3.svg.area()
      .x((d,i) -> positionScale(i))
      .y0(height)
      .y1((d) -> height - heightScale(d.value))
      # .interpolate("cardinal-open")

    svg = d3.select(this)
    g = svg.append("g")
      .append("path")
      .attr("d", areaGenerator(data))




`export default lineChart`
