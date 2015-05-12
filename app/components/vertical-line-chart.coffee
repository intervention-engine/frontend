
`import Ember from 'ember'`

VerticalLineChartComponent = Ember.Component.extend
  data: []
  offset: 5
  offsetTime: 6
  offsetUnit: 'months'
  padding: 5
  width: 600
  height: 70
  didInsertElement: ->

    svg = d3.select(@element).select("svg")
    # data = this.data
    # padding = 5
    # @width = (this.width||600) - padding * 2
    # @height = (this.height||200) - padding * 2
    # svg.attr("viewBox", "0 0 #{@width} #{@height}")
    # @positionScale = d3.time.scale()
    #   .domain(d3.extent(data, (d) -> d.effectiveDate))
    #   .range([padding, @width])
    # @heightScale = d3.scale.linear()
    #   .domain([0, 6])
    #   .range([padding+@offset, @height])
    #
    # if @area
    #   @generator = d3.svg.area()
    #     .x((d) -> @positionScale(d.effectiveDate))
    #     .y0(@height)
    #     .y1((d) -> @height - @heightScale(d.value))
    #     .interpolate(@interpolate||"step")
    # else
    #   @generator = d3.svg.line()
    #     .x((d) -> @positionScale(d.effectiveDate))
    #     .y((d) -> @height - @heightScale(d.value))
    #     .interpolate(@interpolate||"step")
    #

    g = svg.append("g")
      .append("path")
  updateGraph:(->
    tip = d3.tip().attr('class', 'd3-tip').html((d) -> "Risk #{d3.max(d.values, (v) -> v.value)} <br/> #{moment(d.key).format('LL')}")

    svg = d3.select(@element).select("svg")
    data = this.data.sortBy('effectiveDate')

    @positionScale = d3.time.scale()
      # .domain([d3.min(data, (d) -> d.effectiveDate), new Date()])
      .domain([moment().subtract(@offsetTime,@offsetUnit).toDate(), new Date()])
      .range([@padding, @width-@padding])
    nestedData = d3.nest()
      .key((d) -> moment(d.effectiveDate).toDate())
    @heightScale = d3.scale.linear()
      .domain([0, 6])
      .range([@height - @offset - @padding , @offset + @padding])

    @generator = d3.svg.area()
      .x((d) => @positionScale(d.effectiveDate))
      .y0((d) => @height)
      .y1(@height - @offset)

    d3.select(@element).select("svg g path").attr("d", @generator(data))
    @generator.y1((d) => @heightScale(d.value))
    d3.select(@element).select("svg g path").attr("d", @generator(data))

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
      .attr("cy", (d) => @heightScale(d3.max(d.values, (v) -> v.value)))




    ).observes('data', 'offsetTime', 'offsetUnit')

`export default VerticalLineChartComponent`
