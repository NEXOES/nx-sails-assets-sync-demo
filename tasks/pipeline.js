/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files, and ! in front of an expression to ignore files.)
 *
 * For more information see:
 *   https://github.com/balderdashy/sails-docs/blob/master/anatomy/myApp/tasks/pipeline.js.md
 */


// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'js/dependencies/md-color-picker/mdColorPicker.css',
  'js/dependencies/angular-ui-bootstrap/ui-bootstrap-csp.css',
  'js/dependencies/angular-material/angular-material.css',
  'js/dependencies/angular-datetime-picker/angular-datetime-picker.css',
  'templates/**/*.css',
  'js/**/*.css',
  'styles/**/*.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Load sails.io before everything else
  'js/dependencies/sails.io.js',

  // Dependencies like jQuery, or Angular are brought in here
  'js/dependencies/js-data/js-data.js',
  'js/dependencies/downloadjs/download.js',
  'js/dependencies/async/async.js',
  'js/dependencies/howler/howler.js',
  'js/dependencies/lodash/lodash.js',
  'js/dependencies/tinycolor2/tinycolor.js',
  'js/dependencies/moment/moment.js',
  'js/dependencies/jquery/jquery.js',
  'js/dependencies/nx-jquery-ui/client/js/jquery-ui.js',
  'js/dependencies/angular/angular.js',
  'js/dependencies/js-data-angular/js-data-angular.js',
  'js/dependencies/angular-datetime-picker/angular-datetime-picker.js',
  'js/dependencies/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js',
  'js/dependencies/md-color-picker/mdColorPicker.js',
  'js/dependencies/angular-messages/angular-messages.js',
  'js/dependencies/angular-material/angular-material.js',
  'js/dependencies/angular-ui-bootstrap/ui-bootstrap.js',
  'js/dependencies/angular-ui-bootstrap/ui-bootstrap-tpls.js',
  'js/dependencies/angular-ui-router/angular-ui-router.js',
  'js/dependencies/angular-local-storage/angular-local-storage.js',
  'js/dependencies/angular-aria/angular-aria.js',
  'js/dependencies/angular-animate/angular-animate.js',
  'js/dependencies/angular-uuid/angular-uuid.js',
  'js/dependencies/**/*.js',
  'js/dependencies/**/*.init.js',
  'js/dependencies/**/*.module.js',
  'js/**/*.module.js',
  'js/**/*.config.js',
  'js/**/*.service.js',
  'js/**/*.run.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  'js/**/*.js'
];

// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];







// Default path for public folder (see documentation for more information)
var tmpPath = '.tmp/public/';

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(cssPath) {
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (cssPath[0] === '!') {
    return require('path').join('!.tmp/public/', cssPath.substr(1));
  }
  return require('path').join('.tmp/public/', cssPath);
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(jsPath) {
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (jsPath[0] === '!') {
    return require('path').join('!.tmp/public/', jsPath.substr(1));
  }
  return require('path').join('.tmp/public/', jsPath);
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(tplPath) {
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (tplPath[0] === '!') {
    return require('path').join('!assets/', tplPath.substr(1));
  }
  return require('path').join('assets/',tplPath);
});


