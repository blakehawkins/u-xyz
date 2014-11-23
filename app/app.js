'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.about',
  'myApp.recent',
  'myApp.submit',
  'myApp.statistics',
  'myApp.version'
])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.otherwise({
                redirectTo: '/about'
            });
}])

.factory('modalFactory', function ($compile, $rootScope, $controller) {
   
    return function (config) {

        // check that there's a template provided
        if (typeof config.template === 'undefined' && typeof config.templateUrl === 'undefined') {
            throw new Error('The service needs an html template or a te  mplate url to be passed with the config object');
        }

        // define auxiliary variables
        var template, html, scope,
            containerClass = 'ng-modal-container',
            overlayDivClass = 'ng-modal-overlay',
            useOverlay = typeof config.useOverlay === 'boolean' ? config.useOverlay : true,
            container = angular.element(config.selector || document.body),
            overlayDiv = '<div class="' + overlayDivClass + '"></div>';

        if (config.templateUrl) {
            $http.get(config.templateUrl).then(function (response) {
                template = response.data;
                // the html var has to be set on the 2 options of the conditional since one has an async call
                html = '<div class="' + containerClass + '"><div class="ng-modal"><a href="" class="ng-modal-close" ng-click="turnMeOff()">&times;</a>' + template + '</div></div>';
            });
        } else {
            template = config.template
            html = '<div class="' + containerClass + '"><div class="ng-modal"><a href="" class="ng-modal-close" ng-click="turnMeOff()">&times;</a>' + template + '</div></div>';
        }


        /**
         * Activates the modal.
         *
         * @param localVars - {Object} data passed from the caller controller
         */
        function turnMeOn(localVars) {
            var domElement, overlay;
            scope = $rootScope.$new();
            // assign the deactivation function to the created scope
            scope.turnMeOff = turnMeOff;

            // if there's a modal already on the DOM, remove it before adding another
            domElement = angular.element('.' + containerClass);
            domElement.remove();

            // if there's an overlay div already on the DOM, remove it before adding another
            overlay = angular.element('.' + overlayDivClass);
            overlay.remove();

            // if there's data passed along, copy it to the created scope
            if (localVars) {
                for (var prop in localVars) {
                    scope[prop] = localVars[prop];
                }
            }

            // create DOM elements
            domElement = angular.element(html);

            // the $compile() function compiles an HTML String/DOM into a template and produces a template function, which then is used
            // to link the template and a scope together
            $compile(domElement)(scope);

            if (useOverlay) {
                overlay = angular.element(overlayDiv);
                angular.element(document.body).append(overlay);
            }
            container.prepend(domElement);
        }

        function turnMeOff() {
            var domElement = angular.element('.' + containerClass),
                overlay = angular.element('.' + overlayDivClass);
            if (domElement) {
                domElement.remove();
            }
            if (overlay) {
                overlay.remove();
            }
            scope.$destroy();
        }

        return {
            turnMeOn: turnMeOn,
            turnMeOff: turnMeOff
        };
    };
})

.controller('ModalCtrl', ['$scope', 'modalFactory',
    function ($scope, modalFactory) {
        console.log("ModalCtrl");
        // instantiate modal service
        $scope.statusModal = new modalFactory({
            template: '<h1>Here\'s the modal!</h1><p>{{status}} was selected</p>'
        });

        $scope.turnMeOn = $scope.statusModal.turnMeOn;
        $scope.text="hi";
        // dummy data
        $scope.data = [{
            name: 'Option #1'
        }, {
            name: 'Option #2'
        }];
        $scope.option = $scope.data[0];

        $scope.activate= function () {
            console.log("click");
            var config = {};
            config.status = $scope.option.name;
            $scope.turnMeOn(config);
            
        }
    }
]);