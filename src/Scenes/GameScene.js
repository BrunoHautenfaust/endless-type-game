import 'phaser';
import Background from '../Objects/Background';
import Player from '../Objects/Player';
import EnemyGroup from '../Objects/EnemyGroup';
import Score from '../Objects/Score';

export default class GameScene extends Phaser.Scene {
  
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('bg', 'assets/bg.png')
    this.load.image('platform', 'assets/platform.png');
    this.load.image('player', 'assets/square.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.image('projectile', 'assets/projectile.png');
  }

  create() {
    this.gameOver = false;
    let worldWidth = this.sys.canvas.width;
    let worldHeight = this.sys.canvas.height;
    let platformHeight = this.textures.get('platform').getSourceImage().height;

    // init Background
    this.background = new Background(this, worldWidth/2, worldHeight/2, 0, 0, 'bg'); 
    
    // init Ground
    let ground = this.physics.add.staticGroup();
    ground.create(150, worldHeight - (platformHeight / 2), 'platform').setScale(4, 1).refreshBody();

    // init Bullets
    let bulletsConfig = { key: 'projectile', active: false, visible: false, allowGravity: false, repeat: 29, max: 30, setXY: {x: 300, y: 300, stepX: 5 } };
    this.bullets = this.physics.add.group(bulletsConfig);

    // init Enemies
    let enemiesConfig = {childGroup: this.bullets, key: 'enemy', active: false, repeat: 9, max: 10, setXY: {x: worldWidth + 40, y: worldHeight - 65, stepX: 5 } };
    this.enemies = new EnemyGroup(this.physics.world, this, enemiesConfig);
    
    // init Player
    this.player = new Player(this, 100, 200, 'player');

    // init Score
    this.score = new Score(this, 16, 16, 'Score: ', { fontSize: '32px', fill: '#000' });

    // define collision and overlap of objects
    this.player.sprite.setCollideWorldBounds(true);

    this.physics.add.collider([this.player.sprite, this.bullets, this.enemies], ground);

    this.physics.add.overlap(this.player.sprite, [this.bullets, this.enemies], () => {
      this.gameOver = true;
      this.add.text(worldWidth/2, worldHeight/2, 'GAME OVER', { fontSize: '40px', fill: '#000' }).setOrigin(0.5);
      this.time.delayedCall(1000, () => this.scene.restart('Game')); 
    });
  }

  update() {
    if (!this.gameOver) {
      this.background.scroll();
      this.player.move();
      this.enemies.move();
      this.enemies.moveBullets();  
    }
  }
}