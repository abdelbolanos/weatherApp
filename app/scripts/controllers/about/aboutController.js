'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:AboutController
 * @description
 * # AboutController
 * Controller of about page
 */
 angular
    .module('weatherApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/about', {
                templateUrl: 'scripts/controllers/about/views/about.html',
                controller: 'AboutController',
            });
    })
    .controller('AboutController',
        function() {
            
        }
    );