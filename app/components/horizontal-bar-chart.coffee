`import Ember from 'ember'`

HorizontalBarChartComponent = Em.Component.extend
  data: []
  didInsertElement: ->
    data = this.data
    element = d3.select(@element)
    width = 100
    height = 10
    widthScale = d3.scale.linear()
      .domain([0, d3.max(data, (d) -> d.value)])
      .range([0,width])
    row = element.selectAll("tbody").selectAll("tr").data(data).enter()
      .append("tr")
    row.append("td").text((d) -> d.risk)
    row.append("td").text((d) -> d.label)
    svg = row.append("td").append("svg").attr("viewBox", "0 0 #{width} #{height}")
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .classed("background", true)
    svg.append("rect")
      .attr("width", (d) -> widthScale(d.value))
      .attr("height", height)




`export default HorizontalBarChartComponent`
