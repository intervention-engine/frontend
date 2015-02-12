
`import Ember from 'ember'`

VerticalLineChartComponent = Ember.Component.extend
  data: []
  didInsertElement: ->

    svg = d3.select(@element).select("svg")
    data = this.data
    padding = 5
    width = (this.width||600) - padding * 2
    height = (this.height||200) - padding * 2
    svg.attr("viewBox", "0 0 #{width} #{height}")
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
      .interpolate("step")

    g = svg.append("g")
      .append("path")
      .attr("d", areaGenerator(data))

`export default VerticalLineChartComponent`
