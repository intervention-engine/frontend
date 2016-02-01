import Component from 'ember-component';
import computed from 'ember-computed';

export default Component.extend({
  populations: computed({
    get() {
      return [];
    }
  }),

  selectedPopulations: computed({
    get() {
      return [];
    }
  }),

  actions: {
    togglePopulation(population, event) {
      this.attrs.togglePopulation(population, event.target.checked);
    }
  }
});
