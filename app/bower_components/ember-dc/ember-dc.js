// ==========================================================================
// Project:   Ember DC Components
// Copyright: © 2014 Andrew Reedy
// License:   MIT (see LICENSE)
// ==========================================================================
// EmberDC
EmberDC = {};

EmberDC.VERSION = "0.0.1";
Ember.libraries.register("Ember DC", EmberDC.VERSION);

// Controller Mixin
EmberDC.ControllerMixin = Ember.Mixin.create({

  /**
   * @property _crossfilter
   * @type {Object}
   * @private
   */
  _crossfilter: null,

  /**
   * @property metrics
   * @type {Array}
   * Computed Metrics
   */
  metrics: [],

  /**
   * @property dimensions
   * @type {Array}
   * Crossfilter Dimensions
   */
  dimensions: [],

  /**
   * @property groups
   * @type {Array}
   * Crossfilter Groups
   */
  groups: [],

  /**
   * @property chartGroup
   * @type {String}
   * Chart groups share common rendering events since it is
   * expected they share the same underlying crossfilter data set.
   */
  chartGroup: 'group-name',

  /**
   * @method init
   * Invoked when the controller is instantiated.
   * @constructor
   */
  init: function init() {

      this._super();

      // Add the observer to create the Crossfilter when we have some content.
      Ember.addObserver(this, 'content.length', this, '_createCrossfilter');

      // Create the Crossfilter.
      this._createCrossfilter();

  },

  /**
   * @method _createCrossfilter
   * Creates the Crossfilter from the content.
   * @return {Boolean}
   * @private
   */
  _createCrossfilter: function() {

    // Create the Crossfilter, and then create the dimensions.
    var content = Ember.get(this, 'content');

    // Checks whether we have a defined controller, and/or no content.
    var hasDefinedCrossfilter   = !!this._crossfilter,
        hasNoContent            = !content.length;

    // If we don't want have any content yet, or a defined Crossfilter, then either
    // the content hasn't been loaded yet, or we've already created the Crossfilter.
    if (hasNoContent || hasDefinedCrossfilter) {
        return false;
    }

    // Remove the observer because we don't want to keep triggering this method when
    // the content updates.
    Ember.removeObserver(this, 'content.length', this, '_createCrossfilter');

    // Create the Crossfilter and its related dimensions.
     this._crossfilter = window.crossfilter(content);
     this._createDimensions();
     this._createGroups();
  },

  /**
   * @method _createDimensions
   * Create the defined dimensions from the controller.
   * @return {void}
   * @private
   */
  _createDimensions: function() {},


  /**
   * @method _createGroups
   * Create the defined groups from the controller.
   * @return {void}
   * @private
   */
  _createGroups: function() {},

  actions: {

    /**
     * @method filterAll
     * Clear all filters on every chart within the given chart group.
     * If the chart group is not given then only charts that belong
     * to the default chart group will be reset.
     * @return {void}
     */
    filterAll: function() {
      dc.filterAll(this.chartGroup);
    },

    /**
     * @method refocusAll
     * Reset zoom level / focus on all charts that belong to the given
     * chart group. If the chart group is not given then only charts
     * that belong to the default chart group will be reset.
     * @return {void}
     */
    refocusAll: function() {
      dc.refocusAll(this.chartGroup);
    },

    /**
     * @method renderAll
     * Re-render all charts belong to the given chart group. If the chart
     * group is not given then only charts that belong to the default
     * chart group will be re-rendered.
     * @return {void}
     */
    renderAll: function() {
      dc.renderAll(this.chartGroup);
    },

    /**
     * @method redrawAll
     * Redraw all charts belong to the given chart group. If the chart group
     * is not given then only charts that belong to the default chart group
     * will be re-drawn. Redraw is different from re-render since when
     * redrawing dc charts try to update the graphic incrementally instead
     * of starting from scratch.
     * @return {void}
     */
    redrawAll: function() {
      dc.redrawAll(this.chartGroup);
    }

  }

});

