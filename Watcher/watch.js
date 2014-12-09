
//http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
//var i = 0;
//var fps = 60;
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var clockImage = new Image();
var clockImageLoaded = false;

clockImage.onload = function(){
   clockImageLoaded = true;
}

clockImage.src = 'images/watch.png';

function addBackgroundImage() {
	context.drawImage(clockImage, canvas.width/2 * -1 ,canvas.height/2 * -1, canvas.width, canvas.height);
}

function drawHourHand(theDate) {
   var hours = theDate.getHours() + theDate.getMinutes() / 60;
   var degrees = (hours * 360 / 12) % 360;

   context.save();
   context.fillStyle = 'black';

   context.rotate( degreesToRadians(degrees));

  drawHand(45, 5, 3);

   context.restore();
}

function drawMinuteHand(theDate) {
	var minutes = theDate.getMinutes() + theDate.getSeconds() / 60;

   context.save();
   context.fillStyle = 'black';

   context.rotate( degreesToRadians(minutes * 6));

   drawHand(70, 4.5, 5);

   context.restore();
}

function drawSecondHand(theDate) {
   context.save();

   context.fillStyle = 'red';
   
   var seconds = theDate.getSeconds();
   context.rotate(degreesToRadians(seconds * 6));
   //console.log("Value= " + i);
   drawHand(80, 4, 8);

   context.restore();
}

function drawClock() { 
/*	setTimeout(function() {
        window.requestAnimationFrame(drawClock)

		addBackgroundImage();

		var theDate = new Date();
		drawHourHand(theDate);
   		drawMinuteHand(theDate);
   		drawSecondHand(theDate);
 
    }, 1000 / fps);
*/
 		window.requestAnimationFrame(drawClock)

		addBackgroundImage();

		var theDate = new Date();
		drawHourHand(theDate);
   		drawMinuteHand(theDate);
   		drawSecondHand(theDate);
}

function clockApp(){
   if(!clockImageLoaded){
      setTimeout('clockApp()', 100);
      return;
   }
   context.translate(canvas.width/2, canvas.height/2);
   drawClock();
}

function drawHand(size, thickness, shadowOffset){
   thickness = thickness || 4;

   context.shadowColor = '#555';
   context.shadowBlur = 10;
   context.shadowOffsetX = shadowOffset;
   context.shadowOffsetY = shadowOffset;

   context.beginPath();
   context.moveTo(0,0); // center
   context.lineTo(thickness *-1, -10);
   context.lineTo(0, size * -1);
   context.lineTo(thickness,-10);
   context.lineTo(0,0);
   context.fill();
}

function degreesToRadians(degrees) {
   return (Math.PI / 180) * degrees
}

clockApp(); 