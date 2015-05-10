/*
 * GeoLocalisation api 
 * 
 */
var geoLocation = (function() {

	var _options = {
		enableHighAccuracy : true,
		timeout    : 5000,
		maximumAge : 0
	};

	function _getCurrentLocation(callback, errorCallback) {

		navigator.geolocation.getCurrentPosition(function(position) {
			callback({ 
				lat: position.coords.latitude, 
				lng: position.coords.longitude
			});
		}, function(error){
			errorCallback(error);
		}, _options);

	}

	function _watchCurrentLocation(callback, errorCallback) {

		navigator.geolocation.watchPosition(function(position) {
			callback({ 
				lat: position.coords.latitude, 
				lng: position.coords.longitude
			});
		}, function(error){
			errorCallback(error);
		}, _options);
		
	}

	return {
		init: function(options) {
			_options = options;
		},
		getLocation: function(callback, errorCallback) {
			_getCurrentLocation(callback, errorCallback);
		},
		watchLocation: function(callback, errorCallback) {
			_watchCurrentLocation(callback, errorCallback);
		}	
	};
}());