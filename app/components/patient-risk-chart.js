import Ember from 'ember';
import C3Chart from 'ember-cli-c3/components/c3-chart';
import moment from 'moment';

const { computed } = Ember;

export default C3Chart.extend({
  classNames: ['patient-risk-chart'],

  offsetTime: 4,        // default time offset numeral
  offsetUnit: 'years',  // default time offset unit
  height: 54,          // default height of chart

  data: computed('chartData.[]', 'offsetTime', 'offsetUnit', function() {
    let startDate = moment().subtract(this.get('offsetTime'), this.get('offsetUnit'));

    let data = this.get('chartData').filter(function(datum) {
      return !startDate.isAfter(datum.get('date'));
    });

    // group data by dates
    let nestedData = d3.nest()
      .key((d) => moment(d.get('date')).toDate())
      .entries(data);

    let labels = nestedData.map((value) => {
      return moment(value.key).format('YYYY-MM-DD');
    });

    let chartData = nestedData.map((value) => {
      return d3.max(value.values, function(v) {
        return v.get('value');
      });
    });

    return {
      x: 'x',
      columns: [
        ['x'].concat(labels),
        ['risk'].concat(chartData)
      ],
      types: {
        risk: 'area-spline'
      }
    };
  }),

  // http://c3js.org/reference.html
  config: computed('height', {
    get() {
      return {
        axis: {
          x: {
            type: 'timeseries',
            show: false,
            tick: {
              format: '%Y-%m-%d'
            }
          },
          y: {
            show: false
          }
        },
        color: {
          pattern: ['#FFFFFF']
        },
        grid: {
          focus: {
            show: false
          }
        },
        legend: {
          show: false
        },
        padding: {
          left: 0,
          right: 0
        },
        point: {
          r: 5,
          focus: {
            expand: {
              r: 5.5
            }
          }
        },
        size: {
          height: this.get('height')
        },
        spline: {
          interpolation: {
            type: 'linear'
          }
        },
        tooltip: {
          format: {
            name(name) {
              return Ember.String.capitalize(name);
            }
          }
        }
      };
    }
  })
});
