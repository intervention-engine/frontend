/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // allows easier browser debugging
    sourcemaps: ['js'],
    emberHighCharts: {
      includeHighCharts: true,
      includeHighStock: false,
      includeHighMaps: false,
      includeHighChartsMore: false
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  var Funnel = require('broccoli-funnel');
  var gzipFiles = require('broccoli-gzip');

  app.import(app.bowerDirectory + '/bootstrap-sass-official/assets/javascripts/bootstrap.js');
  app.import(app.bowerDirectory + '/d3/d3.js');
  app.import(app.bowerDirectory + '/d3-tip/index.js');
  app.import(app.bowerDirectory + '/crossfilter/crossfilter.js');
  app.import(app.bowerDirectory + '/moment/moment.js');
  app.import(app.bowerDirectory + '/numeraljs/numeral.js');
  app.import(app.bowerDirectory + '/uri.js/src/URI.js');
  app.import('vendor/classie.js');
  app.import('vendor/selectFx.js');

  // bootstrap fonts
  var bootstrapFonts = new Funnel(app.bowerDirectory + '/bootstrap-sass-official/assets/fonts/bootstrap', {
    destDir: '/assets/bootstrap'
  });

  // fontawesome fonts
  var fontawesomeFonts = new Funnel(app.bowerDirectory + '/fontawesome/fonts', {
    destDir: '/assets/fontawesome'
  });

  var finalTree = app.toTree([bootstrapFonts, fontawesomeFonts]);

  if (app.env === 'production') {
    finalTree = gzipFiles(finalTree, {
      extensions: ['html', 'js', 'css', 'json', 'svg', 'txt', 'map'],
      keepUncompressed: true
    });
  }

  return finalTree;
};
