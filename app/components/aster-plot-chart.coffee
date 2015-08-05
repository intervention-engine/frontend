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
    # data = @get('data')

    #
    # outerRadius = d3.min([width, height])/2
    # radius = outerRadius *.80
    # innerRadius = .17* radius
    #
    # radiusScale = d3.scale.linear()
    #   .domain([0,6])
    #   .range([innerRadius, radius])
    #   .clamp(true)
    # opacityScale = d3.scale.linear()
    #   .domain([0,6])
    #   .range([.2, 1])
    # pie = d3.layout.pie()
    #   .padAngle(.03)
    #   .sort(null)
    #   .value((d) -> d.weight)
    #
    # arc = d3.svg.arc()
    #   .innerRadius(innerRadius)
    #   .outerRadius((d) -> radiusScale(0))
    #   .cornerRadius(5)
    # outerArc = d3.svg.arc()
    #   .innerRadius(outerRadius * .85)
    #   .outerRadius(outerRadius)
    #   .cornerRadius(5)
    # g = svg.append("g")
    #   .attr("transform", "translate(#{width/2 + @get('padding')}, #{height/2 + @get('padding')})")
    # gEnter = g.append("g")
    #   .selectAll("path")
    #   .data(pie(data))
    #   .enter()
    # gEnter.append("path")
    #   .attr("class", (d) -> "category#{d.data.name} category")
    #   .classed("inner", true)
    #   .attr("d", arc)
    #   .attr("fill-opacity", (d) -> opacityScale(d.data.value))
    #   .on("click", (d) =>
    #     category = @get('patient.categoryDisplay').findBy('name', d.data.name)
    #     svg.selectAll(".category").classed("active", false)
    #     if (@get('selectedCategory') == (category))
    #       @set('selectedCategory', null)
    #     else
    #       svg.selectAll(".category#{d.data.name}").classed("active", true)
    #       @set('selectedCategory', category)
    #   )
    #
    # gEnter.append("path")
    #   .attr("class", (d) -> "category#{d.data.name} category outer")
    #   .attr("d", outerArc)
    #   .attr("fill-opacity", (d) -> opacityScale(d.data.value))
    #
    #   .on("click", (d) =>
    #     category = @get('patient.categoryDisplay').findBy('name', d.data.name)
    #     svg.selectAll(".category").classed("active", false)
    #     if (@get('selectedCategory') == (category))
    #       @set('selectedCategory', null)
    #     else
    #       svg.selectAll(".category#{d.data.name}").classed("active", true)
    #       @set('selectedCategory', category)
    #   )
    #
    #   .on("dblclick", (d) ->
    #     rotateAngle = -d3.mean([d.startAngle, d.endAngle])*180/Math.PI
    #     d3.select(this.parentNode).transition().duration(1000).attr("transform", -> "rotate(#{rotateAngle})")
    #   )

  updateChart: (->
    svg = d3.select(@element).select("svg")
    return unless svg?
    data = @get('data')
    width = height = @get('size') - 2 * @get('padding')
    tip = d3.tip()
      .attr('class', 'd3-tip')
      .html((d) -> d.data.name)
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
      .range([innerRadius, radius])
      .clamp(true)
    opacityScale = d3.scale.linear()
      .domain([0,6])
      .range([.4, 1])

    arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius((d) -> radiusScale(d.data?.value||0))
      .cornerRadius(5)
    pathingData = svg.select('g').select(".inner")
      .selectAll("path")
      .data(pie(data))
    pathingData.enter()
      .append('path')
    console.log pie(@data)
    pathingData
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
