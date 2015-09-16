import Ember from 'ember';
import EmberHighChartsComponent from 'ember-highcharts/components/high-charts';

export default EmberHighChartsComponent.extend({
  offsetTime: 4,        // default time offset numeral
  offsetUnit: 'years',  // default time offset unit
  height: 70,           // default height of chart

  yMin: null,
  yMax: null,

  data: Ember.computed(function() { return []; }),

  chartOptions: Ember.computed(function() {
    return {
      chart: {
        height: this.get('height'),
        type: 'areaspline',
        spacing: 0,
        margin: 10,
        backgroundColor: 'rgba(255,255,255,0.002)' // transparent
      },

      legend: {
        enabled: false
      },

      title: {
        text: null
      },

      xAxis: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        labels: {
          enabled: false
        },
        minorTickLength: 0,
        tickLength: 0,
        title: {
          text: null
        },
        minPadding: 0,
        maxPadding: 0
      },

      yAxis: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        labels: {
          enabled: false
        },
        minorTickLength: 0,
        tickLength: 0,
        gridLineColor: 'transparent',
        title: {
          text: null
        },
        min: this.get('yMin'),
        max: this.get('yMax')
      }
    };
  }),

  _chartDataDidChange: Ember.observer(
    'data.[]',
    'offsetTime',
    'offsetUnit',
    function() {
      Ember.run.once(this, this._computeChartData);
    }
  ),

  _setup: Ember.on('init', function() {
    this._computeChartData();
  }),

  _computeChartData() {
    let data = this.get('data');
    var startDate = moment().subtract(this.get('offsetTime'), this.get('offsetUnit'));

    data = data.filter(function(datum) {
      return !startDate.isAfter(datum.get('date'));
    });

    // group data by dates
    let nestedData = d3.nest()
      .key(function(d) { return moment(d.get('date')).toDate(); })
      .entries(data);

    let chartData = [{
      name: 'Risk',
      color: '#5D8FAE',
      fillOpacity: 0.9,
      data: nestedData.map(function(value) {
        return {
          name: moment(value.key).format('YYYY-MM-DD'),
          y: d3.max(value.values, function(v) {
            return v.get('value');
          })
        };
      })
    }];

    this.set('content', chartData);
  }
});
