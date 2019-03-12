import SvgObject from './svg';
import Config from './config';
import './../styles/svg.scss';

export default class SvgEngine {
	constructor() {
		this.width = Config.ASPECT*Config.VIRT_SCALE;
		this.height = Config.VIRT_SCALE;//Math.round(1024/aspect);

		/*this.camera = {
			x: 0,
			y: 0,
			zoom: 1//works as scaling
		}*/

		this.objects = [];

		this.svg = new SvgObject('svg', true).set({
			'width': this.width.toString(),
			'height': this.height,
			'class': 'game-svg',
			'viewBox': `${-this.width/2}, ${-this.height/2}, ${this.width}, ${this.height}`
		});

		this.defs = new SvgObject('defs', true);
		this.background_layer = new SvgObject('g');
		this.foreground_layer = new SvgObject('g');

		this.svg.addChild(this.defs);
		this.svg.addChild(this.background_layer);
		this.svg.addChild(this.foreground_layer);
	}

	static createObject(name, prevent_centering = false) {
		return new SvgObject(name, prevent_centering);
	}

	//@effects - array of objects with name and attribs fields
	createFilter(id, ...effects) {
		let filter = new SvgObject('filter', true).set({
			'id': id,
			'x': '0', 'y': '0', 'width': '200%', 'height': '200%'
		});
		for(let effect of effects) {
			if(effect instanceof SvgObject)
				filter.addChild(effect);
			else
				filter.addChild( new SvgObject(effect.name, true).set(effect.attribs) );
		}
		this.defs.addChild(filter);
	}

	/**
	* @param {string} id
	* @param {string} source
	* @param {number} width
	* @param {number} height
	*/
	createTexture(id, source, width, height) {
		//<pattern id="img1" patternUnits="userSpaceOnUse" width="100" height="100">
		//	<image xlink:href="wall.jpg" x="0" y="0" width="100" height="100" />
		//</pattern>
		let texture = new SvgObject('pattern', true).set({
			'id': id,
			'patternUnits': 'userSpaceOnUse', 
			'width': width, 'height': height
		}).addChild(
			new SvgObject('image', true).set({
				'x': 0, 'y': 0,
				'width': width, 'height': height,
				'href': source
			})
		);

		this.defs.addChild(texture);
	}

	update() {
		for(let obj of this.objects)
			obj.update();
	}

	updateCamera(x, y, zoom) {
		this.svg.set({
			'viewBox': `${
				(-this.width/2 + this.height * (x/zoom) / 2)*zoom
			}, ${
				(this.height * (y/zoom-1) / 2)*zoom
			}, ${
				this.width * zoom
			}, ${
				this.height * zoom
			}`
		});
	}

	onResize(width, height) {
		this.svg.node.style.transformOrigin = '0 0';
		this.svg.node.style.transform = `scale(${height/Config.VIRT_SCALE})`;
	}

	addBackgroundObjects(...objs) {
		for(let obj of objs) {
			//this.objects.push(obj);//assuming that the background objects doesn't need update
			this.background_layer.addChild(obj);
		}
	}

	addObjects(...objs) {
		for(let obj of objs) {
			this.objects.push(obj);
			this.foreground_layer.addChild(obj);
		}
	}

	addClass(name) {
		//this.svg.node.setAttributeNS(null, 'class', name);
		this.svg.node.classList.add(name);
		return this;
	}

	getNode() {
		return this.svg.node;
	}
}