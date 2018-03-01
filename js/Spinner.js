class Spinner {

	constructor(radius, inertia, friction, spinarea, texture, object){
		this.radius = radius; 
		this.friction = friction; 
		this.inertia = inertia;
		this.angularPosition = 0;
		this.angularVelocity = 0;
		this.counter = 0; // counts how many iterations
		this.texture = texture;
		this.object = object;
		this.spinarea = spinarea;
		this.airResistance = 0;		 
 		}

		spin(force, stepLength) { // Updates angular position with euler
		var angularAcceleration = (1/(this.inertia)) * (this.radius*force - this.friction*this.angularVelocity - this.airResistance*this.angularVelocity);
		this.angularVelocity = this.angularVelocity + stepLength*angularAcceleration;
		this.angularPosition = this.angularPosition + stepLength*this.angularVelocity;
		
		
		// 0.5 i formel, 0.4 är luftmotståndskoefficient 1.2 är luftens densitet
		this.airResistance = 0.5 * 0.4 * 1.2041 *  this.spinarea * Math.pow(this.radius*this.angularVelocity , 2);
	}
}