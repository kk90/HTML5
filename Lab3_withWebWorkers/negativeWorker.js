this.addEventListener('message', function(e) {

    var imageData = e.data.imageData;
    var data = imageData.data;

	for (var i = 0; i <= data.length - 4; i += 4) {
    		data[i] = 255 - data[i]
    		data[i + 1] = 255 - data[i + 1];
    		data[i + 2] = 255 - data[i + 2];
		}

    this.postMessage(imageData);
    
}, false);