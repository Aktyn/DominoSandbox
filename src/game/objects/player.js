//@ts-check
import Object2D, {Type} from './object2d';
import CollisionCategories from './collision_categories';
import Config from './../config';
import SvgEngine from './../svg_engine';
import SimplePhysics from './../simple_physics/engine';
import PowerUpBase from './powerups/powerup_base';

const SPEED_LIMIT = 0.8;
const INITIAL_HEALTH = 3;
const DAMAGE_IMMUNITY = 0.5;
/**
* @callback on_hp_change_cb
 * @param {number} damage
 */

export default class Player extends Object2D {
	/**
	* @param {SvgEngine} graphics_engine
	* @param {SimplePhysics} physics_engine
	* @param {on_hp_change_cb} on_hp_change
	*/
	constructor(graphics_engine, physics_engine, on_hp_change) {
		super(Type.CIRCLE, Config.player_size, Config.player_size, graphics_engine, physics_engine);
		super.setClass('player');

		this.body.setCategory( CollisionCategories.player );

		this.on_hp_change = on_hp_change;

		this.health = INITIAL_HEALTH;//number of health segments
		this.immunity = DAMAGE_IMMUNITY;

		this._acceleration = 0.0005;
		this._breaks_strength = 0.003;
		this.speed_limit = SPEED_LIMIT;

		/**
		 *
		 * @type {PowerUpBase []}
		 */
		this.powerUpArray = [];
	}

	/**
	* @param {{x: number, y: number}} dir
	* @param {number} delta
	*/
	move(dir, delta) {
		//console.log(dir, delta);

		this.body.applyVelocity(
			dir.x*this._acceleration*delta, dir.y*this._acceleration*delta, 
			this.speed_limit
		);
	}

	/**
	* @param {number} delta
	*/
	slowDown(delta) {
		this.body.velocity.scale(1.0 - delta*this._breaks_strength);
	}

	toogleSpeed(enable) {
		if(enable) {
			this._acceleration = 0.0005 * 2;
			this.speed_limit = SPEED_LIMIT * 2;
		} else {
			this._acceleration = 0.0005;
			this.speed_limit = SPEED_LIMIT;
		}
	}

	/** @param {number} strength */
	damage(strength) {
		if(this.immunity > 0)
			return;
		this.immunity = DAMAGE_IMMUNITY;
		this.health -= strength;
		this.on_hp_change(this.health);
	}

	kill() {
		this.health = 0;
		this.on_hp_change(this.health);
	}

	addPowerUp(powerUp) {
		this.powerUpArray.push(powerUp);
	}

	/** 
	 * @param  {number?} dt
	 * @param  {boolean?} paused
	 */
	update(dt, paused = false) {
		this.immunity = Math.max(0, this.immunity-dt/1000.0);
		this.powerUpArray.forEach((powerUp, index) => {
			powerUp.applyEffect(this);
			if((powerUp.duration_time -= dt) <= 0) {
				powerUp.clearEffect(this);
				this.powerUpArray.splice(index, 1);
			}
		});
		super.update(dt, paused);
	}
}

Player.INITIAL_HEALTH = INITIAL_HEALTH;
