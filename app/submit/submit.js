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

	        // $http.post('http://54.77.53.126:27080/test/dataxx/_insert', data)
	        $http.post('http://localhost:27080/test/dataxx/_insert', { docs: '["hello"]' })
	        	.success(function(data, status, headers, config) {
	        	    console.log("That went well.");
	        	    console.log(data);
	        	    console.log(status);
	        	    console.log(headers);
	        	    console.log(config);
	        	})
				.error(function(data, status, headers, config) {
					console.log("Ain't workin. Have a Redbull and fix it.");
					console.log(data);
					console.log(status);
					console.log(headers);
					console.log(config);
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
			pushThatStuffSomewhere(data);
		}

});