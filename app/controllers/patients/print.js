import Controller from 'ember-controller';

export default Controller.extend({
  currentAssessment: 'Catastrophic Health Event',

  actions: {
    closeWindow(event) {
      event.preventDefault();
      window.close();
    },

    print(event) {
      event.preventDefault();
      window.print();
    }
  }
});
