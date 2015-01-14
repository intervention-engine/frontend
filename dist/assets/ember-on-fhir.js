define("ember-on-fhir/adapters/application", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var ApplicationAdapter;

    ApplicationAdapter = DS.RESTAdapter.extend({
      pathForType: function(type) {
        return Ember.String.capitalize(type);
      }
    });

    __exports__["default"] = ApplicationAdapter;
  });
define("ember-on-fhir/app", 
  ["ember","ember/resolver","ember/load-initializers","ember-on-fhir/config/environment","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var Resolver = __dependency2__["default"];
    var loadInitializers = __dependency3__["default"];
    var config = __dependency4__["default"];

    Ember.MODEL_FACTORY_INJECTIONS = true;

    var App = Ember.Application.extend({
      modulePrefix: config.modulePrefix,
      podModulePrefix: config.podModulePrefix,
      Resolver: Resolver
    });

    loadInitializers(App, config.modulePrefix);

    __exports__["default"] = App;
  });
define("ember-on-fhir/components/age-filter", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var AgeFilterComponent;

    AgeFilterComponent = Ember.Component.extend({
      item: null
    });

    __exports__["default"] = AgeFilterComponent;
  });
define("ember-on-fhir/components/condition-code-filter", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var ConditionCodeFilterComponent;

    ConditionCodeFilterComponent = Ember.Component.extend({
      item: null
    });

    __exports__["default"] = ConditionCodeFilterComponent;
  });
define("ember-on-fhir/components/encounter-code-filter", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var EncounterCodeFilterComponent;

    EncounterCodeFilterComponent = Ember.Component.extend({
      item: null
    });

    __exports__["default"] = EncounterCodeFilterComponent;
  });
define("ember-on-fhir/components/gender-filter", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var GenderFilterComponent;

    GenderFilterComponent = Ember.Component.extend({
      item: null
    });

    __exports__["default"] = GenderFilterComponent;
  });
define("ember-on-fhir/components/navbar-active-link", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var NavbarActiveLinkComponent;

    NavbarActiveLinkComponent = Ember.Component.extend({
      tagName: 'li',
      classNameBindings: ['active'],
      active: (function() {
        return this.get('childViews.firstObject.active');
      }).property('childViews.firstObject.active')
    });

    __exports__["default"] = NavbarActiveLinkComponent;
  });
define("ember-on-fhir/components/radio-button", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var RadioButtonComponent;

    RadioButtonComponent = Ember.Component.extend({
      tagName: 'input',
      attributeBindings: ['type', 'checked'],
      type: 'radio',
      checked: (function() {
        return this.get('value') === this.get('name');
      }).property('value', 'name'),
      click: function() {
        return this.set('name', this.get('value'));
      }
    });

    __exports__["default"] = RadioButtonComponent;
  });
define("ember-on-fhir/components/x-drag", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var XDragComponent;

    XDragComponent = Ember.Component.extend({
      dragStart: function(event) {
        return event.dataTransfer.setData("text/data", this.get("templatePath"));
      }
    });

    __exports__["default"] = XDragComponent;
  });
define("ember-on-fhir/components/x-drop", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var XDropComponent;

    XDropComponent = Ember.Component.extend({
      dragOver: function(event) {
        return event.preventDefault();
      },
      dragEnter: function(event) {
        if (event.dataTransfer.types.contains("text/data")) {
          return this.set('droppable', true);
        }
      },
      dragLeave: function() {
        return this.set('droppable', false);
      },
      drop: function(event) {
        var data;
        this.set('droppable', false);
        data = event.dataTransfer.getData('text/data');
        if (data === "") {
          return;
        }
        return this.sendAction('action', data);
      },
      actions: {
        removePane: function(pane) {
          return this.model.get("panes").removeObject(pane);
        }
      }
    });

    __exports__["default"] = XDropComponent;
  });
define("ember-on-fhir/controllers/application", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var ApplicationController;

    ApplicationController = Ember.Controller.extend({
      logoURL: "/assets/images/logo.png"
    });

    __exports__["default"] = ApplicationController;
  });
define("ember-on-fhir/controllers/filters/new", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var FiltersNewController;

    FiltersNewController = Ember.Controller.extend({
      hasFilterPane: (function() {
        return this.get('model.panes.length') > 0;
      }).property('model.panes.length')
    });

    __exports__["default"] = FiltersNewController;
  });
define("ember-on-fhir/helpers/dynamic-component", 
  ["ember","ember-dynamic-component","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var DynamicComponentView = __dependency2__.DynamicComponentView;

    var isHTMLBars = !!Ember.HTMLBars;

    function htmlbarsHelper(properties, hash, options, env) {
      Ember.assert("You can only pass attributes (such as name=value) not bare " + "values to {{dynamic-component}} '", properties.length === 0);

      hash._dynamicOptions = hash;

      return env.helpers.view.helperFunction.call(this, [DynamicComponentView], hash, options, env);
    }

    function handlebarsHelper(options) {
      Ember.assert("You can only pass attributes (such as name=value) not bare " + "values to {{dynamic-component}} '", arguments.length < 2);

      // pass the options through to the resulting view
      // is there a valid type to use here?
      // this works but...
      options.hashTypes._dynamicOptions = "OBJECT";
      options.hash._dynamicOptions = options.hash;

      return Ember.Handlebars.helpers.view.call(this, DynamicComponentView, options);
    }

    function makeHelper() {
      if (isHTMLBars) {
        return {
          isHTMLBars: true,
          helperFunction: htmlbarsHelper,
          preprocessArguments: function () {}
        };
      } else {
        return handlebarsHelper;
      }
    }

    __exports__["default"] = makeHelper();
  });
define("ember-on-fhir/initializers/export-application-global", 
  ["ember","ember-on-fhir/config/environment","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var config = __dependency2__["default"];

    function initialize(container, application) {
      var classifiedName = Ember.String.classify(config.modulePrefix);

      if (config.exportApplicationGlobal) {
        window[classifiedName] = application;
      }
    };
    __exports__.initialize = initialize;
    __exports__["default"] = {
      name: "export-application-global",

      initialize: initialize
    };
  });
define("ember-on-fhir/models/accomodation", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Accomodation;

    Accomodation = DS.Model.extend({
      bed: DS.belongsTo("resource-reference"),
      period: DS.belongsTo("period")
    });

    __exports__["default"] = Accomodation;
  });
define("ember-on-fhir/models/address", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Address;

    Address = DS.Model.extend({
      use: DS.attr('string'),
      text: DS.attr('string'),
      line: DS.attr('string'),
      city: DS.attr('string'),
      state: DS.attr('string'),
      zip: DS.attr('string'),
      country: DS.attr('string'),
      period: DS.belongsTo('period')
    });

    __exports__["default"] = Address;
  });
define("ember-on-fhir/models/animal", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Animal;

    Animal = DS.Model.extend({
      species: DS.belongsTo('codeable-concept'),
      breed: DS.belongsTo('codeable-concept'),
      genderStatus: DS.belongsTo('codeable-concept')
    });

    __exports__["default"] = Animal;
  });
define("ember-on-fhir/models/attachment", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Attachment;

    Attachment = DS.Model.extend({
      contentType: DS.attr('string'),
      language: DS.attr('string'),
      url: DS.attr('string'),
      size: DS.attr(),
      title: DS.attr('string')
    });

    __exports__["default"] = Attachment;
  });
define("ember-on-fhir/models/codeable-concept", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var CodeableConcept;

    CodeableConcept = DS.Model.extend({
      coding: DS.hasMany('coding'),
      text: DS.attr('string')
    });

    __exports__["default"] = CodeableConcept;
  });
