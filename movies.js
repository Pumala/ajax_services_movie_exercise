var app = angular.module('movie-app', []);

// the factory method stores all the services
// give it a name (i.e. 'MovieService')
// pass in the $http service to be used => builds the http
app.factory('MovieService', function($http) {
  // create an object called service
  var service = {};
  // assign your api key to a variable for cleaner code
  var curr_api_key = '7468c53c297986faad9b295510465a46';

  // create a method that gets the date of movies that are currently playing
  service.nowPlaying = function() {
    var url = 'http://api.themoviedb.org/3/movie/now_playing';

    // returns the http
    return $http({
      method: 'GET',
      url: url,
      params: {
        api_key: curr_api_key
      }
    })
  };

  service.movieDetails = function(movieId) {
    var url = 'http://api.themoviedb.org/3/movie/' + movieId;

    return $http({
      method: 'GET',
      url: url,
      params: {
        api_key: curr_api_key
      }
    })
  };

  service.movieSearch = function(search) {
    var url = 'http://api.themoviedb.org/3/search/movie';
    var curr_query = search;

    return $http({
      method: 'GET',
      url: url,
      // params takes in another property called query => what you are searching
      params: {
        api_key: curr_api_key,
        query: curr_query
      }
    })
  };

  // returns the service
  return service;

});

// the controller uses $http and MovieService too
app.controller('MovieController', function($scope, $http, MovieService) {

  // to access the service, store it in a $scope method
  $scope.getCurrMovies = function() {

    MovieService.nowPlaying()
      .success(function(movieResults) {
        $scope.movieResults = movieResults;
        console.log($scope.movieResults);
      });
  }

  // if the MovieService method requires an argument
  // pass it to it
  $scope.getMovieDetails = function(movieId) {

    MovieService.movieDetails(movieId)
      .success(function(movie) {
        $scope.currMovie = movie;
        console.log(movie);
      });
  }

  $scope.getSearchResults = function(search) {

    MovieService.movieSearch(search)
      .success(function(searchResults) {
        $scope.searchResults = searchResults;
        console.log(searchResults);
      });
  }

});

// app.config(function($stateProvider, $urlRouterProvider) {
//
// });
