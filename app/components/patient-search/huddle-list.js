import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import { isTodayOrAfter } from 'ember-on-fhir/helpers/is-today-or-after';
import moment from 'moment';
import Pikaday from 'pikaday';

export default Component.extend({
  selectedHuddle: null,

  huddles: computed({
    get() {
      return [];
    }
  }),

  firstHuddle: computed('huddles.@each.date', {
    get() {
      return this.get('huddles').filter((huddle) => isTodayOrAfter([huddle.get('date')])).sortBy('date').objectAt(0);
    }
  }),

  huddleDateMap: computed('huddles.@each.date', {
    get() {
      let map = {};
      let huddles = this.get('huddles');

      for (let i = 0; i < huddles.length; i++) {
        let date = moment(huddles[i].get('date')).format('YYYY-MM-DD');
        map[date] = huddles[i];
      }

      return map;
    }
  }),

  minDate: computed('huddles.@each.date', {
    get() {
      let huddles = this.get('huddles');
      if (huddles.length === 0) {
        return null;
      }
      return get(this.get('huddles').sortBy('date').objectAt(0), 'date');
    }
  }),

  maxDate: computed('huddles.@each.date', {
    get() {
      let huddles = this.get('huddles');
      if (huddles.length === 0) {
        return null;
      }
      return get(huddles.sortBy('date').objectAt(huddles.length - 1), 'date');
    }
  }),

  active: computed.notEmpty('selectedHuddle'),

  didInsertElement() {
    this._super(...arguments);

    let defaultDate = null;
    let setDefaultDate = false;
    let selectedHuddle = this.get('selectedHuddle');
    let firstHuddle = this.get('firstHuddle');
    if (selectedHuddle) {
      defaultDate = selectedHuddle.get('date');
      setDefaultDate = true;
    } else if (firstHuddle) {
      defaultDate = firstHuddle.get('date');
    }

    this.pikaday = new Pikaday({
      field: document.getElementById('huddleFilterInput'),
      trigger: document.getElementById('huddleFilterSelector'),
      defaultDate,
      setDefaultDate,
      minDate: this.get('minDate'),
      maxDate: this.get('maxDate'),
      disableDayFn: (date) => {
        let huddleDateMap = this.get('huddleDateMap');
        return huddleDateMap[moment(date).format('YYYY-MM-DD')] === undefined;
      },
      onSelect: (date) => {
        let huddleDateMap = this.get('huddleDateMap');
        this.attrs.selectHuddle(huddleDateMap[moment(date).format('YYYY-MM-DD')]);
      }
    });
  },

  willDestoryElement() {
    this._super(...arguments);

    if (this.pikaday) {
      this.pikaday.destroy();
      this.pikaday = null;
    }
  },

  actions: {
    toggle(event) {
      let selectedHuddle = this.get('selectedHuddle');
      if (selectedHuddle) {
        this.attrs.selectHuddle(null);
        this.pikaday.setDate(null, true);
      } else {
        let firstHuddle = this.get('firstHuddle');

        // do nothing if there are no huddles to select
        if (firstHuddle == null) {
          event.preventDefault();
          event.stopImmediatePropagation();
          return;
        }

        this.attrs.selectHuddle(firstHuddle);
        this.pikaday.setDate(firstHuddle.get('date'), true);
      }
    }
  }
});
