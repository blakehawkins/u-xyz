'use strict';

angular.module('myApp.recent', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/recent', {
    templateUrl: 'recent/recent.html',
    controller: 'RecentCtrl'
  });
}])

.controller('RecentCtrl', function($scope) {
    $scope.entries = [
        {
            'institution': 'University of Edinburgh', 
            'program': 'BSci Computer Science', 
            'decision': 'Accepted', 
            'date': '21 Nov 2014', 
            'dateAdded': '21 Nov 2014', 
            'notes': 'totally real data'
        },
        {
            'institution': 'University of Glasgow', 
            'program': 'BSci Computer Security', 
            'decision': 'Accepted', 
            'date': '20 Nov 2014', 
            'dateAdded': '21 Nov 2014', 
            'notes': 'totally fake data'
        },
    ]
});