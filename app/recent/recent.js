'use strict';

angular.module('myApp.recent', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/recent', {
    templateUrl: 'recent/recent.html',
    controller: 'RecentCtrl'
  });
}])

.controller('RecentCtrl', [function() {

}]);