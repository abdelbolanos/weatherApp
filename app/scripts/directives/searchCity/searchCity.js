'use strict';

/**
 * @ngdoc function
 * @name weatherApp.directive:searchCityDirective
 * @description
 * # searchCityDirective
 * Directive for find cities
 */
 angular
    .module('weatherApp')
    .directive('searchCityDirective', [
        '$log', 'locationService', 'userSettingsService',
        function($log, locationService, userSettingsService) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/directives/searchCity/view/searchCity.html',
            scope: {
                'city': '=',
                'onUpdate': '='
            },
            link: function(scope, element, attrs) {
                
                var setCity = false;

                scope.dropdownDisplay = false;
                scope.cities = [];

                var showDropdown = function () {
                    scope.dropdownDisplay = true;
                };

                var hideDropdown = function() {
                    scope.dropdownDisplay = false;
                }

                scope.selectCity = function(cityObj) {
                    userSettingsService.setCityAndCountryCode(cityObj.name, cityObj.country_code);
                    scope.city = cityObj.name;
                    setCity = true;
                    scope.onUpdate();
                    hideDropdown();
                }

                scope.$watch('city', function(newValue, oldValue) { 
                    hideDropdown();

                    if (setCity) {
                        setCity = false;
                        return;
                    }

                    if (newValue.length > 1 && newValue !== oldValue) {
                        var promise = locationService.searchCities(newValue);
                        
                        
                        promise.then(
                            function(citiesList){
                                scope.cities = citiesList;
                            }
                        );
                    }
                });

                scope.$watch('cities', function(newValue, oldValue) {
                    if (newValue.length > 0) {
                        showDropdown();
                    }
                });
            }
        };
    }]);