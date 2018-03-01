
var container = document.getElementById( 'container' );
var pi = 3.1415926535;
var ellapsedTime = 0;
var time;
var startTime;
var animationFrame;
var isStopped = false;

// variables to change
//var startForce = 10; //initial force = 10
var forcetime = 200; // 200
var steplength = 0.01; // 0.05

var inertiaRed = 0.00005; // 0.00005
var frictionRed = 0.0000024; // 0.0000024
var radiusRed = 0.026; // 0.026
var spinareaRed = 0.000546; // 0.000546, borde räknas om
var spinredmass = 0.0560; // 0.0560

var inertiaSilver = 0.00022697; // 0.00022697
var frictionSilver = 0.0000024; // 0.0000024
var radiusSilver = 0.04; // 0.04
var spinareaSilver = 0.000546; // fel 
var spinsilvermass = 0.112;

var inertiaGreen = 0.00037798; // 0.00037798
var frictionGreen = 0.0000024; // 0.0000024
var radiusGreen = 0.042; // 0.042
var spinareaGreen = 0.000546; // fel
var spingreenmass = 0.196;

var slider = document.getElementById("initialforce");
var output = document.getElementById("demo");
var velocityoutput = document.getElementById("velocity");
var currentmass = document.getElementById("mass");

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 2000 );
camera.position.set(0, 0, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );

// instantiate a loader
var loader = new THREE.OBJLoader();

// texture
var textureLoader = new THREE.TextureLoader();

// light 
var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
camera.add( pointLight );
scene.add( camera );

// sceen root
var sceneRoot = new THREE.Group();
scene.add(sceneRoot);

// Spinner options
spinnerRed = new Spinner(radiusRed, inertiaRed, frictionRed, spinareaRed, "textures/red.png", "spinners/spinner.obj", spinredmass);
spinnerSilver = new Spinner(radiusSilver, inertiaSilver, frictionSilver, spinareaSilver, "textures/metal.jpg", "spinners/gulbatman.obj", spinsilvermass);
spinnerGreen = new Spinner(radiusGreen, inertiaGreen, frictionGreen, spinareaGreen, "textures/marble.jpg", "spinners/tredjespinner.obj", spingreenmass);
//initialize spinner
var currentSpinner = spinnerRed;

init();
//animate();

function init(){

	//texture = textureLoader.load( currentSpinner.texture );
	texture = textureLoader.load(currentSpinner.texture);

	// initialize start time
	startTime = Date.now();

	// load a resource
	loader.load(currentSpinner.object,
		// called when resource is loaded
		function ( object ) {

			object.traverse( function ( child ) {

				if ( child instanceof THREE.Mesh ) {

					child.material.map = texture;

				}

			} );
			// Rätar upp fidget 
			object.rotation.x = pi/2;
			// lägger till fidget i scenen
			sceneRoot.add( object );

		}
	);
}

function animate() {

	animationFrame = requestAnimationFrame( animate );
	render();

}

function render() {
	
	document.getElementById("spinnerRed").addEventListener("click", getSpinnerRed());
	document.getElementById("spinnerSilver").addEventListener("click", getSpinnerSilver());
	document.getElementById("spinnerGreen").addEventListener("click", getSpinnerGreen());

	//Force
	output.innerHTML = slider.value;
	slider.oninput = function() {
	output.innerHTML = this.value;
	}

	//Velocity
	velocityoutput.innerHTML = Number(currentSpinner.angularVelocity.toFixed(5));
	
	//Mass
	currentmass.innerHTML = currentSpinner.mass;

	time = Date.now();
	ellapsedTime = time - startTime;
	console.log(currentSpinner.inertia);

	if(force != 0 && ellapsedTime > forcetime) //200 millisec = 0.2 sec
		force = 0; //after some time, stop applying force

	currentSpinner.spin(force, steplength); 
	
	sceneRoot.rotation.z += currentSpinner.angularPosition - currentSpinner.oldPosition;

	renderer.render(scene, camera);

}

function switchSpinner() {

	//remove everything
	for(i = sceneRoot.children.length; i >= 0; i--){
		sceneRoot.remove(sceneRoot.children[i]);
	}

	Stop();
	//reinitialise the stuff
	init();

}

function updateCurrentSpinner(number) {
	if (number === 1)
		currentSpinner = spinnerRed;
	else if (number === 2)
		currentSpinner = spinnerSilver;
	else if (number === 3)
		currentSpinner = spinnerGreen;

	switchSpinner();
}

function getSpinnerRed(){
	currentSpinner = spinnerRed;
}

function getSpinnerSilver(){
	currentSpinner = spinnerSilver;
}

function getSpinnerGreen(){
	currentSpinner = spinnerGreen;
}

function Stop(){
	cancelAnimationFrame(animationFrame);
	isStopped = true;
	document.getElementById("button").innerHTML = "START";

}

function Start(){



	startTime = Date.now(); //restart time 
	oldPosition = 0;
	force = document.getElementById("initialforce").value;
	if (force == 0)
		isStopped = true;
	else {
		animate();
		isStopped = false;
		document.getElementById("button").innerHTML = "STOPP";
	}
}

function Button(){
	if(isStopped)
		Start();
	else 
		Stop();
}