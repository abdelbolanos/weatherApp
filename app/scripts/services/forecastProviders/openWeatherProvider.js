'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:openWeatherProvider
 * @description
 * # openWeatherProvider
 * Factory for OpenWeather
 */
 angular
    .module('weatherApp')
    .factory('openWeatherProvider',
        ['$q', '$http', '$log', 'forecastInfoFactory', 'TEMPERATURE_UNIT', 'DEBUG',
        function($q, $http, $log, forecastInfoFactory, TEMPERATURE_UNIT, DEBUG) {
            
            var API_KEY = '';
            var DOMAIN = 'http://api.openweathermap.org';
            var VERSION = '/data/2.5'
            var BASE_URL = DOMAIN + VERSION;
            var TEMPERATURE_FLAG = 'metric';

            var setTemperatureUnit = function(value) {
                TEMPERATURE_FLAG = (value === TEMPERATURE_UNIT.Fahrenheit.value) ? 'imperial' : 'metric';
            };

            var createDataParams = function(query) {
                return {
                    'APPID': API_KEY,
                    'units': TEMPERATURE_FLAG,
                    'q': query
                };
            };

            var createResultPromise = function(http_config, parseFunction) {
                var deferred = $q.defer()

                var parseResults = function(response) {
                    if (DEBUG) {
                        $log.debug('openWeatherProvider parseResults');
                        $log.debug(response);
                    }

                    var resultParsed = parseFunction(response.data);

                    deferred.resolve(resultParsed);
                };

                var errorResponse = function(error) {
                    if (DEBUG) {
                        $log.debug('openWeatherProvider errorResponse');
                        $log.debug(error);
                    }

                    deferred.reject(error);
                };

                $http(http_config).then(parseResults, errorResponse);

                return deferred.promise;
            };

            var getForecast5DaysByCityAndCountryCode = function(city, country_code) {
                
                var query = 'q=' + city + ',' + country_code;
                var params = createDataParams(query);
                var http_config = {
                    method: 'GET',
                    url: BASE_URL + '/forecast',
                    params: params
                };

                if (DEBUG) {
                    $log.debug('openWeatherProvider - getForecast5DaysByCityAndCountryCode');
                    $log.debug(http_config);
                }

                var parseFunction = function(data) {
                    var forecast_info_dict = {};
                    var forecast_info_list = [];

                    if (data.hasOwnProperty('list')) {
                        angular.forEach(data.list, function(value, key) {
                            
                            var forecast_info = forecastInfoFactory.createForecastInfo();
                            
                            forecast_info.setDateAndTimeByUTC(value.dt_txt + ' UTC'); //datetime is UTC by default
                            forecast_info.temperature = value.main.temp;
                            forecast_info.temperatureMax = value.main.temp_max;
                            forecast_info.temperatureMin = value.main.temp_min;
                            forecast_info.humidity = value.main.humidity;
                            if (value.weather.length > 0) {
                                forecast_info.weather = value.weather[0].description;
                            }
                            
                            var date_time_string = forecast_info.dateTime.getFullYear() +
                                '-' +
                                forecast_info.dateTime.getMonth() +
                                '-' +
                                forecast_info.dateTime.getDate();

                            if (forecast_info_dict.hasOwnProperty(date_time_string)) {
                                forecast_info_dict[date_time_string].push(forecast_info);
                            } else {
                                forecast_info_dict[date_time_string] = [forecast_info];
                            }

                        }, forecast_info_dict);

                        angular.forEach(forecast_info_dict, function(value, key) {
                            forecast_info_list.push(value);
                        }, forecast_info_list);

                        forecast_info_list = forecast_info_list.slice(0, 5);
                    }

                    return forecast_info_list;
                };

                return createResultPromise(http_config, parseFunction);
            };

            return {
                'getForecast5DaysByCityAndCountryCode': getForecast5DaysByCityAndCountryCode,
                'setTemperatureUnit': setTemperatureUnit
            };
        }]
    );