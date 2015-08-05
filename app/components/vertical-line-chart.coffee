
`import Ember from 'ember'`

VerticalLineChartComponent = Ember.Component.extend
  data: []
  offset: 5
  offsetTime: 6
  offsetUnit: 'years'
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
    tip = d3.tip().attr('class', 'd3-tip').html((d) -> "Risk #{d3.max(d.values, (v) -> v.get('value'))} <br/> #{moment(d.key).format('LL')}")

    svg = d3.select(@element).select("svg")
    data = this.data.filterBy('prediction.firstObject.outcome.text', 'Stroke')
    @positionScale = d3.time.scale()
      # .domain([d3.min(data, (d) -> new Date(d.get('date'))), new Date()])
      .domain([moment().subtract(@offsetTime,@offsetUnit).toDate(), new Date()])
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

    d3.select(@element).select("svg g path").attr("d", @generator(data))
    @generator.y1((d) => @heightScale(d.get('value')))
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
      .attr("cy", (d) => @heightScale(d3.max(d.values, (v) -> v.get('value'))))


    ).observes('data', 'offsetTime', 'offsetUnit')

`export default VerticalLineChartComponent`