EmberDC.BaseMixin = Ember.Mixin.create({
  classNames: ['chart'],

  chartOptions: [
    'group',
    'dimension',
    'width',
    'height',
    'margin',
    'renderTitle',
    'elasticY',
    'elasticX',
    'transitionDuration'
  ],

  /**
   * @property chart
   * @type {Object}
   * Chart Object
   */
  chart: null,

  /**
   * @property height
   * @property width
   * @property minWidth
   * @property minHeight
   * @type {Number}
   * Chart Dimensions
   */
  height: 200,
  width: 200,
  minHeight: null,
  minWidth: null,

  /**
   * @property responsive
   * @type {Boolean}
   * Make Chart Responsive
   */
  responsive: true,

  /**
   * @property height
   * @type {Number}
   * Chart Height
   */
  renderArea: false,

  /**
   * @property height
   * @type {Number}
   * Chart Height
   */
  metrics: [],

  group: null,


  dimension: null,

  /**
   * @property height
   * @type {Number}
   * Chart Height
   */
  transitionDuration: 100,
  renderTitle: false,
  renderVerticalGridLines: false,
  renderHorizontalGridLines: true,
  yAxisPadding: 2,
  xAxisPadding: 0,
  hidableStacks: true,
  elasticY: true,
  elasticX: true,

  /**
   * @method renderChart
   * Method render the chart and make responsive
   */
  renderChart: function() {
    var self = this;

    this.width = this.$().width();

    // Apply the charts options
    this.options();

    // Render the chart
    this.chart.render();

    // Make responsive if property is set
    if(this.responsive == true) {
      $(window).resize(function(){
        console.log('test');
        self.chart.width(this.$().width()).render();
      });
    }
  },

  /**
   * @method redraw
   * Method to redraw the chart if the underlying data changes
   */
  redraw: function() {

    // Redraw the chart
    //this.chart.redraw();

  }.observes('group'),

  /**
   * @method options
   * Method apply the charts options
   */
  options: function() {
    this.chart.options(this.getProperties(
      'group',
      'dimension',
      'width',
      'height',
      'margin',
      'renderTitle',
      'elasticY',
      'elasticX',
      'transitionDuration'
    ));
  },

  /**
   * @method hasFilter
   * Check whether is any active filter or a specific filter is associated
   * with particular chart instance. This function is not chainable.
   */
  hasFilter: function(filter) {
    return this.chart.hasFilter(filter);
  },

  /**
   * @method filters
   * Return all current filters. This method does not perform defensive cloning
   * of the internal filter array before returning therefore any modification of
   * returned array will affact chart's internal filter storage.
   */
  filters: function() {
    return this.chart.filters();
  },

  /**
   * @method filter
   * Filter the chart by the given value or return the current filter if
   * the input parameter is missing.
   */
  filter: function(filterValue) {
    return this.chart.filter(filterValue);
  },

  /**
   * @method onClick
   * This function is passed to d3 as the onClick handler for each chart. By
   * default it will filter the on the clicked datum (as passed back to the
   * callback) and redraw the chart group.
   */
  onClick: function(datum) {
    this.chart.onClick(datum);
  },

  /**
   * @method title
   * Set or get the title function. Chart class will use this function to
   * render svg title(usually interpreted by browser as tooltips) for each
   * child element in the chart, i.e. a slice in a pie chart or a bubble in
   * a bubble chart. Almost every chart supports title function however in
   * grid coordinate chart you need to turn off brush in order to use title
   * otherwise the brush layer will block tooltip trigger.
   */
  title: function(titleFunction) {
    this.chart.title(titleFunction);
  },

  /**
   * @method label
   * Set or get the label function. Chart class will use this function to
   * render label for each child element in the chart, i.e. a slice in a pie
   * chart or a bubble in a bubble chart. Not every chart supports label
   * function for example bar chart and line chart do not use this function
   * at all.
   */
  label: function(labelFunction) {
    this.chart.label(labelFunction);
  }



});

EmberDC.BubbleMixin = Ember.Mixin.create({

});
EmberDC.CapMixin = Ember.Mixin.create({

});
EmberDC.ColorMixin = Ember.Mixin.create({

});
EmberDC.CoordinateGridMixin = Ember.Mixin.create({

});
EmberDC.MarginMixin = Ember.Mixin.create({

  /**
   * @property margins
   *
   * @type {Object}
   * Chart margins
   */
  margins: {
    top: 30,
    right: 5,
    bottom: 55,
    left: 30
  }


});
EmberDC.StackMixin = Ember.Mixin.create({

});
EmberDC.BarChartComponent = Ember.Component.extend( EmberDC.StackMixin, EmberDC.CoordinateGridMixin, {
  classNames: ['bar-chart'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.barChart('#'+this.$().context.id);

    this.chart
        // (optional) whether bar should be center to its x value. Not needed for ordinal chart, :default=false
        .centerBar(true)
        // (optional) set gap between bars manually in px, :default=2
        .gap(1)
        // (optional) set filter brush rounding
        .round(dc.round.floor)
        .x(d3.scale.linear().domain([-25, 25]))
        .renderHorizontalGridLines(true)
        // customize the filter displayed in the control span
        .filterPrinter(function (filters) {
            var filter = filters[0], s = "";
            s += numberFormat(filter[0]) + "% -> " + numberFormat(filter[1]) + "%";
            return s;
        });


    this.renderChart();

  }.on('didInsertElement').observes('group')

});


