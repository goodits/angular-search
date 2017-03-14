'use strict';

/* App Module */

var flickrSearchApp = angular.module('flickrSearchApp', [
  'ngRoute',
  'flickrSearchControllers',
  'flickrSearchDirectives',
  'flickrSearchServices',
  'flickrSearchFilters',
  'infinite-scroll',
]);

flickrSearchApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/flickr-search.html',
      });
}]);
