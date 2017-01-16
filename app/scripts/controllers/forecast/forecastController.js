'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:forecastController
 * @description
 * # forecastController
 * Controller for the Forecast
 */
 angular
    .module('weatherApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/forecast', {
                templateUrl: 'scripts/controllers/forecast/views/forecast.html',
                controller: 'forecastController'
        });
    })
    .controller(
        'forecastController',
        ['$scope', '$log', 'TEMPERATURE_UNIT', 'userSettingsService', 'forecastProviderService',
        function($scope, $log, TEMPERATURE_UNIT, userSettingsService, forecastProviderService) {
            
            var user_settings = userSettingsService.getUserSettings();
            $scope.city = user_settings.city;
            $scope.TEMPERATURE_UNIT = TEMPERATURE_UNIT;
            $scope.temperature_unit_selected = user_settings.temperature_unit;
            $scope.forecast5Days = [];


            $scope.getForecast5Days = function() {
                var promise = forecastProviderService.getForecast5DaysByCityAndCountryCode();

                promise.then(
                    function(data) {
                        $scope.forecast5Days = data;
                    },
                    function() {

                    }
                );
            };

            $scope.setTemperatureUnit = function(value) {
                userSettingsService.setTemperatureUnit(value);
                $scope.getForecast5Days();
            };

            $scope.checkTemperatureUnit = function(value) {
                return value === user_settings.temperature_unit;
            };

            $scope.getForecast5Days();
        }]
    );