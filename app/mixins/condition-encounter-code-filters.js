import Ember from 'ember';

const ICD9_CODE_SAMPLE = [{"code":"401.9","name":"Hypertension"},{"code":"250.00","name":"Diabetes"},{"code":"290.0","name":"Dementia"},{"code":"482.9","name":"Bacterial Pneumonia"},{"code":"428.0","name":"Congestive Heart Failure"},{"code":"365.72","name":"Glaucoma"},{"code":"711.90","name":"Arthritis"},{"code":"487.8","name":"Influenza"},{"code":"733.01","name":"Osteoporosis"},{"code":"466.0","name":"Chronic Bronchitis"},{"code":"389.9","name":"Hearing Loss"},{"code":"535.00","name":"Gastritis"},{"code":"244.9","name":"Hypothyroidism"},{"code":"285.9","name":"Anemia"},{"code":"492.8","name":"Emphysema"},{"code":"533.30","name":"Peptic Ulcer"},{"code":"554.1","name":"Varicose Veins"},{"code":"362.50","name":"Macular Degeneration"},{"code":"274.9","name":"Gout"},{"code":"564.00","name":"Constipation"},{"code":"440.9","name":"Athersclerosis"},{"code":"416.9","name":"Pulmonary Heart Disease"},{"code":"530.81","name":"Esophageal Reflux"},{"code":"003.9","name":"Salmonella"},{"code":"011.90","name":"Pulmonary Tuberculosis"},{"code":"265.0","name":"Beriberi"},{"code":"377.75","name":"Cortical Blindness"},{"code":"733.20","name":"Bone Cyst"},{"code":"814.00","name":"Carpal Bone Fracture"},{"code":"825.20","name":"Foot Fracture"},{"code":"541","name":"Appendicitis"},{"code":"943.01","name":"Forearm Burn"},{"code":"945.06","name":"Thigh Burn"},{"code":"004.2","name":"Shigella"},{"code":"023.9","name":"Brucellosis"},{"code":"033.0","name":"Whooping Cough (B. Pertussis)"},{"code":"081.9","name":"Typhus"},{"code":"072.9","name":"Mumps"},{"code":"272.4","name":"Hyperlipidemia"},{"code":"781.1","name":"Disturbances of Smell and Taste"},{"code":"162.9","name":"Lung Cancer"},{"code":"153.9","name":"Colon Cancer"},{"code":"172.9","name":"Skin Cancer (Melanoma)"},{"code":"585.3","name":"Chronic Kidney Disease"},{"code":"155.2","name":"Liver Cancer"},{"code":"478.9","name":"Upper Respiratory Tract Disease"},{"code":"571.5","name":"Cirrhosis of Liver"},{"code":"117.3","name":"Aspergillosis"},{"code":"136.0","name":"Ainhum"},{"code":"266.0","name":"Ariboflavinosis"},{"code":"276.2","name":"Acidosis"},{"code":"041.00","name":"Streptococcus"},{"code":"696.1","name":"Psoriasis"},{"code":"204.90","name":"Lymphatic Leukemia"},{"code":"279.06","name":"Common Variable Immunodeficieny"},{"code":"324.1","name":"Intraspinal Abscess"},{"code":"324.0","name":"Intracranial Abscess"},{"code":"780.52","name":"Insomnia"},{"code":"346.70","name":"Chronic Migraines"},{"code":"345.90","name":"Epilepsy"},{"code":"360.60","name":"Foreign Body in Eye"},{"code":"E819.0","name":"Injuries from a Motor Vehicle Accident"},{"code":"E880.9","name":"Injuries from a Fall on Stairs"},{"code":"523.01","name":"Gingivitis"},{"code":"692.70","name":"Dermatitis due to Sun Exposure"},{"code":"737.30","name":"Scoliosis Idiopathic"},{"code":"788.30","name":"Urinary Incontinence"},{"code":"432.9","name":"Intracranial Hemorrhaging"},{"code":"388.70","name":"Otalgia (Earache)"},{"code":"537.3","name":"Obstruction of Duodenum"},{"code":"550.90","name":"Inguinal Hernia"},{"code":"873.63","name":"Broken Tooth"},{"code":"787.20","name":"Dysphagia (Trouble Swallowing)"},{"code":"599.0","name":"Urinary Tract Infection"},{"code":"434.90","name":"Stroke without Cerebral Infarction"},{"code":"434.91","name":"Stroke with Cerebral Infarction"},{"code":"296.30","name":"Major Depressive Disorder"},{"code":"571.2","name":"Alcoholic Cirrhosis of Liver"},{"code":"185","name":"Prostate Cancer"},{"code":"174.9","name":"Breast Cancer"},{"code":"998.59","name":"Post-Operative Infection"},{"code":"427.31","name":"Atrial Fibrillation"}];

export default Ember.Mixin.create({
  codingSystems: [
    { url: "http://hl7.org/fhir/sid/icd-9", system: "ICD-9" },
    { url: "http://hl7.org/fhir/sid/icd-10", system: "ICD-10" },
    { url: "http://snomed.info/sct", system: "SNOMED CT" },
    { url: "http://loinc.org", system: "LOINC" },
    { url: "http://www.hl7.org/FHIR/valueset-dicom-dcim.html", system: "DCM" },
    { url: "http://unitsofmeasure.org", system: "UCUM" },
    { url: "http://www.radlex.org/", system: "RadLex" },
    { url: "http://www.whocc.no/atc", system: "WHO" },
    { url: "urn:std:iso:11073:10101", system: "ISO 11073-10101" }
  ],

  selectedCodingSystem: null,

  codeValue: codingComputedProperty('code'),
  system: codingComputedProperty('system'),

  // since we're not using 2 way binding on the select-fx component, the only way
  // to set the default value to ICD-9 is to use an observer
  _onActivate: Ember.observer('active', function() {
    if (!this.get('active')) {
      return;
    }

    this.send('selectCodingSystem', this.get('codingSystems.firstObject.system'));
  }),

  _setupTypeahead: Ember.on('didRender', function _setupTypeahead() {
    let self = this;

    this.$('.typeahead').typeahead({
      delay: 1000,
      displayText(item) { return `${item.code}: ${item.name}`; },
      matcher() { return true; },

      source(query, process) {
        let promise = Ember.RSVP.resolve(filterCodes(query)); // TODO: change this to AJAX query to get a list of results
        promise.then((result) => process(result));
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
  }),

  _teardownTypeahead: Ember.on('willDestroyElement', 'willUpdate', function _teardownTypeahead() {
    if (this.isDestroyed) {
      return;
    }

    this.$('.typeahead').typeahead('destroy');
  }),

  actions: {
    selectCodingSystem(codeSystem) {
      let codingSystem = this.get('codingSystems').findBy('system', codeSystem);

      this.set('selectedCodingSystem', codingSystem);
      this.set('system', codingSystem.url);
    }
  }
});

function codingComputedProperty(propertyName) {
  return Ember.computed({
    get() {
      return this.get(`characteristic.valueCodeableConcept.coding.firstObject.${propertyName}`);
    },

    set(property, value) {
      let coding = this.get('characteristic.valueCodeableConcept.coding.firstObject');
      if (coding) {
        coding.set(propertyName, value);
      }
    }
  });
}

// TODO: remove this when backend call is implemented
function filterCodes(query) {
  query = query.toLowerCase();
  return ICD9_CODE_SAMPLE.filter((value) => {
    return (~value.name.toLowerCase().indexOf(query)) || (~value.code.indexOf(query));
  });
}