define("ember-on-fhir/models/coding", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Coding;

    Coding = DS.Model.extend({
      system: DS.attr('string'),
      version: DS.attr('string'),
      code: DS.attr('string'),
      display: DS.attr('string'),
      primary: DS.attr('boolean'),
      valueSet: DS.belongsTo('resource-reference')
    });

    __exports__["default"] = Coding;
  });
define("ember-on-fhir/models/contact-point", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var ContactPoint;

    ContactPoint = DS.Model.extend({
      system: DS.attr('string'),
      value: DS.attr('string'),
      use: DS.attr('string'),
      period: DS.belongsTo('period')
    });

    __exports__["default"] = ContactPoint;
  });
define("ember-on-fhir/models/contact", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Contact;

    Contact = DS.Model.extend({
      relationship: DS.hasMany('codeable-concept'),
      name: DS.belongsTo('human-name'),
      telecom: DS.hasMany('contact-point'),
      address: DS.belongsTo('address'),
      gender: DS.attr('string'),
      organization: DS.belongsTo('reference')
    });

    __exports__["default"] = Contact;
  });
define("ember-on-fhir/models/date", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Date;

    Date = DS.Model.extend({
      time: DS.attr("date"),
      precision: DS.attr("string")
    });

    __exports__["default"] = Date;
  });
define("ember-on-fhir/models/ember-item", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var EmberItem;

    EmberItem = DS.Model.extend({
      parameter: DS.belongsTo("extension"),
      active: DS.attr("boolean", {
        defaultValue: false
      }),
      filterType: DS.attr(),
      componentName: DS.attr("string")
    });

    __exports__["default"] = EmberItem;
  });
define("ember-on-fhir/models/encounter", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Encounter;

    Encounter = DS.Model.extend({
      identifier: DS.hasMany('identifier'),
      status: DS.attr('string'),
      "class": DS.attr('string'),
      type: DS.hasMany('codeable-concept'),
      subject: DS.belongsTo('resource-reference'),
      participant: DS.hasMany('participant'),
      fulfills: DS.belongsTo('resource-reference'),
      period: DS.belongsTo('period'),
      length: DS.belongsTo('quantity'),
      reason: DS.belongsTo('codeable-concept'),
      indication: DS.belongsTo('resource-reference'),
      priority: DS.belongsTo('codeable-concept'),
      hospitalization: DS.belongsTo('hospitalization'),
      location: DS.hasMany('location'),
      serviceProvider: DS.belongsTo('resource-reference'),
      partOf: DS.belongsTo('resource-reference')
    });

    __exports__["default"] = Encounter;
  });
define("ember-on-fhir/models/extension", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Extension;

    Extension = DS.Model.extend({
      url: DS.attr('string'),
      value: DS.attr(),
      valueString: DS.attr("string"),
      valueCodeableConcept: DS.belongsTo("codeable-concept")
    });

    __exports__["default"] = Extension;
  });
define("ember-on-fhir/models/filter", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Filter;

    Filter = DS.Model.extend({
      name: DS.attr("string"),
      description: DS.attr("string"),
      query: DS.belongsTo("query"),
      panes: DS.hasMany("pane"),
      url: DS.attr("string"),
      results: DS.attr("number"),
      buildQuery: function() {
        var activeItems, item, itemSet, _i, _len, _results;
        if (!this.get('query')) {
          this.set('query', this.store.createRecord("query", {}));
        }
        activeItems = this.get("panes").map(function(pane) {
          return pane.get("items").filterBy("active", true);
        });
        _results = [];
        for (_i = 0, _len = activeItems.length; _i < _len; _i++) {
          itemSet = activeItems[_i];
          _results.push((function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (_j = 0, _len1 = itemSet.length; _j < _len1; _j++) {
              item = itemSet[_j];
              _results1.push(this.get('query.parameter').pushObject(item.get('parameter')));
            }
            return _results1;
          }).call(this));
        }
        return _results;
      }
    });

    __exports__["default"] = Filter;
  });
define("ember-on-fhir/models/hospitalization", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Hospitalization;

    Hospitalization = DS.Model.extend({
      preAdmissionIdentifier: DS.belongsTo('identifier'),
      origin: DS.belongsTo('resource-reference'),
      admitSource: DS.belongsTo('codeable-concept'),
      period: DS.belongsTo('period'),
      accomodation: DS.hasMany('accomodation'),
      diet: DS.belongsTo('codeable-concept'),
      specialCourtesy: DS.hasMany('codeable-concept'),
      specialArrangement: DS.hasMany('codeable-concept'),
      destination: DS.belongsTo('resource-reference'),
      dischargeDisposition: DS.belongsTo('codeable-concept'),
      dischargeDiagnosis: DS.belongsTo('resource-reference'),
      reAdmission: DS.attr('boolean')
    });

    __exports__["default"] = Hospitalization;
  });
define("ember-on-fhir/models/human-name", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var HumanName;

    HumanName = DS.Model.extend({
      use: DS.attr('string'),
      text: DS.attr('string'),
      family: DS.attr('string'),
      given: DS.attr('string'),
      prefix: DS.attr('string'),
      suffix: DS.attr('string'),
      period: DS.belongsTo('period')
    });

    __exports__["default"] = HumanName;
  });
define("ember-on-fhir/models/identifier", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Identifier;

    Identifier = DS.Model.extend({
      use: DS.attr('string'),
      label: DS.attr('string'),
      system: DS.attr('string'),
      value: DS.attr('string'),
      period: DS.belongsTo('period'),
      assigner: DS.belongsTo('resource-reference')
    });

    __exports__["default"] = Identifier;
  });
define("ember-on-fhir/models/link", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Link;

    Link = DS.Model.extend({
      other: DS.belongsTo('reference'),
      type: DS.attr('string')
    });

    __exports__["default"] = Link;
  });
define("ember-on-fhir/models/location", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Location;

    Location = DS.Model.extend({
      location: DS.belongsTo('resource-reference'),
      period: DS.belongsTo('period')
    });

    __exports__["default"] = Location;
  });
define("ember-on-fhir/models/pane", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Pane;

    Pane = DS.Model.extend({
      icon: DS.attr("string", {
        defaultValue: "fa-user"
      }),
      items: DS.hasMany('ember-item')
    });

    __exports__["default"] = Pane;
  });
define("ember-on-fhir/models/participant", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Participant;

    Participant = DS.Model.extend({
      type: DS.hasMany('codeable-concept'),
      individual: DS.belongsTo('resource-reference')
    });

    __exports__["default"] = Participant;
  });
define("ember-on-fhir/models/patient", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Patient;

    Patient = DS.Model.extend({
      identifier: DS.hasMany('identifier'),
      name: DS.hasMany('human-name'),
      telecom: DS.hasMany('contact-point'),
      gender: DS.attr('string'),
      birthDate: DS.attr('date'),
      deceasedBoolean: DS.attr('boolean'),
      deceasedDateTime: DS.attr('date'),
      address: DS.hasMany('address'),
      maritalStatus: DS.belongsTo('codeable-concept'),
      multipleBirthBoolean: DS.attr('boolean'),
      multipleBirthInteger: DS.attr(),
      photo: DS.hasMany('attachment'),
      contact: DS.hasMany('contact'),
      animal: DS.belongsTo('animal'),
      communication: DS.hasMany('codeable-concept'),
      careProvider: DS.hasMany('reference'),
      managingOrganization: DS.belongsTo('reference'),
      link: DS.hasMany('link'),
      active: DS.attr('boolean')
    });

    __exports__["default"] = Patient;
  });
define("ember-on-fhir/models/period", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Period;

    Period = DS.Model.extend({
      start: DS.belongsTo('date'),
      end: DS.belongsTo('date')
    });

    __exports__["default"] = Period;
  });
define("ember-on-fhir/models/quantity", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Quantity;

    Quantity = DS.Model.extend({
      value: DS.attr(),
      comparator: DS.attr('string'),
      units: DS.attr('string'),
      system: DS.attr('string'),
      code: DS.attr('string')
    });

    __exports__["default"] = Quantity;
  });
