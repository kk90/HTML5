var geoMath = (function() {

    function _getBearing(lat1, lng1, lat2, lng2) {
        var dLon = _toRad(lng2 - lng1);
        var y = Math.sin(dLon) * Math.cos(_toRad(lat2));
        var x = Math.cos(_toRad(lat1)) * Math.sin(_toRad(lat2)) - Math.sin(_toRad(lat1)) * Math.cos(_toRad(lat2)) * Math.cos(dLon);
        var brng = _toDeg(Math.atan2(y, x));
        return ((brng + 360) % 360);
    };

    function _distanceInMeters(lat1, lng1, lat2, lng2) {
	 	var R = 6371; 							
	    var dLat = _toRad(lat2-lat1);  		
	    var dLon = _toRad(lng2-lng1); 
	    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(_toRad(lat1)) * Math.cos(_toRad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
	    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
	    var d = R * c; 							
	    return d * 1000;
    };

    function _randomLocation(lat1, lng1, radiusInMeters) {

	 	var oneDegreeInMeters = 111000;
	    var radiusInDegrees = radiusInMeters / oneDegreeInMeters;
	    var u = Math.random();
	    var v = Math.random();
	    var w = radiusInDegrees * Math.sqrt(u);
	    var t = 2 * Math.PI * v;
	    var x = w * Math.cos(t);
	    var y = w * Math.sin(t);
	    var new_x = x / Math.cos(lng1);
	    
	    return {
	      lng: new_x + lng1,
	      lat: y + lat1
	    }
    }

    function _toRad(deg) {
        return deg * (Math.PI / 180);
    };

    function _toDeg(rad) {
        return rad * (180 / Math.PI);
    };

    return {
        bearing: function(lat1, lng1, lat2, lng2) {
            return _getBearing(lat1, lng1, lat2, lng2);
        },
        distance: function(lat1, lng1, lat2, lng2) {
            return _distanceInMeters(lat1, lng1, lat2, lng2);
        },
        random: function(lat1, lng1, radius) {
            return _randomLocation(lat1, lng1, radius);
        }
    }
}());


var distance = geoMath.distance(51.877683, 19.388259, 51.878008, 19.391112);
var angle = geoMath.bearing(51.877683, 19.388259, 51.878008, 19.391112);
var random = geoMath.random(51.877683, 19.388259, 100);
var distance2 = geoMath.distance(51.877683, 19.388259, random.lat, random.lng);

console.log("Distance: " + distance);
console.log("Angle: " + angle);
console.log("Distance2: " + distance2);