EmberDC.BoxPlotComponent = Ember.Component.extend( EmberDC.CoordinateGridMixin, {
  classNames: ['box-plot'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.boxPlot('#'+this.$().context.id);

    this.renderChart();

  }.on('didInsertElement').observes('group')

});
EmberDC.BubbleChartComponent = Ember.Component.extend( EmberDC.BubbleMixin, EmberDC.CoordinateGridMixin, {

  classNames: ['bubble-chart'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.bubblePlot('#'+this.$().context.id);

    this.renderChart();

  }.on('didInsertElement').observes('group')

});
EmberDC.BubbleOverlayChartComponent = Ember.Component.extend( EmberDC.BubbleMixin, EmberDC.BaseMixin, {

  classNames: ['bubble-overlay-chart'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.bubblePlot('#'+this.$().context.id);

    this.renderChart();

  }.on('didInsertElement').observes('group')

});
EmberDC.CompositeChartComponent = Ember.Component.extend( EmberDC.CoordinateGridMixin, {

});
EmberDC.DataCountComponent = Ember.Component.extend( EmberDC.BaseMixin, {

});
EmberDC.DataTableComponent = Ember.Component.extend( EmberDC.BaseMixin, {

  table: null,

  createTable: function() {
    var self = this;

    if(this.get('dimension') != null){
      return false;
    }

    this.table = dc.dataTable("#data-table")
        .dimension(this.get('dimension'))
        // data table does not use crossfilter group but rather a closure
        // as a grouping function
        .group(function (d) {
            var format = d3.format("02d");
            return d.date.getFullYear() + "/" + format((d.date.getMonth() + 1));
        })
        .size(10)
        .columns([
            function (d) {
                return d.date;
            }
        ])
        .sortBy(function (d) {
            return d.date;
        })
        .order(d3.ascending)
        .renderlet(function (table) {
            table.selectAll(".dc-table-group").classed("info", true);
        });


    this.table.render();

  }.on('didInsertElement').observes('dimension')

});
EmberDC.GeoChoroplethChartComponent = Ember.Component.extend( EmberDC.ColorMixin, EmberDC.BaseMixin, {
  classNames: ['geo-choropleth-chart'],

  height: 500,

  // overlayGeoJson: function() {
  //   this.geoJSON.features, "state", function (d) {
  //     return d.properties.name;
  //   });
  // },

  /**
   * @method options
   * Method apply the charts options
   */
  options: function() {
    this.chart.options(this.getProperties(
      'group',
      'dimension',
      'width',
      'height',
      'margin',
      'renderTitle',
      'elasticY',
      'elasticX',
      'transitionDuration'
      //'overlayGeoJson'
    ));
  },

  createChart: function() {
    var self = this;

    if(this.get('group') == null || this.get('geoJSON') == null ){
        return false;
    }

    this.chart = dc.geoChoroplethChart('#'+this.$().context.id);

    // this.chart
    //   .colors(d3.scale.quantize().range(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]))
    //   .colorDomain([0, 6000])
    //   .colorCalculator(function (d) { return d ? self.chart.colors()(d) : '#ccc'; })
    //   .overlayGeoJson(this.geoJSON.features, "state", function (d) {
    //       return d.properties.name;
    //   })
    //   .title(function (d) {
    //       return "State: " + d.key + "\nSightings: " + (d.value ? d.value : 0) + "M";
    //   });

    this.renderChart();

  }.on('didInsertElement').observes('group', 'geoJSON')

});

