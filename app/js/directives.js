'use strict';

/* Directives */

var flickrSearchDirectives = angular.module('flickrSearchDirectives', []);

flickrSearchDirectives.directive('searchInput',  function() {
return {
    restrict: 'A',
    templateUrl: 'directives/search-input.html',
    link: function($scope, element, attrs) {
        $(element).find('.bootstrap-tagsinput > input').prop( "style", null );
        
        // Actions to be performed when a new tag is added.
        $('input#search-box').on('itemAdded', function() {
          $scope.search_value = $("input").val();
          $scope.newSearch();
        });
        
        $('input#search-box').on('itemRemoved', function() {
          $scope.search_value = $("input").val();
          $scope.newSearch(); 
        });
       }
    };
});

flickrSearchDirectives.directive('searchResult', ['$timeout', function($timeout) {
return {
    restrict: 'A',
    templateUrl: 'directives/search-result.html',
    link: function($scope, element, attrs) {
      $('.grid').imagesLoaded( function() {
        // TODO: find a better way to do this other than timeout.
        $timeout(function () {
          $('.grid').masonry('appended', element);
          element.animate({ opacity: 1 });
        }, 500);
      });
    }
  };
}]);

flickrSearchDirectives.directive('searchResults',  function() {
return {
    restrict: 'A',
    templateUrl: 'directives/search-results.html',
    link: function($scope, element, attrs) {
      $('.grid').masonry({
        // options
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
//        gutter: 15
      });
    }
  };
});

flickrSearchDirectives.directive('backToTop',  function() {
return {
    restrict: 'A',
    templateUrl: 'directives/back-to-top.html',
    link: function($scope, element, attrs) {
      $(document).on( 'scroll', function(){
        if ($(window).scrollTop() > 170) {
          $('.to-top').addClass('show-top');
        } else {
          $('.to-top').removeClass('show-top');
        }
      });
  
      $('.to-top').on('click', function() {
        $('html, body').animate({scrollTop: 0}, 1000);
      });
    }
  };
});