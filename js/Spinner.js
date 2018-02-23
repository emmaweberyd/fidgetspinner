class Spinner {

	constructor(diameter, inertia, friction, texture, object){
		this.diameter = diameter; 
		this.friction = friction; 
		this.inertia = inertia;
		this.angularPosition = 0;
		this.angularVelocity = 0;
		this.counter = 0; // counts how many iterations
		this.texture = texture;
		this.object = object;
	}

	spin(force, stepLength) { // Updates angular position with euler
		var angularAcceleration = (1/(this.inertia)) * (this.diameter*force - this.friction*this.angularVelocity);
		this.angularVelocity = this.angularVelocity + stepLength*angularAcceleration;
		this.angularPosition = this.angularPosition + stepLength*this.angularVelocity;

	}

}