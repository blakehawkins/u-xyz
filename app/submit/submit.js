'use strict';

angular.module('myApp.submit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/submit', {
    templateUrl: 'submit/submit.html',
    controller: 'SubmitCtrl'
  });
}])

.controller('SubmitCtrl', [function() {

}]);