define("ember-on-fhir/models/query", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Query;

    Query = DS.Model.extend({
      identifier: DS.attr('string'),
      parameter: DS.hasMany('extension'),
      response: DS.belongsTo('response')
    });

    __exports__["default"] = Query;
  });
define("ember-on-fhir/models/range", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Range;

    Range = DS.Model.extend({
      low: DS.hasMany('quantity'),
      high: DS.hasMany('quantity')
    });

    __exports__["default"] = Range;
  });
define("ember-on-fhir/models/reference", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Reference;

    Reference = DS.Model.extend({
      reference: DS.attr('string'),
      display: DS.attr('string')
    });

    __exports__["default"] = Reference;
  });
define("ember-on-fhir/models/resource-reference", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var ResourceReference;

    ResourceReference = DS.Model.extend({
      reference: DS.attr('string'),
      display: DS.attr('string')
    });

    __exports__["default"] = ResourceReference;
  });
define("ember-on-fhir/models/response", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var Response;

    Response = DS.Model.extend({
      identifier: DS.attr('string'),
      outcome: DS.attr('string'),
      total: DS.attr(),
      parameter: DS.hasMany('extension'),
      first: DS.hasMany('extension'),
      previous: DS.hasMany('extension'),
      next: DS.hasMany('extension'),
      last: DS.hasMany('extension'),
      reference: DS.hasMany('resource-reference')
    });

    __exports__["default"] = Response;
  });
define("ember-on-fhir/router", 
  ["ember","ember-on-fhir/config/environment","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var config = __dependency2__["default"];
    var Router;

    Router = Ember.Router.extend({
      location: config.locationType
    });

    Router.map(function() {
      return this.resource('filters', function() {
        this.route('new');
        return this.route('show', {
          path: ':id'
        });
      });
    });

    __exports__["default"] = Router;
  });
define("ember-on-fhir/routes/filters/index", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var FiltersIndexRoute;

    FiltersIndexRoute = Ember.Route.extend({
      model: function() {
        return this.store.findAll("filter");
      }
    });

    __exports__["default"] = FiltersIndexRoute;
  });
define("ember-on-fhir/routes/filters/new", 
  ["ember","ember-on-fhir/utils/add-filter-pane","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var addFilterPane = __dependency2__["default"];
    var FiltersNewRoute;

    FiltersNewRoute = Ember.Route.extend({
      model: function() {
        return this.store.createRecord('filter');
      },
      actions: {
        saveFilter: function() {
          this.currentModel.buildQuery();
          this.currentModel.save();
          return this.transitionTo("filters.index");
        },
        addPane: function(pane) {
          return addFilterPane(this, pane);
        }
      }
    });

    __exports__["default"] = FiltersNewRoute;
  });
define("ember-on-fhir/routes/filters/show", 
  ["ember","ember-on-fhir/utils/add-filter-pane","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var addFilterPane = __dependency2__["default"];
    var FiltersShowRoute;

    FiltersShowRoute = Ember.Route.extend({
      model: function(params) {
        return this.store.find('filter', params.id);
      },
      afterModel: function(filter) {
        var query;
        query = DS.PromiseObject.create({
          promise: Ember.$.get(filter.get('url'))
        });
        return query.then(function() {
          return filter.set('results', query.content.Response.Total);
        });
      },
      actions: {
        saveFilter: function() {
          this.currentModel.buildQuery();
          this.currentModel.save();
          return this.transitionTo("filters.index");
        },
        addPane: function(pane) {
          return addFilterPane(this, pane);
        }
      }
    });

    __exports__["default"] = FiltersShowRoute;
  });
