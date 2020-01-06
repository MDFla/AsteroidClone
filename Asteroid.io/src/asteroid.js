import Shoot from "../gameObjects/pewpew.js"
import Asteroid from "../gameObjects/meteor.js"

export default class PlayScene extends Phaser.Scene{
    constructor() {
        super({key: 'PlayScene'});
        this.lastFired = 0;
        this.asteroidElapsedTime = 3000;
        this.gameOver = false;
    }

    //importing images, backgrounds, and sprites
    preload() {
        this.load.image('sky', 'assets/skyBackground1.png');
        this.load.image('ship', 'assets/playerShip1_blue.png');
        this.load.image('shoot', 'assets/shoot.png');
        this.load.image('asteroid', 'assets/Meteor1.png');
    }

    //Adding images, sprites and background with interactions
    create() {
        //Background
        this.add.image(0, 0, 'sky').setOrigin(0, 0);
        this.add.image(500, 0, 'sky').setOrigin(0, 0);
        this.add.image(0, 400, 'sky').setOrigin(0, 0);
        this.add.image(500, 400, 'sky').setOrigin(0, 0);

        //Ship
        this.ship = this.physics.add.image(400, 300, 'ship');
        this.ship.setDamping(true);
        this.ship.setDrag(0.99);
        this.ship.setMaxVelocity(200);
        this.ship.setCollideWorldBounds(true);
        this.ship.setSize(20, 30);

        //calling out cursors for keyboard
        this.cursors = this.input.keyboard.createCursorKeys();

        //pew pew
        this.shootsGroup = this.physics.add.group({
            classType: Shoot,
            maxSize: 10,
            runChildUpdate: true
        });

        //asteriods
        this.asteroidsGroup = this.physics.add.group();

        this.asteroidsArray = [];

        this.asteroidsTimedEvent = this.time.addEvent({
            delay: this.asteroidElapsedTime,
            callback: this.addAsteroid,
            callbackScope: this,
            loop: true
        });

        this.physics.add.overlap(this.ship, this.asteroidsGroup, this.hitShoot, null, this);
        this.physics.add.collider(this.shootsGroup, this.asteroidsGroup, this.hitShoot, null, this);

    }



    //Game function or keybindings
    update(time, delta) {
        
        //GAME OVER 
        if (this.gameOver) {
            return;
        }

        //Acceleration
        if (this.cursors.up.isDown) {
            this.physics.velocityFromRotation(this.ship.rotation, 200, this.ship.body.acceleration);
        } else {
            this.ship.setAcceleration(0);
        };

        //pew pew
        if (this.cursors.space.isDown && time > this.lastFired) {
            let shoot = this.shootsGroup.get();
            if (shoot) {
                shoot.fire(this.ship.x, this.ship.y, this.ship.rotation);

                this.lastFired = time + 50;
            }
        }

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

        //asteroid
        this.asteroidsArray = this.asteroidsArray.filter(function (asteroid) {
            return asteroid.active;
        });

        for(let asteroid of this.asteroidsArray) {
            if(!asteroid.isOrbiting()) {
                asteroid.fire(this.ship.x, this.ship.y)
            }

            asteroid.update(time,delta);
        }
    }

    //release the asteroids
    addAsteroid() {
        let asteroid = new Asteroid(this, 0, 0, 'asteroid', 0);
        this.asteroidsGroup.add(asteroid, true);
        this.asteroidsArray.push(asteroid);
    }

    //ship hit
    hitShip(ship, asteriod) {
        this.physics.pause();
        this.asteroidsTimedEvent.paused = true;

        this.ship.setTint(0xff0000);
        this.ship.body.allowRotation = false;

        this.gameOver = true;
    }

    //pewpew asteroid
    hitShoot(shoot, asteroid) {
        asteroid.disableBody(true, true);
    }
}