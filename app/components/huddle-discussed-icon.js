import Component from 'ember-component';
import computed from 'ember-computed';
import moment from 'moment';

export default Component.extend({
  tagName: 'i',
  classNameBindings: ['iconClass'],

  huddle: null,
  patient: null,

  didInsertElement() {
    this._super(...arguments);

    this.$().tooltip({
      container: 'body',
      title: () => {
        let reviewed = this.get('reviewed');
        if (reviewed != null) {
          return `Discussed on ${moment(reviewed).format('ll')}`;
        }
      }
    });
  },

  willDestoryElement() {
    this._super(...arguments);
    this.$().tooltip('destroy');
  },

  huddlePatient: computed('huddle', 'patient', {
    get() {
      let huddle = this.get('huddle');
      if (huddle) {
        return huddle.getHuddlePatient(this.get('patient'));
      }
    }
  }),

  reviewed: computed.oneWay('huddlePatient.reviewed'),

  iconClass: computed('reviewed', {
    get() {
      if (this.get('reviewed') != null) {
        return 'fa fa-fw fa-check-square-o';
      }
      return 'hidden';
    }
  })
});
