import Mixin from 'ember-metal/mixin';
import moment from 'moment';

export default Mixin.create({
  // Method to check if something has happened in the last val*period
  inLast(field, val, period) {
    return this.sinceDate(field, val, period, new Date());
  },

  // Method to check if something will happen in the next val*period
  inNext(field, val, period) {
    return this.untilDate(field, val, period, new Date());
  },

  // Checks if something happened in val*period from startDate
  sinceDate(field, val, period, startDate) {
    let periodAgo = moment(startDate).subtract(val, period).toDate();
    return new Date(this.get(field)) > periodAgo;
  },

  untilDate(field, val, period, startDate) {
    let periodTo = moment(startDate).add(val, period).toDate();
    return new Date(this.get(field)) < periodTo;
  },

  // Check if something has occured, ie the date isn't in the future
  hasOccured(field) {
    return new Date(this.get(field)) <= new Date();
  },

  isActive(field) {
    return this.get(field) === undefined || !this.hasOccured(field);
  }
});
