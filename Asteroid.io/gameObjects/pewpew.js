export default class Shoot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super (scene, x, y, 'shoot');

        this.speed = Phaser.Math.GetSpeed(400, 1);
        this.direction = 0;
        this.angle = 0;
    }
    
    fire(x, y, direction) {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);

        this.direction = direction;
        this.rotation = this.direction;
    }

    update(time, delta) {
        this.x += Math.cos(this.direction) * this.speed * delta;
        this.y += Math.sin(this.direction) * this.speed * delta;

        if (this.x < -50 || this.y < -50 || this.x > 800 || this.y > 600) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}