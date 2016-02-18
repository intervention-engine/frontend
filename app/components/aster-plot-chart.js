import Component from 'ember-component';
import observer from 'ember-metal/observer';
import computed from 'ember-computed';

export default Component.extend({
  data: computed({
    get() {
      return [];
    }
  }),

  svg: null,
  patient: null,
  padding: 5,
  size: 600,
  selectedCategory: null,

  didInsertElement() {
    this._super(...arguments);

    let svg = d3.select(this.element).select('svg');
    let width = this.get('size') - 2 * this.get('padding');
    let height = width;

    let g = svg.append('g').attr('transform', `translate(${width / 2 + this.get('padding')}, ${height / 2 + this.get('padding')})`);

    g.append('g').classed('outer', true);
    g.append('g').classed('inner', true);

    this.updateChart();
  },

  updateChart: observer('data', function updateChart() {
    let svg = d3.select(this.element).select('svg');
    if (svg == null || !this.get('data')) {
      return;
    }

    let data = this.get('data');
    let width = this.get('size') - 2 * this.get('padding');
    let height = width;
    let maxValue = d3.max(data, function(d) {
      return d.value;
    });
    let outerRadius = d3.min([width, height]) / 2;
    let radius = outerRadius * 0.80;
    let innerRadius = 0.17 * radius;
    let minRadius = 0.34 * radius;
    let maxSliceRadius = 0.8 * radius;

    let selectCategory = (d) => {
      svg.selectAll('.category').classed('active', false);
      if (this.get('selectedCategory') === d.data) {
        this.attrs.selectCategory(null);
      } else {
        svg.selectAll(`.category${d.data.name.camelize().capitalize()}`).classed('active', true);
        this.attrs.selectCategory(d.data);
      }
    };

    let tip = d3.tip().attr('class', 'd3-tip').html((d) => `${d.data.name} : ${d.data.value}`);

    svg.call(tip);

    let pie = d3.layout.pie().padAngle(0.03).sort(null).value((d) => d.weight);

    let radiusScale = d3.scale.linear().domain([0, 1]).range([minRadius, maxSliceRadius]).clamp(true);
    let opacityScale = d3.scale.linear().domain([0, 1]).range([0.4, 1]);
    let outerArc = d3.svg.arc().innerRadius(200).outerRadius(radius).cornerRadius(5);

    let outerpath = svg.select('g').select('.outer').selectAll('path').data(pie(data));
    outerpath.enter().append('path');
    outerpath.exit().remove();
    outerpath.on('mouseover', tip.show).on('mouseout', tip.hide).attr('d', outerArc).attr('fill-opacity', function(d) {
      return opacityScale(d3.max([d.data.value, 0]) / (d.data.maxValue || maxValue));
    }).attr('class', function(d) {
      return `category category${d.data.name.camelize().capitalize()}`;
    }).on('click', selectCategory);

    let arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(function(d) {
      return radiusScale(d3.max([d.data.value, 0]) / (d.data.maxValue || maxValue));
    }).cornerRadius(5);

    let pathingData = svg.select('g').select('.inner').selectAll('path').data(pie(data));
    pathingData.enter().append('path');
    pathingData.exit().remove();
    pathingData.on('mouseover', tip.show).on('mouseout', tip.hide).attr('d', arc).attr('fill-opacity', function(d) {
      return opacityScale(d3.max([d.data.value, 0]) / (d.data.maxValue || maxValue));
    }).attr('class', function(d) {
      return `category category${d.data.name.camelize().capitalize()}`;
    }).on('click', selectCategory);
  })
});
