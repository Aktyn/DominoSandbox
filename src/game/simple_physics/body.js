// @ts-check
import {Vec2, crossVV} from './math';
import Config from '../config';
import Filter from './filter';

export const ShapeType = {
	CIRCLE: 0,
	RECT: 1
};

export class Body extends Filter {
	/** 
	* @param {number} _shape_type
	* @param {number} _density
	*/
	constructor(_shape_type, _density = 1) {
		super();

		this.shape_type = _shape_type;

		this.pos = new Vec2();
		this.rot = 0;

		this.static = false;

		this.density = _density;//used for mass calculations
		this.mass = 1;//private
		this.velocity = new Vec2(0, 0);
		this.next_velocity = null;
		this.max_size = 0;

		//this.colliding = false;

		this._custom_data_ = null;//designated for only single data assignment
	}

	setCustomData(data) {
		if(this._custom_data_ !== null)
			throw new Error('Custom data has been already assigned');
		this._custom_data_ = data;
	}

	getCustomData() {
		return this._custom_data_;
	}

	resetVelocities() {
		this.velocity.set(0, 0);
	}

	/** @param {number} _density */
	setDensity(_density) {//abstract
		this.density = _density;
		this.recalculateMass();
	}

	recalculateMass() {
		throw new Error('this is abstract function and must be inherited');
	}

	/** 
	* 	@param {number} x
	* 	@param {number} y
	*/
	setPos(x, y) {
		this.pos.set(x, y);
	}

	/** 
	* 	@param {number} _rot
	*/
	setRot(_rot) {
		this.rot = _rot;
		while(this.rot >= Math.PI*2) this.rot -= Math.PI*2;
		while(this.rot < 0) this.rot += Math.PI*2;
	}

	/**
	* @param {number} x
	* @param {number} y
	* @param {number} speed_limit
	*/
	applyVelocity(x, y, speed_limit) {
		let current_speed = this.velocity.length();
		//console.log(current_speed);
		if(current_speed > speed_limit) {
			this.velocity.scale(speed_limit / current_speed);
			this.velocity.x += x;
			this.velocity.y += y;
		}
		else {
			this.velocity.x += x;
			this.velocity.y += y;
		}
	}

	setStatic() {
		this.static = true;
	}

	update() {
		if(this.static)
			return;

		//apply velocities
		if(this.next_velocity !== null) {
			//debugger;
			this.velocity = this.next_velocity;
			this.next_velocity = null;
		}
		this.pos.addVec( this.velocity );
		//if(this.colliding) {//deprecated - remove this variable
			//this.pos.add(0, g);//stick to the ground
		//	this.colliding = false;
		//}
	}
}

export class Circle extends Body {
	/** 
	* 	@param {number} _radius
	*/
	constructor(_radius) {
		super(ShapeType.CIRCLE);
		this.radius = _radius;
		this.recalculateMass();
	}

	recalculateMass() {
		this.mass = Math.PI * this.radius * this.radius * this.density;
		this.max_size = this.radius;
	}
}

export class Rect extends Body {
	/** 
	* 	@param {number} _width
	* 	@param {number} _height
	*/
	constructor(_width, _height) {
		super(ShapeType.RECT);
		this.width = _width;
		this.height = _height;
		
		this.recalculateMass();
	}

	recalculateMass() {
		this.mass = this.width*this.height*4 * this.density;
		this.max_size = Math.max(this.width, this.height);
	}
}