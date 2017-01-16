'use strict';

/**
 * @ngdoc function
 * @name weatherApp.directive:forecastResumenDirective
 * @description
 * # forecastResumenDirective
 * Directive for render forecast
 */
 angular
    .module('weatherApp')
    .directive('forecastResumenDirective', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/directives/forecastResumen/view/forecastResumen.html',
            scope: {
                dayValue: '='
            },
            link: function(scope, element, attrs) {

                scope.$watch('dayValue', function(newValue, oldValue) {
                    if (scope.dayValue.length > 0) {
                        scope.date = scope.dayValue[0].dateTime.toDateString();

                        var temp_sum = 0;
                        angular.forEach(scope.dayValue, function(value, key) {
                            temp_sum += value.temperature;
                        });
                        scope.temperature = temp_sum / scope.dayValue.length;

                        scope.temperature_max = scope.dayValue.reduce(function(obj1, obj2){
                            return (obj1.temperatureMax > obj2.temperatureMax) ? obj1 : obj2;
                        }).temperatureMax;

                        scope.temperature_min = scope.dayValue.reduce(function(obj1, obj2){
                            return (obj1.temperatureMin < obj2.temperatureMin) ? obj1 : obj2;
                        }).temperatureMin;

                    }
                });
            }
        };
    });