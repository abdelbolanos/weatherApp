'use strict';

/**
 * @ngdoc function
 * @name weatherApp.factory:forecastInfoFactory
 * @description
 * # forecastInfoFactory
 * Factory to create object ForecastInfo
 */
 angular
    .module('weatherApp')
    .factory('forecastInfoFactory',
        ['$log',
        function($log) {

            var ForecastInfo = function() {
                this.dateTime = null;
                this.temperature = null;
                this.temperatureMax = null;
                this.temperatureMin = null;
                this.humidity = null;
                this.weather = null;

                this.setDateAndTimeByUTC = function(date_time_utc_string) {
                    //date_time_utc_string => 2016-11-29 17:00:34 UTC
                    this.dateTime = new Date(date_time_utc_string);
                };
            }

            var createForecastInfo = function () {
                return new ForecastInfo();
            };

            return {
                'createForecastInfo': createForecastInfo
            };
        }]
    );