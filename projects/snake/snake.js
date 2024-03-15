let directions = {left: 0, up: 1, right: 2, down: 3};
let gridsize = 20;

class Snake {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.reset();
  }

  // Resets the snake
  reset() {
    this.pos = {x: this.randomTile('x'), y: this.randomTile('y')};
    this.speed = {x: 0, y: 0};
    this.foodPos = {x: 0, y: 0};
    this.tail = [];
    this.length = 3;
    this.dead = false;
    this.nextDirection = 0;
    if (this.pos.x < (this.width/gridsize)/2) {
      this.control(directions.right);
    } else {
      this.control(directions.left);
    }
    this.relocateFood();
  }

  // Updates every frame
  update() {
    if (!this.dead) {
      switch (this.nextDirection) {
        case directions.left:
        this.speed.x = -1;
        this.speed.y = 0;
        break;
        case directions.up:
        this.speed.x = 0;
        this.speed.y = -1;
        break;
        case directions.right:
        this.speed.x = 1;
        this.speed.y = 0;
        break;
        case directions.down:
        this.speed.x = 0;
        this.speed.y = 1;
        break;
      }

      // Update Position
      this.pos.x += this.speed.x;
      this.pos.y += this.speed.y;
      this.tail.unshift({x: this.pos.x, y: this.pos.y});
      if (this.tail.length > this.length) {
        this.tail.pop();
      }

      // Hit Borders
      if ((this.pos.x >= this.width/gridsize) || (this.pos.x < 0) || (this.pos.y >= this.height/gridsize) || (this.pos.y < 0)) {
        this.dead = true;
      }

      // Ate Food
      if (Math.round(this.pos.x) == Math.round(this.foodPos.x) && Math.round(this.pos.y) == Math.round(this.foodPos.y)) {
        this.relocateFood();
        this.length += 10;
      }

      // Bit Itself
      for (let i = 0; i < this.tail.length; i++) {
        if (this.tail[i].x == this.pos.x && this.tail[i].y == this.pos.y && i != 0) {
          this.dead = true;
        }
      }
    }
  }

  // Returns a random tile
  randomTile(state) {
    if (state == 'x') {
      let value = Math.floor(Math.random()*Math.floor(this.width/gridsize));
      return value;
    }
    if (state == 'y') {
      let value = Math.floor(Math.random()*Math.floor(this.height/gridsize));
      return value;
    }
  }

  // Gives the food a new position
  relocateFood() {
    let x = this.randomTile('x');
    let y = this.randomTile('y');
    this.foodPos.x = x;
    this.foodPos.y = y;
  }

  // Controls the snake
  control(direction) {
    switch (direction) {
      case directions.left:
      if (this.speed.x != 1) {
        this.nextDirection = directions.left;
      }
      break;
      case directions.up:
      if (this.speed.y != 1) {
        this.nextDirection = directions.up;
      }
      break;
      case directions.right:
      if (this.speed.x != -1) {
        this.nextDirection = directions.right;
      }
      break;
      case directions.down:
      if (this.speed.y != -1) {
        this.nextDirection = directions.down;
      }
      break;
    }
  }
}
