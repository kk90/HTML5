var geoMath = (function() {

    var _decimals = 2;

    function _getBearing(lat1, lng1, lat2, lng2) {
        var dLon = _toRad(lng2 - lng1);
        var y = Math.sin(dLon) * Math.cos(_toRad(lat2));
        var x = Math.cos(_toRad(lat1)) * Math.sin(_toRad(lat2)) - Math.sin(_toRad(lat1)) * Math.cos(_toRad(lat2)) * Math.cos(dLon);
        var brng = _toDeg(Math.atan2(y, x));
        return ((brng + 360) % 360).toFixed(_decimals);
    };

    function _distanceMeters(lat1, lng1, lat2, lng2) {
        var earthRadius = 6371000;      // m
        var dLat = _toRad(lat2 - lat1);
        var dLon = _toRad(lng2 - lng1);
        var lat1 = _toRad(lat1);
        var lat2 = _toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = earthRadius * c;
        return Math.round(d * Math.pow(10, _decimals)) / Math.pow(10, _decimals);
    };

    function _randomLocation(lat1, lng1, radius) {
        var r = radius / 111300,
            y0 = parseFloat(lat1),
            x0 = parseFloat(lng1),
            u = parseFloat(Math.random()),
            v = parseFloat(Math.random()),
            w = parseFloat(r * Math.sqrt(u)),
            t = parseFloat(2 * Math.PI * v),
            x = parseFloat(w * Math.cos(t)),
            y1 = parseFloat(w * Math.sin(t)),
            x1 = parseFloat(x / Math.cos(y0)),
            newY = parseFloat(y0 + y1),
            newX = parseFloat(x0 + x1);

        var position = {
            lat: parseFloat(newY),
            lng: parseFloat(newX)
        }
        
        return position;
    }

    function _toRad(deg) {
        return deg * (Math.PI / 180);
    };

    function _toDeg(rad) {
        return rad * (180 / Math.PI);
    };

    return {
        init: function(decimals, coordinatesDecimals) {
            _decimals = decimals;
        },
        bearing: function(lat1, lng1, lat2, lng2) {
            return _getBearing(lat1, lng1, lat2, lng2);
        },
        distance: function(lat1, lng1, lat2, lng2) {
            return _distanceMeters(lat1, lng1, lat2, lng2);
        },
        random: function(lat1, lng1, radius) {
            return _randomLocation(lat1, lng1, radius);
        }
    }
}());