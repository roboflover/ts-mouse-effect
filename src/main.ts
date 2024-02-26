import Phaser from 'phaser'
import MoveToPlugin from 'phaser3-rex-plugins/plugins/moveto-plugin.js';

import HelloWorldScene from './scenes/HelloWorldScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { x: 0, y: 200 }
		}
	},
	scene: [HelloWorldScene],
	plugins: {
        global: [{
            key: 'rexMoveTo',
            plugin: MoveToPlugin,
            start: true
        }]
	}
}

var game = new Phaser.Game(config);

function resizeGame() {
    game.scale.resize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', resizeGame);

export default game;
