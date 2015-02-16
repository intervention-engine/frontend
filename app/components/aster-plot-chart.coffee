`import Ember from 'ember'`

AsterPlotComponent = Ember.Component.extend
  data: []
  svg: null

  didInsertElement: ->
    svg = d3.select(@element).select("svg")
    @set('svg', svg)
    data = this.get('data')
    padding = 5
    width = height = 600 - 2 * padding

    outerRadius = d3.min([width, height])/2
    radius = outerRadius *.95
    innerRadius = .17* radius

    radiusScale = d3.scale.linear()
      .domain([0,6])
      .range([innerRadius, radius])
    opacityScale = d3.scale.linear()
      .domain([0,6])
      .range([.2, 1])
    pie = d3.layout.pie()
      .padAngle(.03)
      .sort(null)
      .value((d) -> d.weight)
    tip = d3.tip()
      .attr('class', 'd3-tip')
      .html((d) -> d.data.name)
    arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius((d) -> radiusScale(d.data.risk))
      .cornerRadius(5)
    outerArc = d3.svg.arc()
      .innerRadius(outerRadius * .85)
      .outerRadius(outerRadius)
      .cornerRadius(5)
    g = svg.append("g")
      .attr("transform", "translate(#{width/2 + padding}, #{height/2 + padding})")
      # .call(tip)
    gEnter = g.append("g")
      .selectAll("path")
      .data(pie(data))
      .enter()
    gEnter.append("path")
      .attr("class", (d) -> "category#{d.data.name} category")
      .attr("d", arc)
      .attr("fill-opacity", (d) -> opacityScale(d.data.risk))
      # .on("mouseover", tip.show())
      # .on("mouseout", tip.hide())
      .on("click", (d) =>
        # rotateAngle = -d3.mean([d.startAngle, d.endAngle])*180/Math.PI
        # d3.select(this.parentNode).transition().duration(1000).attr("transform", => "rotate(#{rotateAngle})")
        svg.selectAll(".category").classed("active", false)
        svg.selectAll(".category#{d.data.name}").classed("active", true)
      )

    gEnter.append("path")
      .attr("class", (d) -> "category#{d.data.name} category")
      .attr("d", outerArc)
      .attr("fill-opacity", (d) -> opacityScale(d.data.risk))

      .on("click", (d) =>
        svg.selectAll(".category").classed("active", false)
        svg.selectAll(".category#{d.data.name}").classed("active", true)
      )
      .on("dblclick", (d) ->
        rotateAngle = -d3.mean([d.startAngle, d.endAngle])*180/Math.PI
        d3.select(this.parentNode).transition().duration(1000).attr("transform", => "rotate(#{rotateAngle})")
      )
      # .on("mouseover", tip.show())
      # .on("mouseout", tip.hide())

  _dataDidChange: (->
    Ember.run.once(@, @_updateChart)
  ).observes('data.[]')

  _updateChart: ->
    svg = @get('svg')
    return unless svg?

    pie = d3.layout.pie()
      .padAngle(.03)
      .sort(null)
      .value((d) -> d.weight)

    path = svg.selectAll('path')
    console.debug path
    path.data(pie(@get('data')))
    return

`export default AsterPlotComponent`