define("ember-on-fhir/serializers/accomodation", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var AccomodationSerializer;

    AccomodationSerializer = ApplicationSerializer.extend({
      attrs: {
        bed: {
          embedded: 'always'
        },
        period: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = AccomodationSerializer;
  });
define("ember-on-fhir/serializers/address", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var AddressSerializer;

    AddressSerializer = ApplicationSerializer.extend({
      attrs: {
        period: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = AddressSerializer;
  });
define("ember-on-fhir/serializers/animal", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var AnimalSerializer;

    AnimalSerializer = ApplicationSerializer.extend({
      attrs: {
        species: {
          embedded: 'always'
        },
        breed: {
          embedded: 'always'
        },
        genderStatus: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = AnimalSerializer;
  });
define("ember-on-fhir/serializers/application", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var ApplicationSerializer;

    ApplicationSerializer = DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
      serializeIntoHash: function(hash, type, record, options) {
        return Ember.merge(hash, this.serialize(record, options));
      },
      keyForAttribute: function(key, relationship) {
        return Ember.String.capitalize(key);
      },
      extract: function(store, type, payload, id, requestType) {
        var normalizedPayload;
        normalizedPayload = {};
        if (payload === null) {
          return [];
        }
        normalizedPayload[Ember.String.pluralize(Ember.String.camelize(type.toString().split(".")[1]))] = payload.Entries || payload;
        return this._super(store, type, normalizedPayload, id, requestType);
      },
      normalize: function(type, hash, prop) {
        if (hash.id == null) {
          hash.id = Em.generateGuid({}, type);
        }
        return this._super(type, hash, prop);
      }
    });

    __exports__["default"] = ApplicationSerializer;
  });
define("ember-on-fhir/serializers/attachment", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var AttachmentSerializer;

    AttachmentSerializer = ApplicationSerializer.extend({
      attrs: {
        data: {
          embedded: 'always'
        },
        hash: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = AttachmentSerializer;
  });
define("ember-on-fhir/serializers/codeable-concept", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var CodeableConceptSerializer;

    CodeableConceptSerializer = ApplicationSerializer.extend({
      attrs: {
        coding: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = CodeableConceptSerializer;
  });
define("ember-on-fhir/serializers/coding", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var CodingSerializer;

    CodingSerializer = ApplicationSerializer.extend({
      attrs: {
        valueSet: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = CodingSerializer;
  });
define("ember-on-fhir/serializers/contact-point", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var ContactPointSerializer;

    ContactPointSerializer = ApplicationSerializer.extend({
      attrs: {
        period: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = ContactPointSerializer;
  });
define("ember-on-fhir/serializers/contact", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var ContactSerializer;

    ContactSerializer = ApplicationSerializer.extend({
      attrs: {
        relationship: {
          embedded: 'always'
        },
        name: {
          embedded: 'always'
        },
        telecom: {
          embedded: 'always'
        },
        address: {
          embedded: 'always'
        },
        organization: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = ContactSerializer;
  });
define("ember-on-fhir/serializers/ember-item", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var EmberItemSerializer;

    EmberItemSerializer = ApplicationSerializer.extend({
      attrs: {
        parameter: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = EmberItemSerializer;
  });
define("ember-on-fhir/serializers/encounter", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var EncounterSerializer;

    EncounterSerializer = ApplicationSerializer.extend({
      attrs: {
        identifier: {
          embedded: 'always'
        },
        type: {
          embedded: 'always'
        },
        subject: {
          embedded: 'always'
        },
        participant: {
          embedded: 'always'
        },
        fulfills: {
          embedded: 'always'
        },
        period: {
          embedded: 'always'
        },
        length: {
          embedded: 'always'
        },
        reason: {
          embedded: 'always'
        },
        indication: {
          embedded: 'always'
        },
        priority: {
          embedded: 'always'
        },
        hospitalization: {
          embedded: 'always'
        },
        location: {
          embedded: 'always'
        },
        serviceProvider: {
          embedded: 'always'
        },
        partOf: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = EncounterSerializer;
  });
define("ember-on-fhir/serializers/extension", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var ExtensionSerializer;

    ExtensionSerializer = ApplicationSerializer.extend({
      attrs: {
        value: {
          embedded: 'always'
        },
        valueCodeableConcept: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = ExtensionSerializer;
  });
define("ember-on-fhir/serializers/filter", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var FilterSerializer;

    FilterSerializer = ApplicationSerializer.extend({
      attrs: {
        query: {
          embedded: 'always'
        },
        panes: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = FilterSerializer;
  });
define("ember-on-fhir/serializers/hospitalization", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var HospitalizationSerializer;

    HospitalizationSerializer = ApplicationSerializer.extend({
      attrs: {
        preAdmissionIdentifier: {
          embedded: 'always'
        },
        origin: {
          embedded: 'always'
        },
        admitSource: {
          embedded: 'always'
        },
        period: {
          embedded: 'always'
        },
        accomodation: {
          embedded: 'always'
        },
        diet: {
          embedded: 'always'
        },
        specialCourtesy: {
          embedded: 'always'
        },
        specialArrangement: {
          embedded: 'always'
        },
        destination: {
          embedded: 'always'
        },
        dischargeDisposition: {
          embedded: 'always'
        },
        dischargeDiagnosis: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = HospitalizationSerializer;
  });
define("ember-on-fhir/serializers/human-name", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var HumanNameSerializer;

    HumanNameSerializer = ApplicationSerializer.extend({
      attrs: {
        period: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = HumanNameSerializer;
  });
define("ember-on-fhir/serializers/identifier", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var IdentifierSerializer;

    IdentifierSerializer = ApplicationSerializer.extend({
      attrs: {
        period: {
          embedded: 'always'
        },
        assigner: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = IdentifierSerializer;
  });
define("ember-on-fhir/serializers/link", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var LinkSerializer;

    LinkSerializer = ApplicationSerializer.extend({
      attrs: {
        other: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = LinkSerializer;
  });
define("ember-on-fhir/serializers/location", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var LocationSerializer;

    LocationSerializer = ApplicationSerializer.extend({
      attrs: {
        location: {
          embedded: 'always'
        },
        period: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = LocationSerializer;
  });
define("ember-on-fhir/serializers/pane", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var PaneSerializer;

    PaneSerializer = ApplicationSerializer.extend({
      attrs: {
        items: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = PaneSerializer;
  });
define("ember-on-fhir/serializers/participant", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var ParticipantSerializer;

    ParticipantSerializer = ApplicationSerializer.extend({
      attrs: {
        type: {
          embedded: 'always'
        },
        individual: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = ParticipantSerializer;
  });
define("ember-on-fhir/serializers/patient", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var PatientSerializer;

    PatientSerializer = ApplicationSerializer.extend({
      attrs: {
        identifier: {
          embedded: 'always'
        },
        name: {
          embedded: 'always'
        },
        telecom: {
          embedded: 'always'
        },
        address: {
          embedded: 'always'
        },
        maritalStatus: {
          embedded: 'always'
        },
        photo: {
          embedded: 'always'
        },
        contact: {
          embedded: 'always'
        },
        animal: {
          embedded: 'always'
        },
        communication: {
          embedded: 'always'
        },
        careProvider: {
          embedded: 'always'
        },
        managingOrganization: {
          embedded: 'always'
        },
        link: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = PatientSerializer;
  });
define("ember-on-fhir/serializers/period", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var PeriodSerializer;

    PeriodSerializer = ApplicationSerializer.extend({
      attrs: {
        start: {
          embedded: 'always'
        },
        end: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = PeriodSerializer;
  });
define("ember-on-fhir/serializers/query", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var QuerySerializer;

    QuerySerializer = ApplicationSerializer.extend({
      attrs: {
        parameter: {
          embedded: 'always'
        },
        response: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = QuerySerializer;
  });
define("ember-on-fhir/serializers/response", 
  ["ember-on-fhir/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationSerializer = __dependency1__["default"];
    var ResponseSerializer;

    ResponseSerializer = ApplicationSerializer.extend({
      attrs: {
        parameter: {
          embedded: 'always'
        },
        first: {
          embedded: 'always'
        },
        previous: {
          embedded: 'always'
        },
        next: {
          embedded: 'always'
        },
        last: {
          embedded: 'always'
        },
        reference: {
          embedded: 'always'
        }
      }
    });

    __exports__["default"] = ResponseSerializer;
  });
define("ember-on-fhir/templates/application", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
      var escapeExpression=this.escapeExpression, buffer = '';
      data.buffer.push("        <img class=\"logo\" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
        'src': ("logoURL")
      },"hashTypes":{'src': "STRING"},"hashContexts":{'src': depth0},"types":[],"contexts":[],"data":data})));
      data.buffer.push(" alt=\"Intervention Engine\" />\n");
      return buffer;
    },"3":function(depth0,helpers,partials,data) {
      var stack1, helperMissing=helpers.helperMissing;
      stack1 = ((helpers['link-to'] || (depth0 && depth0['link-to']) || helperMissing).call(depth0, "filters.new", {"name":"link-to","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(4, data),"inverse":this.noop,"types":["STRING"],"contexts":[depth0],"data":data}));
      if (stack1 != null) { data.buffer.push(stack1); }
      else { data.buffer.push(''); }
      },"4":function(depth0,helpers,partials,data) {
      data.buffer.push("<i class=\"fa fa-plus-circle\"></i> Filter Builder");
      },"6":function(depth0,helpers,partials,data) {
      var stack1, helperMissing=helpers.helperMissing;
      stack1 = ((helpers['link-to'] || (depth0 && depth0['link-to']) || helperMissing).call(depth0, "utilities", {"name":"link-to","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(7, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data}));
      if (stack1 != null) { data.buffer.push(stack1); }
      else { data.buffer.push(''); }
      },"7":function(depth0,helpers,partials,data) {
      data.buffer.push("<i class=\"fa fa-cogs\"></i> Utilities");
      },"9":function(depth0,helpers,partials,data) {
      data.buffer.push("<i class=\"fa fa-sign-out\"></i> Logout");
      },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
      var stack1, helper, options, helperMissing=helpers.helperMissing, functionType="function", blockHelperMissing=helpers.blockHelperMissing, buffer = '';
      data.buffer.push("<div>\n  <nav class=\"navbar navbar-inverse\" role=\"navigation\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-ex1-collapse\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n\n");
      stack1 = ((helpers['link-to'] || (depth0 && depth0['link-to']) || helperMissing).call(depth0, "index", {"name":"link-to","hash":{
        'class': ("navbar-brand")
      },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"fn":this.program(1, data),"inverse":this.noop,"types":["STRING"],"contexts":[depth0],"data":data}));
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("    </div>\n\n    <div class=\"collapse navbar-collapse navbar-ex1-collapse\">\n      <ul class=\"nav navbar-nav navbar-right\">\n        ");
      stack1 = ((helper = (helper = helpers['navbar-active-link'] || (depth0 != null ? depth0['navbar-active-link'] : depth0)) != null ? helper : helperMissing),(options={"name":"navbar-active-link","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(3, data),"inverse":this.noop,"types":[],"contexts":[],"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
      if (!helpers['navbar-active-link']) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("\n        ");
      stack1 = ((helper = (helper = helpers['navbar-active-link'] || (depth0 != null ? depth0['navbar-active-link'] : depth0)) != null ? helper : helperMissing),(options={"name":"navbar-active-link","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(6, data),"inverse":this.noop,"types":[],"contexts":[],"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
      if (!helpers['navbar-active-link']) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("\n        <li>");
      stack1 = ((helpers['link-to'] || (depth0 && depth0['link-to']) || helperMissing).call(depth0, "logout", {"name":"link-to","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(9, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data}));
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("</li>\n      </ul>\n    </div>\n  </nav>\n  <div class=\"container\">\n    <div class=\"row\">\n      <div id=\"ember-fhir\">\n        ");
      stack1 = helpers._triageMustache.call(depth0, "outlet", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("\n      </div>\n    </div>\n  </div>\n</div>\n");
      return buffer;
    },"useData":true});
  });
define("ember-on-fhir/templates/components/age-filter", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
      var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
      data.buffer.push("Patient Age is COMPARATOR ");
      data.buffer.push(escapeExpression(((helpers.input || (depth0 && depth0.input) || helperMissing).call(depth0, {"name":"input","hash":{
        'value': ("item.value")
      },"hashTypes":{'value': "ID"},"hashContexts":{'value': depth0},"types":[],"contexts":[],"data":data}))));
      data.buffer.push("\n");
      return buffer;
    },"useData":true});
  });
define("ember-on-fhir/templates/components/condition-code-filter", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
      return "";
    },"useData":true});
  });
define("ember-on-fhir/templates/components/encounter-code-filter", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
      var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
      data.buffer.push("      <span class=\"col-sm-1 col-sm-offset-1\">is</span>\n      <span class=\"col-sm-5\">");
      data.buffer.push(escapeExpression(((helpers.input || (depth0 && depth0.input) || helperMissing).call(depth0, {"name":"input","hash":{
        'value': ("item.parameter.valueCodeableConcept.text"),
        'placeholder': ("Encounter Code"),
        'class': ("input-control")
      },"hashTypes":{'value': "ID",'placeholder': "STRING",'class': "STRING"},"hashContexts":{'value': depth0,'placeholder': depth0,'class': depth0},"types":[],"contexts":[],"data":data}))));
      data.buffer.push("</span>\n");
      return buffer;
    },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
      var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
      data.buffer.push("<form class=\"form-horizontal\">\n  <div class=\"form-group\">\n    <h4><label class=\"control-label\">");
      data.buffer.push(escapeExpression(((helpers.input || (depth0 && depth0.input) || helperMissing).call(depth0, {"name":"input","hash":{
        'checked': ("item.active"),
        'type': ("checkbox")
      },"hashTypes":{'checked': "ID",'type': "STRING"},"hashContexts":{'checked': depth0,'type': depth0},"types":[],"contexts":[],"data":data}))));
      data.buffer.push(" Encounter Code</label></h4>\n  </div>\n  <div class=\"form-group\">\n");
      stack1 = helpers['if'].call(depth0, "item.active", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("  </div>\n</form>\n");
      return buffer;
    },"useData":true});
  });
define("ember-on-fhir/templates/components/gender-filter", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
      var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
      data.buffer.push("      <span class=\"col-sm-1\">is</span>\n      <span class=\"col-sm-2\"><label>");
      data.buffer.push(escapeExpression(((helpers['radio-button'] || (depth0 && depth0['radio-button']) || helperMissing).call(depth0, {"name":"radio-button","hash":{
        'value': ("M"),
        'name': ("item.parameter.valueString"),
        'class': ("input-control")
      },"hashTypes":{'value': "STRING",'name': "ID",'class': "STRING"},"hashContexts":{'value': depth0,'name': depth0,'class': depth0},"types":[],"contexts":[],"data":data}))));
      data.buffer.push(" Male</label></span>\n      <span class=\"col-sm-2\"><label>");
      data.buffer.push(escapeExpression(((helpers['radio-button'] || (depth0 && depth0['radio-button']) || helperMissing).call(depth0, {"name":"radio-button","hash":{
        'value': ("F"),
        'name': ("item.parameter.valueString"),
        'class': ("input-control")
      },"hashTypes":{'value': "STRING",'name': "ID",'class': "STRING"},"hashContexts":{'value': depth0,'name': depth0,'class': depth0},"types":[],"contexts":[],"data":data}))));
      data.buffer.push(" Female</label></span>\n      <span class=\"col-sm-2\"><label>");
      data.buffer.push(escapeExpression(((helpers['radio-button'] || (depth0 && depth0['radio-button']) || helperMissing).call(depth0, {"name":"radio-button","hash":{
        'value': ("O"),
        'name': ("item.parameter.valueString"),
        'class': ("input-control")
      },"hashTypes":{'value': "STRING",'name': "ID",'class': "STRING"},"hashContexts":{'value': depth0,'name': depth0,'class': depth0},"types":[],"contexts":[],"data":data}))));
      data.buffer.push(" Other</label></span>\n      <span class=\"col-sm-2\"><label>");
      data.buffer.push(escapeExpression(((helpers['radio-button'] || (depth0 && depth0['radio-button']) || helperMissing).call(depth0, {"name":"radio-button","hash":{
        'value': ("U"),
        'name': ("item.parameter.valueString"),
        'class': ("input-control")
      },"hashTypes":{'value': "STRING",'name': "ID",'class': "STRING"},"hashContexts":{'value': depth0,'name': depth0,'class': depth0},"types":[],"contexts":[],"data":data}))));
      data.buffer.push(" Unknown</label></span>\n");
      return buffer;
    },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
      var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
      data.buffer.push("<form class=\"form-horizontal\">\n  <div class=\"form-group\">\n    <h4><label class=\"control-label\">");
      data.buffer.push(escapeExpression(((helpers.input || (depth0 && depth0.input) || helperMissing).call(depth0, {"name":"input","hash":{
        'checked': ("item.active"),
        'name': ("active"),
        'type': ("checkbox")
      },"hashTypes":{'checked': "ID",'name': "ID",'type': "STRING"},"hashContexts":{'checked': depth0,'name': depth0,'type': depth0},"types":[],"contexts":[],"data":data}))));
      data.buffer.push(" Patient Gender</label></h4>\n  </div>\n  <div class=\"form-group\">\n");
      stack1 = helpers['if'].call(depth0, "item.active", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("  </div>\n</form>\n");
      return buffer;
    },"useData":true});
  });
define("ember-on-fhir/templates/components/x-drag", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
      var stack1, buffer = '';
      data.buffer.push("<div draggable=\"true\">\n  ");
      stack1 = helpers._triageMustache.call(depth0, "yield", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("\n</div>\n");
      return buffer;
    },"useData":true});
  });
define("ember-on-fhir/templates/components/x-drop", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
      var stack1, buffer = '';
      stack1 = helpers['with'].call(depth0, "pane", {"name":"with","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(2, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
      if (stack1 != null) { data.buffer.push(stack1); }
      return buffer;
    },"2":function(depth0,helpers,partials,data) {
      var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
      data.buffer.push("      ");
      data.buffer.push(escapeExpression(((helpers.render || (depth0 && depth0.render) || helperMissing).call(depth0, "partials/_pane", "pane", {"name":"render","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","ID"],"contexts":[depth0,depth0],"data":data}))));
      data.buffer.push("\n");
      return buffer;
    },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
      var stack1, escapeExpression=this.escapeExpression, buffer = '';
      data.buffer.push("<div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
        'class': (":drop-target droppable:drop-active")
      },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
      data.buffer.push(">\n");
      stack1 = helpers.each.call(depth0, "pane", "in", "model.panes", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("</div>\n");
      return buffer;
    },"useData":true});
  });
define("ember-on-fhir/templates/filter-builder", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
      return "";
    },"useData":true});
  });
define("ember-on-fhir/templates/filters/-condition", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
      data.buffer.push("Condition\n");
      },"useData":true});
  });
define("ember-on-fhir/templates/filters/-encounter", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
      data.buffer.push("Encounter\n");
      },"useData":true});
  });
define("ember-on-fhir/templates/filters/-patient", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
      var escapeExpression=this.escapeExpression, buffer = '';
      data.buffer.push("<div class=\"row\">\n  <div class=\"col-sm-2\">\n    <button class=\"btn btn-circle\" disabled=\"true\"><i class=\"fa fa-user fa-fw pull-left\"></i></button>\n  </div>\n  <div class=\"col-sm-5\">\n    <button ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "addParam", "/patientage", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","STRING"],"contexts":[depth0,depth0],"data":data})));
      data.buffer.push(">Test</button>Patient Age\n    <br>\n    Patient Gender\n  </div>\n</div>\n");
      return buffer;
    },"useData":true});
  });
define("ember-on-fhir/templates/filters/index", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
      var stack1, buffer = '';
      stack1 = helpers['if'].call(depth0, "filter.isNew", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(2, data),"inverse":this.program(4, data),"types":["ID"],"contexts":[depth0],"data":data});
      if (stack1 != null) { data.buffer.push(stack1); }
      return buffer;
    },"2":function(depth0,helpers,partials,data) {
      return "";
    },"4":function(depth0,helpers,partials,data) {
      var stack1, helperMissing=helpers.helperMissing, buffer = '';
      data.buffer.push("        <li>\n          <h2>\n");
      stack1 = ((helpers['link-to'] || (depth0 && depth0['link-to']) || helperMissing).call(depth0, "filters.show", "filter", {"name":"link-to","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(5, data),"inverse":this.noop,"types":["STRING","ID"],"contexts":[depth0,depth0],"data":data}));
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("          </h2>\n        </li>\n");
      return buffer;
    },"5":function(depth0,helpers,partials,data) {
      var stack1, buffer = '';
      data.buffer.push("              <i class=\"fa fa-pie-chart\"></i>\n              ");
      stack1 = helpers['if'].call(depth0, "filter.name", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(6, data),"inverse":this.program(8, data),"types":["ID"],"contexts":[depth0],"data":data});
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
    },"6":function(depth0,helpers,partials,data) {
      var stack1;
      stack1 = helpers._triageMustache.call(depth0, "filter.name", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
      if (stack1 != null) { data.buffer.push(stack1); }
      else { data.buffer.push(''); }
      },"8":function(depth0,helpers,partials,data) {
      data.buffer.push("Unnamed");
      },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
      var stack1, buffer = '';
      data.buffer.push("<div class=\"container\">\n  <h1>My Filters</h1>\n  <ul class=\"filterList\">\n");
      stack1 = helpers.each.call(depth0, "filter", "in", "content", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("  </ul>\n</div>\n");
      return buffer;
    },"useData":true});
  });
define("ember-on-fhir/templates/filters/new", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
      data.buffer.push("            <div class=\"filter-type\">\n              <div class=\"filter-type-icon\">\n                <i class=\"fa fa-user fa-fw\"></i>\n              </div>\n              Patient\n              <i class=\"fa fa-chevron-right filter-type-chevron\"></i>\n            </div>\n");
      },"3":function(depth0,helpers,partials,data) {
      data.buffer.push("            <div class=\"filter-type\">\n              <div class=\"filter-type-icon\">\n                <i class=\"icon-med-clipboard\"></i>\n              </div>\n              Condition\n              <i class=\"fa fa-chevron-right filter-type-chevron\"></i>\n            </div>\n");
      },"5":function(depth0,helpers,partials,data) {
      data.buffer.push("            <div class=\"filter-type\">\n              <div class=\"filter-type-icon\">\n                <i class=\"fa fa-hospital-o fa-fw\"></i>\n              </div>\n              Encounter\n              <i class=\"fa fa-chevron-right filter-type-chevron\"></i>\n            </div>\n");
      },"7":function(depth0,helpers,partials,data) {
      return "";
    },"9":function(depth0,helpers,partials,data) {
      data.buffer.push("              <span class=\"sub-text\">\n                No filters. Drag filter type here to add a filter.\n              </span>\n");
      },"11":function(depth0,helpers,partials,data) {
      data.buffer.push("              Filters?\n");
      },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
      var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
      data.buffer.push("<div class=\"container\">\n\n  <div class=\"title-panel\">\n    <h1>Create Filter</h1>\n    <div class=\"count\" id=\"patient-count\">\n    Patients\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-sm-3\">\n      <div class=\"panel\">\n        <div class=\"panel-heading\">\n          <div class=\"panel-title\">\n            <h3>Filter Type</h3>\n          </div>\n        </div>\n\n        <div class=\"panel-body\">\n");
      stack1 = ((helpers['x-drag'] || (depth0 && depth0['x-drag']) || helperMissing).call(depth0, {"name":"x-drag","hash":{
        'templatePath': ("patient")
      },"hashTypes":{'templatePath': "STRING"},"hashContexts":{'templatePath': depth0},"fn":this.program(1, data),"inverse":this.noop,"types":[],"contexts":[],"data":data}));
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      stack1 = ((helpers['x-drag'] || (depth0 && depth0['x-drag']) || helperMissing).call(depth0, {"name":"x-drag","hash":{
        'templatePath': ("condition")
      },"hashTypes":{'templatePath': "STRING"},"hashContexts":{'templatePath': depth0},"fn":this.program(3, data),"inverse":this.noop,"types":[],"contexts":[],"data":data}));
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      stack1 = ((helpers['x-drag'] || (depth0 && depth0['x-drag']) || helperMissing).call(depth0, {"name":"x-drag","hash":{
        'templatePath': ("encounter")
      },"hashTypes":{'templatePath': "STRING"},"hashContexts":{'templatePath': depth0},"fn":this.program(5, data),"inverse":this.noop,"types":[],"contexts":[],"data":data}));
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("        </div>\n      </div>\n    </div>\n\n    <div class=\"col-sm-9\">\n      <div class=\"panel\">\n        <div class=\"panel-heading\">\n          <div class=\"panel-title\">\n            <h3>Filter Details</h3>\n          </div>\n        </div>\n\n        <div class=\"panel-body\">\n          <div>\n");
      stack1 = helpers['if'].call(depth0, "hasFilterPane", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(7, data),"inverse":this.program(9, data),"types":["ID"],"contexts":[depth0],"data":data});
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      stack1 = ((helpers['x-drop'] || (depth0 && depth0['x-drop']) || helperMissing).call(depth0, {"name":"x-drop","hash":{
        'model': ("model"),
        'action': ("addPane")
      },"hashTypes":{'model': "ID",'action': "STRING"},"hashContexts":{'model': depth0,'action': depth0},"fn":this.program(11, data),"inverse":this.noop,"types":[],"contexts":[],"data":data}));
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("          </div>\n\n          <div id=\"save-new-filter\">\n            ");
      data.buffer.push(escapeExpression(((helpers.input || (depth0 && depth0.input) || helperMissing).call(depth0, {"name":"input","hash":{
        'value': ("name"),
        'name': ("name")
      },"hashTypes":{'value': "ID",'name': "ID"},"hashContexts":{'value': depth0,'name': depth0},"types":[],"contexts":[],"data":data}))));
      data.buffer.push("\n            <button ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "openModal", "saveFilterModal", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","STRING"],"contexts":[depth0,depth0],"data":data})));
      data.buffer.push(">Save to My Filters</button>\n            <!-- <button class=\"btn btn-lg btn-primary\"");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveFilter", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
      data.buffer.push(">Save to My Filters</button> -->\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n");
      return buffer;
    },"useData":true});
  });
