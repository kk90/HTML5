var arrow = function() {

	var _context = {},
		_canvas = {},
		_arrowImage = {},
		_imagePosition = { x: 100, y: 100 },
		_isEnabled = false,
		_imageName = "";

	function _drawImage(angle) { 
		if(_isEnabled) {
			_context.clearRect ( 0 , 0 , _canvas.width, _canvas.height );
			_context.save(); 
			_context.translate(_imagePosition.x, _imagePosition.y);
			_context.rotate(angle * Math.PI / 180); 
			_context.translate(-_imagePosition.x, -_imagePosition.y);
			_context.drawImage(_arrowImage, _imagePosition.x - _arrowImage.width / 2, _imagePosition.y - _arrowImage.height / 2);
			_context.restore(); 
		}
	}

	function _draw() {
		_arrowImage = new Image();
		_arrowImage.onload = function() {
		  	_isEnabled = true;
		  	_drawImage(0);
		}
		_arrowImage.src = _imageName;
	}

	function _rotate(angle) {
		_drawImage(angle);
	}

	return {
		init: function(canvas, imageName) {
			_canvas = canvas;
			_context = canvas.getContext('2d');
			_imageName = imageName;
			_draw();
		},
		rotate: function(angle) {
			_rotate(parseFloat(angle));
		}
	};
};