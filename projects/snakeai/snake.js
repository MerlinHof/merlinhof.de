let directions = {left: 0, up: 1, right: 2, down: 3};

class Snake {
  constructor(width, height, gridSize) {
    this.width = width;
    this.height = height;
    this.gridSize = gridSize;
    this.brain = new NeuralNetwork([225, 100, 100, 30, 4]);
    this.fitness = 0;
    this.reset();
  }

  // Resets the snake
  reset() {
    this.pos = {
      x: this.randomTile(this.width),
      y: this.randomTile(this.height)
    };
    this.speed = {x: 0, y: 0};
    this.foodPos = {x: 0, y: 0};
    this.tail = [];
    this.length = 3;
    this.dead = false;
    this.nextDirection = 0;
    if (this.pos.x < (this.width/this.gridSize)/2) {
      this.control(directions.right);
    } else {
      this.control(directions.left);
    }
    this.relocateFood();
  }

  // Updates every frame
  update() {
    if (!this.dead) {
      let prediction = this.brain.predict(this.getGrid());
      let maxIndex = prediction.indexOf(Math.max(...prediction));
      switch (maxIndex) {
        case 0:
        this.control(directions.left);
        break;
        case 1:
        this.control(directions.up);
        break;
        case 2:
        this.control(directions.right);
        break;
        case 3:
        this.control(directions.down);
        break;
      }

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
      if ((this.pos.x >= this.width/this.gridSize) || (this.pos.x < 0) || (this.pos.y >= this.height/this.gridSize) || (this.pos.y < 0)) {
        this.dead = true;
      }

      // Ate Food
      if (Math.round(this.pos.x) == Math.round(this.foodPos.x) && Math.round(this.pos.y) == Math.round(this.foodPos.y)) {
        this.relocateFood();
        this.length += 3;
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
  randomTile(max) {
    return Math.floor(Math.random()*Math.floor(max/this.gridSize));
  }

  // Gives the food a new position
  relocateFood() {
    let x = this.randomTile(this.width);
    let y = this.randomTile(this.height);
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

  // Draws the Snake
  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(this.foodPos.x*this.gridSize, this.foodPos.y*this.gridSize, this.gridSize-1, this.gridSize-1);
    ctx.fillStyle = "rgb(0, 0, 0)";
    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x*this.gridSize, this.tail[i].y*this.gridSize, this.gridSize-1, this.gridSize-1);
    }
    ctx.fillStyle = "rgb(220, 225, 235)";
    for (let x = 0; x < this.width; x++) {
      ctx.fillRect(x*this.gridSize, 0, 2, this.height);
    }
    for (let y = 0; y < this.height; y++) {
      ctx.fillRect(0, y*this.gridSize, this.width, 2);
    }
  }

  // Get Grid
  getGrid() {
    let res = [];
    let xGrids = this.width/this.gridSize;
    let yGrids = this.height/this.gridSize;
    for (let i = 0; i < xGrids * yGrids; i++) {
      res.push(0);
      let x = i%xGrids;
      let y = Math.floor(i/yGrids);
      if (this.foodPos.x == x && this.foodPos.y == y) {
        res[i] = 0.5;
      }
    }
    for (let i = 0; i < this.tail.length; i++) {
      res[this.tail[i].y*yGrids + this.tail[i].x] = 1;
    }
    return res;
  }


  clone() {
    let copy = new Snake(this.width, this.height, this.gridSize);
    copy.brain = this.brain.clone();
    return copy;
  }
}
