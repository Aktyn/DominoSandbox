//@ts-check
import Object2D, {Type} from './object2d';
import Config from './../config';
import SvgEngine from './../svg_engine';
import SimplePhysics from './../simple_physics/engine';

const SPEED_LIMIT = 0.8;

export default class Player extends Object2D {
	/**
	* @param {SvgEngine} graphics_engine
	* @param {SimplePhysics} physics_engine
	*/
	constructor(graphics_engine, physics_engine) {
		super(Type.CIRCLE, Config.player_size, Config.player_size, graphics_engine, physics_engine);
		super.setClass('player');//TODO - style for this class

		this.acceleration = 0.0005;
	}

	/**
	* @param {{x: number, y: number}} dir
	* @param {number} delta
	*/
	move(dir, delta) {
		//console.log(dir, delta);

		this.body.applyVelocity(
			dir.x*this.acceleration*delta, dir.y*this.acceleration*delta, 
			SPEED_LIMIT
		);
	}
}