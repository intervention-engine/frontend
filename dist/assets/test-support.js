/* jshint ignore:start */

runningTests = true;

/* jshint ignore:end */

/*!
 * @overview  Ember - JavaScript Application Framework
 * @copyright Copyright 2011-2014 Tilde Inc. and contributors
 *            Portions Copyright 2006-2011 Strobe Inc.
 *            Portions Copyright 2008-2011 Apple Inc. All rights reserved.
 * @license   Licensed under MIT license
 *            See https://raw.github.com/emberjs/ember.js/master/LICENSE
 * @version   1.9.0
 */

(function() {
var enifed, requireModule, eriuqer, requirejs, Ember;

(function() {
  Ember = this.Ember = this.Ember || {};
  if (typeof Ember === 'undefined') { Ember = {}; };
  function UNDEFINED() { }

  if (typeof Ember.__loader === 'undefined') {
    var registry = {}, seen = {};

    enifed = function(name, deps, callback) {
      registry[name] = { deps: deps, callback: callback };
    };

    requirejs = eriuqer = requireModule = function(name) {
      var s = seen[name];

      if (s !== undefined) { return seen[name]; }
      if (s === UNDEFINED) { return undefined;  }

      seen[name] = {};

      if (!registry[name]) {
        throw new Error("Could not find module " + name);
      }

      var mod = registry[name];
      var deps = mod.deps;
      var callback = mod.callback;
      var reified = [];
      var exports;
      var length = deps.length;

      for (var i=0; i<length; i++) {
        if (deps[i] === 'exports') {
          reified.push(exports = {});
        } else {
          reified.push(requireModule(resolve(deps[i], name)));
        }
      }

      var value = length === 0 ? callback.call(this) : callback.apply(this, reified);

      return seen[name] = exports || (value === undefined ? UNDEFINED : value);
    };

    function resolve(child, name) {
      if (child.charAt(0) !== '.') { return child; }
      var parts = child.split("/");
      var parentBase = name.split("/").slice(0, -1);

      for (var i=0, l=parts.length; i<l; i++) {
        var part = parts[i];

        if (part === '..') { parentBase.pop(); }
        else if (part === '.') { continue; }
        else { parentBase.push(part); }
      }

      return parentBase.join("/");
    }

    requirejs._eak_seen = registry;

    Ember.__loader = {define: enifed, require: eriuqer, registry: registry};
  } else {
    enifed = Ember.__loader.define;
    requirejs = eriuqer = requireModule = Ember.__loader.require;
  }
})();

enifed("ember-debug",
  ["ember-metal/core","ember-metal/error","ember-metal/logger","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    /*global __fail__*/

    var Ember = __dependency1__["default"];
    var EmberError = __dependency2__["default"];
    var Logger = __dependency3__["default"];

    /**
    Ember Debug

    @module ember
    @submodule ember-debug
    */

    /**
    @class Ember
    */

    /**
      Define an assertion that will throw an exception if the condition is not
      met. Ember build tools will remove any calls to `Ember.assert()` when
      doing a production build. Example:

      ```javascript
      // Test for truthiness
      Ember.assert('Must pass a valid object', obj);

      // Fail unconditionally
      Ember.assert('This code path should never be run');
      ```

      @method assert
      @param {String} desc A description of the assertion. This will become
        the text of the Error thrown if the assertion fails.
      @param {Boolean} test Must be truthy for the assertion to pass. If
        falsy, an exception will be thrown.
    */
    Ember.assert = function(desc, test) {
      if (!test) {
        throw new EmberError("Assertion Failed: " + desc);
      }
    };


    /**
      Display a warning with the provided message. Ember build tools will
      remove any calls to `Ember.warn()` when doing a production build.

      @method warn
      @param {String} message A warning to display.
      @param {Boolean} test An optional boolean. If falsy, the warning
        will be displayed.
    */
    Ember.warn = function(message, test) {
      if (!test) {
        Logger.warn("WARNING: "+message);
        if ('trace' in Logger) Logger.trace();
      }
    };

    /**
      Display a debug notice. Ember build tools will remove any calls to
      `Ember.debug()` when doing a production build.

      ```javascript
      Ember.debug('I\'m a debug notice!');
      ```

      @method debug
      @param {String} message A debug message to display.
    */
    Ember.debug = function(message) {
      Logger.debug("DEBUG: "+message);
    };

    /**
      Display a deprecation warning with the provided message and a stack trace
      (Chrome and Firefox only). Ember build tools will remove any calls to
      `Ember.deprecate()` when doing a production build.

      @method deprecate
      @param {String} message A description of the deprecation.
      @param {Boolean} test An optional boolean. If falsy, the deprecation
        will be displayed.
    */
    Ember.deprecate = function(message, test) {
      if (test) { return; }

      if (Ember.ENV.RAISE_ON_DEPRECATION) { throw new EmberError(message); }

      var error;

      // When using new Error, we can't do the arguments check for Chrome. Alternatives are welcome
      try { __fail__.fail(); } catch (e) { error = e; }

      if (Ember.LOG_STACKTRACE_ON_DEPRECATION && error.stack) {
        var stack;
        var stackStr = '';

        if (error['arguments']) {
          // Chrome
          stack = error.stack.replace(/^\s+at\s+/gm, '').
                              replace(/^([^\(]+?)([\n$])/gm, '{anonymous}($1)$2').
                              replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, '{anonymous}($1)').split('\n');
          stack.shift();
        } else {
          // Firefox
          stack = error.stack.replace(/(?:\n@:0)?\s+$/m, '').
                              replace(/^\(/gm, '{anonymous}(').split('\n');
        }

        stackStr = "\n    " + stack.slice(2).join("\n    ");
        message = message + stackStr;
      }

      Logger.warn("DEPRECATION: "+message);
    };



    /**
      Alias an old, deprecated method with its new counterpart.

      Display a deprecation warning with the provided message and a stack trace
      (Chrome and Firefox only) when the assigned method is called.

      Ember build tools will not remove calls to `Ember.deprecateFunc()`, though
      no warnings will be shown in production.

      ```javascript
      Ember.oldMethod = Ember.deprecateFunc('Please use the new, updated method', Ember.newMethod);
      ```

      @method deprecateFunc
      @param {String} message A description of the deprecation.
      @param {Function} func The new function called to replace its deprecated counterpart.
      @return {Function} a new function that wrapped the original function with a deprecation warning
    */
    Ember.deprecateFunc = function(message, func) {
      return function() {
        Ember.deprecate(message);
        return func.apply(this, arguments);
      };
    };


    /**
      Run a function meant for debugging. Ember build tools will remove any calls to
      `Ember.runInDebug()` when doing a production build.

      ```javascript
      Ember.runInDebug(function() {
        Ember.Handlebars.EachView.reopen({
          didInsertElement: function() {
            console.log('I\'m happy');
          }
        });
      });
      ```

      @method runInDebug
      @param {Function} func The function to be executed.
      @since 1.5.0
    */
    Ember.runInDebug = function(func) {
      func();
    };

    /**
      Will call `Ember.warn()` if ENABLE_ALL_FEATURES, ENABLE_OPTIONAL_FEATURES, or
      any specific FEATURES flag is truthy.

      This method is called automatically in debug canary builds.
      
      @private
      @method _warnIfUsingStrippedFeatureFlags
      @return {void}
    */
    function _warnIfUsingStrippedFeatureFlags(FEATURES, featuresWereStripped) {
      if (featuresWereStripped) {
        Ember.warn('Ember.ENV.ENABLE_ALL_FEATURES is only available in canary builds.', !Ember.ENV.ENABLE_ALL_FEATURES);
        Ember.warn('Ember.ENV.ENABLE_OPTIONAL_FEATURES is only available in canary builds.', !Ember.ENV.ENABLE_OPTIONAL_FEATURES);

        for (var key in FEATURES) {
          if (FEATURES.hasOwnProperty(key) && key !== 'isEnabled') {
            Ember.warn('FEATURE["' + key + '"] is set as enabled, but FEATURE flags are only available in canary builds.', !FEATURES[key]);
          }
        }
      }
    }

    __exports__._warnIfUsingStrippedFeatureFlags = _warnIfUsingStrippedFeatureFlags;if (!Ember.testing) {
      // Complain if they're using FEATURE flags in builds other than canary
      Ember.FEATURES['features-stripped-test'] = true;
      var featuresWereStripped = true;
      
      
      delete Ember.FEATURES['features-stripped-test'];
      _warnIfUsingStrippedFeatureFlags(Ember.ENV.FEATURES, featuresWereStripped);

      // Inform the developer about the Ember Inspector if not installed.
      var isFirefox = typeof InstallTrigger !== 'undefined';
      var isChrome = !!window.chrome && !window.opera;

      if (typeof window !== 'undefined' && (isFirefox || isChrome) && window.addEventListener) {
        window.addEventListener("load", function() {
          if (document.documentElement && document.documentElement.dataset && !document.documentElement.dataset.emberExtension) {
            var downloadURL;

            if(isChrome) {
              downloadURL = 'https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi';
            } else if(isFirefox) {
              downloadURL = 'https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/';
            }

            Ember.debug('For more advanced debugging, install the Ember Inspector from ' + downloadURL);
          }
        }, false);
      }
    }
  });
enifed("ember-testing",
  ["ember-metal/core","ember-testing/initializers","ember-testing/support","ember-testing/setup_for_testing","ember-testing/test","ember-testing/adapters/adapter","ember-testing/adapters/qunit","ember-testing/helpers"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__) {
    "use strict";
    var Ember = __dependency1__["default"];

    // to setup initializer
         // to handle various edge cases

    var setupForTesting = __dependency4__["default"];
    var Test = __dependency5__["default"];
    var Adapter = __dependency6__["default"];
    var QUnitAdapter = __dependency7__["default"];
         // adds helpers to helpers object in Test

    /**
      Ember Testing

      @module ember
      @submodule ember-testing
      @requires ember-application
    */

    Ember.Test = Test;
    Ember.Test.Adapter = Adapter;
    Ember.Test.QUnitAdapter = QUnitAdapter;
    Ember.setupForTesting = setupForTesting;
  });
enifed("ember-testing/adapters/adapter",
  ["ember-metal/core","ember-runtime/system/object","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    // Ember.K
    var EmberObject = __dependency2__["default"];

    /**
     @module ember
     @submodule ember-testing
    */

    /**
      The primary purpose of this class is to create hooks that can be implemented
      by an adapter for various test frameworks.

      @class Adapter
      @namespace Ember.Test
    */
    var Adapter = EmberObject.extend({
      /**
        This callback will be called whenever an async operation is about to start.

        Override this to call your framework's methods that handle async
        operations.

        @public
        @method asyncStart
      */
      asyncStart: Ember.K,

      /**
        This callback will be called whenever an async operation has completed.

        @public
        @method asyncEnd
      */
      asyncEnd: Ember.K,

      /**
        Override this method with your testing framework's false assertion.
        This function is called whenever an exception occurs causing the testing
        promise to fail.

        QUnit example:

        ```javascript
          exception: function(error) {
            ok(false, error);
          };
        ```

        @public
        @method exception
        @param {String} error The exception to be raised.
      */
      exception: function(error) {
        throw error;
      }
    });

    __exports__["default"] = Adapter;
  });
enifed("ember-testing/adapters/qunit",
  ["ember-testing/adapters/adapter","ember-metal/utils","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Adapter = __dependency1__["default"];
    var inspect = __dependency2__.inspect;

    /**
      This class implements the methods defined by Ember.Test.Adapter for the
      QUnit testing framework.

      @class QUnitAdapter
      @namespace Ember.Test
      @extends Ember.Test.Adapter
    */
    __exports__["default"] = Adapter.extend({
      asyncStart: function() {
        QUnit.stop();
      },
      asyncEnd: function() {
        QUnit.start();
      },
      exception: function(error) {
        ok(false, inspect(error));
      }
    });
  });
enifed("ember-testing/helpers",
  ["ember-metal/property_get","ember-metal/error","ember-metal/run_loop","ember-views/system/jquery","ember-testing/test"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
    "use strict";
    var get = __dependency1__.get;
    var EmberError = __dependency2__["default"];
    var run = __dependency3__["default"];
    var jQuery = __dependency4__["default"];
    var Test = __dependency5__["default"];

    /**
    * @module ember
    * @submodule ember-testing
    */

    var helper = Test.registerHelper;
    var asyncHelper = Test.registerAsyncHelper;
    var countAsync = 0;

    function currentRouteName(app){
      var appController = app.__container__.lookup('controller:application');

      return get(appController, 'currentRouteName');
    }

    function currentPath(app){
      var appController = app.__container__.lookup('controller:application');

      return get(appController, 'currentPath');
    }

    function currentURL(app){
      var router = app.__container__.lookup('router:main');

      return get(router, 'location').getURL();
    }

    function pauseTest(){
      Test.adapter.asyncStart();
      return new Ember.RSVP.Promise(function(){ }, 'TestAdapter paused promise');
    }

    function visit(app, url) {
      var router = app.__container__.lookup('router:main');
      router.location.setURL(url);

      if (app._readinessDeferrals > 0) {
        router['initialURL'] = url;
        run(app, 'advanceReadiness');
        delete router['initialURL'];
      } else {
        run(app, app.handleURL, url);
      }

      return app.testHelpers.wait();
    }

    function click(app, selector, context) {
      var $el = app.testHelpers.findWithAssert(selector, context);
      run($el, 'mousedown');

      if ($el.is(':input')) {
        var type = $el.prop('type');
        if (type !== 'checkbox' && type !== 'radio' && type !== 'hidden') {
          run($el, function(){
            // Firefox does not trigger the `focusin` event if the window
            // does not have focus. If the document doesn't have focus just
            // use trigger('focusin') instead.
            if (!document.hasFocus || document.hasFocus()) {
              this.focus();
            } else {
              this.trigger('focusin');
            }
          });
        }
      }

      run($el, 'mouseup');
      run($el, 'click');

      return app.testHelpers.wait();
    }

    function triggerEvent(app, selector, contextOrType, typeOrOptions, possibleOptions){
      var arity = arguments.length;
      var context, type, options;

      if (arity === 3) {
        // context and options are optional, so this is
        // app, selector, type
        context = null;
        type = contextOrType;
        options = {};
      } else if (arity === 4) {
        // context and options are optional, so this is
        if (typeof typeOrOptions === "object") {  // either
          // app, selector, type, options
          context = null;
          type = contextOrType;
          options = typeOrOptions;
        } else { // or
          // app, selector, context, type
          context = contextOrType;
          type = typeOrOptions;
          options = {};
        }
      } else {
        context = contextOrType;
        type = typeOrOptions;
        options = possibleOptions;
      }

      var $el = app.testHelpers.findWithAssert(selector, context);

      var event = jQuery.Event(type, options);

      run($el, 'trigger', event);

      return app.testHelpers.wait();
    }

    function keyEvent(app, selector, contextOrType, typeOrKeyCode, keyCode) {
      var context, type;

      if (typeof keyCode === 'undefined') {
        context = null;
        keyCode = typeOrKeyCode;
        type = contextOrType;
      } else {
        context = contextOrType;
        type = typeOrKeyCode;
      }

      return app.testHelpers.triggerEvent(selector, context, type, { keyCode: keyCode, which: keyCode });
    }

    function fillIn(app, selector, contextOrText, text) {
      var $el, context;
      if (typeof text === 'undefined') {
        text = contextOrText;
      } else {
        context = contextOrText;
      }
      $el = app.testHelpers.findWithAssert(selector, context);
      run(function() {
        $el.val(text).change();
      });
      return app.testHelpers.wait();
    }

    function findWithAssert(app, selector, context) {
      var $el = app.testHelpers.find(selector, context);
      if ($el.length === 0) {
        throw new EmberError("Element " + selector + " not found.");
      }
      return $el;
    }

    function find(app, selector, context) {
      var $el;
      context = context || get(app, 'rootElement');
      $el = app.$(selector, context);

      return $el;
    }

    function andThen(app, callback) {
      return app.testHelpers.wait(callback(app));
    }

    function wait(app, value) {
      return Test.promise(function(resolve) {
        // If this is the first async promise, kick off the async test
        if (++countAsync === 1) {
          Test.adapter.asyncStart();
        }

        // Every 10ms, poll for the async thing to have finished
        var watcher = setInterval(function() {
          // 1. If the router is loading, keep polling
          var routerIsLoading = !!app.__container__.lookup('router:main').router.activeTransition;
          if (routerIsLoading) { return; }

          // 2. If there are pending Ajax requests, keep polling
          if (Test.pendingAjaxRequests) { return; }

          // 3. If there are scheduled timers or we are inside of a run loop, keep polling
          if (run.hasScheduledTimers() || run.currentRunLoop) { return; }
          if (Test.waiters && Test.waiters.any(function(waiter) {
            var context = waiter[0];
            var callback = waiter[1];
            return !callback.call(context);
          })) { return; }
          // Stop polling
          clearInterval(watcher);

          // If this is the last async promise, end the async test
          if (--countAsync === 0) {
            Test.adapter.asyncEnd();
          }

          // Synchronously resolve the promise
          run(null, resolve, value);
        }, 10);
      });

    }


    /**
    * Loads a route, sets up any controllers, and renders any templates associated
    * with the route as though a real user had triggered the route change while
    * using your app.
    *
    * Example:
    *
    * ```javascript
    * visit('posts/index').then(function() {
    *   // assert something
    * });
    * ```
    *
    * @method visit
    * @param {String} url the name of the route
    * @return {RSVP.Promise}
    */
    asyncHelper('visit', visit);

    /**
    * Clicks an element and triggers any actions triggered by the element's `click`
    * event.
    *
    * Example:
    *
    * ```javascript
    * click('.some-jQuery-selector').then(function() {
    *   // assert something
    * });
    * ```
    *
    * @method click
    * @param {String} selector jQuery selector for finding element on the DOM
    * @return {RSVP.Promise}
    */
    asyncHelper('click', click);

    /**
    * Simulates a key event, e.g. `keypress`, `keydown`, `keyup` with the desired keyCode
    *
    * Example:
    *
    * ```javascript
    * keyEvent('.some-jQuery-selector', 'keypress', 13).then(function() {
    *  // assert something
    * });
    * ```
    *
    * @method keyEvent
    * @param {String} selector jQuery selector for finding element on the DOM
    * @param {String} type the type of key event, e.g. `keypress`, `keydown`, `keyup`
    * @param {Number} keyCode the keyCode of the simulated key event
    * @return {RSVP.Promise}
    * @since 1.5.0
    */
    asyncHelper('keyEvent', keyEvent);

    /**
    * Fills in an input element with some text.
    *
    * Example:
    *
    * ```javascript
    * fillIn('#email', 'you@example.com').then(function() {
    *   // assert something
    * });
    * ```
    *
    * @method fillIn
    * @param {String} selector jQuery selector finding an input element on the DOM
    * to fill text with
    * @param {String} text text to place inside the input element
    * @return {RSVP.Promise}
    */
    asyncHelper('fillIn', fillIn);

    /**
    * Finds an element in the context of the app's container element. A simple alias
    * for `app.$(selector)`.
    *
    * Example:
    *
    * ```javascript
    * var $el = find('.my-selector');
    * ```
    *
    * @method find
    * @param {String} selector jQuery string selector for element lookup
    * @return {Object} jQuery object representing the results of the query
    */
    helper('find', find);

    /**
    * Like `find`, but throws an error if the element selector returns no results.
    *
    * Example:
    *
    * ```javascript
    * var $el = findWithAssert('.doesnt-exist'); // throws error
    * ```
    *
    * @method findWithAssert
    * @param {String} selector jQuery selector string for finding an element within
    * the DOM
    * @return {Object} jQuery object representing the results of the query
    * @throws {Error} throws error if jQuery object returned has a length of 0
    */
    helper('findWithAssert', findWithAssert);

    /**
      Causes the run loop to process any pending events. This is used to ensure that
      any async operations from other helpers (or your assertions) have been processed.

      This is most often used as the return value for the helper functions (see 'click',
      'fillIn','visit',etc).

      Example:

      ```javascript
      Ember.Test.registerAsyncHelper('loginUser', function(app, username, password) {
        visit('secured/path/here')
        .fillIn('#username', username)
        .fillIn('#password', password)
        .click('.submit')

        return app.testHelpers.wait();
      });

      @method wait
      @param {Object} value The value to be returned.
      @return {RSVP.Promise}
    */
    asyncHelper('wait', wait);
    asyncHelper('andThen', andThen);


    /**
      Returns the currently active route name.

    Example:

    ```javascript
    function validateRouteName(){
    equal(currentRouteName(), 'some.path', "correct route was transitioned into.");
    }

    visit('/some/path').then(validateRouteName)
    ```

    @method currentRouteName
    @return {Object} The name of the currently active route.
    @since 1.5.0
    */
    helper('currentRouteName', currentRouteName);

    /**
      Returns the current path.

    Example:

    ```javascript
    function validateURL(){
    equal(currentPath(), 'some.path.index', "correct path was transitioned into.");
    }

    click('#some-link-id').then(validateURL);
    ```

    @method currentPath
    @return {Object} The currently active path.
    @since 1.5.0
    */
    helper('currentPath', currentPath);

    /**
      Returns the current URL.

    Example:

    ```javascript
    function validateURL(){
    equal(currentURL(), '/some/path', "correct URL was transitioned into.");
    }

    click('#some-link-id').then(validateURL);
    ```

    @method currentURL
    @return {Object} The currently active URL.
    @since 1.5.0
    */
    helper('currentURL', currentURL);

    
      /**
       Pauses the current test - this is useful for debugging while testing or for test-driving.
       It allows you to inspect the state of your application at any point.

       Example (The test will pause before clicking the button):

       ```javascript
       visit('/')
       return pauseTest();

       click('.btn');
       ```

       @method pauseTest
       @return {Object} A promise that will never resolve
       */
      helper('pauseTest', pauseTest);
    

    /**
      Triggers the given DOM event on the element identified by the provided selector.

      Example:

      ```javascript
      triggerEvent('#some-elem-id', 'blur');
      ```

      This is actually used internally by the `keyEvent` helper like so:

      ```javascript
      triggerEvent('#some-elem-id', 'keypress', { keyCode: 13 });
      ```

     @method triggerEvent
     @param {String} selector jQuery selector for finding element on the DOM
     @param {String} [context] jQuery selector that will limit the selector
                               argument to find only within the context's children
     @param {String} type The event type to be triggered.
     @param {Object} [options] The options to be passed to jQuery.Event.
     @return {RSVP.Promise}
     @since 1.5.0
    */
    asyncHelper('triggerEvent', triggerEvent);
  });
enifed("ember-testing/initializers",
  ["ember-runtime/system/lazy_load"],
  function(__dependency1__) {
    "use strict";
    var onLoad = __dependency1__.onLoad;

    var name = 'deferReadiness in `testing` mode';

    onLoad('Ember.Application', function(Application) {
      if (!Application.initializers[name]) {
        Application.initializer({
          name: name,

          initialize: function(container, application){
            if (application.testing) {
              application.deferReadiness();
            }
          }
        });
      }
    });
  });
enifed("ember-testing/setup_for_testing",
  ["ember-metal/core","ember-testing/adapters/qunit","ember-views/system/jquery","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    // import Test from "ember-testing/test";  // ES6TODO: fix when cycles are supported
    var QUnitAdapter = __dependency2__["default"];
    var jQuery = __dependency3__["default"];

    var Test, requests;

    function incrementAjaxPendingRequests(_, xhr){
      requests.push(xhr);
      Test.pendingAjaxRequests = requests.length;
    }

    function decrementAjaxPendingRequests(_, xhr){
      for (var i=0;i<requests.length;i++) {
        if (xhr === requests[i]) {
          requests.splice(i, 1);
        }
      }
      Test.pendingAjaxRequests = requests.length;
    }

    /**
      Sets Ember up for testing. This is useful to perform
      basic setup steps in order to unit test.

      Use `App.setupForTesting` to perform integration tests (full
      application testing).

      @method setupForTesting
      @namespace Ember
      @since 1.5.0
    */
    __exports__["default"] = function setupForTesting() {
      if (!Test) { Test = requireModule('ember-testing/test')['default']; }

      Ember.testing = true;

      // if adapter is not manually set default to QUnit
      if (!Test.adapter) {
        Test.adapter = QUnitAdapter.create();
      }

      requests = [];
      Test.pendingAjaxRequests = requests.length;

      jQuery(document).off('ajaxSend', incrementAjaxPendingRequests);
      jQuery(document).off('ajaxComplete', decrementAjaxPendingRequests);
      jQuery(document).on('ajaxSend', incrementAjaxPendingRequests);
      jQuery(document).on('ajaxComplete', decrementAjaxPendingRequests);
    }
  });
enifed("ember-testing/support",
  ["ember-metal/core","ember-views/system/jquery"],
  function(__dependency1__, __dependency2__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var jQuery = __dependency2__["default"];

    /**
      @module ember
      @submodule ember-testing
     */

    var $ = jQuery;

    /**
      This method creates a checkbox and triggers the click event to fire the
      passed in handler. It is used to correct for a bug in older versions
      of jQuery (e.g 1.8.3).

      @private
      @method testCheckboxClick
    */
    function testCheckboxClick(handler) {
      $('<input type="checkbox">')
        .css({ position: 'absolute', left: '-1000px', top: '-1000px' })
        .appendTo('body')
        .on('click', handler)
        .trigger('click')
        .remove();
    }

    $(function() {
      /*
        Determine whether a checkbox checked using jQuery's "click" method will have
        the correct value for its checked property.

        If we determine that the current jQuery version exhibits this behavior,
        patch it to work correctly as in the commit for the actual fix:
        https://github.com/jquery/jquery/commit/1fb2f92.
      */
      testCheckboxClick(function() {
        if (!this.checked && !$.event.special.click) {
          $.event.special.click = {
            // For checkbox, fire native event so checked state will be right
            trigger: function() {
              if ($.nodeName( this, "input" ) && this.type === "checkbox" && this.click) {
                this.click();
                return false;
              }
            }
          };
        }
      });

      // Try again to verify that the patch took effect or blow up.
      testCheckboxClick(function() {
        Ember.warn("clicked checkboxes should be checked! the jQuery patch didn't work", this.checked);
      });
    });
  });
enifed("ember-testing/test",
  ["ember-metal/core","ember-metal/run_loop","ember-metal/platform","ember-runtime/compare","ember-runtime/ext/rsvp","ember-testing/setup_for_testing","ember-application/system/application","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var emberRun = __dependency2__["default"];
    var create = __dependency3__.create;
    var compare = __dependency4__["default"];
    var RSVP = __dependency5__["default"];
    var setupForTesting = __dependency6__["default"];
    var EmberApplication = __dependency7__["default"];

    /**
      @module ember
      @submodule ember-testing
     */
    var slice = [].slice;
    var helpers = {};
    var injectHelpersCallbacks = [];

    /**
      This is a container for an assortment of testing related functionality:

      * Choose your default test adapter (for your framework of choice).
      * Register/Unregister additional test helpers.
      * Setup callbacks to be fired when the test helpers are injected into
        your application.

      @class Test
      @namespace Ember
    */
    var Test = {
      /**
        Hash containing all known test helpers.

        @property _helpers
        @private
        @since 1.7.0
      */
      _helpers: helpers,

      /**
        `registerHelper` is used to register a test helper that will be injected
        when `App.injectTestHelpers` is called.

        The helper method will always be called with the current Application as
        the first parameter.

        For example:

        ```javascript
        Ember.Test.registerHelper('boot', function(app) {
          Ember.run(app, app.advanceReadiness);
        });
        ```

        This helper can later be called without arguments because it will be
        called with `app` as the first parameter.

        ```javascript
        App = Ember.Application.create();
        App.injectTestHelpers();
        boot();
        ```

        @public
        @method registerHelper
        @param {String} name The name of the helper method to add.
        @param {Function} helperMethod
        @param options {Object}
      */
      registerHelper: function(name, helperMethod) {
        helpers[name] = {
          method: helperMethod,
          meta: { wait: false }
        };
      },

      /**
        `registerAsyncHelper` is used to register an async test helper that will be injected
        when `App.injectTestHelpers` is called.

        The helper method will always be called with the current Application as
        the first parameter.

        For example:

        ```javascript
        Ember.Test.registerAsyncHelper('boot', function(app) {
          Ember.run(app, app.advanceReadiness);
        });
        ```

        The advantage of an async helper is that it will not run
        until the last async helper has completed.  All async helpers
        after it will wait for it complete before running.


        For example:

        ```javascript
        Ember.Test.registerAsyncHelper('deletePost', function(app, postId) {
          click('.delete-' + postId);
        });

        // ... in your test
        visit('/post/2');
        deletePost(2);
        visit('/post/3');
        deletePost(3);
        ```

        @public
        @method registerAsyncHelper
        @param {String} name The name of the helper method to add.
        @param {Function} helperMethod
        @since 1.2.0
      */
      registerAsyncHelper: function(name, helperMethod) {
        helpers[name] = {
          method: helperMethod,
          meta: { wait: true }
        };
      },

      /**
        Remove a previously added helper method.

        Example:

        ```javascript
        Ember.Test.unregisterHelper('wait');
        ```

        @public
        @method unregisterHelper
        @param {String} name The helper to remove.
      */
      unregisterHelper: function(name) {
        delete helpers[name];
        delete Test.Promise.prototype[name];
      },

      /**
        Used to register callbacks to be fired whenever `App.injectTestHelpers`
        is called.

        The callback will receive the current application as an argument.

        Example:

        ```javascript
        Ember.Test.onInjectHelpers(function() {
          Ember.$(document).ajaxSend(function() {
            Test.pendingAjaxRequests++;
          });

          Ember.$(document).ajaxComplete(function() {
            Test.pendingAjaxRequests--;
          });
        });
        ```

        @public
        @method onInjectHelpers
        @param {Function} callback The function to be called.
      */
      onInjectHelpers: function(callback) {
        injectHelpersCallbacks.push(callback);
      },

      /**
        This returns a thenable tailored for testing.  It catches failed
        `onSuccess` callbacks and invokes the `Ember.Test.adapter.exception`
        callback in the last chained then.

        This method should be returned by async helpers such as `wait`.

        @public
        @method promise
        @param {Function} resolver The function used to resolve the promise.
      */
      promise: function(resolver) {
        return new Test.Promise(resolver);
      },

      /**
       Used to allow ember-testing to communicate with a specific testing
       framework.

       You can manually set it before calling `App.setupForTesting()`.

       Example:

       ```javascript
       Ember.Test.adapter = MyCustomAdapter.create()
       ```

       If you do not set it, ember-testing will default to `Ember.Test.QUnitAdapter`.

       @public
       @property adapter
       @type {Class} The adapter to be used.
       @default Ember.Test.QUnitAdapter
      */
      adapter: null,

      /**
        Replacement for `Ember.RSVP.resolve`
        The only difference is this uses
        an instance of `Ember.Test.Promise`

        @public
        @method resolve
        @param {Mixed} The value to resolve
        @since 1.2.0
      */
      resolve: function(val) {
        return Test.promise(function(resolve) {
          return resolve(val);
        });
      },

      /**
         This allows ember-testing to play nicely with other asynchronous
         events, such as an application that is waiting for a CSS3
         transition or an IndexDB transaction.

         For example:

         ```javascript
         Ember.Test.registerWaiter(function() {
           return myPendingTransactions() == 0;
         });
         ```
         The `context` argument allows you to optionally specify the `this`
         with which your callback will be invoked.

         For example:

         ```javascript
         Ember.Test.registerWaiter(MyDB, MyDB.hasPendingTransactions);
         ```

         @public
         @method registerWaiter
         @param {Object} context (optional)
         @param {Function} callback
         @since 1.2.0
      */
      registerWaiter: function(context, callback) {
        if (arguments.length === 1) {
          callback = context;
          context = null;
        }
        if (!this.waiters) {
          this.waiters = Ember.A();
        }
        this.waiters.push([context, callback]);
      },
      /**
         `unregisterWaiter` is used to unregister a callback that was
         registered with `registerWaiter`.

         @public
         @method unregisterWaiter
         @param {Object} context (optional)
         @param {Function} callback
         @since 1.2.0
      */
      unregisterWaiter: function(context, callback) {
        var pair;
        if (!this.waiters) { return; }
        if (arguments.length === 1) {
          callback = context;
          context = null;
        }
        pair = [context, callback];
        this.waiters = Ember.A(this.waiters.filter(function(elt) {
          return compare(elt, pair)!==0;
        }));
      }
    };

    function helper(app, name) {
      var fn = helpers[name].method;
      var meta = helpers[name].meta;

      return function() {
        var args = slice.call(arguments);
        var lastPromise = Test.lastPromise;

        args.unshift(app);

        // some helpers are not async and
        // need to return a value immediately.
        // example: `find`
        if (!meta.wait) {
          return fn.apply(app, args);
        }

        if (!lastPromise) {
          // It's the first async helper in current context
          lastPromise = fn.apply(app, args);
        } else {
          // wait for last helper's promise to resolve
          // and then execute
          run(function() {
            lastPromise = Test.resolve(lastPromise).then(function() {
              return fn.apply(app, args);
            });
          });
        }

        return lastPromise;
      };
    }

    function run(fn) {
      if (!emberRun.currentRunLoop) {
        emberRun(fn);
      } else {
        fn();
      }
    }

    EmberApplication.reopen({
      /**
       This property contains the testing helpers for the current application. These
       are created once you call `injectTestHelpers` on your `Ember.Application`
       instance. The included helpers are also available on the `window` object by
       default, but can be used from this object on the individual application also.

        @property testHelpers
        @type {Object}
        @default {}
      */
      testHelpers: {},

      /**
       This property will contain the original methods that were registered
       on the `helperContainer` before `injectTestHelpers` is called.

       When `removeTestHelpers` is called, these methods are restored to the
       `helperContainer`.

        @property originalMethods
        @type {Object}
        @default {}
        @private
        @since 1.3.0
      */
      originalMethods: {},


      /**
      This property indicates whether or not this application is currently in
      testing mode. This is set when `setupForTesting` is called on the current
      application.

      @property testing
      @type {Boolean}
      @default false
      @since 1.3.0
      */
      testing: false,

      /**
       This hook defers the readiness of the application, so that you can start
       the app when your tests are ready to run. It also sets the router's
       location to 'none', so that the window's location will not be modified
       (preventing both accidental leaking of state between tests and interference
       with your testing framework).

       Example:

      ```
      App.setupForTesting();
      ```

        @method setupForTesting
      */
      setupForTesting: function() {
        setupForTesting();

        this.testing = true;

        this.Router.reopen({
          location: 'none'
        });
      },

      /**
        This will be used as the container to inject the test helpers into. By
        default the helpers are injected into `window`.

        @property helperContainer
        @type {Object} The object to be used for test helpers.
        @default window
        @since 1.2.0
      */
      helperContainer: window,

      /**
        This injects the test helpers into the `helperContainer` object. If an object is provided
        it will be used as the helperContainer. If `helperContainer` is not set it will default
        to `window`. If a function of the same name has already been defined it will be cached
        (so that it can be reset if the helper is removed with `unregisterHelper` or
        `removeTestHelpers`).

       Any callbacks registered with `onInjectHelpers` will be called once the
       helpers have been injected.

      Example:
      ```
      App.injectTestHelpers();
      ```

        @method injectTestHelpers
      */
      injectTestHelpers: function(helperContainer) {
        if (helperContainer) { this.helperContainer = helperContainer; }

        this.testHelpers = {};
        for (var name in helpers) {
          this.originalMethods[name] = this.helperContainer[name];
          this.testHelpers[name] = this.helperContainer[name] = helper(this, name);
          protoWrap(Test.Promise.prototype, name, helper(this, name), helpers[name].meta.wait);
        }

        for(var i = 0, l = injectHelpersCallbacks.length; i < l; i++) {
          injectHelpersCallbacks[i](this);
        }
      },

      /**
        This removes all helpers that have been registered, and resets and functions
        that were overridden by the helpers.

        Example:

        ```javascript
        App.removeTestHelpers();
        ```

        @public
        @method removeTestHelpers
      */
      removeTestHelpers: function() {
        for (var name in helpers) {
          this.helperContainer[name] = this.originalMethods[name];
          delete this.testHelpers[name];
          delete this.originalMethods[name];
        }
      }
    });

    // This method is no longer needed
    // But still here for backwards compatibility
    // of helper chaining
    function protoWrap(proto, name, callback, isAsync) {
      proto[name] = function() {
        var args = arguments;
        if (isAsync) {
          return callback.apply(this, args);
        } else {
          return this.then(function() {
            return callback.apply(this, args);
          });
        }
      };
    }

    Test.Promise = function() {
      RSVP.Promise.apply(this, arguments);
      Test.lastPromise = this;
    };

    Test.Promise.prototype = create(RSVP.Promise.prototype);
    Test.Promise.prototype.constructor = Test.Promise;

    // Patch `then` to isolate async methods
    // specifically `Ember.Test.lastPromise`
    var originalThen = RSVP.Promise.prototype.then;
    Test.Promise.prototype.then = function(onSuccess, onFailure) {
      return originalThen.call(this, function(val) {
        return isolate(onSuccess, val);
      }, onFailure);
    };

    // This method isolates nested async methods
    // so that they don't conflict with other last promises.
    //
    // 1. Set `Ember.Test.lastPromise` to null
    // 2. Invoke method
    // 3. Return the last promise created during method
    // 4. Restore `Ember.Test.lastPromise` to original value
    function isolate(fn, val) {
      var value, lastPromise;

      // Reset lastPromise for nested helpers
      Test.lastPromise = null;

      value = fn(val);

      lastPromise = Test.lastPromise;

      // If the method returned a promise
      // return that promise. If not,
      // return the last async helper's promise
      if ((value && (value instanceof Test.Promise)) || !lastPromise) {
        return value;
      } else {
        run(function() {
          lastPromise = Test.resolve(lastPromise).then(function() {
            return value;
          });
        });
        return lastPromise;
      }
    }

    __exports__["default"] = Test;
  });
requireModule("ember-testing");

})();
define("ember-qunit/isolated-container",
  ["./test-resolver","ember","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var testResolver = __dependency1__["default"] || __dependency1__;
    var Ember = __dependency2__["default"] || __dependency2__;

    __exports__["default"] = function isolatedContainer(fullNames) {
      var resolver = testResolver.get();
      var container = new Ember.Container();
      container.optionsForType('component', { singleton: false });
      container.optionsForType('view', { singleton: false });
      container.optionsForType('template', { instantiate: false });
      container.optionsForType('helper', { instantiate: false });
      container.register('component-lookup:main', Ember.ComponentLookup);
      for (var i = fullNames.length; i > 0; i--) {
        var fullName = fullNames[i - 1];
        container.register(fullName, resolver.resolve(fullName));
      }
      return container;
    }
  });define("ember-qunit",
  ["ember","./isolated-container","./module-for","./module-for-component","./module-for-model","./test","./test-resolver","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    var isolatedContainer = __dependency2__["default"] || __dependency2__;
    var moduleFor = __dependency3__["default"] || __dependency3__;
    var moduleForComponent = __dependency4__["default"] || __dependency4__;
    var moduleForModel = __dependency5__["default"] || __dependency5__;
    var test = __dependency6__["default"] || __dependency6__;
    var testResolver = __dependency7__["default"] || __dependency7__;

    Ember.testing = true;

    function setResolver(resolver) {
      testResolver.set(resolver);
    }

    function globalize() {
      window.moduleFor = moduleFor;
      window.moduleForComponent = moduleForComponent;
      window.moduleForModel = moduleForModel;
      window.test = test;
      window.setResolver = setResolver;
    }

    __exports__.globalize = globalize;
    __exports__.moduleFor = moduleFor;
    __exports__.moduleForComponent = moduleForComponent;
    __exports__.moduleForModel = moduleForModel;
    __exports__.test = test;
    __exports__.setResolver = setResolver;
  });define("ember-qunit/module-for-component",
  ["./test-resolver","./module-for","ember","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var testResolver = __dependency1__["default"] || __dependency1__;
    var moduleFor = __dependency2__["default"] || __dependency2__;
    var Ember = __dependency3__["default"] || __dependency3__;

    __exports__["default"] = function moduleForComponent(name, description, callbacks) {
      var resolver = testResolver.get();

      moduleFor('component:' + name, description, callbacks, function(container, context, defaultSubject) {
        var layoutName = 'template:components/' + name;

        var layout = resolver.resolve(layoutName);

        if (layout) {
          container.register(layoutName, layout);
          container.injection('component:' + name, 'layout', layoutName);
        }

        context.dispatcher = Ember.EventDispatcher.create();
        context.dispatcher.setup({}, '#ember-testing');

        context.__setup_properties__.append = function(selector) {
          var containerView = Ember.ContainerView.create({container: container});
          var view = Ember.run(function(){
            var subject = context.subject();
            containerView.pushObject(subject);
            // TODO: destory this somewhere
            containerView.appendTo('#ember-testing');
            return subject;
          });

          return view.$();
        };
        context.__setup_properties__.$ = context.__setup_properties__.append;
      });
    }
  });define("ember-qunit/module-for-model",
  ["./module-for","ember","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var moduleFor = __dependency1__["default"] || __dependency1__;
    var Ember = __dependency2__["default"] || __dependency2__;

    __exports__["default"] = function moduleForModel(name, description, callbacks) {
      moduleFor('model:' + name, description, callbacks, function(container, context, defaultSubject) {
        if (DS._setupContainer) {
          DS._setupContainer(container);
        } else {
          container.register('store:main', DS.Store);
        }

        var adapterFactory = container.lookupFactory('adapter:application');
        if (!adapterFactory) {
          container.register('adapter:application', DS.FixtureAdapter);
        }

        context.__setup_properties__.store = function(){
          return container.lookup('store:main');
        };

        if (context.__setup_properties__.subject === defaultSubject) {
          context.__setup_properties__.subject = function(options) {
            return Ember.run(function() {
              return container.lookup('store:main').createRecord(name, options);
            });
          };
        }
      });
    }
  });define("ember-qunit/module-for",
  ["ember","./test-context","./isolated-container","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    //import QUnit from 'qunit'; // Assumed global in runner
    var testContext = __dependency2__["default"] || __dependency2__;
    var isolatedContainer = __dependency3__["default"] || __dependency3__;

    __exports__["default"] = function moduleFor(fullName, description, callbacks, delegate) {
      var container;
      var context;
      
      var _callbacks = {
        setup: function(){
          callbacks = callbacks || { };

          var needs = [fullName].concat(callbacks.needs || []);
          container = isolatedContainer(needs);

          callbacks.subject   = callbacks.subject || defaultSubject;

          callbacks.setup     = callbacks.setup    || function() { };
          callbacks.teardown  = callbacks.teardown || function() { };
          
          function factory() {
            return container.lookupFactory(fullName);
          }
          
          testContext.set({
            container:            container,
            factory:              factory,
            dispatcher:           null,
            __setup_properties__: callbacks
          });
          
          context = testContext.get();

          if (delegate) {
            delegate(container, context, defaultSubject);
          }
          
          if (Ember.$('#ember-testing').length === 0) {
            Ember.$('<div id="ember-testing"/>').appendTo(document.body);
          }
          
          buildContextVariables(context);
          callbacks.setup.call(context, container);
        },

        teardown: function(){
          Ember.run(function(){
            container.destroy();
            
            if (context.dispatcher) {
              context.dispatcher.destroy();
            }
          });
          
          callbacks.teardown(container);
          Ember.$('#ember-testing').empty();
        }
      };

      QUnit.module(description || fullName, _callbacks);
    }

    function defaultSubject(options, factory) {
      return factory.create(options);
    }

    // allow arbitrary named factories, like rspec let
    function buildContextVariables(context) {
      var cache     = { };
      var callbacks = context.__setup_properties__;
      var container = context.container;
      var factory   = context.factory;
        
      Ember.keys(callbacks).filter(function(key){
        // ignore the default setup/teardown keys
        return key !== 'setup' && key !== 'teardown';
      }).forEach(function(key){
        context[key] = function(options) {
          if (cache[key]) { return cache[key]; }

          var result = callbacks[key](options, factory(), container);
          cache[key] = result;
          return result;
        };
      });
    }
  });define("ember-qunit/test-context",
  ["exports"],
  function(__exports__) {
    "use strict";
    var __test_context__;

    function set(context) {
      __test_context__ = context;
    }

    __exports__.set = set;function get() {
      return __test_context__;
    }

    __exports__.get = get;
  });define("ember-qunit/test-resolver",
  ["exports"],
  function(__exports__) {
    "use strict";
    var __resolver__;

    function set(resolver) {
      __resolver__ = resolver;
    }

    __exports__.set = set;function get() {
      if (__resolver__ == null) throw new Error('you must set a resolver with `testResolver.set(resolver)`');
      return __resolver__;
    }

    __exports__.get = get;
  });define("ember-qunit/test",
  ["ember","./test-context","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    //import QUnit from 'qunit'; // Assumed global in runner
    var testContext = __dependency2__["default"] || __dependency2__;

    function resetViews() {
      Ember.View.views = {};
    }

    __exports__["default"] = function test(testName, callback) {

      function wrapper() {
        var context = testContext.get();
        
        resetViews();
        var result = callback.call(context);

        function failTestOnPromiseRejection(reason) {
          ok(false, reason);
        }

        Ember.run(function(){
          stop();
          Ember.RSVP.Promise.cast(result)['catch'](failTestOnPromiseRejection)['finally'](start);
        });
      }

      QUnit.test(testName, wrapper);
    }
  });
/* global define, QUnit */
define('qunit', [], function() {
  "use strict";

  return {
    'default': QUnit
  };
});
/*!
 * QUnit 1.15.0
 * http://qunitjs.com/
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-08-08T16:00Z
 */

(function( window ) {

var QUnit,
	config,
	onErrorFnPrev,
	fileName = ( sourceFromStacktrace( 0 ) || "" ).replace( /(:\d+)+\)?/, "" ).replace( /.+\//, "" ),
	toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty,
	// Keep a local reference to Date (GH-283)
	Date = window.Date,
	now = Date.now || function() {
		return new Date().getTime();
	},
	setTimeout = window.setTimeout,
	clearTimeout = window.clearTimeout,
	defined = {
		document: typeof window.document !== "undefined",
		setTimeout: typeof window.setTimeout !== "undefined",
		sessionStorage: (function() {
			var x = "qunit-test-string";
			try {
				sessionStorage.setItem( x, x );
				sessionStorage.removeItem( x );
				return true;
			} catch ( e ) {
				return false;
			}
		}())
	},
	/**
	 * Provides a normalized error string, correcting an issue
	 * with IE 7 (and prior) where Error.prototype.toString is
	 * not properly implemented
	 *
	 * Based on http://es5.github.com/#x15.11.4.4
	 *
	 * @param {String|Error} error
	 * @return {String} error message
	 */
	errorString = function( error ) {
		var name, message,
			errorString = error.toString();
		if ( errorString.substring( 0, 7 ) === "[object" ) {
			name = error.name ? error.name.toString() : "Error";
			message = error.message ? error.message.toString() : "";
			if ( name && message ) {
				return name + ": " + message;
			} else if ( name ) {
				return name;
			} else if ( message ) {
				return message;
			} else {
				return "Error";
			}
		} else {
			return errorString;
		}
	},
	/**
	 * Makes a clone of an object using only Array or Object as base,
	 * and copies over the own enumerable properties.
	 *
	 * @param {Object} obj
	 * @return {Object} New object with only the own properties (recursively).
	 */
	objectValues = function( obj ) {
		var key, val,
			vals = QUnit.is( "array", obj ) ? [] : {};
		for ( key in obj ) {
			if ( hasOwn.call( obj, key ) ) {
				val = obj[ key ];
				vals[ key ] = val === Object( val ) ? objectValues( val ) : val;
			}
		}
		return vals;
	};

// Root QUnit object.
// `QUnit` initialized at top of scope
QUnit = {

	// call on start of module test to prepend name to all tests
	module: function( name, testEnvironment ) {
		config.currentModule = name;
		config.currentModuleTestEnvironment = testEnvironment;
		config.modules[ name ] = true;
	},

	asyncTest: function( testName, expected, callback ) {
		if ( arguments.length === 2 ) {
			callback = expected;
			expected = null;
		}

		QUnit.test( testName, expected, callback, true );
	},

	test: function( testName, expected, callback, async ) {
		var test;

		if ( arguments.length === 2 ) {
			callback = expected;
			expected = null;
		}

		test = new Test({
			testName: testName,
			expected: expected,
			async: async,
			callback: callback,
			module: config.currentModule,
			moduleTestEnvironment: config.currentModuleTestEnvironment,
			stack: sourceFromStacktrace( 2 )
		});

		if ( !validTest( test ) ) {
			return;
		}

		test.queue();
	},

	start: function( count ) {
		var message;

		// QUnit hasn't been initialized yet.
		// Note: RequireJS (et al) may delay onLoad
		if ( config.semaphore === undefined ) {
			QUnit.begin(function() {
				// This is triggered at the top of QUnit.load, push start() to the event loop, to allow QUnit.load to finish first
				setTimeout(function() {
					QUnit.start( count );
				});
			});
			return;
		}

		config.semaphore -= count || 1;
		// don't start until equal number of stop-calls
		if ( config.semaphore > 0 ) {
			return;
		}

		// Set the starting time when the first test is run
		QUnit.config.started = QUnit.config.started || now();
		// ignore if start is called more often then stop
		if ( config.semaphore < 0 ) {
			config.semaphore = 0;

			message = "Called start() while already started (QUnit.config.semaphore was 0 already)";

			if ( config.current ) {
				QUnit.pushFailure( message, sourceFromStacktrace( 2 ) );
			} else {
				throw new Error( message );
			}

			return;
		}
		// A slight delay, to avoid any current callbacks
		if ( defined.setTimeout ) {
			setTimeout(function() {
				if ( config.semaphore > 0 ) {
					return;
				}
				if ( config.timeout ) {
					clearTimeout( config.timeout );
				}

				config.blocking = false;
				process( true );
			}, 13 );
		} else {
			config.blocking = false;
			process( true );
		}
	},

	stop: function( count ) {
		config.semaphore += count || 1;
		config.blocking = true;

		if ( config.testTimeout && defined.setTimeout ) {
			clearTimeout( config.timeout );
			config.timeout = setTimeout(function() {
				QUnit.ok( false, "Test timed out" );
				config.semaphore = 1;
				QUnit.start();
			}, config.testTimeout );
		}
	}
};

// We use the prototype to distinguish between properties that should
// be exposed as globals (and in exports) and those that shouldn't
(function() {
	function F() {}
	F.prototype = QUnit;
	QUnit = new F();

	// Make F QUnit's constructor so that we can add to the prototype later
	QUnit.constructor = F;
}());

/**
 * Config object: Maintain internal state
 * Later exposed as QUnit.config
 * `config` initialized at top of scope
 */
config = {
	// The queue of tests to run
	queue: [],

	// block until document ready
	blocking: true,

	// when enabled, show only failing tests
	// gets persisted through sessionStorage and can be changed in UI via checkbox
	hidepassed: false,

	// by default, run previously failed tests first
	// very useful in combination with "Hide passed tests" checked
	reorder: true,

	// by default, modify document.title when suite is done
	altertitle: true,

	// by default, scroll to top of the page when suite is done
	scrolltop: true,

	// when enabled, all tests must call expect()
	requireExpects: false,

	// add checkboxes that are persisted in the query-string
	// when enabled, the id is set to `true` as a `QUnit.config` property
	urlConfig: [
		{
			id: "noglobals",
			label: "Check for Globals",
			tooltip: "Enabling this will test if any test introduces new properties on the `window` object. Stored as query-strings."
		},
		{
			id: "notrycatch",
			label: "No try-catch",
			tooltip: "Enabling this will run tests outside of a try-catch block. Makes debugging exceptions in IE reasonable. Stored as query-strings."
		}
	],

	// Set of all modules.
	modules: {},

	callbacks: {}
};

// Initialize more QUnit.config and QUnit.urlParams
(function() {
	var i, current,
		location = window.location || { search: "", protocol: "file:" },
		params = location.search.slice( 1 ).split( "&" ),
		length = params.length,
		urlParams = {};

	if ( params[ 0 ] ) {
		for ( i = 0; i < length; i++ ) {
			current = params[ i ].split( "=" );
			current[ 0 ] = decodeURIComponent( current[ 0 ] );

			// allow just a key to turn on a flag, e.g., test.html?noglobals
			current[ 1 ] = current[ 1 ] ? decodeURIComponent( current[ 1 ] ) : true;
			if ( urlParams[ current[ 0 ] ] ) {
				urlParams[ current[ 0 ] ] = [].concat( urlParams[ current[ 0 ] ], current[ 1 ] );
			} else {
				urlParams[ current[ 0 ] ] = current[ 1 ];
			}
		}
	}

	QUnit.urlParams = urlParams;

	// String search anywhere in moduleName+testName
	config.filter = urlParams.filter;

	// Exact match of the module name
	config.module = urlParams.module;

	config.testNumber = [];
	if ( urlParams.testNumber ) {

		// Ensure that urlParams.testNumber is an array
		urlParams.testNumber = [].concat( urlParams.testNumber );
		for ( i = 0; i < urlParams.testNumber.length; i++ ) {
			current = urlParams.testNumber[ i ];
			config.testNumber.push( parseInt( current, 10 ) );
		}
	}

	// Figure out if we're running the tests from a server or not
	QUnit.isLocal = location.protocol === "file:";
}());

extend( QUnit, {

	config: config,

	// Safe object type checking
	is: function( type, obj ) {
		return QUnit.objectType( obj ) === type;
	},

	objectType: function( obj ) {
		if ( typeof obj === "undefined" ) {
			return "undefined";
		}

		// Consider: typeof null === object
		if ( obj === null ) {
			return "null";
		}

		var match = toString.call( obj ).match( /^\[object\s(.*)\]$/ ),
			type = match && match[ 1 ] || "";

		switch ( type ) {
			case "Number":
				if ( isNaN( obj ) ) {
					return "nan";
				}
				return "number";
			case "String":
			case "Boolean":
			case "Array":
			case "Date":
			case "RegExp":
			case "Function":
				return type.toLowerCase();
		}
		if ( typeof obj === "object" ) {
			return "object";
		}
		return undefined;
	},

	url: function( params ) {
		params = extend( extend( {}, QUnit.urlParams ), params );
		var key,
			querystring = "?";

		for ( key in params ) {
			if ( hasOwn.call( params, key ) ) {
				querystring += encodeURIComponent( key ) + "=" +
					encodeURIComponent( params[ key ] ) + "&";
			}
		}
		return window.location.protocol + "//" + window.location.host +
			window.location.pathname + querystring.slice( 0, -1 );
	},

	extend: extend
});

/**
 * @deprecated: Created for backwards compatibility with test runner that set the hook function
 * into QUnit.{hook}, instead of invoking it and passing the hook function.
 * QUnit.constructor is set to the empty F() above so that we can add to it's prototype here.
 * Doing this allows us to tell if the following methods have been overwritten on the actual
 * QUnit object.
 */
extend( QUnit.constructor.prototype, {

	// Logging callbacks; all receive a single argument with the listed properties
	// run test/logs.html for any related changes
	begin: registerLoggingCallback( "begin" ),

	// done: { failed, passed, total, runtime }
	done: registerLoggingCallback( "done" ),

	// log: { result, actual, expected, message }
	log: registerLoggingCallback( "log" ),

	// testStart: { name }
	testStart: registerLoggingCallback( "testStart" ),

	// testDone: { name, failed, passed, total, runtime }
	testDone: registerLoggingCallback( "testDone" ),

	// moduleStart: { name }
	moduleStart: registerLoggingCallback( "moduleStart" ),

	// moduleDone: { name, failed, passed, total }
	moduleDone: registerLoggingCallback( "moduleDone" )
});

QUnit.load = function() {
	runLoggingCallbacks( "begin", {
		totalTests: Test.count
	});

	// Initialize the configuration options
	extend( config, {
		stats: { all: 0, bad: 0 },
		moduleStats: { all: 0, bad: 0 },
		started: 0,
		updateRate: 1000,
		autostart: true,
		filter: "",
		semaphore: 1
	}, true );

	config.blocking = false;

	if ( config.autostart ) {
		QUnit.start();
	}
};

// `onErrorFnPrev` initialized at top of scope
// Preserve other handlers
onErrorFnPrev = window.onerror;

// Cover uncaught exceptions
// Returning true will suppress the default browser handler,
// returning false will let it run.
window.onerror = function( error, filePath, linerNr ) {
	var ret = false;
	if ( onErrorFnPrev ) {
		ret = onErrorFnPrev( error, filePath, linerNr );
	}

	// Treat return value as window.onerror itself does,
	// Only do our handling if not suppressed.
	if ( ret !== true ) {
		if ( QUnit.config.current ) {
			if ( QUnit.config.current.ignoreGlobalErrors ) {
				return true;
			}
			QUnit.pushFailure( error, filePath + ":" + linerNr );
		} else {
			QUnit.test( "global failure", extend(function() {
				QUnit.pushFailure( error, filePath + ":" + linerNr );
			}, { validTest: validTest } ) );
		}
		return false;
	}

	return ret;
};

function done() {
	config.autorun = true;

	// Log the last module results
	if ( config.previousModule ) {
		runLoggingCallbacks( "moduleDone", {
			name: config.previousModule,
			failed: config.moduleStats.bad,
			passed: config.moduleStats.all - config.moduleStats.bad,
			total: config.moduleStats.all
		});
	}
	delete config.previousModule;

	var runtime = now() - config.started,
		passed = config.stats.all - config.stats.bad;

	runLoggingCallbacks( "done", {
		failed: config.stats.bad,
		passed: passed,
		total: config.stats.all,
		runtime: runtime
	});
}

/** @return Boolean: true if this test should be ran */
function validTest( test ) {
	var include,
		filter = config.filter && config.filter.toLowerCase(),
		module = config.module && config.module.toLowerCase(),
		fullName = ( test.module + ": " + test.testName ).toLowerCase();

	// Internally-generated tests are always valid
	if ( test.callback && test.callback.validTest === validTest ) {
		delete test.callback.validTest;
		return true;
	}

	if ( config.testNumber.length > 0 ) {
		if ( inArray( test.testNumber, config.testNumber ) < 0 ) {
			return false;
		}
	}

	if ( module && ( !test.module || test.module.toLowerCase() !== module ) ) {
		return false;
	}

	if ( !filter ) {
		return true;
	}

	include = filter.charAt( 0 ) !== "!";
	if ( !include ) {
		filter = filter.slice( 1 );
	}

	// If the filter matches, we need to honour include
	if ( fullName.indexOf( filter ) !== -1 ) {
		return include;
	}

	// Otherwise, do the opposite
	return !include;
}

// Doesn't support IE6 to IE9
// See also https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error/Stack
function extractStacktrace( e, offset ) {
	offset = offset === undefined ? 4 : offset;

	var stack, include, i;

	if ( e.stacktrace ) {

		// Opera 12.x
		return e.stacktrace.split( "\n" )[ offset + 3 ];
	} else if ( e.stack ) {

		// Firefox, Chrome, Safari 6+, IE10+, PhantomJS and Node
		stack = e.stack.split( "\n" );
		if ( /^error$/i.test( stack[ 0 ] ) ) {
			stack.shift();
		}
		if ( fileName ) {
			include = [];
			for ( i = offset; i < stack.length; i++ ) {
				if ( stack[ i ].indexOf( fileName ) !== -1 ) {
					break;
				}
				include.push( stack[ i ] );
			}
			if ( include.length ) {
				return include.join( "\n" );
			}
		}
		return stack[ offset ];
	} else if ( e.sourceURL ) {

		// Safari < 6
		// exclude useless self-reference for generated Error objects
		if ( /qunit.js$/.test( e.sourceURL ) ) {
			return;
		}

		// for actual exceptions, this is useful
		return e.sourceURL + ":" + e.line;
	}
}
function sourceFromStacktrace( offset ) {
	try {
		throw new Error();
	} catch ( e ) {
		return extractStacktrace( e, offset );
	}
}

function synchronize( callback, last ) {
	config.queue.push( callback );

	if ( config.autorun && !config.blocking ) {
		process( last );
	}
}

function process( last ) {
	function next() {
		process( last );
	}
	var start = now();
	config.depth = config.depth ? config.depth + 1 : 1;

	while ( config.queue.length && !config.blocking ) {
		if ( !defined.setTimeout || config.updateRate <= 0 || ( ( now() - start ) < config.updateRate ) ) {
			config.queue.shift()();
		} else {
			setTimeout( next, 13 );
			break;
		}
	}
	config.depth--;
	if ( last && !config.blocking && !config.queue.length && config.depth === 0 ) {
		done();
	}
}

function saveGlobal() {
	config.pollution = [];

	if ( config.noglobals ) {
		for ( var key in window ) {
			if ( hasOwn.call( window, key ) ) {
				// in Opera sometimes DOM element ids show up here, ignore them
				if ( /^qunit-test-output/.test( key ) ) {
					continue;
				}
				config.pollution.push( key );
			}
		}
	}
}

function checkPollution() {
	var newGlobals,
		deletedGlobals,
		old = config.pollution;

	saveGlobal();

	newGlobals = diff( config.pollution, old );
	if ( newGlobals.length > 0 ) {
		QUnit.pushFailure( "Introduced global variable(s): " + newGlobals.join( ", " ) );
	}

	deletedGlobals = diff( old, config.pollution );
	if ( deletedGlobals.length > 0 ) {
		QUnit.pushFailure( "Deleted global variable(s): " + deletedGlobals.join( ", " ) );
	}
}

// returns a new Array with the elements that are in a but not in b
function diff( a, b ) {
	var i, j,
		result = a.slice();

	for ( i = 0; i < result.length; i++ ) {
		for ( j = 0; j < b.length; j++ ) {
			if ( result[ i ] === b[ j ] ) {
				result.splice( i, 1 );
				i--;
				break;
			}
		}
	}
	return result;
}

function extend( a, b, undefOnly ) {
	for ( var prop in b ) {
		if ( hasOwn.call( b, prop ) ) {

			// Avoid "Member not found" error in IE8 caused by messing with window.constructor
			if ( !( prop === "constructor" && a === window ) ) {
				if ( b[ prop ] === undefined ) {
					delete a[ prop ];
				} else if ( !( undefOnly && typeof a[ prop ] !== "undefined" ) ) {
					a[ prop ] = b[ prop ];
				}
			}
		}
	}

	return a;
}

function registerLoggingCallback( key ) {

	// Initialize key collection of logging callback
	if ( QUnit.objectType( config.callbacks[ key ] ) === "undefined" ) {
		config.callbacks[ key ] = [];
	}

	return function( callback ) {
		config.callbacks[ key ].push( callback );
	};
}

function runLoggingCallbacks( key, args ) {
	var i, l, callbacks;

	callbacks = config.callbacks[ key ];
	for ( i = 0, l = callbacks.length; i < l; i++ ) {
		callbacks[ i ]( args );
	}
}

// from jquery.js
function inArray( elem, array ) {
	if ( array.indexOf ) {
		return array.indexOf( elem );
	}

	for ( var i = 0, length = array.length; i < length; i++ ) {
		if ( array[ i ] === elem ) {
			return i;
		}
	}

	return -1;
}

function Test( settings ) {
	extend( this, settings );
	this.assert = new Assert( this );
	this.assertions = [];
	this.testNumber = ++Test.count;
}

Test.count = 0;

Test.prototype = {
	setup: function() {
		if (

			// Emit moduleStart when we're switching from one module to another
			this.module !== config.previousModule ||

				// They could be equal (both undefined) but if the previousModule property doesn't
				// yet exist it means this is the first test in a suite that isn't wrapped in a
				// module, in which case we'll just emit a moduleStart event for 'undefined'.
				// Without this, reporters can get testStart before moduleStart  which is a problem.
				!hasOwn.call( config, "previousModule" )
		) {
			if ( hasOwn.call( config, "previousModule" ) ) {
				runLoggingCallbacks( "moduleDone", {
					name: config.previousModule,
					failed: config.moduleStats.bad,
					passed: config.moduleStats.all - config.moduleStats.bad,
					total: config.moduleStats.all
				});
			}
			config.previousModule = this.module;
			config.moduleStats = { all: 0, bad: 0 };
			runLoggingCallbacks( "moduleStart", {
				name: this.module
			});
		}

		config.current = this;

		this.testEnvironment = extend({
			setup: function() {},
			teardown: function() {}
		}, this.moduleTestEnvironment );

		this.started = now();
		runLoggingCallbacks( "testStart", {
			name: this.testName,
			module: this.module,
			testNumber: this.testNumber
		});

		if ( !config.pollution ) {
			saveGlobal();
		}
		if ( config.notrycatch ) {
			this.testEnvironment.setup.call( this.testEnvironment, this.assert );
			return;
		}
		try {
			this.testEnvironment.setup.call( this.testEnvironment, this.assert );
		} catch ( e ) {
			this.pushFailure( "Setup failed on " + this.testName + ": " + ( e.message || e ), extractStacktrace( e, 0 ) );
		}
	},
	run: function() {
		config.current = this;

		if ( this.async ) {
			QUnit.stop();
		}

		this.callbackStarted = now();

		if ( config.notrycatch ) {
			this.callback.call( this.testEnvironment, this.assert );
			this.callbackRuntime = now() - this.callbackStarted;
			return;
		}

		try {
			this.callback.call( this.testEnvironment, this.assert );
			this.callbackRuntime = now() - this.callbackStarted;
		} catch ( e ) {
			this.callbackRuntime = now() - this.callbackStarted;

			this.pushFailure( "Died on test #" + ( this.assertions.length + 1 ) + " " + this.stack + ": " + ( e.message || e ), extractStacktrace( e, 0 ) );

			// else next test will carry the responsibility
			saveGlobal();

			// Restart the tests if they're blocking
			if ( config.blocking ) {
				QUnit.start();
			}
		}
	},
	teardown: function() {
		config.current = this;
		if ( config.notrycatch ) {
			if ( typeof this.callbackRuntime === "undefined" ) {
				this.callbackRuntime = now() - this.callbackStarted;
			}
			this.testEnvironment.teardown.call( this.testEnvironment, this.assert );
			return;
		} else {
			try {
				this.testEnvironment.teardown.call( this.testEnvironment, this.assert );
			} catch ( e ) {
				this.pushFailure( "Teardown failed on " + this.testName + ": " + ( e.message || e ), extractStacktrace( e, 0 ) );
			}
		}
		checkPollution();
	},
	finish: function() {
		config.current = this;
		if ( config.requireExpects && this.expected === null ) {
			this.pushFailure( "Expected number of assertions to be defined, but expect() was not called.", this.stack );
		} else if ( this.expected !== null && this.expected !== this.assertions.length ) {
			this.pushFailure( "Expected " + this.expected + " assertions, but " + this.assertions.length + " were run", this.stack );
		} else if ( this.expected === null && !this.assertions.length ) {
			this.pushFailure( "Expected at least one assertion, but none were run - call expect(0) to accept zero assertions.", this.stack );
		}

		var i,
			bad = 0;

		this.runtime = now() - this.started;
		config.stats.all += this.assertions.length;
		config.moduleStats.all += this.assertions.length;

		for ( i = 0; i < this.assertions.length; i++ ) {
			if ( !this.assertions[ i ].result ) {
				bad++;
				config.stats.bad++;
				config.moduleStats.bad++;
			}
		}

		runLoggingCallbacks( "testDone", {
			name: this.testName,
			module: this.module,
			failed: bad,
			passed: this.assertions.length - bad,
			total: this.assertions.length,
			runtime: this.runtime,

			// HTML Reporter use
			assertions: this.assertions,
			testNumber: this.testNumber,

			// DEPRECATED: this property will be removed in 2.0.0, use runtime instead
			duration: this.runtime
		});

		config.current = undefined;
	},

	queue: function() {
		var bad,
			test = this;

		function run() {
			// each of these can by async
			synchronize(function() {
				test.setup();
			});
			synchronize(function() {
				test.run();
			});
			synchronize(function() {
				test.teardown();
			});
			synchronize(function() {
				test.finish();
			});
		}

		// `bad` initialized at top of scope
		// defer when previous test run passed, if storage is available
		bad = QUnit.config.reorder && defined.sessionStorage &&
				+sessionStorage.getItem( "qunit-test-" + this.module + "-" + this.testName );

		if ( bad ) {
			run();
		} else {
			synchronize( run, true );
		}
	},

	push: function( result, actual, expected, message ) {
		var source,
			details = {
				module: this.module,
				name: this.testName,
				result: result,
				message: message,
				actual: actual,
				expected: expected,
				testNumber: this.testNumber
			};

		if ( !result ) {
			source = sourceFromStacktrace();

			if ( source ) {
				details.source = source;
			}
		}

		runLoggingCallbacks( "log", details );

		this.assertions.push({
			result: !!result,
			message: message
		});
	},

	pushFailure: function( message, source, actual ) {
		if ( !this instanceof Test ) {
			throw new Error( "pushFailure() assertion outside test context, was " + sourceFromStacktrace( 2 ) );
		}

		var details = {
				module: this.module,
				name: this.testName,
				result: false,
				message: message || "error",
				actual: actual || null,
				testNumber: this.testNumber
			};

		if ( source ) {
			details.source = source;
		}

		runLoggingCallbacks( "log", details );

		this.assertions.push({
			result: false,
			message: message
		});
	}
};

QUnit.pushFailure = function() {
	if ( !QUnit.config.current ) {
		throw new Error( "pushFailure() assertion outside test context, in " + sourceFromStacktrace( 2 ) );
	}

	// Gets current test obj
	var currentTest = QUnit.config.current.assert.test;

	return currentTest.pushFailure.apply( currentTest, arguments );
};

function Assert( testContext ) {
	this.test = testContext;
}

// Assert helpers
QUnit.assert = Assert.prototype = {

	// Specify the number of expected assertions to guarantee that failed test (no assertions are run at all) don't slip through.
	expect: function( asserts ) {
		if ( arguments.length === 1 ) {
			this.test.expected = asserts;
		} else {
			return this.test.expected;
		}
	},

	// Exports test.push() to the user API
	push: function() {
		var assert = this;

		// Backwards compatibility fix.
		// Allows the direct use of global exported assertions and QUnit.assert.*
		// Although, it's use is not recommended as it can leak assertions
		// to other tests from async tests, because we only get a reference to the current test,
		// not exactly the test where assertion were intended to be called.
		if ( !QUnit.config.current ) {
			throw new Error( "assertion outside test context, in " + sourceFromStacktrace( 2 ) );
		}
		if ( !( assert instanceof Assert ) ) {
			assert = QUnit.config.current.assert;
		}
		return assert.test.push.apply( assert.test, arguments );
	},

	/**
	 * Asserts rough true-ish result.
	 * @name ok
	 * @function
	 * @example ok( "asdfasdf".length > 5, "There must be at least 5 chars" );
	 */
	ok: function( result, message ) {
		message = message || ( result ? "okay" : "failed, expected argument to be truthy, was: " +
			QUnit.dump.parse( result ) );
		if ( !!result ) {
			this.push( true, result, true, message );
		} else {
			this.test.pushFailure( message, null, result );
		}
	},

	/**
	 * Assert that the first two arguments are equal, with an optional message.
	 * Prints out both actual and expected values.
	 * @name equal
	 * @function
	 * @example equal( format( "Received {0} bytes.", 2), "Received 2 bytes.", "format() replaces {0} with next argument" );
	 */
	equal: function( actual, expected, message ) {
		/*jshint eqeqeq:false */
		this.push( expected == actual, actual, expected, message );
	},

	/**
	 * @name notEqual
	 * @function
	 */
	notEqual: function( actual, expected, message ) {
		/*jshint eqeqeq:false */
		this.push( expected != actual, actual, expected, message );
	},

	/**
	 * @name propEqual
	 * @function
	 */
	propEqual: function( actual, expected, message ) {
		actual = objectValues( actual );
		expected = objectValues( expected );
		this.push( QUnit.equiv( actual, expected ), actual, expected, message );
	},

	/**
	 * @name notPropEqual
	 * @function
	 */
	notPropEqual: function( actual, expected, message ) {
		actual = objectValues( actual );
		expected = objectValues( expected );
		this.push( !QUnit.equiv( actual, expected ), actual, expected, message );
	},

	/**
	 * @name deepEqual
	 * @function
	 */
	deepEqual: function( actual, expected, message ) {
		this.push( QUnit.equiv( actual, expected ), actual, expected, message );
	},

	/**
	 * @name notDeepEqual
	 * @function
	 */
	notDeepEqual: function( actual, expected, message ) {
		this.push( !QUnit.equiv( actual, expected ), actual, expected, message );
	},

	/**
	 * @name strictEqual
	 * @function
	 */
	strictEqual: function( actual, expected, message ) {
		this.push( expected === actual, actual, expected, message );
	},

	/**
	 * @name notStrictEqual
	 * @function
	 */
	notStrictEqual: function( actual, expected, message ) {
		this.push( expected !== actual, actual, expected, message );
	},

	"throws": function( block, expected, message ) {
		var actual, expectedType,
			expectedOutput = expected,
			ok = false;

		// 'expected' is optional unless doing string comparison
		if ( message == null && typeof expected === "string" ) {
			message = expected;
			expected = null;
		}

		this.test.ignoreGlobalErrors = true;
		try {
			block.call( this.test.testEnvironment );
		} catch (e) {
			actual = e;
		}
		this.test.ignoreGlobalErrors = false;

		if ( actual ) {
			expectedType = QUnit.objectType( expected );

			// we don't want to validate thrown error
			if ( !expected ) {
				ok = true;
				expectedOutput = null;

			// expected is a regexp
			} else if ( expectedType === "regexp" ) {
				ok = expected.test( errorString( actual ) );

			// expected is a string
			} else if ( expectedType === "string" ) {
				ok = expected === errorString( actual );

			// expected is a constructor, maybe an Error constructor
			} else if ( expectedType === "function" && actual instanceof expected ) {
				ok = true;

			// expected is an Error object
			} else if ( expectedType === "object" ) {
				ok = actual instanceof expected.constructor &&
					actual.name === expected.name &&
					actual.message === expected.message;

			// expected is a validation function which returns true if validation passed
			} else if ( expectedType === "function" && expected.call( {}, actual ) === true ) {
				expectedOutput = null;
				ok = true;
			}

			this.push( ok, actual, expectedOutput, message );
		} else {
			this.test.pushFailure( message, null, "No exception was thrown." );
		}
	}
};

// Test for equality any JavaScript type.
// Author: Philippe Rathé <prathe@gmail.com>
QUnit.equiv = (function() {

	// Call the o related callback with the given arguments.
	function bindCallbacks( o, callbacks, args ) {
		var prop = QUnit.objectType( o );
		if ( prop ) {
			if ( QUnit.objectType( callbacks[ prop ] ) === "function" ) {
				return callbacks[ prop ].apply( callbacks, args );
			} else {
				return callbacks[ prop ]; // or undefined
			}
		}
	}

	// the real equiv function
	var innerEquiv,

		// stack to decide between skip/abort functions
		callers = [],

		// stack to avoiding loops from circular referencing
		parents = [],
		parentsB = [],

		getProto = Object.getPrototypeOf || function( obj ) {
			/* jshint camelcase: false, proto: true */
			return obj.__proto__;
		},
		callbacks = (function() {

			// for string, boolean, number and null
			function useStrictEquality( b, a ) {

				/*jshint eqeqeq:false */
				if ( b instanceof a.constructor || a instanceof b.constructor ) {

					// to catch short annotation VS 'new' annotation of a
					// declaration
					// e.g. var i = 1;
					// var j = new Number(1);
					return a == b;
				} else {
					return a === b;
				}
			}

			return {
				"string": useStrictEquality,
				"boolean": useStrictEquality,
				"number": useStrictEquality,
				"null": useStrictEquality,
				"undefined": useStrictEquality,

				"nan": function( b ) {
					return isNaN( b );
				},

				"date": function( b, a ) {
					return QUnit.objectType( b ) === "date" && a.valueOf() === b.valueOf();
				},

				"regexp": function( b, a ) {
					return QUnit.objectType( b ) === "regexp" &&

						// the regex itself
						a.source === b.source &&

						// and its modifiers
						a.global === b.global &&

						// (gmi) ...
						a.ignoreCase === b.ignoreCase &&
						a.multiline === b.multiline &&
						a.sticky === b.sticky;
				},

				// - skip when the property is a method of an instance (OOP)
				// - abort otherwise,
				// initial === would have catch identical references anyway
				"function": function() {
					var caller = callers[ callers.length - 1 ];
					return caller !== Object && typeof caller !== "undefined";
				},

				"array": function( b, a ) {
					var i, j, len, loop, aCircular, bCircular;

					// b could be an object literal here
					if ( QUnit.objectType( b ) !== "array" ) {
						return false;
					}

					len = a.length;
					if ( len !== b.length ) {
						// safe and faster
						return false;
					}

					// track reference to avoid circular references
					parents.push( a );
					parentsB.push( b );
					for ( i = 0; i < len; i++ ) {
						loop = false;
						for ( j = 0; j < parents.length; j++ ) {
							aCircular = parents[ j ] === a[ i ];
							bCircular = parentsB[ j ] === b[ i ];
							if ( aCircular || bCircular ) {
								if ( a[ i ] === b[ i ] || aCircular && bCircular ) {
									loop = true;
								} else {
									parents.pop();
									parentsB.pop();
									return false;
								}
							}
						}
						if ( !loop && !innerEquiv( a[ i ], b[ i ] ) ) {
							parents.pop();
							parentsB.pop();
							return false;
						}
					}
					parents.pop();
					parentsB.pop();
					return true;
				},

				"object": function( b, a ) {

					/*jshint forin:false */
					var i, j, loop, aCircular, bCircular,
						// Default to true
						eq = true,
						aProperties = [],
						bProperties = [];

					// comparing constructors is more strict than using
					// instanceof
					if ( a.constructor !== b.constructor ) {

						// Allow objects with no prototype to be equivalent to
						// objects with Object as their constructor.
						if ( !( ( getProto( a ) === null && getProto( b ) === Object.prototype ) ||
							( getProto( b ) === null && getProto( a ) === Object.prototype ) ) ) {
							return false;
						}
					}

					// stack constructor before traversing properties
					callers.push( a.constructor );

					// track reference to avoid circular references
					parents.push( a );
					parentsB.push( b );

					// be strict: don't ensure hasOwnProperty and go deep
					for ( i in a ) {
						loop = false;
						for ( j = 0; j < parents.length; j++ ) {
							aCircular = parents[ j ] === a[ i ];
							bCircular = parentsB[ j ] === b[ i ];
							if ( aCircular || bCircular ) {
								if ( a[ i ] === b[ i ] || aCircular && bCircular ) {
									loop = true;
								} else {
									eq = false;
									break;
								}
							}
						}
						aProperties.push( i );
						if ( !loop && !innerEquiv( a[ i ], b[ i ] ) ) {
							eq = false;
							break;
						}
					}

					parents.pop();
					parentsB.pop();
					callers.pop(); // unstack, we are done

					for ( i in b ) {
						bProperties.push( i ); // collect b's properties
					}

					// Ensures identical properties name
					return eq && innerEquiv( aProperties.sort(), bProperties.sort() );
				}
			};
		}());

	innerEquiv = function() { // can take multiple arguments
		var args = [].slice.apply( arguments );
		if ( args.length < 2 ) {
			return true; // end transition
		}

		return ( (function( a, b ) {
			if ( a === b ) {
				return true; // catch the most you can
			} else if ( a === null || b === null || typeof a === "undefined" ||
					typeof b === "undefined" ||
					QUnit.objectType( a ) !== QUnit.objectType( b ) ) {

				// don't lose time with error prone cases
				return false;
			} else {
				return bindCallbacks( a, callbacks, [ b, a ] );
			}

			// apply transition with (1..n) arguments
		}( args[ 0 ], args[ 1 ] ) ) && innerEquiv.apply( this, args.splice( 1, args.length - 1 ) ) );
	};

	return innerEquiv;
}());

// Based on jsDump by Ariel Flesler
// http://flesler.blogspot.com/2008/05/jsdump-pretty-dump-of-any-javascript.html
QUnit.dump = (function() {
	function quote( str ) {
		return "\"" + str.toString().replace( /"/g, "\\\"" ) + "\"";
	}
	function literal( o ) {
		return o + "";
	}
	function join( pre, arr, post ) {
		var s = dump.separator(),
			base = dump.indent(),
			inner = dump.indent( 1 );
		if ( arr.join ) {
			arr = arr.join( "," + s + inner );
		}
		if ( !arr ) {
			return pre + post;
		}
		return [ pre, inner + arr, base + post ].join( s );
	}
	function array( arr, stack ) {
		var i = arr.length,
			ret = new Array( i );
		this.up();
		while ( i-- ) {
			ret[ i ] = this.parse( arr[ i ], undefined, stack );
		}
		this.down();
		return join( "[", ret, "]" );
	}

	var reName = /^function (\w+)/,
		dump = {
			// type is used mostly internally, you can fix a (custom)type in advance
			parse: function( obj, type, stack ) {
				stack = stack || [];
				var inStack, res,
					parser = this.parsers[ type || this.typeOf( obj ) ];

				type = typeof parser;
				inStack = inArray( obj, stack );

				if ( inStack !== -1 ) {
					return "recursion(" + ( inStack - stack.length ) + ")";
				}
				if ( type === "function" ) {
					stack.push( obj );
					res = parser.call( this, obj, stack );
					stack.pop();
					return res;
				}
				return ( type === "string" ) ? parser : this.parsers.error;
			},
			typeOf: function( obj ) {
				var type;
				if ( obj === null ) {
					type = "null";
				} else if ( typeof obj === "undefined" ) {
					type = "undefined";
				} else if ( QUnit.is( "regexp", obj ) ) {
					type = "regexp";
				} else if ( QUnit.is( "date", obj ) ) {
					type = "date";
				} else if ( QUnit.is( "function", obj ) ) {
					type = "function";
				} else if ( typeof obj.setInterval !== undefined && typeof obj.document !== "undefined" && typeof obj.nodeType === "undefined" ) {
					type = "window";
				} else if ( obj.nodeType === 9 ) {
					type = "document";
				} else if ( obj.nodeType ) {
					type = "node";
				} else if (

					// native arrays
					toString.call( obj ) === "[object Array]" ||

					// NodeList objects
					( typeof obj.length === "number" && typeof obj.item !== "undefined" && ( obj.length ? obj.item( 0 ) === obj[ 0 ] : ( obj.item( 0 ) === null && typeof obj[ 0 ] === "undefined" ) ) )
				) {
					type = "array";
				} else if ( obj.constructor === Error.prototype.constructor ) {
					type = "error";
				} else {
					type = typeof obj;
				}
				return type;
			},
			separator: function() {
				return this.multiline ? this.HTML ? "<br />" : "\n" : this.HTML ? "&nbsp;" : " ";
			},
			// extra can be a number, shortcut for increasing-calling-decreasing
			indent: function( extra ) {
				if ( !this.multiline ) {
					return "";
				}
				var chr = this.indentChar;
				if ( this.HTML ) {
					chr = chr.replace( /\t/g, "   " ).replace( / /g, "&nbsp;" );
				}
				return new Array( this.depth + ( extra || 0 ) ).join( chr );
			},
			up: function( a ) {
				this.depth += a || 1;
			},
			down: function( a ) {
				this.depth -= a || 1;
			},
			setParser: function( name, parser ) {
				this.parsers[ name ] = parser;
			},
			// The next 3 are exposed so you can use them
			quote: quote,
			literal: literal,
			join: join,
			//
			depth: 1,
			// This is the list of parsers, to modify them, use dump.setParser
			parsers: {
				window: "[Window]",
				document: "[Document]",
				error: function( error ) {
					return "Error(\"" + error.message + "\")";
				},
				unknown: "[Unknown]",
				"null": "null",
				"undefined": "undefined",
				"function": function( fn ) {
					var ret = "function",
						// functions never have name in IE
						name = "name" in fn ? fn.name : ( reName.exec( fn ) || [] )[ 1 ];

					if ( name ) {
						ret += " " + name;
					}
					ret += "( ";

					ret = [ ret, dump.parse( fn, "functionArgs" ), "){" ].join( "" );
					return join( ret, dump.parse( fn, "functionCode" ), "}" );
				},
				array: array,
				nodelist: array,
				"arguments": array,
				object: function( map, stack ) {
					/*jshint forin:false */
					var ret = [], keys, key, val, i, nonEnumerableProperties;
					dump.up();
					keys = [];
					for ( key in map ) {
						keys.push( key );
					}

					// Some properties are not always enumerable on Error objects.
					nonEnumerableProperties = [ "message", "name" ];
					for ( i in nonEnumerableProperties ) {
						key = nonEnumerableProperties[ i ];
						if ( key in map && !( key in keys ) ) {
							keys.push( key );
						}
					}
					keys.sort();
					for ( i = 0; i < keys.length; i++ ) {
						key = keys[ i ];
						val = map[ key ];
						ret.push( dump.parse( key, "key" ) + ": " + dump.parse( val, undefined, stack ) );
					}
					dump.down();
					return join( "{", ret, "}" );
				},
				node: function( node ) {
					var len, i, val,
						open = dump.HTML ? "&lt;" : "<",
						close = dump.HTML ? "&gt;" : ">",
						tag = node.nodeName.toLowerCase(),
						ret = open + tag,
						attrs = node.attributes;

					if ( attrs ) {
						for ( i = 0, len = attrs.length; i < len; i++ ) {
							val = attrs[ i ].nodeValue;

							// IE6 includes all attributes in .attributes, even ones not explicitly set.
							// Those have values like undefined, null, 0, false, "" or "inherit".
							if ( val && val !== "inherit" ) {
								ret += " " + attrs[ i ].nodeName + "=" + dump.parse( val, "attribute" );
							}
						}
					}
					ret += close;

					// Show content of TextNode or CDATASection
					if ( node.nodeType === 3 || node.nodeType === 4 ) {
						ret += node.nodeValue;
					}

					return ret + open + "/" + tag + close;
				},

				// function calls it internally, it's the arguments part of the function
				functionArgs: function( fn ) {
					var args,
						l = fn.length;

					if ( !l ) {
						return "";
					}

					args = new Array( l );
					while ( l-- ) {

						// 97 is 'a'
						args[ l ] = String.fromCharCode( 97 + l );
					}
					return " " + args.join( ", " ) + " ";
				},
				// object calls it internally, the key part of an item in a map
				key: quote,
				// function calls it internally, it's the content of the function
				functionCode: "[code]",
				// node calls it internally, it's an html attribute value
				attribute: quote,
				string: quote,
				date: quote,
				regexp: literal,
				number: literal,
				"boolean": literal
			},
			// if true, entities are escaped ( <, >, \t, space and \n )
			HTML: false,
			// indentation unit
			indentChar: "  ",
			// if true, items in a collection, are separated by a \n, else just a space.
			multiline: true
		};

	return dump;
}());

// back compat
QUnit.jsDump = QUnit.dump;

// For browser, export only select globals
if ( typeof window !== "undefined" ) {

	// Deprecated
	// Extend assert methods to QUnit and Global scope through Backwards compatibility
	(function() {
		var i,
			assertions = Assert.prototype;

		function applyCurrent( current ) {
			return function() {
				var assert = new Assert( QUnit.config.current );
				current.apply( assert, arguments );
			};
		}

		for ( i in assertions ) {
			QUnit[ i ] = applyCurrent( assertions[ i ] );
		}
	})();

	(function() {
		var i, l,
			keys = [
				"test",
				"module",
				"expect",
				"asyncTest",
				"start",
				"stop",
				"ok",
				"equal",
				"notEqual",
				"propEqual",
				"notPropEqual",
				"deepEqual",
				"notDeepEqual",
				"strictEqual",
				"notStrictEqual",
				"throws"
			];

		for ( i = 0, l = keys.length; i < l; i++ ) {
			window[ keys[ i ] ] = QUnit[ keys[ i ] ];
		}
	})();

	window.QUnit = QUnit;
}

// For CommonJS environments, export everything
if ( typeof module !== "undefined" && module.exports ) {
	module.exports = QUnit;
}

// Get a reference to the global object, like window in browsers
}( (function() {
	return this;
})() ));

/*istanbul ignore next */
/*
 * Javascript Diff Algorithm
 *  By John Resig (http://ejohn.org/)
 *  Modified by Chu Alan "sprite"
 *
 * Released under the MIT license.
 *
 * More Info:
 *  http://ejohn.org/projects/javascript-diff-algorithm/
 *
 * Usage: QUnit.diff(expected, actual)
 *
 * QUnit.diff( "the quick brown fox jumped over", "the quick fox jumps over" ) == "the  quick <del>brown </del> fox <del>jumped </del><ins>jumps </ins> over"
 */
QUnit.diff = (function() {
	var hasOwn = Object.prototype.hasOwnProperty;

	/*jshint eqeqeq:false, eqnull:true */
	function diff( o, n ) {
		var i,
			ns = {},
			os = {};

		for ( i = 0; i < n.length; i++ ) {
			if ( !hasOwn.call( ns, n[ i ] ) ) {
				ns[ n[ i ] ] = {
					rows: [],
					o: null
				};
			}
			ns[ n[ i ] ].rows.push( i );
		}

		for ( i = 0; i < o.length; i++ ) {
			if ( !hasOwn.call( os, o[ i ] ) ) {
				os[ o[ i ] ] = {
					rows: [],
					n: null
				};
			}
			os[ o[ i ] ].rows.push( i );
		}

		for ( i in ns ) {
			if ( hasOwn.call( ns, i ) ) {
				if ( ns[ i ].rows.length === 1 && hasOwn.call( os, i ) && os[ i ].rows.length === 1 ) {
					n[ ns[ i ].rows[ 0 ] ] = {
						text: n[ ns[ i ].rows[ 0 ] ],
						row: os[ i ].rows[ 0 ]
					};
					o[ os[ i ].rows[ 0 ] ] = {
						text: o[ os[ i ].rows[ 0 ] ],
						row: ns[ i ].rows[ 0 ]
					};
				}
			}
		}

		for ( i = 0; i < n.length - 1; i++ ) {
			if ( n[ i ].text != null && n[ i + 1 ].text == null && n[ i ].row + 1 < o.length && o[ n[ i ].row + 1 ].text == null &&
				n[ i + 1 ] == o[ n[ i ].row + 1 ] ) {

				n[ i + 1 ] = {
					text: n[ i + 1 ],
					row: n[ i ].row + 1
				};
				o[ n[ i ].row + 1 ] = {
					text: o[ n[ i ].row + 1 ],
					row: i + 1
				};
			}
		}

		for ( i = n.length - 1; i > 0; i-- ) {
			if ( n[ i ].text != null && n[ i - 1 ].text == null && n[ i ].row > 0 && o[ n[ i ].row - 1 ].text == null &&
				n[ i - 1 ] == o[ n[ i ].row - 1 ] ) {

				n[ i - 1 ] = {
					text: n[ i - 1 ],
					row: n[ i ].row - 1
				};
				o[ n[ i ].row - 1 ] = {
					text: o[ n[ i ].row - 1 ],
					row: i - 1
				};
			}
		}

		return {
			o: o,
			n: n
		};
	}

	return function( o, n ) {
		o = o.replace( /\s+$/, "" );
		n = n.replace( /\s+$/, "" );

		var i, pre,
			str = "",
			out = diff( o === "" ? [] : o.split( /\s+/ ), n === "" ? [] : n.split( /\s+/ ) ),
			oSpace = o.match( /\s+/g ),
			nSpace = n.match( /\s+/g );

		if ( oSpace == null ) {
			oSpace = [ " " ];
		} else {
			oSpace.push( " " );
		}

		if ( nSpace == null ) {
			nSpace = [ " " ];
		} else {
			nSpace.push( " " );
		}

		if ( out.n.length === 0 ) {
			for ( i = 0; i < out.o.length; i++ ) {
				str += "<del>" + out.o[ i ] + oSpace[ i ] + "</del>";
			}
		} else {
			if ( out.n[ 0 ].text == null ) {
				for ( n = 0; n < out.o.length && out.o[ n ].text == null; n++ ) {
					str += "<del>" + out.o[ n ] + oSpace[ n ] + "</del>";
				}
			}

			for ( i = 0; i < out.n.length; i++ ) {
				if ( out.n[ i ].text == null ) {
					str += "<ins>" + out.n[ i ] + nSpace[ i ] + "</ins>";
				} else {

					// `pre` initialized at top of scope
					pre = "";

					for ( n = out.n[ i ].row + 1; n < out.o.length && out.o[ n ].text == null; n++ ) {
						pre += "<del>" + out.o[ n ] + oSpace[ n ] + "</del>";
					}
					str += " " + out.n[ i ].text + nSpace[ i ] + pre;
				}
			}
		}

		return str;
	};
}());

(function() {

// Deprecated QUnit.init - Ref #530
// Re-initialize the configuration options
QUnit.init = function() {
	var tests, banner, result, qunit,
		config = QUnit.config;

	config.stats = { all: 0, bad: 0 };
	config.moduleStats = { all: 0, bad: 0 };
	config.started = 0;
	config.updateRate = 1000;
	config.blocking = false;
	config.autostart = true;
	config.autorun = false;
	config.filter = "";
	config.queue = [];
	config.semaphore = 1;

	// Return on non-browser environments
	// This is necessary to not break on node tests
	if ( typeof window === "undefined" ) {
		return;
	}

	qunit = id( "qunit" );
	if ( qunit ) {
		qunit.innerHTML =
			"<h1 id='qunit-header'>" + escapeText( document.title ) + "</h1>" +
			"<h2 id='qunit-banner'></h2>" +
			"<div id='qunit-testrunner-toolbar'></div>" +
			"<h2 id='qunit-userAgent'></h2>" +
			"<ol id='qunit-tests'></ol>";
	}

	tests = id( "qunit-tests" );
	banner = id( "qunit-banner" );
	result = id( "qunit-testresult" );

	if ( tests ) {
		tests.innerHTML = "";
	}

	if ( banner ) {
		banner.className = "";
	}

	if ( result ) {
		result.parentNode.removeChild( result );
	}

	if ( tests ) {
		result = document.createElement( "p" );
		result.id = "qunit-testresult";
		result.className = "result";
		tests.parentNode.insertBefore( result, tests );
		result.innerHTML = "Running...<br/>&nbsp;";
	}
};

// Resets the test setup. Useful for tests that modify the DOM.
/*
DEPRECATED: Use multiple tests instead of resetting inside a test.
Use testStart or testDone for custom cleanup.
This method will throw an error in 2.0, and will be removed in 2.1
*/
QUnit.reset = function() {

	// Return on non-browser environments
	// This is necessary to not break on node tests
	if ( typeof window === "undefined" ) {
		return;
	}

	var fixture = id( "qunit-fixture" );
	if ( fixture ) {
		fixture.innerHTML = config.fixture;
	}
};

// Don't load the HTML Reporter on non-Browser environments
if ( typeof window === "undefined" ) {
	return;
}

var config = QUnit.config,
	hasOwn = Object.prototype.hasOwnProperty,
	defined = {
		document: typeof window.document !== "undefined",
		sessionStorage: (function() {
			var x = "qunit-test-string";
			try {
				sessionStorage.setItem( x, x );
				sessionStorage.removeItem( x );
				return true;
			} catch ( e ) {
				return false;
			}
		}())
	};

/**
* Escape text for attribute or text content.
*/
function escapeText( s ) {
	if ( !s ) {
		return "";
	}
	s = s + "";

	// Both single quotes and double quotes (for attributes)
	return s.replace( /['"<>&]/g, function( s ) {
		switch ( s ) {
		case "'":
			return "&#039;";
		case "\"":
			return "&quot;";
		case "<":
			return "&lt;";
		case ">":
			return "&gt;";
		case "&":
			return "&amp;";
		}
	});
}

/**
 * @param {HTMLElement} elem
 * @param {string} type
 * @param {Function} fn
 */
function addEvent( elem, type, fn ) {
	if ( elem.addEventListener ) {

		// Standards-based browsers
		elem.addEventListener( type, fn, false );
	} else if ( elem.attachEvent ) {

		// support: IE <9
		elem.attachEvent( "on" + type, fn );
	}
}

/**
 * @param {Array|NodeList} elems
 * @param {string} type
 * @param {Function} fn
 */
function addEvents( elems, type, fn ) {
	var i = elems.length;
	while ( i-- ) {
		addEvent( elems[ i ], type, fn );
	}
}

function hasClass( elem, name ) {
	return ( " " + elem.className + " " ).indexOf( " " + name + " " ) >= 0;
}

function addClass( elem, name ) {
	if ( !hasClass( elem, name ) ) {
		elem.className += ( elem.className ? " " : "" ) + name;
	}
}

function toggleClass( elem, name ) {
	if ( hasClass( elem, name ) ) {
		removeClass( elem, name );
	} else {
		addClass( elem, name );
	}
}

function removeClass( elem, name ) {
	var set = " " + elem.className + " ";

	// Class name may appear multiple times
	while ( set.indexOf( " " + name + " " ) >= 0 ) {
		set = set.replace( " " + name + " ", " " );
	}

	// trim for prettiness
	elem.className = typeof set.trim === "function" ? set.trim() : set.replace( /^\s+|\s+$/g, "" );
}

function id( name ) {
	return defined.document && document.getElementById && document.getElementById( name );
}

function getUrlConfigHtml() {
	var i, j, val,
		escaped, escapedTooltip,
		selection = false,
		len = config.urlConfig.length,
		urlConfigHtml = "";

	for ( i = 0; i < len; i++ ) {
		val = config.urlConfig[ i ];
		if ( typeof val === "string" ) {
			val = {
				id: val,
				label: val
			};
		}

		escaped = escapeText( val.id );
		escapedTooltip = escapeText( val.tooltip );

		config[ val.id ] = QUnit.urlParams[ val.id ];
		if ( !val.value || typeof val.value === "string" ) {
			urlConfigHtml += "<input id='qunit-urlconfig-" + escaped +
				"' name='" + escaped + "' type='checkbox'" +
				( val.value ? " value='" + escapeText( val.value ) + "'" : "" ) +
				( config[ val.id ] ? " checked='checked'" : "" ) +
				" title='" + escapedTooltip + "'><label for='qunit-urlconfig-" + escaped +
				"' title='" + escapedTooltip + "'>" + val.label + "</label>";
		} else {
			urlConfigHtml += "<label for='qunit-urlconfig-" + escaped +
				"' title='" + escapedTooltip + "'>" + val.label +
				": </label><select id='qunit-urlconfig-" + escaped +
				"' name='" + escaped + "' title='" + escapedTooltip + "'><option></option>";

			if ( QUnit.is( "array", val.value ) ) {
				for ( j = 0; j < val.value.length; j++ ) {
					escaped = escapeText( val.value[ j ] );
					urlConfigHtml += "<option value='" + escaped + "'" +
						( config[ val.id ] === val.value[ j ] ?
							( selection = true ) && " selected='selected'" : "" ) +
						">" + escaped + "</option>";
				}
			} else {
				for ( j in val.value ) {
					if ( hasOwn.call( val.value, j ) ) {
						urlConfigHtml += "<option value='" + escapeText( j ) + "'" +
							( config[ val.id ] === j ?
								( selection = true ) && " selected='selected'" : "" ) +
							">" + escapeText( val.value[ j ] ) + "</option>";
					}
				}
			}
			if ( config[ val.id ] && !selection ) {
				escaped = escapeText( config[ val.id ] );
				urlConfigHtml += "<option value='" + escaped +
					"' selected='selected' disabled='disabled'>" + escaped + "</option>";
			}
			urlConfigHtml += "</select>";
		}
	}

	return urlConfigHtml;
}

function toolbarUrlConfigContainer() {
	var urlConfigContainer = document.createElement( "span" );

	urlConfigContainer.innerHTML = getUrlConfigHtml();

	// For oldIE support:
	// * Add handlers to the individual elements instead of the container
	// * Use "click" instead of "change" for checkboxes
	// * Fallback from event.target to event.srcElement
	addEvents( urlConfigContainer.getElementsByTagName( "input" ), "click", function( event ) {
		var params = {},
			target = event.target || event.srcElement;
		params[ target.name ] = target.checked ?
			target.defaultValue || true :
			undefined;
		window.location = QUnit.url( params );
	});
	addEvents( urlConfigContainer.getElementsByTagName( "select" ), "change", function( event ) {
		var params = {},
			target = event.target || event.srcElement;
		params[ target.name ] = target.options[ target.selectedIndex ].value || undefined;
		window.location = QUnit.url( params );
	});

	return urlConfigContainer;
}

function getModuleNames() {
	var i,
		moduleNames = [];

	for ( i in config.modules ) {
		if ( config.modules.hasOwnProperty( i ) ) {
			moduleNames.push( i );
		}
	}

	moduleNames.sort(function( a, b ) {
		return a.localeCompare( b );
	});

	return moduleNames;
}

function toolbarModuleFilterHtml() {
	var i,
		moduleFilterHtml = "",
		moduleNames = getModuleNames();

	if ( moduleNames.length <= 1 ) {
		return false;
	}

	moduleFilterHtml += "<label for='qunit-modulefilter'>Module: </label>" +
		"<select id='qunit-modulefilter' name='modulefilter'><option value='' " +
		( config.module === undefined ? "selected='selected'" : "" ) +
		">< All Modules ></option>";

	for ( i = 0; i < moduleNames.length; i++ ) {
		moduleFilterHtml += "<option value='" +
			escapeText( encodeURIComponent( moduleNames[ i ] ) ) + "' " +
			( config.module === moduleNames[ i ] ? "selected='selected'" : "" ) +
			">" + escapeText( moduleNames[ i ] ) + "</option>";
	}
	moduleFilterHtml += "</select>";

	return moduleFilterHtml;
}

function toolbarModuleFilter() {
	var moduleFilter = document.createElement( "span" ),
		moduleFilterHtml = toolbarModuleFilterHtml();

	if ( !moduleFilterHtml ) {
		return false;
	}

	moduleFilter.setAttribute( "id", "qunit-modulefilter-container" );
	moduleFilter.innerHTML = moduleFilterHtml;

	addEvent( moduleFilter.lastChild, "change", function() {
		var selectBox = moduleFilter.getElementsByTagName( "select" )[ 0 ],
			selectedModule = decodeURIComponent( selectBox.options[ selectBox.selectedIndex ].value );

		window.location = QUnit.url({
			module: ( selectedModule === "" ) ? undefined : selectedModule,

			// Remove any existing filters
			filter: undefined,
			testNumber: undefined
		});
	});

	return moduleFilter;
}

function toolbarFilter() {
	var testList = id( "qunit-tests" ),
		filter = document.createElement( "input" );

	filter.type = "checkbox";
	filter.id = "qunit-filter-pass";

	addEvent( filter, "click", function() {
		if ( filter.checked ) {
			addClass( testList, "hidepass" );
			if ( defined.sessionStorage ) {
				sessionStorage.setItem( "qunit-filter-passed-tests", "true" );
			}
		} else {
			removeClass( testList, "hidepass" );
			if ( defined.sessionStorage ) {
				sessionStorage.removeItem( "qunit-filter-passed-tests" );
			}
		}
	});

	if ( config.hidepassed || defined.sessionStorage &&
			sessionStorage.getItem( "qunit-filter-passed-tests" ) ) {
		filter.checked = true;

		addClass( testList, "hidepass" );
	}

	return filter;
}

function toolbarLabel() {
	var label = document.createElement( "label" );
	label.setAttribute( "for", "qunit-filter-pass" );
	label.setAttribute( "title", "Only show tests and assertions that fail. Stored in sessionStorage." );
	label.innerHTML = "Hide passed tests";

	return label;
}

function appendToolbar() {
	var moduleFilter,
		toolbar = id( "qunit-testrunner-toolbar" );

	if ( toolbar ) {
		toolbar.appendChild( toolbarFilter() );
		toolbar.appendChild( toolbarLabel() );
		toolbar.appendChild( toolbarUrlConfigContainer() );

		moduleFilter = toolbarModuleFilter();
		if ( moduleFilter ) {
			toolbar.appendChild( moduleFilter );
		}
	}
}

function appendBanner() {
	var banner = id( "qunit-banner" );

	if ( banner ) {
		banner.className = "";
		banner.innerHTML = "<a href='" +
			QUnit.url({ filter: undefined, module: undefined, testNumber: undefined }) +
			"'>" + banner.innerHTML + "</a> ";
	}
}

function appendTestResults() {
	var tests = id( "qunit-tests" ),
		result = id( "qunit-testresult" );

	if ( result ) {
		result.parentNode.removeChild( result );
	}

	if ( tests ) {
		tests.innerHTML = "";
		result = document.createElement( "p" );
		result.id = "qunit-testresult";
		result.className = "result";
		tests.parentNode.insertBefore( result, tests );
		result.innerHTML = "Running...<br>&nbsp;";
	}
}

function storeFixture() {
	var fixture = id( "qunit-fixture" );
	if ( fixture ) {
		config.fixture = fixture.innerHTML;
	}
}

function appendUserAgent() {
	var userAgent = id( "qunit-userAgent" );
	if ( userAgent ) {
		userAgent.innerHTML = navigator.userAgent;
	}
}

// HTML Reporter initialization and load
QUnit.begin(function() {
	var qunit = id( "qunit" );

	if ( qunit ) {
		qunit.innerHTML =
		"<h1 id='qunit-header'>" + escapeText( document.title ) + "</h1>" +
		"<h2 id='qunit-banner'></h2>" +
		"<div id='qunit-testrunner-toolbar'></div>" +
		"<h2 id='qunit-userAgent'></h2>" +
		"<ol id='qunit-tests'></ol>";
	}

	appendBanner();
	appendTestResults();
	appendUserAgent();
	appendToolbar();
	storeFixture();
});

QUnit.done(function( details ) {
	var i, key,
		banner = id( "qunit-banner" ),
		tests = id( "qunit-tests" ),
		html = [
			"Tests completed in ",
			details.runtime,
			" milliseconds.<br>",
			"<span class='passed'>",
			details.passed,
			"</span> assertions of <span class='total'>",
			details.total,
			"</span> passed, <span class='failed'>",
			details.failed,
			"</span> failed."
		].join( "" );

	if ( banner ) {
		banner.className = details.failed ? "qunit-fail" : "qunit-pass";
	}

	if ( tests ) {
		id( "qunit-testresult" ).innerHTML = html;
	}

	if ( config.altertitle && defined.document && document.title ) {

		// show ✖ for good, ✔ for bad suite result in title
		// use escape sequences in case file gets loaded with non-utf-8-charset
		document.title = [
			( details.failed ? "\u2716" : "\u2714" ),
			document.title.replace( /^[\u2714\u2716] /i, "" )
		].join( " " );
	}

	// clear own sessionStorage items if all tests passed
	if ( config.reorder && defined.sessionStorage && details.failed === 0 ) {
		for ( i = 0; i < sessionStorage.length; i++ ) {
			key = sessionStorage.key( i++ );
			if ( key.indexOf( "qunit-test-" ) === 0 ) {
				sessionStorage.removeItem( key );
			}
		}
	}

	// scroll back to top to show results
	if ( config.scrolltop && window.scrollTo ) {
		window.scrollTo( 0, 0 );
	}
});

function getNameHtml( name, module ) {
	var nameHtml = "";

	if ( module ) {
		nameHtml = "<span class='module-name'>" + escapeText( module ) + "</span>: ";
	}

	nameHtml += "<span class='test-name'>" + escapeText( name ) + "</span>";

	return nameHtml;
}

QUnit.testStart(function( details ) {
	var a, b, li, running, assertList,
		name = getNameHtml( details.name, details.module ),
		tests = id( "qunit-tests" );

	if ( tests ) {
		b = document.createElement( "strong" );
		b.innerHTML = name;

		a = document.createElement( "a" );
		a.innerHTML = "Rerun";
		a.href = QUnit.url({ testNumber: details.testNumber });

		li = document.createElement( "li" );
		li.appendChild( b );
		li.appendChild( a );
		li.className = "running";
		li.id = "qunit-test-output" + details.testNumber;

		assertList = document.createElement( "ol" );
		assertList.className = "qunit-assert-list";

		li.appendChild( assertList );

		tests.appendChild( li );
	}

	running = id( "qunit-testresult" );
	if ( running ) {
		running.innerHTML = "Running: <br>" + name;
	}

});

QUnit.log(function( details ) {
	var assertList, assertLi,
		message, expected, actual,
		testItem = id( "qunit-test-output" + details.testNumber );

	if ( !testItem ) {
		return;
	}

	message = escapeText( details.message ) || ( details.result ? "okay" : "failed" );
	message = "<span class='test-message'>" + message + "</span>";

	// pushFailure doesn't provide details.expected
	// when it calls, it's implicit to also not show expected and diff stuff
	// Also, we need to check details.expected existence, as it can exist and be undefined
	if ( !details.result && hasOwn.call( details, "expected" ) ) {
		expected = escapeText( QUnit.dump.parse( details.expected ) );
		actual = escapeText( QUnit.dump.parse( details.actual ) );
		message += "<table><tr class='test-expected'><th>Expected: </th><td><pre>" +
			expected +
			"</pre></td></tr>";

		if ( actual !== expected ) {
			message += "<tr class='test-actual'><th>Result: </th><td><pre>" +
				actual + "</pre></td></tr>" +
				"<tr class='test-diff'><th>Diff: </th><td><pre>" +
				QUnit.diff( expected, actual ) + "</pre></td></tr>";
		}

		if ( details.source ) {
			message += "<tr class='test-source'><th>Source: </th><td><pre>" +
				escapeText( details.source ) + "</pre></td></tr>";
		}

		message += "</table>";

	// this occours when pushFailure is set and we have an extracted stack trace
	} else if ( !details.result && details.source ) {
		message += "<table>" +
			"<tr class='test-source'><th>Source: </th><td><pre>" +
			escapeText( details.source ) + "</pre></td></tr>" +
			"</table>";
	}

	assertList = testItem.getElementsByTagName( "ol" )[ 0 ];

	assertLi = document.createElement( "li" );
	assertLi.className = details.result ? "pass" : "fail";
	assertLi.innerHTML = message;
	assertList.appendChild( assertLi );
});

QUnit.testDone(function( details ) {
	var testTitle, time, testItem, assertList,
		good, bad, testCounts,
		tests = id( "qunit-tests" );

	// QUnit.reset() is deprecated and will be replaced for a new
	// fixture reset function on QUnit 2.0/2.1.
	// It's still called here for backwards compatibility handling
	QUnit.reset();

	if ( !tests ) {
		return;
	}

	testItem = id( "qunit-test-output" + details.testNumber );
	assertList = testItem.getElementsByTagName( "ol" )[ 0 ];

	good = details.passed;
	bad = details.failed;

	// store result when possible
	if ( config.reorder && defined.sessionStorage ) {
		if ( bad ) {
			sessionStorage.setItem( "qunit-test-" + details.module + "-" + details.name, bad );
		} else {
			sessionStorage.removeItem( "qunit-test-" + details.module + "-" + details.name );
		}
	}

	if ( bad === 0 ) {
		addClass( assertList, "qunit-collapsed" );
	}

	// testItem.firstChild is the test name
	testTitle = testItem.firstChild;

	testCounts = bad ?
		"<b class='failed'>" + bad + "</b>, " + "<b class='passed'>" + good + "</b>, " :
		"";

	testTitle.innerHTML += " <b class='counts'>(" + testCounts +
		details.assertions.length + ")</b>";

	addEvent( testTitle, "click", function() {
		toggleClass( assertList, "qunit-collapsed" );
	});

	time = document.createElement( "span" );
	time.className = "runtime";
	time.innerHTML = details.runtime + " ms";

	testItem.className = bad ? "fail" : "pass";

	testItem.insertBefore( time, assertList );
});

if ( !defined.document || document.readyState === "complete" ) {
	config.autorun = true;
}

if ( defined.document ) {
	addEvent( window, "load", QUnit.load );
}

})();

QUnit.notifications = function(options) {
  options         = options         || {};
  options.icons   = options.icons   || {};
  options.timeout = options.timeout || 4000;
  options.titles  = options.titles  || { passed: 'Passed!', failed: 'Failed!' };
  options.bodies  = options.bodies  || { passed: '{{passed}} of {{total}} passed', failed: '{{passed}} passed. {{failed}} failed.' };

  var renderBody = function(body, details) {
    ['passed', 'failed', 'total', 'runtime'].forEach(function(type) {
      body = body.replace("{{"+type+"}}", details[type]);
    });

    return body;
  };

  if (window.Notification) {
    QUnit.done(function(details) {
      var title;
      var _options = {};

      if (window.Notification && QUnit.urlParams.notifications) {
        if (details.failed === 0) {
          title = options.titles.passed;
          _options.body = renderBody(options.bodies.passed, details);

          if (options.icons.passed) {
            _options.icon = options.icons.passed;
          }
        } else {
          title = options.titles.failed;
          _options.body = renderBody(options.bodies.failed, details);

          if (options.icons.failed) {
            _options.icon = options.icons.failed;
          }
        }

        var notifications = new window.Notification(title, _options);

        setTimeout(function() {
          notifications.close();
        }, options.timeout);
      }
    });

    QUnit.begin(function() {
      var toolbar      = document.getElementById('qunit-testrunner-toolbar');
      var notification = document.createElement( "input" );

      notification.type = "checkbox";
      notification.id   = "qunit-notifications";

      if (QUnit.urlParams.notifications) {
        notification.checked = true;
      }

      notification.addEventListener('click', function(event) {
        if (event.target.checked) {
          window.Notification.requestPermission(function(status) {
            window.location = QUnit.url({notification: true});
          });
        } else {
          window.location = QUnit.url({notification: undefined});
        }
      }, false);
      toolbar.appendChild(notification);

      var label       = document.createElement('label');
      label.innerHTML = "Notifications";
      label.setAttribute( "for", "qunit-notifications" );
      label.setAttribute( "title", "Show notifications." );
      toolbar.appendChild(label);
    });
  }
};
//# sourceMappingURL=test-support.map