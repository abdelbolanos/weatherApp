'use strict';

/**
 * @ngdoc function
 * @name weatherApp.factory:forecastProviderService
 * @description
 * # forecastProviderService
 * Service for get forecast.
 */
 angular
    .module('weatherApp')
    .factory('forecastProviderService',
        ['$q', '$log', 'DEBUG', 'userSettingsService', 'openWeatherProvider',
        function($q, $log, DEBUG, userSettingsService, openWeatherProvider) {

            var PROVIDER = openWeatherProvider;

            var processProviderPromise = function (promise) {
                var deferred = $q.defer();

                var processOK = function(data) {
                    if (DEBUG) {
                        $log.debug('forecastProviderService processOK');
                        $log.debug(data);
                    }

                    deferred.resolve(data);
                }

                var processFail = function(error) {
                    if (DEBUG) {
                        $log.debug('forecastProviderService processFail');
                        $log.debug(error);
                    }

                    deferred.reject(error);
                }

                promise.then(
                    processOK,
                    processFail
                );

                return deferred.promise;
            };
            
            var getForecast5DaysByCityAndCountryCode = function () {
                var userSettings = userSettingsService.getUserSettings();
                PROVIDER.setTemperatureUnit(userSettings.temperature_unit);
                var city = userSettings.city;
                var country_code = userSettings.country_code;
                var providerPromise = PROVIDER.getForecast5DaysByCityAndCountryCode(city, country_code);
                
                return processProviderPromise(providerPromise);
            };

            return {
                'getForecast5DaysByCityAndCountryCode': getForecast5DaysByCityAndCountryCode
            };
        }]
    );