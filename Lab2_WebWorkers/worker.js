this.addEventListener('message', function(e) {

    var idata = e.data.idata;
    var data = idata.data;

    var d = e.data.d;

    for (var i = 0; i <= data.length - 4; i += 4) {
            data[i] + d <= 255 ? data[i] = data[i] + d : data[i] = 255;
            data[i + 1] + d <= 255 ? data[i + 1] = data[i + 1] + d : data[i + 1] = 255;
            data[i + 2] + d <= 255 ? data[i + 2] = data[i + 2] + d : data[i + 2] = 255;
    }

    this.postMessage(idata);
    
}, false);



function