import Component from 'ember-component';
import computed from 'ember-computed';
import service from 'ember-service/inject';

const AUTOCOMPLETE_ITEM_MAX = 10;

export default Component.extend({
  ajax: service(),

  tagName: 'span',

  classNames: ['pane-input'],

  type: null,
  placeholder: null,
  coding: null,

  displayValue: computed({
    get() {
      return this.get('coding.code');
    },

    set(key, value) {
      return value;
    }
  }),

  didInsertElement() {
    let self = this;

    this.$('.typeahead').typeahead({
      delay: 750,
      items: AUTOCOMPLETE_ITEM_MAX,
      displayText(item) {
        return `${item.code}: ${item.name}`;
      },
      matcher() {
        return true;
      },
      sorter(items) {
        return items;
      },
      source(query, process) {
        let codesystem = self.get('coding.display');
        let queryParams = {
          codesystem,
          query,
          limit: AUTOCOMPLETE_ITEM_MAX
        };

        let request = self.get('ajax').request('/CodeLookup', {
          type: 'POST',
          data: JSON.stringify(queryParams),
          contentType: 'application/json'
        });

        request.then((results) => {
          process(results.map((result) => {
            return { name: result.Name, code: result.Code };
          }));
        });
      },

      // FROM: https://github.com/bassjobsen/Bootstrap-3-Typeahead/blob/master/bootstrap3-typeahead.js#L75
      select() {
        let val = this.$menu.find('.active').data('value');
        this.$element.data('active', val);

        if (this.autoSelect || val) {
          let newVal = this.updater(val);
          this.$element
            .val(this.displayText(newVal) || newVal)
            .change();
          this.afterSelect(newVal);
        }

        // custom code
        self.set('displayValue', val ? `${val.code}: ${val.name}` : null);
        self.get('coding').set('code', val ? val.code : null);

        return this.hide();
      }
    });
  },

  willDestroyElement() {
    this._super(...arguments);

    if (this.isDestroyed) {
      return;
    }

    this.$('.typeahead').typeahead('destroy');
  },

  actions: {
    updateCode(event) {
      let val = event.target.value;
      if (val === '') {
        val = null;
      }

      this.get('coding').set('code', val);
      this.set('displayValue', val);
    }
  }
});
