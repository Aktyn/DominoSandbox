//@ts-check
import Object2D, {Type} from './object2d';
import SvgEngine from './../svg_engine';
import SimplePhysics from './../simple_physics/engine';
import CollisionCategories from './collision_categories';
import Player from './player';
import SpeedBoost from './powerups/speedboost';

export default class Item extends Object2D {
    /**
     * @param {number} w
     * @param {number} h
     * @param {SvgEngine} graphics_engine
     * @param {SimplePhysics} physics_engine
     * @param {string} type
     */
    constructor(w, h, graphics_engine, physics_engine, type) {
        super(Type.CIRCLE, w, h, graphics_engine, physics_engine);
        this.body.setMask(
            ~CollisionCategories.player
        );
        switch(type) {
            case 'speedboost':
                this.powerUp = new SpeedBoost();
                break;
        }
    }

    /**
     * @param {Player} player
     */
    use(player) {
        console.log('jestem w use');
        player.addPowerUp(this.powerUp);
    }
}