define("ember-on-fhir/templates/filters/show", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
      data.buffer.push("<div class=\"filter\"><h2><i class=\"fa fa-user fa-fw pull-left\"></i>Patient</div></h2> ");
      },"3":function(depth0,helpers,partials,data) {
      data.buffer.push("<div class=\"filter\"> <h2><i class=\"fa fa-stethoscope fa-fw pull-left\"></i>Encounter</div></h2>");
      },"5":function(depth0,helpers,partials,data) {
      data.buffer.push("<div class=\"filter\"> <h2><i class=\"icon-med-clipboard pull-left\"></i>Condition</div></h2>");
      },"7":function(depth0,helpers,partials,data) {
      data.buffer.push("        Filters?\n");
      },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
      var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
      data.buffer.push("<div class=\"container\">\n  <h1>Filter </h1>\n  ");
      data.buffer.push(escapeExpression(((helpers.input || (depth0 && depth0.input) || helperMissing).call(depth0, {"name":"input","hash":{
        'value': ("name"),
        'name': ("name")
      },"hashTypes":{'value': "ID",'name': "ID"},"hashContexts":{'value': depth0,'name': depth0},"types":[],"contexts":[],"data":data}))));
      data.buffer.push("\n  <button class=\"btn btn-lg\"");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveFilter", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
      data.buffer.push(">Save</button>\n\n  <div class=\"row\">\n    <div class=\"col-sm-3\">\n      <div class=\"filter-panel\">\n        <h3>Filter Type</h3>\n        <hr>\n        ");
      stack1 = ((helpers['x-drag'] || (depth0 && depth0['x-drag']) || helperMissing).call(depth0, {"name":"x-drag","hash":{
        'templatePath': ("patient")
      },"hashTypes":{'templatePath': "STRING"},"hashContexts":{'templatePath': depth0},"fn":this.program(1, data),"inverse":this.noop,"types":[],"contexts":[],"data":data}));
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("\n        ");
      stack1 = ((helpers['x-drag'] || (depth0 && depth0['x-drag']) || helperMissing).call(depth0, {"name":"x-drag","hash":{
        'templatePath': ("encounter")
      },"hashTypes":{'templatePath': "STRING"},"hashContexts":{'templatePath': depth0},"fn":this.program(3, data),"inverse":this.noop,"types":[],"contexts":[],"data":data}));
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("\n        ");
      stack1 = ((helpers['x-drag'] || (depth0 && depth0['x-drag']) || helperMissing).call(depth0, {"name":"x-drag","hash":{
        'templatePath': ("condition")
      },"hashTypes":{'templatePath': "STRING"},"hashContexts":{'templatePath': depth0},"fn":this.program(5, data),"inverse":this.noop,"types":[],"contexts":[],"data":data}));
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("\n      </div>\n    </div>\n\n    <div class=\"col-sm-9\">\n");
      stack1 = ((helpers['x-drop'] || (depth0 && depth0['x-drop']) || helperMissing).call(depth0, {"name":"x-drop","hash":{
        'model': ("model"),
        'action': ("addPane")
      },"hashTypes":{'model': "ID",'action': "STRING"},"hashContexts":{'model': depth0,'action': depth0},"fn":this.program(7, data),"inverse":this.noop,"types":[],"contexts":[],"data":data}));
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("    </div>\n\n</div>\n\n<span class=\"pull-right\"><h3>");
      stack1 = helpers._triageMustache.call(depth0, "results", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push(" Patient(s) returned</h3></span>\n");
      return buffer;
    },"useData":true});
  });
