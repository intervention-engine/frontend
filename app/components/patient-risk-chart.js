import Ember from 'ember';
import C3Chart from 'ember-cli-c3/components/c3-chart';
import moment from 'moment';
import get from 'ember-metal/get';
import run from 'ember-runloop';

const { computed } = Ember;

export default C3Chart.extend({
  classNames: ['patient-risk-chart'],

  selectedRisk: null,

  offsetTime: 4,        // default time offset numeral
  offsetUnit: 'years',  // default time offset unit
  height: 54,           // default height of chart

  didInsertElement() {
    this._super(...arguments);

    this.get('chart').select(null, [this.get('filteredChartData.length') - 1]);
  },

  filteredChartData: computed('chartData.[]', 'offsetTime', 'offsetUnit', function filteredChartData() {
    let startDate = moment().subtract(this.get('offsetTime'), this.get('offsetUnit'));

    return this.get('chartData').filter(function(datum) {
      return !startDate.isAfter(datum.get('date'));
    });
  }),

  data: computed('filteredChartData.[]', function() {
    let data = this.get('filteredChartData');

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
      },
      selection: {
        enabled: true,
        multiple: false
      },
      onselected: () => {
        let index = get(this.get('chart').selected(), 'firstObject.index');
        if (index != null) {
          let selectedDataPoint = data.objectAt(index);
          if (selectedDataPoint !== this.get('selectedRisk')) {
            this.attrs.setSelectedRisk(selectedDataPoint);
          }
        }
      },
      onunselected: () => {
        run(() => this.attrs.setSelectedRisk(null));

        run.later(() => {
          if (this.get('chart').selected().length === 0) {
            let index = this.get('filteredChartData').indexOf(this.get('selectedRisk'));
            if (index !== -1) {
              this.get('chart').select(null, [index]);
            }
          }
        });
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
          },
          select: {
            r: 6.5
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
