`import Ember from 'ember'`

HorizontalBarChartComponent = Ember.Component.extend
  width: 200
  height: 10
  max: 0
  value: 0

  didInsertElement: ->
    @_renderChart()
    return

  _renderChart: (->
    width = parseInt(@get('width'), 10)
    height = parseInt(@get('height'), 10)

    value = parseFloat(@get('value')) || 0
    max = parseFloat(@get('max')) || 0

    widthScale = d3.scale.linear()
      .domain([0, Math.max.apply(Math, [max, value])])
      .range([0, width])

    element = d3.select(@element)
    element.selectAll("svg").remove()

    svg = d3.select(@element).append("svg").attr("width", width).attr("height", height)

    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .classed("background", true)

    svg.append("rect")
      .attr("width", widthScale(value))
      .attr("height", height)
      .classed("bar", true)
  ).observes('width', 'height', 'max', 'value')

`export default HorizontalBarChartComponent`