define("ember-on-fhir/templates/index", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
      var stack1, buffer = '';
      data.buffer.push("      ");
      stack1 = helpers._triageMustache.call(depth0, "group.value", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push(" at ");
      stack1 = helpers._triageMustache.call(depth0, "group.key", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("\n      <br>\n");
      return buffer;
    },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
      var stack1, escapeExpression=this.escapeExpression, buffer = '';
      data.buffer.push("<div class=\"title-panel\">\n  <h1>My Metrics</h1>\n</div>\n\n<div class=\"container\">\n  <div class=\"row panel\">\n    <div class=\"col-sm-2\">\n      <h2><i class=\"icon-med-clipboard\"></i>Group by:</h2>\n    </div>\n    <div class=\"col-sm-1\">\n      <button class=\"btn btn-circle\" ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "setGrouping", "day", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","STRING"],"contexts":[depth0,depth0],"data":data})));
      data.buffer.push(">Day</button>\n    </div>\n    <div class=\"col-sm-1\">\n      <button class=\"btn btn-circle btn-active\" ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "setGrouping", "week", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","STRING"],"contexts":[depth0,depth0],"data":data})));
      data.buffer.push(">Week</button>\n    </div>\n    <div class=\"col-sm-1\">\n      <button class=\"btn btn-circle\" ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "setGrouping", "month", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","STRING"],"contexts":[depth0,depth0],"data":data})));
      data.buffer.push(">Month</button>\n    </div>\n    <div class=\"col-sm-1\">\n      <button class=\"btn btn-circle\" ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "setGrouping", "year", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","STRING"],"contexts":[depth0,depth0],"data":data})));
      data.buffer.push(">Year</button>\n    </div>\n    <div>\n      <svg class=\"events\">\n        <path ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
        'd': ("barsPath")
      },"hashTypes":{'d': "STRING"},"hashContexts":{'d': depth0},"types":[],"contexts":[],"data":data})));
      data.buffer.push("/>\n      </svg>\n    </div>\n  </div>\n\n  <div class=\"row panel\">\n");
      stack1 = helpers.each.call(depth0, "group", "in", "groupSet", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("  </div>\n</div>\n");
      return buffer;
    },"useData":true});
  });
