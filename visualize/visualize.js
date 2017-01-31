/***** <GLOBALS> *****/
// AUDIO GLOBALS
var snd = document.getElementById('noise');

// SCENE AND CAMERA GLOBALS
var scene;
var camera;	
var renderer;
var fieldOfView = 75.0;
/***** </GLOBALS> *****/

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function drawBackground(drawData) {
	var geometry = new THREE.PlaneGeometry(1, 2);
    var material = new THREE.MeshBasicMaterial({
        color: 0xAF34EF,
        wireframe: false
    });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

	camera.position.set(0, 0, 1.3333);
	scene.add(camera);
	renderer.render(scene, camera);
}

function mainDrawLoop() {
	var canvas = document.getElementById("canvas");
	if (canvas.getContext) {	 
		var ctx = canvas.getContext("2d");
		var canvasWidth = window.innerWidth;
		var canvasHeight = window.innerHeight;
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		
		var drawData = {
			ctx:ctx,
			canvasWidth:canvasWidth,
			canvasHeight:canvasHeight,
		};
		
		drawBackground(drawData);
	}
	else {
		console.log("No canvas context available. Aborting.");
	}
}

function initRenderer() {
	scene = new THREE.Scene();	
	camera = new THREE.PerspectiveCamera(
		fieldOfView, window.innerWidth / window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer();
	
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
}
				
function main() {
	snd.src = 'ALEX - Emotions (Instrumental).wav';
	snd.load();
	snd.play();
	initRenderer();
	mainDrawLoop();
}