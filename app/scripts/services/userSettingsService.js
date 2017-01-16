'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:userSettingsService
 * @description
 * # userSettingsService
 * Factory to store and accesss user settings
 */
 angular
    .module('weatherApp')
    .factory('userSettingsService',
        ['$log', 'DEFAULT',
        function($log, DEFAULT) {

            var city = DEFAULT.city;
            var country_code = DEFAULT.country_code;
            var temperature_unit = DEFAULT.temperature_unit;

            var getUserSettings = function() {
                return {
                    'city': city,
                    'country_code': country_code,
                    'temperature_unit': temperature_unit
                };
            };

            var setTemperatureUnit = function(value) {
                temperature_unit = value;
            };

            var setCityAndCountryCode = function(newCity, newCountry_code) {
                city = newCity;
                country_code = newCountry_code;
            };

            return {
                'getUserSettings': getUserSettings,
                'setTemperatureUnit': setTemperatureUnit,
                'setCityAndCountryCode': setCityAndCountryCode
            };
        }]
    );