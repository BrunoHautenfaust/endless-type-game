import 'phaser';

export default class Background extends Phaser.GameObjects.TileSprite {
	
	constructor(scene, x, y, width, height, texture) {
		super(scene, x, y, width, height, texture);
		scene.add.existing(this);
	}

	scroll() {
		this.tilePositionX += 1;
	}
}
