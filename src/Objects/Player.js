import 'phaser';

export default class Player extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, img) {
		super(scene, x, y, img);
		this.sprite = scene.physics.add.sprite(x, y, img);
		this.keys = scene.input.keyboard.createCursorKeys();
	}

	move() {
		if (this.keys.up.isDown) {
		    this.sprite.setVelocityY(-150);
		} else if (this.keys.down.isDown) {
			this.sprite.setVelocityY(300);
		}
	}
}