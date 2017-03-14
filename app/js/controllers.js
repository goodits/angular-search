'use strict';

/* Controllers */

var flickrSearchControllers = angular.module('flickrSearchControllers', []);

flickrSearchControllers.controller('flickrSearchCtrl', ['$q', '$scope', 'photosService', 'detailsService', '$timeout', function($q, $scope, photosService, detailsService, $timeout) {
    
  // Function callback for infinite scroll.  
  $scope.getNextPage = function() {
    $scope.page++;
    if(getPhotosAttachDetails(photosService, detailsService, $scope) === false) {
      // If the function returns false, likely because it had already been 
        // called, decrement the page.
        $scope.page--;
    }
  };
  
  $scope.newSearch = function() {
    resetScope($scope, $timeout);
    getPhotosAttachDetails(photosService, detailsService, $scope);  
  };
  
  // Actions to be performed on page load.
  $scope.newSearch();
  
}]);

/*
* Reset the page and photos variables on scope. To be called on an action that 
* needs to refresh the feed.
* 
* @param {Object} $scope
 */
function resetScope($scope, $timeout) {
  $scope.page = 1;
  $scope.photos = [];
  $('.grid').masonry('destroy');
  
  // TODO: find a better way to do this other than timeout.
  $timeout(function() {
    $('.grid').masonry({
      // options
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true,
//      gutter: 15
    });
  }, 500);
}

/**
 * Returns photos from the flickr service with details attached.
 * 
 * TODO: Should be in the service? Better way to do the lock?
 * 
 * @param {Object} photosService
 * @param {Object} detailsService
 * @param {Object} $scope
 * @returns {Boolean}
 */
function getPhotosAttachDetails(photosService, detailsService, $scope) {
  
  // Checks scope object to stop the service from being called if it's already
  // actioning a request. Stops many pages being requested at once by infinite
  // scroll.
  if (!$scope.requesting) {
    $scope.requesting = true;
    
    getPhotos(photosService, $scope).then(function (photos) {
      attachDetails(detailsService, photos);
      $scope.photos = $scope.photos.concat(photos);
      $scope.requesting = false;
    });
  }
  else {
    return false;
  }
}
  

/**
 * Returns the photos from the service.
 * 
 * @param {Object} photosService
 * @param {Object} $scope
 * @returns {Promise}
 */
function getPhotos(photosService, $scope) {
  return photosService.query($scope.search_value, $scope.page).then(function (response) {
    if (response.data.stat !== 'fail') {
      var photos = [];
      angular.forEach(response.data.photos.photo, function(photo, key) {
        photos.push(photo);
      });
      return photos;
    }
  });
}

/**
 * Decorates the photo with details from the flickr service.
 * 
 * @param {Object} detailsService
 * @param {Array} photos
 * @returns {undefined}
 */
function attachDetails(detailsService, photos) {
  angular.forEach(photos, function(photo) {
    detailsService.query(photo).then(function (response) {
      if (response.data.stat !== 'fail') {
        photo['details'] = response.data.photo;
      }
    });
  });
}
