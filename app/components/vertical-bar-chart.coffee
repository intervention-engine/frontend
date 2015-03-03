`import Ember from 'ember'`

VerticalBarChartComponent = Ember.Component.extend
  data: []

  didInsertElement: ->
    svg = d3.select(@element).select("svg")

    @padding = 0
    @width = (@width || 600) - @padding * 2
    svg.attr("height", @height)
      .attr("viewBox", "0 0 #{@width} #{@height}")
    data = @data.toArray()
    console.log data.mapBy('valueQuantity.value')
    @barScale = d3.scale.ordinal()
      .domain(d3.range(0, data.length))
      .rangeRoundBands([@padding, @width], (@bandPadding||0))
    @heightScale = d3.scale.linear()
      .domain([0, d3.max(data, (d) -> d.get('valueQuantity.value'))])
      .range([@padding, @height])
    @opacityScale = d3.scale.linear()
      .domain([0, d3.max(data, (d) -> d.get('valueQuantity.value'))])
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
      .attr("fill-opacity", (d) => @opacityScale(d.get('valueQuantity.value')))
    @g.selectAll("rect")
      .transition()
      .attr("x", (d,i) => @barScale(i))
      .attr("y", (d) =>@height - @heightScale(d.get('valueQuantity.value')))
      .attr("width", @barScale.rangeBand())
      .attr("height", (d) => @heightScale(d.get('valueQuantity.value')))
      .attr("fill-opacity", (d) => @opacityScale(d.get('valueQuantity.value')))

  updateGraph:(->
    svg = d3.select(@element).select("svg")

    @padding = 0
    @width = (@width || 600) - @padding * 2
    svg.attr("height", @height)
      .attr("viewBox", "0 0 #{@width} #{@height}")
    data = @data.toArray()
    # If we don't have data let's just return until we have data.
    if data.length is 0
      return
    @barScale = d3.scale.ordinal()
      .domain(d3.range(0, data.length))
      .rangeRoundBands([@padding, @width], (@bandPadding||0))
    @heightScale = d3.scale.linear()
      .domain([0, d3.max(data, (d) -> d.get('valueQuantity.value'))])
      .range([@padding, @height])
    @opacityScale = d3.scale.linear()
      .domain([0, d3.max(data, (d) -> d.get('valueQuantity.value'))])
      .range([.2, 1])
    gData = @g.selectAll("rect")
      .data(data)
    gExit = gData.exit()
      .transition()
      .attr("height", (d) => 0 )
      .remove()
    gEnter = gData.enter()
    gEnter.append("rect")
      .attr("x", (d,i) => @barScale(i))
      .attr("y", (d) => @height )
      .attr("width", @barScale.rangeBand())
      .attr("height", 0)
      .attr("fill-opacity", (d) => @opacityScale(d.get('valueQuantity.value')))
    @g.selectAll("rect")
      .transition()
      .attr("x", (d,i) => @barScale(i))
      .attr("y", (d) =>@height - @heightScale(d.get('valueQuantity.value')))
      .attr("width", @barScale.rangeBand())
      .attr("height", (d) => @heightScale(d.get('valueQuantity.value')))
      .attr("fill-opacity", (d) => @opacityScale(d.get('valueQuantity.value')))
    ).observes('data')

`export default VerticalBarChartComponent`
