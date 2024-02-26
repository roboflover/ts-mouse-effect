import Phaser from 'phaser'
import MoveTo from 'phaser3-rex-plugins/plugins/moveto.js';
// import RexPlugins from 'phaser3-rex-plugins';

export default class HelloWorldScene extends Phaser.Scene
{
    path: { t: number; vec: Phaser.Math.Vector2; };
    tween: any;
	constructor()
	{   
        scene: Phaser.Scene,
		super('hello-world')
        this.path = { t: 0, vec: new Phaser.Math.Vector2() };
        this.tween

	}

	preload()
    {
        //this.load.setBaseURL('http://labs.phaser.io')

        this.load.image('star', 'assets/star3.png')
    }


    
    create()
    {
        function smoothstep(min, max, value) {
            var x = Math.max(0, Math.min(1, (value-min)/(max-min)));
            return x*x*(3 - 2*x);
        };

        const star = this.add.image(400, 300, 'star')
        
        const emitter = this.add.particles(0, 0, "star", {
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: "ADD",
          });

        emitter.startFollow(star)
        
        this.input.on('pointerdown', (pointer) => {
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

        this.tween = this.tweens.addCounter({
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
    }
}
