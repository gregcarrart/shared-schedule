'use strict';

angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    angular.bootstrap(document, ['mean']);

});

// Dynamically add angular modules declared by packages
var packageModules = [];
for (var index in window.modules) {
    angular.module(window.modules[index].module, window.modules[index].angularDependencies || []);
    packageModules.push(window.modules[index].module);
}

// Default modules
var libModules = ['ngCookies', 'ngResource', 'ui.bootstrap', 'restangular', 'ui.calendar'];
var modules = ['ui.router', 'mean.system', 'mean.articles', 'mean.auth', 'mean.prof', 'mean.schedule'];
modules = modules.concat(packageModules);
modules = libModules.concat(modules);

// Combined modules
angular.module('mean', modules);