
`import Ember from 'ember'`

VerticalLineChartComponent = Ember.Component.extend
  data: []
  offset: 5
  offsetTime: 4
  offsetUnit: 'years'
  padding: 5
  width: 600
  height: 70
  didInsertElement: ->
    svg = d3.select(@element).select("svg")
    g = svg.append("g").append("path")

  updateGraph:(->
    tip = d3.tip().attr('class', 'd3-tip').html((d) -> "Risk #{d3.max(d.values, (v) -> v.get('value'))} <br/> #{moment(d.key).format('LL')}")
    svg = d3.select(@element).select("svg")
    @positionScale = d3.time.scale()
      .domain([moment().subtract(@offsetTime, @offsetUnit).toDate(), new Date()])
      .range([@padding, @width-@padding])
    nestedData = d3.nest()
      .key((d) -> moment(d.get('date')).toDate())
    @heightScale = d3.scale.linear()
      .domain([0, 6])
      .range([@height - @offset - @padding , @offset + @padding])

    @generator = d3.svg.area()
      .x((d) =>
        unless d.get('date') instanceof Date
          d.set('date', new Date(d.get('date')))
        @positionScale(d.get('date'))
      )
      .y0((d) => @height)
      .y1(@height - @offset)

    d3.select(@element).select("svg g path").attr("d", @generator(@data))
    @generator.y1((d) => @heightScale(d.get('value')))
    d3.select(@element).select("svg g path").attr("d", @generator(@data))
    svg.call(tip)
    circles = svg.selectAll("circle").data(nestedData.entries(@data))

    circles.enter().append("circle")
    circles.exit().remove()
    svg.selectAll("circle")
      .attr("cx", (d) => @positionScale(new Date(d.key)))
      .attr("r", 4)
      .attr("cy", (d) => @heightScale(0))
      .classed("event", true)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .transition()
      .attr("cy", (d) => @heightScale(d3.max(d.values, (v) -> v.get('value'))))


    ).observes('data', 'offsetTime', 'offsetUnit')

`export default VerticalLineChartComponent`
