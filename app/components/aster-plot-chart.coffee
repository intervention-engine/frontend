`import Ember from 'ember'`

AsterPlotComponent = Ember.Component.extend
  data: []
  svg: null
  patient: null
  padding: 5
  size: 600
  selectedCategory: null

  didInsertElement: ->
    svg = d3.select(@element).select("svg")
    width = height = @get('size') - 2 * @get('padding')
    g = svg.append("g")
      .attr("transform", "translate(#{width/2 + @get('padding')}, #{height/2 + @get('padding')})")
    g.append('g').classed('outer', true)
    g.append('g').classed('inner', true)

  updateChart: (->
    svg = d3.select(@element).select("svg")
    return unless svg? and @get('data')
    data = @get('data')
    width = height = @get('size') - 2 * @get('padding')
    maxValue = d3.max(data, (d) -> d.value)
    outerRadius = d3.min([width, height])/2
    radius = outerRadius *.80
    innerRadius = .17* radius
    minRadius = 0.34 * radius
    maxSliceRadius = 0.8 * radius
    outerArcRadius = 0.83 * radius

    selectCategory = (d) =>
      svg.selectAll(".category").classed("active", false)
      if @get('selectedCategory') == d.data
        @sendAction('selectCategory', null)
      else
        svg.selectAll(".category#{d.data.name.camelize().capitalize()}").classed("active", true)
        @sendAction('selectCategory', d.data)
      return

    tip = d3.tip()
      .attr('class', 'd3-tip')
      .html((d) -> "#{d.data.name} : #{d.data.value}")
    svg.call(tip)

    pie = d3.layout.pie()
      .padAngle(.03)
      .sort(null)
      .value((d) -> d.weight)

    radiusScale = d3.scale.linear()
      .domain([0,1])
      .range([minRadius, maxSliceRadius])
      .clamp(true)

    opacityScale = d3.scale.linear()
      .domain([0,1])
      .range([.4, 1])

    outerArc = d3.svg.arc()
      .innerRadius(outerArcRadius)
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
      .attr("fill-opacity", (d) -> opacityScale(d3.max([d.data.value, 0])/(d.data.maxValue || maxValue)))
      .attr("class", (d) -> "category category#{d.data.name.camelize().capitalize()}")
      .on("click", selectCategory)

    arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius((d) -> radiusScale(d3.max([d.data.value, 0])/(d.data.maxValue || maxValue)))
      .cornerRadius(5)

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
      .attr("fill-opacity", (d) -> opacityScale(d3.max([d.data.value, 0])/(d.data.maxValue || maxValue)))
      .attr("class", (d) -> "category category#{d.data.name.camelize().capitalize()}")
      .on("click", selectCategory)

  ).observes('data')

`export default AsterPlotComponent`
