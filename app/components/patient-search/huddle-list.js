import Component from 'ember-component';
import computed from 'ember-computed';
import moment from 'moment';

export default Component.extend({
  nextMonday: computed({
    get() {
      let now = moment();
      let currentDay = now.day();

      if (currentDay === 1) {
        // today is Monday
        return now;
      } else if (currentDay < 1) {
        // today is Sunday
        return now.day(1);
      } else if (currentDay > 1) {
        // today is after Monday but before Sunday
        return now.day(8);
      }
    }
  })
});
