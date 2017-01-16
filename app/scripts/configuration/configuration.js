'use strict';

/**
 * @ngdoc function
 * @description
 * # Configuration
 * Configuration of the application
 */
angular.module('weatherApp')
  .constant('DEBUG', true)
  .constant('TEMPERATURE_UNIT', {
  	'Fahrenheit': {
  		'value': 'F',
  		'name': 'Fahrenheit'
  	},
  	'Celsius': {
  		'value': 'C',
  		'name': 'Celsius'
  	},
  })
  .constant('DEFAULT', {
    'city': 'Toronto',
    'country_code': 'CA',
    'temperature_unit': 'C'
  });