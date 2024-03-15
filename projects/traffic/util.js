class Lane {
  static left = 0;
  static middle = 1;
  static right = 2;
  static random() {
    switch (Math.round(Math.random()*2)) {
      case 0:
        return Lane.left;
        break;
      case 1:
        return Lane.middle;
        break;
      case 2:
        return Lane.right;
        break;
    }
  }
}

class Indicator {
  static left = 0;
  static off = 1;
  static right = 2;
}



class Driver {
  constructor() {
    this.aggressiveness = Math.random();
    this.speedLimit = 80 + Math.random() * 200;
    this.mistakeProbability = 0.05*Math.random();
  }
}

class Car {
  constructor() {
    this.progress = Math.random();
    this.driver = new Driver();
    this.speed = 100;
    this.lane = Lane.random();
    this.indicator = Indicator.off;
    this.ps = 50 + Math.random()*200;
    this.color = "rgb(" + (60+Math.random()*100) + ", " + (60+Math.random()*100) + ", " + (60+Math.random()*100) + ")";
  }
  accelerate(factor) {
    this.speed += factor*this.ps*0.03;
  }
  brake(factor) {
    this.speed -= factor*0.1;
  }
  draw(ctx, width, height, roadWidth, roadFactor) {
    ctx.fillStyle = this.color;
    let roadCount = height/roadWidth;
    let x = (this.progress*roadCount*width)%width;
    let y = (roadWidth*(1-roadFactor)/2) + roadWidth * Math.floor((this.progress*roadCount*width)/width);
    if (this.lane == Lane.middle) y += roadWidth*roadFactor/3;
    if (this.lane == Lane.right) y += 2*roadWidth*roadFactor/3;
    ctx.fillRect(x, 2+y, 18, 8);
  }

}
