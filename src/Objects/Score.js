import 'phaser';

export default class Score extends Phaser.GameObjects.Text {
	
	constructor(scene, x, y, text, style) {
		super(scene, x, y, text, style);

		this.score = 0;
		this.originalText = this.text;
		this.setText(this.text + this.score);
		
		scene.time.addEvent({
			delay: 1000,
			callback: this.updateScore,
			callbackScope: this,
			loop: true
		});

		scene.add.existing(this);
	}

	updateScore() {
		this.score++;
		this.text = this.originalText;
		this.setText(this.text + this.score);
	}
}

