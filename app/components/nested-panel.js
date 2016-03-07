import Component from 'ember-component';
import computed from 'ember-computed';

let uuid = 0;

export default Component.extend({
  panelName: '',
  panelId: computed({
    get() {
      return `panel${++uuid}`;
    }
  })
});
