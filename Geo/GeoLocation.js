/*
 * GeoLocalisation api 
 * 
 */
var geoLocation = (function() {

	var _options = {
		enableHighAccuracy : true,
		timeout    : 5000,
		maximumAge : 0,
		frequency: 1
	}

	function _getCurrentLocation(callback, errorCallback) {

		navigator.geolocation.getCurrentPosition(function(position) {
			var coordinates = { 
				lat: parseFloat(position.coords.latitude), 
				lng: parseFloat(position.coords.longitude)
			};
			callback(coordinates)
		}, function(error){
			errorCallback(error);
		}, _options);

	}

	function _watchCurrentLocation(callback, errorCallback) {

		navigator.geolocation.watchPosition(function(position) {
			var coordinates = { 
				lat: parseFloat(position.coords.latitude), 
				lng: parseFloat(position.coords.longitude) 
			};
			callback(coordinates);
		}, function(error){
			errorCallback(error);
		}, _options);
		
	}

	return {
		init: function(options) {
			_options = options;
		},
		getCurrentLocation: function(callback, errorCallback) {
			_getCurrentLocation(callback, errorCallback);
		},
		watchCurrentLocation: function(callback, errorCallback) {
			_watchCurrentLocation(callback, errorCallback);
		}	
	}
}());