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
define("ember-on-fhir/router", 
  ["ember","ember-on-fhir/config/environment","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var config = __dependency2__["default"];

    var Router = Ember.Router.extend({
      location: config.locationType
    });

    Router.map(function () {});

    __exports__["default"] = Router;
  });
define("ember-on-fhir/templates/application", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1;


      data.buffer.push("<h2 id=\"title\">Welcome to Ember.js</h2>\n\n");
      stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      
    });
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
define("ember-on-fhir/tests/router.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - .');
    test('router.js should pass jshint', function() { 
      ok(true, 'router.js should pass jshint.'); 
    });
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