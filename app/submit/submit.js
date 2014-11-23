'use strict';

angular.module('myApp.submit', ['ngRoute'])

.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/submit', {
            templateUrl: 'submit/submit.html',
            controller: 'SubmitCtrl'
        });
}])

.controller('SubmitCtrl', function ($scope, $http) {

		var pushThatStuffSomewhere = function(data) {

	        $http.post('http://54.77.53.126:27080/test/data/_store', data)
	        	.success(function(data, status, headers, config) {
	        	    console.log("That went well.");
	        	})
				.error(function(data, status, headers, config) {
					console.log("Ain't workin'. Have a Redbull and fix it.");
				});
		}

		$scope.submitClicked = function() {
			var data = {
				nationality: $scope.nationality,
				age: $scope.age,
				gender: $scope.gender,
				unistatus: $scope.unistatus, 
				entry: $scope.entryyear,
				uni: $scope.university,
				program: $scope.program,
				pastgrad: $scope.pastgrad,
				previousInstitute: $scope.prev,
				scholarship: $scope.sch,
				experience: $scope.exp,
				degree: $scope.degree,
				grade: $scope.selectedGrade,
				range: $scope.selectedRange
			}
			console.log(data);
		}

});