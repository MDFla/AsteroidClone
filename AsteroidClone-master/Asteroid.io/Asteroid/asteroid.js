//import Shoot from "pewpew"

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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

//importing images, backgrounds, and sprites
function preload() {
    this.load.image('sky', 'assets/skyBackground1.png');
    this.load.image('ship', 'assets/playerShip1_blue.png');
    this.load.image('shoot', 'assets/shoot.png')
}

//Adding images, sprites and background with interactions
function create() {
    //Background
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    this.add.image(500, 0, 'sky').setOrigin(0, 0);
    this.add.image(0, 400, 'sky').setOrigin(0, 0);
    this.add.image(500, 400, 'sky').setOrigin(0, 0);

    //Ship
    this.ship = this.physics.add.image(400, 300, 'ship');
    this.ship.setDrag(0.99);
    this.ship.setMaxVelocity(200);
    this.ship.setCollideWorldBounds(true);

    /*pew pew
    
    this.shootsGroup = this.physics.add.group({
        classType: Shoot,
        maxSize: 10,
        runChildUpdate: true
    });
*/
    //asteroids

    //calling out cursors for keyboard
    this.cursors = this.input.keyboard.createCursorKeys();

}



//Game function or keybindings
function update() {
    //Acceleration
    if (this.cursors.up.isDown) {
        this.physics.velocityFromRotation(this.ship.rotation, 200, this.ship.body.acceleration);
    } else {
        this.ship.setAcceleration(0);
    };
    //Rotation
    if (this.cursors.left.isDown) {
        this.ship.setAngularVelocity(-300);
    }
    else if (this.cursors.right.isDown) {
        this.ship.setAngularVelocity(300);
    }
    else {
        this.ship.setAngularVelocity(0);
    }
    /*pew pew
    if (this.cursors.space.isDown) {
        let shoot = this.shootsGroup.get();
        if (shoot) {
            shoot.fire(this.ship.x, this.ship.y, this.ship.rotation);
        }
    }*/
}