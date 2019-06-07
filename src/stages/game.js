<<<<<<< HEAD
<<<<<<< HEAD
import $ from './../utils/html';
import Stage from './stage';

import GameCore from './../game/game_core';
import GameGUI from './../game/game_gui';

import Config from './../game/config';
=======
=======
>>>>>>> origin/stage3
// @ts-check
import $ from './../utils/html';
import Common from './../utils/common';
import Stage from './stage';

import GameCore from './../game/game_core';
import {STATE} from './../game/map';
import GameGUI from './../game/game_gui';
import MapRecords from './../game/map_records';

// import Config from './../game/config';
import Settings from './../game/settings';
<<<<<<< HEAD
>>>>>>> stage3
=======
>>>>>>> origin/stage3

import './../styles/game.scss';
import './../styles/gui.scss';

export default class GameStage extends Stage {
<<<<<<< HEAD
<<<<<<< HEAD
	constructor(target, listeners) {
		super(target, 'game-container', listeners);

=======
=======
>>>>>>> origin/stage3
	constructor(target, listeners = {}, map_data = undefined) {
		super(target, 'game-container', listeners);

		this.game = new GameCore({
			onObjectSelect: (obj) => {
				if(this.gui)
					this.gui.selectObject(obj);
			},
			onMapLoaded: () => {
				if(this.gui)
					this.gui.reloadMapData(this.game.map_data);
			},
			/** @param {number} time */
			onTimerUpdate: (time) => {
				if(this.gui)
					this.gui.setTimer(time);
			},
			/** @param {number} health */
			onPlayerHpChange: (health) => {
				this.gui.onPlayerHpChange(health);
			},

<<<<<<< HEAD
=======
			onPlayerCollectedPowerup: (powerup) => {
				this.gui.onPlayerCollectedPowerup(powerup);
			},

>>>>>>> origin/stage3
			/**
			 * @param  {string} name  
			 * @param  {number} time  
			 * @param  {boolean} edited
			 */
			onMapFinished: (name, time, edited) => {
				this.gui.onMapFinished(name, time, edited, this.game.map_data.state);

				//NOTE - changing local storage must go after invoking gui method
				if(!edited)
					MapRecords.saveRecord(name, time);
			}
		}, map_data);
<<<<<<< HEAD
>>>>>>> stage3
=======
>>>>>>> origin/stage3
		this.gui = new GameGUI({
			onReturnToMenu: () => {
				if(this.game) {
					this.game.destroy();
					this.game = null;
				}
				this.listeners.onExit();
<<<<<<< HEAD
<<<<<<< HEAD
			}
		});
		this.game = new GameCore();
=======
=======
>>>>>>> origin/stage3
			},
			onModeChange: (mode) => {
				this.game.changeState(mode === 0 ? STATE.RUNNING : STATE.EDIT_MODE);
				if(this.game.state === STATE.RUNNING && this.game.map_data.wasEdited)
					this.gui.setMapName( 'map_'+Common.MD5(Date.now().toString()).substr(0, 8) );
			},

			onMapStart: listeners.onMapStart,

<<<<<<< HEAD
=======
			freezeControls: (freeze) => this.game.steering_freezed = freeze,

>>>>>>> origin/stage3
			onAssetSelected: this.game.onAssetSelected.bind(this.game),
			onRestart: () => this.game.reload(),
			onClearMap: () => this.game.clearMap(),
			undo: () => this.game.undoLastChange(),

			exportMapData: () => this.game.map_data.export(),
			onImport: this.game.importMap.bind(this.game),

			//object edit listeners
			updateObjectTransform: this.game.updateObjectTransform.bind(this.game),
			updateObjectKeyframes: this.game.updateObjectKeyframes.bind(this.game),
			deleteObject: this.game.deleteObject.bind(this.game),

			//other edit listeners
			selectBackground: this.game.selectBackground.bind(this.game)
		});

		this.gui.reloadMapData(this.game.map_data);
		this.gui.setMapName(map_data.name);
<<<<<<< HEAD
>>>>>>> stage3
=======
>>>>>>> origin/stage3

		this.container.addChild(
			this.game.getNode(), this.gui.getNode()
		);

<<<<<<< HEAD
<<<<<<< HEAD
		window.addEventListener('resize', this.onResize.bind(this), false);
		
		setTimeout(() => this.onResize(), 1);
=======
=======
>>>>>>> origin/stage3
		window.addEventListener('resize', () => {
			this.onResize( Number(Settings.getValue('aspect_ratio')) );
		}, false);

		Settings.watch( 'aspect_ratio', val => this.onResize(Number(val)) );
		
		setTimeout(() => this.onResize( Number(Settings.getValue('aspect_ratio')) ), 1);
<<<<<<< HEAD
>>>>>>> stage3
=======
>>>>>>> origin/stage3

		//this.running = false;
		//this.run();

		this.game.run();
		console.log('game started');
	}

	close() {
		window.removeEventListener('resize', this.onResize.bind(this), false);
		super.close();
<<<<<<< HEAD
<<<<<<< HEAD
	}

	onResize() {//window resize event
		let res = $.getScreenSize();

		if(res.width / res.height > Config.ASPECT)
			res.width = res.height*Config.ASPECT;
		else
			res.height = res.width/Config.ASPECT;

		Object.assign(this.container.style, {width: `${res.width}px`, height: `${res.height}px`});
		this.game.onResize(res.width, res.height);
	}
}
=======
=======
>>>>>>> origin/stage3
		if(this.game)
			this.game.destroy();
		if(this.gui)
			this.gui.destroy();
	}

	/**
	 * @param  {number} aspect
	 */
	onResize(aspect) {//window resize event
		let res = $.getScreenSize();

		if(true === !!Settings.getValue('aspect_auto')) {
			aspect = res.width / res.height;
		}
		else {
			if(res.width / res.height > aspect)
				res.width = res.height*aspect;
			else
				res.height = res.width/aspect;
		}

		Object.assign(this.container.style, {width: `${res.width}px`, height: `${res.height}px`});
		if(this.game)
			this.game.onResize(res.width, res.height, aspect);
	}
}
<<<<<<< HEAD
>>>>>>> stage3
=======
>>>>>>> origin/stage3