'use strict';

/**
 * @ngdoc function
 * @name weatherApp.factory:googleLocationProvider
 * @description
 * # googleLocationProvider
 * Service for get location.
 */
 angular
    .module('weatherApp')
    .factory('locationService',
        ['$q', '$log', 'DEBUG', 'googleLocationProvider',
        function($q, $log, DEBUG, googleLocationProvider) {

            var PROVIDER = googleLocationProvider;

            var processProviderPromise = function (promise) {
                var deferred = $q.defer();

                var processOK = function(data) {
                    if (DEBUG) {
                        $log.debug('googleLocationProvider processOK');
                        $log.debug(data);
                    }

                    deferred.resolve(data);
                }

                var processFail = function(error) {
                    if (DEBUG) {
                        $log.debug('googleLocationProvider processFail');
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
            
            var searchCities = function (query) {
                var providerPromise = PROVIDER.searchCities(query);
                
                return processProviderPromise(providerPromise);
            };

            return {
                'searchCities': searchCities
            };
        }]
    );