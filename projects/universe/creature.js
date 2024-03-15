class Creature {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.position = {x: x, y: y};
    this.brain = new Brain(5, 3, 13*13);
    this.direction = 0;
    this.age = 0;
    this.maxAge = 50+Math.random()*40; // 50-90
    this.health = 100;
    this.energy = 100;
    this.id = Math.random()*1024;
    this.messageOut = [];
    this.inventory = {
      dirt: 0,
      rock: 1,
      water: 2,
    };
  }

  rotate() {

  }

  draw() {
    this.ctx.fillStyle = "rgb(233, 51, 246)";
    this.ctx.fillRect(this.position.x, this.position.y, 3, 3);
    this.ctx.fillStyle = "rgb(203, 21, 216)";
    this.ctx.fillRect(this.position.x+1, this.position.y, 1, 1);
  }
}
