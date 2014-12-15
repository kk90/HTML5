this.addEventListener('message', function(e) {

    var imageData = e.data.imageData;
    var data = imageData.data;

    var level = e.data.level;
	var nextFilter = e.data.nextFilter;
	
    for (var i = 0; i <= data.length - 4; i += 4) {
        data[i] + level <= 255 ? data[i] = data[i] + level : data[i] = 255;
        data[i + 1] + level <= 255 ? data[i + 1] = data[i + 1] + level : data[i + 1] = 255;
        data[i + 2] + level <= 255 ? data[i + 2] = data[i + 2] + level : data[i + 2] = 255;
	}

    this.postMessage({ imageData: imageData, nextFilter: nextFilter });
    
}, false);