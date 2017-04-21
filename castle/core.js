
var mainCanvas;
var ctx;
var num = 0;

function initialization() {
	mainCanvas = document.getElementById("mainCanvas");
	ctx = mainCanvas.getContext("2d");

	setInterval(canvasUpdate, 10);
}

function canvasUpdate() {
	ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(200, num);
	ctx.stroke();
	num += 1;
	if (num > 200) {
		num = 0;
	}
}