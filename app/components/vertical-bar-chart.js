import Component from 'ember-component';
import computed from 'ember-computed';
import observer from 'ember-metal/observer';

export default Component.extend({
  data: computed({
    get() {
      return [];
    }
  }),

  didInsertElement() {
    this._super(...arguments);

    let svg = d3.select(this.element).select('svg');

    this.padding = 0;
    this.width = (this.width || 600) - this.padding * 2;

    svg.attr('height', this.height).attr('viewBox', `0 0 ${this.width} ${this.height}`);

    let data = this.data.toArray();

    this.barScale = d3.scale.ordinal().domain(d3.range(0, data.length)).rangeRoundBands([this.padding, this.width], this.bandPadding || 0);

    this.heightScale = d3.scale.linear().domain([
      0, d3.max(data, function(d) {
        return d.get('valueQuantity.value');
      })
    ]).range([this.padding, this.height]);

    this.opacityScale = d3.scale.linear().domain([
      0, d3.max(data, function(d) {
        return d.get('valueQuantity.value');
      })
    ]).range([0.2, 1]);

    this.g = svg.append('g');

    let gEnter = this.g.selectAll('rect').data(data).enter();

    gEnter
      .append('rect')
      .attr('x', (d, i) => this.barScale(i))
      .attr('y', () => this.height)
      .attr('width', this.barScale.rangeBand())
      .attr('height', 0)
      .attr('fill-opacity', (d) => this.opacityScale(d.get('valueQuantity.value')));

    this.g.selectAll('rect')
          .transition()
          .attr('x', (d, i) => this.barScale(i))
          .attr('y', (d) => this.height - this.heightScale(d.get('valueQuantity.value')))
          .attr('width', this.barScale.rangeBand())
          .attr('height', (d) => this.heightScale(d.get('valueQuantity.value')))
          .attr('fill-opacity', (d) => this.opacityScale(d.get('valueQuantity.value')));
  },

  updateGraph: observer('data.[]', function updateGraph() {
    let svg = d3.select(this.element).select('svg');

    this.padding = 0;
    this.width = (this.width || 600) - this.padding * 2;

    svg.attr('height', this.height)
       .attr('viewBox', `0 0 ${this.width} ${this.height}`);

    let data = this.get('data').toArray();

    // If we don't have data let's just return until we have data.
    if (data.length === 0) {
      return;
    }

    this.barScale = d3.scale.ordinal().domain(d3.range(0, data.length)).rangeRoundBands([this.padding, this.width], this.bandPadding || 0);
    this.heightScale = d3.scale.linear().domain([
      0, d3.max(data, function(d) {
        return d.get('valueQuantity.value');
      })
    ]).range([this.padding, this.height]);

    this.opacityScale = d3.scale.linear().domain([
      0, d3.max(data, function(d) {
        return d.get('valueQuantity.value');
      })
    ]).range([0.2, 1]);

    let gData = this.g.selectAll('rect').data(data);

    gData.exit()
         .transition()
         .attr('height', () => 0)
         .remove();

    let gEnter = gData.enter();

    gEnter.append('rect')
          .attr('x', (d, i) => this.barScale(i))
          .attr('y', () => this.height)
          .attr('width', this.barScale.rangeBand())
          .attr('height', 0)
          .attr('fill-opacity', (d) => this.opacityScale(d.get('valueQuantity.value')));

    this.g.selectAll('rect')
          .transition()
          .attr('x', (d, i) => this.barScale(i))
          .attr('y', (d) => this.height - this.heightScale(d.get('valueQuantity.value')))
          .attr('width', this.barScale.rangeBand())
          .attr('height', (d) => this.heightScale(d.get('valueQuantity.value')))
          .attr('fill-opacity', (d) => this.opacityScale(d.get('valueQuantity.value')));
  })
});
