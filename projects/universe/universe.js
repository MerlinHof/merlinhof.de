class Universe {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = ctx.canvas.clientWidth;
    this.height = ctx.canvas.clientHeight;
    this.world = [];
    this.blocks = {
      dirt: 0,
      rock: 1,
      water: 2,
    };
    this.initializeBlocks();
  }

  initializeBlocks() {
    this.world = [];
    let seeds = [[], [], []];

    // Rock Seeds
    for (let i = 0; i < 100; i++) {
      let x = Math.floor(Math.random()*this.width);
      let y = Math.floor(Math.random()*this.height);
      seeds[this.blocks.rock].push({x: x, y: y});
      for (let j = 0; j < 5; j++) {
        let newX, newY
        let dist = Infinity;
        while (dist > 50) {
          newX = Math.floor(Math.random()*this.width);
          newY = Math.floor(Math.random()*this.height);
          let dx = x-newX;
          let dy = y-newY;
          dist = Math.sqrt(dx*dx + dy*dy);
        }
        seeds[this.blocks.rock].push({x: newX, y: newY});
      }
    }

    // Water Seeds
    for (let i = 0; i < 20; i++) {
      let x = Math.floor(Math.random()*this.width);
      let y = Math.floor(Math.random()*this.height);
      seeds[this.blocks.water].push({x: x, y: y});
      for (let j = 0; j < 10; j++) {
        let newX, newY
        let dist = Infinity;
        while (dist > 50) {
          newX = Math.floor(Math.random()*this.width);
          newY = Math.floor(Math.random()*this.height);
          let dx = x-newX;
          let dy = y-newY;
          dist = Math.sqrt(dx*dx + dy*dy);
        }
        seeds[this.blocks.water].push({x: newX, y: newY});
      }
    }

    // Rocks, Water
    for (let x = 0; x < this.width; x++) {
      this.world.push([]);
      for (let y = 0; y < this.height; y++) {
        this.world[x].push(this.blocks.dirt);

        let accInverseDist = 0;
        for (let j = 0; j < seeds[this.blocks.rock].length; j++) {
          let dx = x-seeds[this.blocks.rock][j].x;
          let dy = y-seeds[this.blocks.rock][j].y;
          let dist = Math.sqrt(dx*dx + dy*dy);
          accInverseDist += this.width/dist;
          accInverseDist += 2*Math.random();
        }
        if (accInverseDist + 50*Math.random() > 3200) this.world[x][y] = this.blocks.rock;


        accInverseDist = 0;
        for (let j = 0; j < seeds[this.blocks.water].length; j++) {
          let dx = x-seeds[this.blocks.water][j].x;
          let dy = y-seeds[this.blocks.water][j].y;
          let dist = Math.sqrt(dx*dx + dy*dy)
          accInverseDist += this.width/dist;
        }
        if (accInverseDist + 2*Math.random() > 1100 && this.world[x][y] == this.blocks.dirt) {
          this.world[x][y] = this.blocks.water;
        }
      }
    }
  }

  draw() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let element = this.world[x][y];
        switch(element) {
          case this.blocks.dirt:
            ctx.fillStyle = "rgb(0, 60, 30)";
            break;
          case this.blocks.rock:
            ctx.fillStyle = "rgb(100, 105, 120)";
            break;
          case this.blocks.water:
            ctx.fillStyle = "rgb(0, 130, 230)";
            break;
        }
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }


  getBlock(x, y) {
    return this.world[x][y];
  }
  setBlock(x, y, block) {
    this.world[x][y] = block;
  }
  getSurroundingBlocks(x, y) {
    let answer = {
      dirt: 0,
      rock: 0,
      water: 0,
    };
    for (let posY = x-1; posY <= x+1; posY++) {
      for (let posX = y-1; posX <= y+1; posX++) {
        if (posX != x || posY != y) {
          let element = this.world[x][y];
          if (element == this.blocks.dirt) answer.dirt++;
          if (element == this.blocks.rock) answer.rock++;
          if (element == this.blocks.water) answer.water++;
        }
      }
    }
  }
}
