'use strict';

/* Filters */
var flickrSearchFilters = angular.module('flickrSearchFilters', []);

/*
 * Trims a value to length and returns with ellipsis at the end.
 */
flickrSearchFilters.filter('trim',  function () {
  return function (value, length) {
      if (!value) return '';
      if (value.length <= length) return value;
      return value.substr(0, length) + '...';
  };
});

/*
 * If value is not set or is an empty string, returns replacement value.
 */
flickrSearchFilters.filter('subIfEmpty',  function () {
  return function (value, replacement) {
    if (!value || value === '') {
      return replacement;
    }
    return value;
  };
});

/*
 * Filters out HTML tags.
 */
flickrSearchFilters.filter('htmlToPlaintext', function() {
  return function(text) {
    return text ? String(text).replace(/<[^>]+>/gm, '') : '';
  };
});