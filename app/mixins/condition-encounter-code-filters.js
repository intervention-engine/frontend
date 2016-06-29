import Ember from 'ember';
import run from 'ember-runloop';
import service from 'ember-service/inject';

const AUTOCOMPLETE_ITEM_MAX = 10;

export default Ember.Mixin.create({
  ajax: service(),

  // codingSystems: [
  //   { url: 'http://hl7.org/fhir/sid/icd-9', system: 'ICD-9' },
  //   { url: 'http://hl7.org/fhir/sid/icd-10', system: 'ICD-10' },
  //   { url: 'http://snomed.info/sct', system: 'SNOMED CT' },
  //   { url: 'http://loinc.org', system: 'LOINC' },
  //   { url: 'http://www.hl7.org/FHIR/valueset-dicom-dcim.html', system: 'DCM' },
  //   { url: 'http://unitsofmeasure.org', system: 'UCUM' },
  //   { url: 'http://www.radlex.org/', system: 'RadLex' },
  //   { url: 'http://www.whocc.no/atc', system: 'WHO' },
  //   { url: 'urn:std:iso:11073:10101', system: 'ISO 11073-10101' },
  //   { url: 'http://www.ama-assn.org/go/cpt', system: 'CPT' }
  // ],

  selectedCodingSystem: null,

  // codeValue: codingComputedProperty('code'),
  // system: codingComputedProperty('system'),

  codeChangedObserver: Ember.observer('characteristic.valueCodeableConcept.coding.@each.system', 'characteristic.valueCodeableConcept.coding.@each.code', function() {
    run.debounce(this, this.attrs.onChange, 150);
  }),

  // since we're not using 2 way binding on the select-fx component, the only way
  // to set the default value to ICD-9 is to use an observer
  onToggle(active) {
    this._super(active);

    if (active) {
      this.send('selectCodingSystem', this.get('characteristic.valueCodeableConcept.coding.firstObject'), this.get('codingSystems.firstObject.system'));
    }
  },

  didRender() {
    this._super(...arguments);

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
        let codings = self.get('characteristic.valueCodeableConcept.coding').toArray();
        let codesystem = codings[this.$element.attr('index')].get('system');
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

        self.set('codeValue', val ? val.code : null); // custom

        return this.hide();
      }
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    this._teardownTypeahead();
  },

  willUpdate() {
    this._super(...arguments);
    this._teardownTypeahead();
  },

  _teardownTypeahead() {
    if (this.isDestroyed) {
      return;
    }

    this.$('.typeahead').typeahead('destroy');
  },

  actions: {
    selectCodingSystem(coding, codeSystem) {
      let codingSystem = this.get('codingSystems').findBy('system', codeSystem);
      // this.set('selectedCodingSystem', codingSystem);
      coding.set('system', codingSystem.url);
    },

    addCode(context) {
      let conditionCoding = context.get('store').createRecord('coding');
      conditionCoding.set('system', this.get('codingSystems.firstObject').url);
      context.get('coding').pushObject(conditionCoding);
    },

    removeCode(context, code) {
      context.get('coding').removeObject(code);
    }
  }
});

// function codingComputedProperty(propertyName) {
//   return Ember.computed({
//     get() {
//       return this.get(`characteristic.valueCodeableConcept.coding.firstObject.${propertyName}`);
//     },

//     set(property, value) {
//       let coding = this.get('characteristic.valueCodeableConcept.coding.firstObject');
//       if (coding) {
//         run(this, () => {
//           coding.set(propertyName, value);
//         });
//         this.attrs.onChange();
//       }
//     }
//   });
// }