define("ember-on-fhir/templates/partials/-pane", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
      var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
      data.buffer.push("      <div class=\"row\">\n        ");
      data.buffer.push(escapeExpression(((helpers['dynamic-component'] || (depth0 && depth0['dynamic-component']) || helperMissing).call(depth0, {"name":"dynamic-component","hash":{
        'item': ("item"),
        'type': ("item.componentName")
      },"hashTypes":{'item': "ID",'type': "ID"},"hashContexts":{'item': depth0,'type': depth0},"types":[],"contexts":[],"data":data}))));
      data.buffer.push("\n      </div>\n");
      return buffer;
    },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
      var stack1, escapeExpression=this.escapeExpression, buffer = '';
      data.buffer.push("\n<div class=\"filter row\">\n  <div class=\"col-xs-2\">\n    <h2><i ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
        'class': (":fa :fa-fw icon")
      },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
      data.buffer.push("> </i></h2>\n  </div>\n  <button type=\"button\" class=\"close\" ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "removePane", "model", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","ID"],"contexts":[depth0,depth0],"data":data})));
      data.buffer.push(" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n\n  <div class=\"col-xs-10\">\n");
      stack1 = helpers.each.call(depth0, "item", "in", "items", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
      if (stack1 != null) { data.buffer.push(stack1); }
      data.buffer.push("  </div>\n</div>\n");
      return buffer;
    },"useData":true});
  });
define("ember-on-fhir/tests/app.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - .');
    test('app.js should pass jshint', function() { 
      ok(true, 'app.js should pass jshint.'); 
    });
  });
define("ember-on-fhir/tests/ember-on-fhir/tests/helpers/resolver.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - ember-on-fhir/tests/helpers');
    test('ember-on-fhir/tests/helpers/resolver.js should pass jshint', function() { 
      ok(true, 'ember-on-fhir/tests/helpers/resolver.js should pass jshint.'); 
    });
  });
define("ember-on-fhir/tests/ember-on-fhir/tests/helpers/start-app.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - ember-on-fhir/tests/helpers');
    test('ember-on-fhir/tests/helpers/start-app.js should pass jshint', function() { 
      ok(true, 'ember-on-fhir/tests/helpers/start-app.js should pass jshint.'); 
    });
  });
define("ember-on-fhir/tests/ember-on-fhir/tests/test-helper.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - ember-on-fhir/tests');
    test('ember-on-fhir/tests/test-helper.js should pass jshint', function() { 
      ok(true, 'ember-on-fhir/tests/test-helper.js should pass jshint.'); 
    });
  });
