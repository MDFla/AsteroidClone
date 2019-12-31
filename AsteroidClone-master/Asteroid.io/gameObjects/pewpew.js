export default class Shoot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super (scene, x, y, 'shoot');

        this.speed = Phaser.Math.GetSpeed(400, 1);
    }
    
    fire(x, y, direction) {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
    }

    update(time, delta) {
        this.x += 1;
        this.y += 1;
    }
}