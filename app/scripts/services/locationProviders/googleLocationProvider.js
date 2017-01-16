'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:googleLocationProvider
 * @description
 * # googleLocationProvider
 * Factory for Google Places API
 */
 angular
    .module('weatherApp')
    .factory('googleLocationProvider',
        ['$q', '$http', '$log', 'cityFactory', 'DEBUG',
        function($q, $http, $log, cityFactory, DEBUG) {

            var createResultPromise = function(request, parseFunction) {
                var deferred = $q.defer()

                var parseResults = function(response) {
                    if (DEBUG) {
                        $log.debug('googleLocationProvider parseResults');
                        $log.debug(response);
                    }

                    if (response === null) {
                        deferred.reject(response);
                    } else {
                        var resultParsed = parseFunction(response);

                        deferred.resolve(resultParsed);
                    }
                };

                var service = new google.maps.places.AutocompleteService();
                service.getPlacePredictions(request, parseResults);

                return deferred.promise;
            };

            var searchCities = function(query) {
                
                //perform request.
                var request = {
                    input: query,
                    types: ['(cities)'],
                };

                if (DEBUG) {
                    $log.debug('googleLocationProvider - searchCities');
                    $log.debug(request);
                }

                var parseFunction = function(data) {
                    var cities = [];

                    angular.forEach(data, function(value, key) {
                        
                        var name = value.terms[0].value;
                        var country = value.terms[value.terms.length - 1].value;
                        var city = cityFactory.createCity(name, country);
                        cities.push(city);

                    }, cities);

                    cities = cities.slice(0, 8);


                    return cities;
                };

                return createResultPromise(request, parseFunction);
            };

            return {
                'searchCities': searchCities,
            };
        }]
    );