define("ember-on-fhir/tests/helpers/resolver", 
  ["ember/resolver","ember-on-fhir/config/environment","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Resolver = __dependency1__["default"];
    var config = __dependency2__["default"];

    var resolver = Resolver.create();

    resolver.namespace = {
      modulePrefix: config.modulePrefix,
      podModulePrefix: config.podModulePrefix
    };

    __exports__["default"] = resolver;
  });
define("ember-on-fhir/tests/helpers/start-app", 
  ["ember","ember-on-fhir/app","ember-on-fhir/router","ember-on-fhir/config/environment","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var Application = __dependency2__["default"];
    var Router = __dependency3__["default"];
    var config = __dependency4__["default"];

    __exports__["default"] = function startApp(attrs) {
      var application;

      var attributes = Ember.merge({}, config.APP);
      attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

      Ember.run(function () {
        application = Application.create(attributes);
        application.setupForTesting();
        application.injectTestHelpers();
      });

      return application;
    }
  });
define("ember-on-fhir/tests/test-helper", 
  ["ember-on-fhir/tests/helpers/resolver","ember-qunit"],
  function(__dependency1__, __dependency2__) {
    "use strict";
    var resolver = __dependency1__["default"];
    var setResolver = __dependency2__.setResolver;

    setResolver(resolver);

    document.write("<div id=\"ember-testing-container\"><div id=\"ember-testing\"></div></div>");

    QUnit.config.urlConfig.push({ id: "nocontainer", label: "Hide container" });
    var containerVisibility = QUnit.urlParams.nocontainer ? "hidden" : "visible";
    document.getElementById("ember-testing-container").style.visibility = containerVisibility;
  });
define("ember-on-fhir/tests/unit/adapters/application-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;
    moduleFor('adapter:application', 'ApplicationAdapter', {});

    test('it exists', function() {
      var adapter;
      adapter = this.subject();
      return ok(adapter);
    });
  });
define("ember-on-fhir/tests/unit/controllers/application-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('controller:application', 'ApplicationController', {});

    test('it exists', function() {
      var controller;
      controller = this.subject();
      return ok(controller);
    });
  });
define("ember-on-fhir/tests/unit/models/accomodation-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('accomodation', 'Accomodation', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/address-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('address', 'Address', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/animal-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('animal', 'Animal', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/attachment-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('attachment', 'Attachment', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/codeable-concept-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('codeable-concept', 'CodeableConcept', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/coding-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('coding', 'Coding', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/contact-point-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('contact-point', 'ContactPoint', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/contact-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('contact', 'Contact', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/date-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('date', 'Date', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/ember-item-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('ember-item', 'EmberItem', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/encounter-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('encounter', 'Encounter', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/extension-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('extension', 'Extension', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/filter-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('filter', 'Filter', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/hospitalization-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('hospitalization', 'Hospitalization', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/human-name-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('human-name', 'HumanName', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/identifier-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('identifier', 'Identifier', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/link-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('link', 'Link', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/location-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('location', 'Location', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/pane-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('pane', 'Pane', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/participant-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('participant', 'Participant', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/patient-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('patient', 'Patient', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/period-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('period', 'Period', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/quantity-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('quantity', 'Quantity', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/query-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('query', 'Query', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/range-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('range', 'Range', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/reference-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('reference', 'Reference', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/resource-reference-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('resource-reference', 'ResourceReference', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/models/response-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleForModel = __dependency1__.moduleForModel;
    moduleForModel('response', 'Response', {
      needs: []
    });

    test('it exists', function() {
      var model;
      model = this.subject();
      return ok(!!model);
    });
  });
define("ember-on-fhir/tests/unit/serializers/accomodation-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:accomodation', 'AccomodationSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/address-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:address', 'AddressSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/animal-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:animal', 'AnimalSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/application-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:application', 'ApplicationSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/attachment-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:attachment', 'AttachmentSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/codeable-concept-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:codeable-concept', 'CodeableConceptSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/coding-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:coding', 'CodingSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/contact-point-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:contact-point', 'ContactPointSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/contact-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:contact', 'ContactSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/ember-item-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:ember-item', 'EmberItemSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/encounter-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:encounter', 'EncounterSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/extension-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:extension', 'ExtensionSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/filter-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:filter', 'FilterSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/hospitalization-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:hospitalization', 'HospitalizationSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/human-name-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:human-name', 'HumanNameSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/identifier-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:identifier', 'IdentifierSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/link-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:link', 'LinkSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/location-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:location', 'LocationSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/pane-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:pane', 'PaneSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/participant-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:participant', 'ParticipantSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/patient-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:patient', 'PatientSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/period-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:period', 'PeriodSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/query-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:query', 'QuerySerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/serializers/response-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;
    moduleFor('serializer:response', 'ResponseSerializer', {});

    test('it exists', function() {
      var serializer;
      serializer = this.subject();
      return ok(serializer);
    });
  });
define("ember-on-fhir/tests/unit/utils/add-filter-pane-test", 
  ["ember-on-fhir/utils/add-filter-pane"],
  function(__dependency1__) {
    "use strict";
    var addFilterPane = __dependency1__["default"];
    module('addFilterPane');

    test('it works', function() {
      var result;
      result = addFilterPane();
      return ok(result);
    });
  });
define("ember-on-fhir/utils/add-filter-pane", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var addFilterPane;

    addFilterPane = function(context, pane) {
      var ageFilter, ageParam, codeFilter, codeParam, genderFilter, genderParam, newPane;
      switch (pane) {
        case "patient":
          newPane = context.store.createRecord("pane", {
            id: Ember.generateGuid({}, "pane")
          });
          ageParam = context.store.createRecord("extension", {
            id: Ember.generateGuid({}, "extension"),
            url: "http://interventionengine.org/patientage",
            value: 18
          });
          ageFilter = context.store.createRecord("ember-item", {
            id: Ember.generateGuid({}, "ember-item"),
            parameter: ageParam,
            componentName: "age-filter"
          });
          genderParam = context.store.createRecord("extension", {
            id: Ember.generateGuid({}, "extension"),
            url: "http://interventionengine.org/patientgender",
            valueString: "M"
          });
          genderFilter = context.store.createRecord("ember-item", {
            id: Ember.generateGuid({}, "ember-item"),
            parameter: genderParam,
            componentName: "gender-filter"
          });
          newPane.get('items').pushObjects([genderFilter]);
          return context.currentModel.get('panes').pushObject(newPane);
        case "encounter":
          newPane = context.store.createRecord("pane", {
            id: Ember.generateGuid({}, "pane"),
            icon: "fa-hospital-o"
          });
          codeParam = context.store.createRecord("extension", {
            id: Ember.generateGuid({}, "extension"),
            url: "http://interventionengine.org/encounterCode"
          });
          codeFilter = context.store.createRecord("ember-item", {
            id: Ember.generateGuid({}, "ember-item"),
            parameter: codeParam,
            componentName: "encounter-code-filter"
          });
          newPane.get('items').pushObjects([codeFilter]);
          return context.currentModel.get('panes').pushObject(newPane);
        case "condition":
          newPane = context.store.createRecord("pane", {
            id: Ember.generateGuid({}, "pane"),
            icon: "icon-med-clipboard"
          });
          codeFilter = context.store.createRecord("ember-item", {
            id: Ember.generateGuid({}, "ember-item"),
            componentName: "condition-code-filter"
          });
          newPane.get('items').pushObjects([codeFilter]);
          return context.currentModel.get('panes').pushObject(newPane);
      }
    };

    __exports__["default"] = addFilterPane;
  });
/* jshint ignore:start */

define('ember-on-fhir/config/environment', ['ember'], function(Ember) {
  var prefix = 'ember-on-fhir';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("ember-on-fhir/tests/test-helper");
} else {
  require("ember-on-fhir/app")["default"].create({});
}

/* jshint ignore:end */
//# sourceMappingURL=ember-on-fhir.map