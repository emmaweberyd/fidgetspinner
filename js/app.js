var container = document.getElementById( 'container' );
var pi = 3.1415926535;
var force = 0.1; //initial force 
var oldPosition;
var ellapsedTime = 0;
var time;
var startTime;
var animationFrame;
var isStopped = false;

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
spinnerOne = new Spinner(0.026, 0.0005, 0.00000000024, "textures/red.png", "spinners/spinner.obj");
spinnerTwo = new Spinner(0.026, 0.00005, 0.0000024, "textures/metal.jpg", "spinners/gulbatman.obj");
spinnerThree = new Spinner(0.026, 0.00005, 0.0000024, "textures/marble.jpg", "spinners/tredjespinner.obj");
//initialize spinner
var currentSpinner = spinnerOne;

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
	
	document.getElementById("spinner1").addEventListener("click", getSpinnerOne());
	document.getElementById("spinner2").addEventListener("click", getSpinnerTwo());
	document.getElementById("spinner3").addEventListener("click", getSpinnerThree());

	time = Date.now();
	ellapsedTime = time - startTime;
	console.log(force);

	oldPosition = currentSpinner.angularPosition;

	if(force != 0 && ellapsedTime > 200) //200 millisec = 0.2 sec
		force = 0; //after some time, stop applying force

	currentSpinner.spin(force, 0.05); 
	
	sceneRoot.rotation.z += currentSpinner.angularPosition - oldPosition;

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
		currentSpinner = spinnerOne;
	else if (number === 2)
		currentSpinner = spinnerTwo;
	else if (number === 3)
		currentSpinner = spinnerThree;

	switchSpinner();
}

function getSpinnerOne(){
	currentSpinner = spinnerOne;
}

function getSpinnerTwo(){
	currentSpinner = spinnerTwo;
}

function getSpinnerThree(){
	currentSpinner = spinnerThree;
}

function Stop(){
	cancelAnimationFrame(animationFrame);
	isStopped = true;
	document.getElementById("button").innerHTML = "START";

}

function Start(){
	startTime = Date.now(); //restart time 
	oldPosition = 0;
	force = 0.1; //reinitialize force
	animate();
	isStopped = false;
	document.getElementById("button").innerHTML = "STOPP";
}

function Button(){
	if(isStopped)
		Start();
	else 
		Stop();
}