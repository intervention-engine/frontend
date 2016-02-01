import Component from 'ember-component';
import observer from 'ember-metal/observer';

export default Component.extend({
  width: 200,
  height: 10,
  max: 0,
  value: 0,

  didInsertElement() {
    this._super(...arguments);
    this._renderChart();
  },

  _renderChart: observer('width', 'height', 'max', 'value', function _renderChart() {
    let width = parseInt(this.get('width'), 10);
    let height = parseInt(this.get('height'), 10);

    let value = parseFloat(this.get('value')) || 0;
    let max = parseFloat(this.get('max')) || 0;

    let widthScale = d3.scale.linear()
                             .domain([0, Math.max.call(Math, max, value)])
                             .range([0, width]);

    let element = d3.select(this.element);
    element.selectAll('svg').remove();

    let svg = d3.select(this.element)
                .append('svg')
                .attr('width', width)
                .attr('height', height);

    svg.append('rect')
       .attr('width', width)
       .attr('height', height)
       .classed('background', true);

    svg.append('rect')
       .attr('width', widthScale(value))
       .attr('height', height)
       .classed('bar', true);
  })
});
