import Phaser from 'phaser'
import MoveTo from 'phaser3-rex-plugins/plugins/moveto.js';
import Player from './Player';

export default class GameScene extends Phaser.Scene
{
    private fullscreenKey: Phaser.Input.Keyboard.Key | undefined;
    [x: string]: any;
    path: { t: number; vec: Phaser.Math.Vector2; };
    star: any;
    camera: any;
    elem: any
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
        this.load.spritesheet('cube', 'assets/frames.png', { frameWidth: 134, frameHeight: 120 });
    }

    create()
    {
        this.fullscreenKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.fullscreenKey.on('down', () => {
            if (this.scale.isFullscreen) {
              this.scale.stopFullscreen();
            } else {
              this.scale.startFullscreen();
            }
          });

        this.background = this.add.image(0, 0, 'background').setOrigin(0);

        this.player = new Player(this, 400, 400);
        this.player.create();

        this.camera = this.cameras.main;        
        
    }

    resizeHandler() {
            
        const windowWidth = this.scale.width;
        const windowHeight = this.scale.height;
        this.background.displayWidth = windowWidth
        this.background.displayHeight = windowHeight

      };

    update() {
        this.resizeHandler()

        if (this.player) {
            this.player.update();
          }
       }
}
