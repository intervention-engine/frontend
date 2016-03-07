import Component from 'ember-component';

export default Component.extend({
  maxValue: 4,
  minValue: 1,

  lowValue: 1,
  highValue: 1,

  didInsertElement() {
    this._super(...arguments);

    let slider = this.$('#riskSlider').slider({
      min: this.get('minValue'),
      max: this.get('maxValue'),
      range: true,
      value: [this.get('lowValue'), this.get('highValue')],
      formatter(val) {
        if (Array.isArray(val)) {
          if (val[0] === val[1]) {
            return val[0];
          }

          return val.join(' - ');
        }
        return val;
      }
    });

    slider.on('slideStop', (event) => {
      this.attrs.onChange(...event.value);
    });
  },

  willDestoryElement() {
    this._super(...arguments);

    if (this.isDestroyed) {
      return;
    }

    this.$('#riskSlider').slider('destroy');
  }
});
