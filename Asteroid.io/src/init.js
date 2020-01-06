import PlayScene from "./asteroid.js";

//Base size of game in pixels
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60,
            gravity: { y: 0 }
        }
    },
    scene: [PlayScene]
};


const game = new Phaser.Game(config);