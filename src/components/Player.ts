import Phaser from 'phaser'
import MoveTo from 'phaser3-rex-plugins/plugins/moveto.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {

    [x: string]: any;

    constructor(scene: Phaser.Scene, x: number, y: number) {
      super(scene, x, y, 'player');

    }


    create(){
        
        // Создание анимации вращения куба
        this.scene.anims.create({
            key: 'rotate',
            frames: this.anims.generateFrameNumbers('cube', { frames: [0, 1, 2, 3, 4] }),
            frameRate: 10,
            repeat: -1
        });

        function smoothstep(min, max, value) {
            var x = Math.max(0, Math.min(1, (value-min)/(max-min)));
            return x*x*(3 - 2*x);
        };

        this.emitter = this.scene.add.particles(0, 0, 'star', {
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: "ADD",
          });
        
        this.cube = this.scene.add.sprite(400, 400, 'cube');
        this.cube.play('rotate');
        const star =  this.cube //this.scene.add.image(40, 400, 'star')
        this.emitter.startFollow(star)

        

        
        this.scene.input.on('pointerdown', (pointer) => {
                if (this.tween) {
                    this.tween.remove();
                    this.tween = null;
                }
            
            const targetX = pointer.x; 
            const targetY = pointer.y; 

            const speed = .1; 
            
            const distanceX = targetX - star.x;
            const distanceY = targetY - star.y;

            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            const duration = distance / speed; 

            this.tween = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: duration,
                //ease: 'ease',
                onUpdate: function(tween, target) {

                    const smoothStepValue = smoothstep(0, 1, target.value)
                    const frequency = 5.5;
                    const amplitude = 50;
                    let x = Phaser.Math.Linear(star.x, targetX, smoothStepValue);
                    let y = Phaser.Math.Linear(star.y, targetY, smoothStepValue);
                    y += Math.sin(target.value * Math.PI * frequency) * amplitude;
                    x += Math.sin(target.value * Math.PI * frequency) * amplitude;
                    star.x = x;
                    star.y = y;
                },
                onComplete: function() {},
            });                       
            
        });
        this.star = star
    }
    update() {
        const windowWidth = this.scene.scale.width;
        const windowHeight = this.scene.scale.height;

        const objectX = this.star.x;
        const objectY = this.star.y;

        let coefficient = 0.1;
        const coeffX = this.scene.scale.width * coefficient;
        const coeffY = this.scene.scale.height * coefficient;

        let cldNear = {
            isNearLeft: objectX < 0 + coeffX,
            isNearRight: objectX > windowWidth - coeffX,
            isNearTop: objectY > windowHeight - coeffY,
            isNearBottom: objectY < 0 + coeffY,
        };

        if (cldNear.isNearLeft || cldNear.isNearRight || cldNear.isNearTop || cldNear.isNearBottom) {
            let selectedVariable = Object.keys(cldNear).find(variable => cldNear[variable]);
            
            if(cldNear.isNearLeft)
                this.star.x = 0 + coeffX

            if(cldNear.isNearRight)
                this.star.x = windowWidth - coeffX
            
            if(cldNear.isNearTop)
                this.star.y = windowHeight - coeffY
            
            if(cldNear.isNearBottom)
                this.star.y = 0 + coeffY
        } 
    }
  }