'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:temperature
 * @description
 * # temperature
 * Filter for temperature
 */
 angular
    .module('weatherApp')
    .filter('temperature', [
        'userSettingsService',
        function(userSettingsService) {
            return function(input) {
                    var user_settings = userSettingsService.getUserSettings();
                    input = input || '';
                    var out = Math.round(input) +' '+ user_settings.temperature_unit;
                    return out;
            }
        }]
    )