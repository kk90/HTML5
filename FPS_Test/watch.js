var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
    context.translate(canvas.width/2, canvas.height/2);
var oldFpsValue = '';

var image = (function(){

  var i = 0;
  var fps;
  var context;

  function drawCircle() {
    context.save();
    context.beginPath();
    context.arc(0,0,155,0,2*Math.PI);
    context.stroke();
    context.restore();
  }

  function drawLine() {
    context.save();
    context.fillStyle = 'red';
    context.rotate(degreesToRadians(i++));
    drawHand(150, 4);
    context.restore();
  }

  function drawClock() { 
    setTimeout(function() {
          window.requestAnimationFrame(drawClock)
          context.clearRect(-200,-200,canvas.width,canvas.height);
          drawCircle();
          drawLine();
      }, 1000 / fps);
  }

  function clockApp() { 
    context.clearRect(-200,-200,canvas.width,canvas.height);
    drawCircle();
    drawLine();
    drawClock();
  }

  function drawHand(size, thickness){
    thickness = thickness || 4;

    context.shadowColor = '#555';
    context.shadowBlur = 10;

    context.beginPath();
    context.moveTo(0,0); 
    context.lineTo(thickness *-1, -10);
    context.lineTo(0, size * -1);
    context.lineTo(thickness,-10);
    context.lineTo(0,0);
    context.fill();
  }

  function degreesToRadians(degrees) {
    return (Math.PI / 180) * degrees
  }

return{
   run: function(){
      clockApp(); 
   },
   setFps: function(fpsNumber){
      fps = fpsNumber;
   },
   setContext: function(contextInput){
      context = contextInput;
   }
}
})();

document.getElementById("setButton").addEventListener("click", changeCircle);

function changeCircle() {
   var valueFps = document.getElementById('fps').value;
   if(valueFps != "" && isInt(valueFps) && oldFpsValue != valueFps){
         document.getElementById("defaultFps").innerHTML = valueFps;
         image.setContext(context)
         image.setFps(valueFps);
         image.run();
         oldFpsValue = valueFps;
   }
}

function isInt(value) {
  return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}