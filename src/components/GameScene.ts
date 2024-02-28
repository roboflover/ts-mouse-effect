import Phaser from 'phaser'
import MoveTo from 'phaser3-rex-plugins/plugins/moveto.js';
import Player from './Player';

export default class GameScene extends Phaser.Scene
{
    [x: string]: any;
    path: { t: number; vec: Phaser.Math.Vector2; };
    star: any;
    camera: any;

	constructor()
	{   
        scene: Phaser.Scene,
		super('hello-world')
        this.path = { t: 0, vec: new Phaser.Math.Vector2() };
        this.tween
        this.background
        this.emitter
        this.star
        this.camera
	}

	preload()
    {
        this.load.image('star', 'assets/star3.png');

        this.load.image('background', 'assets/background.jpg')
    }

    create()
    {
        this.player = new Player(this, 400, 400);
        this.background = this.add.image(0, 0, 'background').setOrigin(0);
        this.player.create();

        this.camera = this.cameras.main;        
        
        this.scale.on('resize', this.resizeHandler, this);
        window.addEventListener('load', this.resizeHandler.bind(this));
    }

    resizeHandler() {
            
        const windowWidth = this.scale.width;
        const windowHeight = this.scale.height;
        this.background.displayWidth = windowWidth
        this.background.displayHeight = windowHeight

      };

    update() {
        if (this.player) {
            this.player.update();
          }
       }
}