EmberDC.HeatMapComponent = Ember.Component.extend( EmberDC.ColorMixin, EmberDC.MarginMixin, EmberDC.BaseMixin, {
  classNames: ['heat-map'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.heatMap('#'+this.$().context.id);

    this.renderChart();

  }.on('didInsertElement').observes('group')

});
EmberDC.LineChartComponent = Ember.Component.extend( EmberDC.StackMixin, EmberDC.CoordinateGridMixin, {
  classNames: ['line-chart'],

  startDate: new Date(new Date()-86400000*29),
  endDate:   new Date(),

  createChart: function() {
    var self = this;

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.compositeChart('#'+this.$().context.id);

    var charts = [];

    this.get('metrics').forEach(function(metric, i) {
      charts.push(
        dc.lineChart(self.chart)
        .group(self.get('group'), metric.label)
        .valueAccessor(function (d) {
          return d.value[metric.value];
        })
        .dotRadius(10)
        .renderArea(true)
        .renderDataPoints({radius: 2})
        .brushOn(self.brushOn)
      )

    });

    this.chart
      .x(d3.time.scale().domain([this.startDate, this.endDate]))
      .xUnits(d3.time.days)
      //.renderArea(this.renderArea)
      .elasticY(this.elasticY)
      .brushOn(this.brushOn)
      .renderHorizontalGridLines(true)
      //.renderDataPoints({radius: 4})
      .ordinalColors(["#56B2EA","#E064CD","#F8B700","#78CC00","#7B71C5"])
      .shareColors(true)
      .compose(charts)
      .legend(dc.legend().horizontal(1).itemWidth(70).x(10).y(this.height-20).gap(5))
      .yAxisPadding(this.yAxisPadding)
      .title(function (p) {
          return [p.key,
                 "Spend: " + p.spend]
                 .join("\n");
      })
      .yAxis().ticks(5).tickFormat(d3.format("d"));

    this.renderChart();

  }.on('didInsertElement').observes('group')

});

EmberDC.NumberDisplayComponent = Ember.Component.extend( EmberDC.BaseMixin, {
  classNames: ['number-display'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.numberDisplay('#'+this.$().context.id);

    this.renderChart();

  }.on('didInsertElement').observes('group')

});
EmberDC.PieChartComponent = Ember.Component.extend( EmberDC.CapMixin, EmberDC.ColorMixin, EmberDC.BaseMixin, {
  classNames: ['pie-chart'],

  height: 200,

  // radius: function() {
  //   radius = (this.height > this.width) ? this.width : this.height;
  //   return (radius / 2);
  // },

  createChart: function() {
    var self = this;

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.pieChart('#'+this.$().context.id);

    //this.chartOptions.push('radius');

    //console.log(this.radius);

    // this.chart
    //     .radius(radius / 2)
    //     .label(function (d) {
    //         if (self.chart.hasFilter() && !self.chart.hasFilter(d.key))
    //             return d.key + "(0%)";
    //         return d.key + "(" + Math.floor(d.value / self.all.value() * 100) + "%)";
    //     })

        /*
        // (optional) whether chart should render labels, :default = true
        .renderLabel(true)
        // (optional) if inner radius is used then a donut chart will be generated instead of pie chart
        .innerRadius(40)
        // (optional) define chart transition duration, :default = 350
        .transitionDuration(500)
        // (optional) define color array for slices
        .colors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
        // (optional) define color domain to match your data domain if you want to bind data or color
        .colorDomain([-1750, 1644])
        // (optional) define color value accessor
        .colorAccessor(function(d, i){return d.value;})
        */;

    this.renderChart();

  }.on('didInsertElement').observes('group')

});
EmberDC.RowChartComponent = Ember.Component.extend( EmberDC.CapMixin, EmberDC.MarginMixin, EmberDC.ColorMixin, EmberDC.BaseMixin, {
  classNames: ['row-chart'],

  label: function (d) {
    return d.key.split(".")[1];
  },

  createChart: function() {

    if(this.get('group') == null){
      return false;
    }

    this.chart = dc.rowChart('#'+this.$().context.id);

    this.title(function (d) {
      return d.value;
    });

    // this.label(function (d) {
    //   return d.key.split(".")[1];
    // });

    this.chart.xAxis().ticks(4);

    this.renderChart();

  }.on('didInsertElement').observes('group')

});
EmberDC.ScatterPlotComponent = Ember.Component.extend( EmberDC.CoordinateGridMixin, {
  classNames: ['scatter-plot'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.scatterPlot('#'+this.$().context.id);

    this.renderChart();

  }.on('didInsertElement').observes('group')

});
EmberDC.SeriesChartComponent = EmberDC.CompositeChartComponent.extend({

});