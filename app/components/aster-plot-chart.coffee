`import Ember from 'ember'`

AsterPlotComponent = Ember.Component.extend
  data: []
  svg: null
  patient: null
  padding: 5
  size: 600

  didInsertElement: ->
    svg = d3.select(@element).select("svg")
    width = height = @get('size') - 2 * @get('padding')
    g = svg.append("g")
      .attr("transform", "translate(#{width/2 + @get('padding')}, #{height/2 + @get('padding')})")
    g.append('g').classed('outer', true)
    g.append('g').classed('inner', true)

  updateChart: (->
    svg = d3.select(@element).select("svg")
    return unless svg?
    data = @get('data')
    width = height = @get('size') - 2 * @get('padding')
    tip = d3.tip()
      .attr('class', 'd3-tip')
      .html((d) -> "#{d.data.name} - #{d.data.value}")
    svg.call(tip)
    outerRadius = d3.min([width, height])/2
    radius = outerRadius *.80
    innerRadius = .17* radius
    pie = d3.layout.pie()
      .padAngle(.03)
      .sort(null)
      .value((d) -> d.weight)
    radiusScale = d3.scale.linear()
      .domain([0,6])
      .range([innerRadius + 3*@padding, radius - 3*@padding])
      .clamp(true)
    opacityScale = d3.scale.linear()
      .domain([0,6])
      .range([.4, 1])

    arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius((d) -> radiusScale(d.data?.value||0))
      .cornerRadius(5)

    outerArc = d3.svg.arc()
      .innerRadius(radius-3*@padding)
      .outerRadius(radius)
      .cornerRadius(5)
    outerpath = svg.select('g').select(".outer")
      .selectAll("path")
      .data(pie(data))
    outerpath.enter()
      .append('path')
    outerpath.exit()
      .remove()

    outerpath
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .attr("d", outerArc)
    pathingData = svg.select('g').select(".inner")
      .selectAll("path")
      .data(pie(data))
    pathingData.enter()
      .append('path')
    pathingData.exit()
      .remove()
    pathingData
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .attr("d", arc)
      .attr("fill-opacity", (d) -> opacityScale(d.data.value))
      .on("click", (d) =>
        category = @get('patient.categoryDisplay').findBy('name', d.data.name)
        svg.selectAll(".category").classed("active", false)
        if (@get('selectedCategory') == (category))
          @set('selectedCategory', null)
        else
          svg.selectAll(".category#{d.data.name}").classed("active", true)
          @set('selectedCategory', category)
      )
    svg.selectAll(".outer").data(pie(@data))
      .attr("fill-opacity", (d) -> opacityScale(d.data.value))
    # return
  ).observes('data')

`export default AsterPlotComponent`
