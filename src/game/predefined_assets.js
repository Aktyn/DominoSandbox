import MapData from './map_data';
import Config from './config';

export const THEMES = {
	'czerwony': 'red',
	'zielony': 'green',
	'skrzynia': 'crate'
};

export const OBJECTS = {
	'domino_block': {
		theme: THEMES.czerwony,
		shape: MapData.SHAPE_TYPE.RECT,
		width: 0.05,
		height: 0.15
	},
	'red_ball': {
		theme: THEMES.zielony,
		shape: MapData.SHAPE_TYPE.CIRCLE,
		radius: 0.1
	},
	'crate': {
		theme: THEMES.skrzynia,
		shape: MapData.SHAPE_TYPE.RECT,
		width: 0.1,
		height: 0.1
	}
};

export const TEXTURES = {
	'player_texture': {
		src: require('./../img/textures/player.png'),
		width: Config.VIRT_SCALE*0.1,
		height: Config.VIRT_SCALE*0.1 
	},
	'crate_texture': {
		src: require('./../img/textures/crate.jpg'),
		width: Config.VIRT_SCALE*0.1,
		height: Config.VIRT_SCALE*0.1 
	}
}