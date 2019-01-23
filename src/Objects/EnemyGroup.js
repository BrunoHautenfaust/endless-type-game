import 'phaser';

export default class EnemyGroup extends Phaser.Physics.Arcade.Group {

	constructor(world, scene, config) {
		super(world, scene, config);
		this.scene = scene;
		this.worldWidth = scene.sys.canvas.width;
    	this.worldHeight = scene.sys.canvas.height;
    	this.bullets = config.childGroup;

		this.enemyTimer = scene.time.addEvent({
			delay: 1000,
      		callback: this.addEnemy,
      		callbackScope: this
    	});
	}

	addEnemy() {
	    let firstInactiveEnemy = this.getFirst();
	    firstInactiveEnemy.setActive(true);
	    firstInactiveEnemy.setVisible(true);

	    this.enemyTimer.reset({ delay: Phaser.Math.Between(500, 2000), callback: this.addEnemy, callbackScope: this, repeat: 1});
	    
	    this.scene.time.addEvent({
			delay: Phaser.Math.Between(0, 3000),
      		callback: this.shoot,
		   	callbackScope: this,
		   	args: [firstInactiveEnemy]
		});
	}

	move() {
		this.children.each((enemy) => {
    		if(enemy.active) {
    			enemy.x -= 4;
      		}

      		if (enemy.x < 0) {
      			enemy.setActive(false);
        		enemy.setPosition(800 + 40, 600 - 65);
      		}
    	});
	}

	shoot(en) {
		let firstInactiveBullet = this.bullets.getFirst();
		firstInactiveBullet.setActive(true);
	    firstInactiveBullet.setVisible(true);
	    firstInactiveBullet.setOrigin(1);
	    firstInactiveBullet.setPosition(en.x, en.y);
	}

	moveBullets() {
		this.bullets.children.each((bullet) => {
			if (bullet.active) {
				bullet.x -= 5;
				bullet.y -= 5;
			}
			if (bullet.x < 0 || bullet.y < 0) {
      			bullet.setActive(false);
      			bullet.setVisible(false);
      			bullet.setPosition(300, 300);
      		}
		});
	}
}