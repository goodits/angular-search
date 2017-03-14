'use strict';

/* Services */

var flickrSearchServices = angular.module('flickrSearchServices', []);

/*
 * Returns the response from the flickr search API.
 */
flickrSearchServices.factory('photosService', ['$http',
  function($http){ 
    return {
      query: function(tags, page) {
        var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search" +
          "&api_key=2b9fad396da3d799defbd3193e7dbd37" +
          "&per_page=20" +
          "&format=json" +
          "&nojsoncallback=1" +
          "&sort=interestingness-desc" +
          "&tag_mode=all" +
          "&page=" + page;
        url += "&tags=kent";
        if (!angular.isUndefined(tags) && tags !== false && tags !== '') {
          url += ',' + tags;
        }
        console.log(url);
        return $http.get(url, {cache: true});
      }
    };
  }
]);

/*
 * Returns the response from the flickr getInfo API.
 */
flickrSearchServices.factory('detailsService', ['$http', 
  function($http){
    return {
      query: function(photo) {
        return $http.get("https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=2b9fad396da3d799defbd3193e7dbd37&photo_id=" + photo.id + "&secret=" + photo.secret + "&format=json&nojsoncallback=1"
      , {cache: true});  
      }
    };
  }
]);

