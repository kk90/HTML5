/*
 * Run compass and watch bearing angle
 */
var geoCompass = (function() {

    function _getBearing(callback) {
        window.addEventListener('deviceorientation', function(e) {
            var angle = 360 - e.alpha;
            callback(angle);
        }, false);
    };

    return {
        watchBearing: function(callback) {
            _getBearing(callback);
        }
    }
}());