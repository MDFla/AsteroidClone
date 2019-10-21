//Base size of game in pixels
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
// Variables
var cursors;
var speed;
var ship;

var game = new Phaser.Game(config);

//importing images, backgrounds, and sprites
function preload() {
    this.load.image('sky', 'assets/skyBackground1.png');
    this.load.image('ship', 'assets/playerShip1_blue.png');
}

//Adding images, sprites and background with interactions
function create() {
    //Background
    this.add.image(400, 300, 'sky');
    //Ship
    ship = this.add.sprite(400, 500, 'ship').setDepth(1);

    cursors = this.input.keyboard.createCursorKeys();

    speed = Phaser.Math.GetSpeed(300, 1);
}



//Game function or keybindings
function update() {
    if (cursors.left.isDown) {
        ship.setVelocityX(-160);
    }
    else if (cursors.right.isDown) {
        ship.setVelocityX(160);
    }
    else if (cursors.up.isDown) {
        ship.setVelocityX(160);
    }
    else if (cursors.down.isDown) {
        ship.setVelocityX(160);
    }
}