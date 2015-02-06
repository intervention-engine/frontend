/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  // allows easier browser debugging
  sourcemaps: ['js']
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

var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var gzipFiles = require('broccoli-gzip');

app.import('bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js');
app.import('bower_components/d3/d3.js');
app.import('bower_components/d3-tip/index.js');
app.import('bower_components/crossfilter/crossfilter.js');

// bootstrap fonts
var bootstrapFonts = pickFiles('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', {
  srcDir: '/',
  destDir: '/assets/bootstrap'
});

// fontawesome fonts
var fontawesomeFonts = pickFiles('bower_components/fontawesome/fonts', {
  srcDir: '/',
  destDir: '/assets/fontawesome'
});

var finalTree = mergeTrees([app.toTree(), bootstrapFonts, fontawesomeFonts]);
if (app.env === 'production') {
  finalTree = gzipFiles(finalTree, {
    extensions: ['html', 'js', 'css', 'json', 'svg', 'txt', 'map'],
    keepUncompressed: true
  });
}

module.exports = finalTree;
