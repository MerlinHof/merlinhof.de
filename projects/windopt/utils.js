// Constants
const bladePointCount = 30;
const windParticleCount = 30;
const generationSize = 100;
const stepsPerRotation = 40;


// Represents a Rotor Blade
class Blade {
  constructor() {
    this.points = [];
    let initialCircleRadius = height/2-250;
    for (let i = 0; i < bladePointCount; i++) {
      this.points.push(Point.fromPolarCoordiates(center, 2*Math.PI*(i/bladePointCount), initialCircleRadius));
    }
  }
  mutate(deviation) {
    for (let i = 0; i < bladePointCount; i++) {
      if (Math.random() < 0.5) continue;
      this.points[i].x += deviation/2-(Math.random()*deviation);
      this.points[i].y += deviation/2-(Math.random()*deviation);
    }
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 0; i < bladePointCount; i++) {
      ctx.lineTo(this.points[(i+1)%bladePointCount].x, this.points[(i+1)%bladePointCount].y);
    }
    ctx.strokeStyle = "rgb(180, 190, 200)";
    ctx.fillStyle = "rgb(220, 230, 240)";
    ctx.stroke();
    ctx.fill();

    for (let i = 0; i < bladePointCount; i++) {
      this.points[i].draw("rgb(100, 110, 120)", 1);
    }
  }
  getTotalWindForce() {
    let angle = 0.000000001;
    let totalForce = 0;
    for (let i = 0; i < stepsPerRotation; i++) {
      let wind = new Wind(center, angle);
      totalForce += wind.getForceOnBlade(this);
      angle += (2*Math.PI)/stepsPerRotation;
    }
    return totalForce;
  }
  clone() {
    let blade = new Blade();
    for (let i = 0; i < bladePointCount; i++) {
      blade.points[i] = this.points[i].clone();
    }
    return blade;
  }
  isValid() {
    for (let i = 0; i < bladePointCount; i++) {
      let a = this.points[i];
      let b = this.points[(i+1)%bladePointCount];
      for (let j = 0; j < bladePointCount; j++) {
        if (i == j) continue;
        let c = this.points[j];
        let d = this.points[(j+1)%bladePointCount];
        let intersection = intersectSegments(a, b, c, d);
        let intersectionPoint = intersection.intersectionPoint;
        if (intersection.insideInterval) {
          if (!intersectionPoint.equals(a) && !intersectionPoint.equals(b)) {
            return false;
          }
        }
      }
    }
    return true;
  }
}




class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static fromPolarCoordiates(center, angle, length) {
    let x = center.x+length*Math.cos(angle);
    let y = center.y+length*Math.sin(angle);
    return new Point(x, y);
  }
  draw(color, size) {
    ctx.fillStyle = "rgb(100, 120, 140)";
    if (color != undefined) ctx.fillStyle = color;
    if (size == undefined) size = 5;
    ctx.beginPath();
    ctx.arc(this.x, this.y, size, 0, 2 * Math.PI);
    ctx.fill();
  }
  equals(point) {
    return Math.abs(this.x-point.x) < 0.00000001 && Math.abs(this.y-point.y) < 0.00000001;
  }
  clone() {
    return new Point(this.x, this.y);
  }
}






class WindParticle {
  constructor(centerPoint, angle) {
    this.centerPoint = centerPoint;
    this.angle = angle;
    let length = 250;
    this.endPoint = new Point(centerPoint.x + length * Math.cos(angle), centerPoint.y + length * Math.sin(angle));
    this.startPoint = new Point(centerPoint.x-(this.endPoint.x-centerPoint.x), centerPoint.y-(this.endPoint.y-centerPoint.y));
  }
  draw() {
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "rgb(210, 150, 10)";
    ctx.beginPath();
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    ctx.lineTo(this.endPoint.x, this.endPoint.y);
    ctx.stroke();
    this.startPoint.draw("rgb(255, 0, 0)", 3);
  }
  intersectBlade(blade) {
    let minDist = Infinity;
    let bladePointIndex;
    let closestIntersection;
    for (let i = 0; i < bladePointCount; i++) {
      let intersection = intersectSegments(blade.points[i], blade.points[(i+1)%bladePointCount], this.startPoint, this.endPoint);
      if (intersection.insideInterval) {
        let dx = intersection.intersectionPoint.x - this.startPoint.x;
        let dy = intersection.intersectionPoint.y - this.startPoint.y;
        let dist = dx*dx + dy*dy;
        if (dist < minDist) {
          minDist = dist;
          bladePointIndex = i;
          closestIntersection = intersection;
        }
      }
    }

    //console.log(bladePointIndex == undefined ? "--" : Math.round(360*angle/(Math.PI*2)));
    let forceX = 0;
    if (bladePointIndex != undefined) {
      // ctx.lineWidth = 4;
      // let red = 200*closestIntersection.angle;
      // if (red > 255) red = 255;
      // ctx.strokeStyle = "rgb(" + red + ", 230, 130)";
      // ctx.beginPath();
      // ctx.moveTo(blade.points[bladePointIndex].x, blade.points[bladePointIndex].y);
      // ctx.lineTo(blade.points[(bladePointIndex+1)%bladePointCount].x, blade.points[(bladePointIndex+1)%bladePointCount].y);
      // ctx.stroke();
      // closestIntersection.intersectionPoint.draw("255, 0, 200", 3);

      let length = Math.sin(closestIntersection.angle);
      let dx = blade.points[bladePointIndex].x - blade.points[(bladePointIndex+1)%bladePointCount].x;
      let dy = blade.points[bladePointIndex].y - blade.points[(bladePointIndex+1)%bladePointCount].y;
      let normal = {x: dy*3*length, y: -dx*3*length};
      forceX = normal.x;

      // ctx.strokeStyle = "rgb(0, 0, 0)";
      // ctx.lineWidth = 1;
      // ctx.beginPath();
      // let lineX = (blade.points[bladePointIndex].x + blade.points[(bladePointIndex+1)%bladePointCount].x)/2;
      // let lineY = (blade.points[bladePointIndex].y + blade.points[(bladePointIndex+1)%bladePointCount].y)/2;
      // ctx.moveTo(lineX, lineY);
      // ctx.lineTo(lineX + normal.x, lineY + normal.y);
      // ctx.stroke();
      //
      // ctx.strokeStyle = "rgb(255, 0, 0)";
      // ctx.lineWidth = 1;
      // ctx.beginPath();
      // ctx.moveTo(lineX + normal.x, lineY + normal.y);
      // ctx.lineTo(lineX, lineY + normal.y);
      // ctx.stroke();
    }

    return forceX;
  }
}




// Checks if line segments ab and cd intersect
function intersectSegments(a, b, c, d) {
  if (a.x == b.x) a.x += 0.00001;
  if (c.x == d.x) c.x += 0.00001;
  let intersectionPointX = ((a.x*b.y-a.y*b.x) * (c.x-d.x) - (a.x-b.x) * (c.x*d.y-c.y*d.x)) / ((a.x-b.x)*(c.y-d.y) - (a.y-b.y)*(c.x-d.x));
  let intersectionPointY = ((a.x*b.y-a.y*b.x) * (c.y-d.y) - (a.y-b.y) * (c.x*d.y-c.y*d.x)) / ((a.x-b.x)*(c.y-d.y) - (a.y-b.y)*(c.x-d.x));
  let insideInterval = intersectionPointX >= Math.min(a.x, b.x) && intersectionPointX <= Math.max(a.x, b.x) && intersectionPointX >= Math.min(c.x, d.x) && intersectionPointX <= Math.max(c.x, d.x);
  let m1 = (b.y-a.y) / (b.x-a.x);
  let m2 = (d.y-c.y) / (d.x-c.x);
  let angle = Math.atan(Math.abs((m2-m1)/(1+m1*m2)));
  return {
    insideInterval: insideInterval,
    angle: angle,
    intersectionPoint: new Point(intersectionPointX, intersectionPointY)
  };
}




class Wind extends WindParticle {
  constructor(centerPoint, angle) {
    super(centerPoint, angle);
    this.windParticles = [];
    for (let i = 0; i < windParticleCount; i++) {
      let x = centerPoint.x + 0.016*height*(windParticleCount/2-i)*Math.sin(-this.angle);
      let y = centerPoint.y + 0.016*height*(windParticleCount/2-i)*Math.cos(-this.angle);
      let cp = new Point(x, y);
      let particle = new WindParticle(cp, this.angle);
      this.windParticles.push(particle);
    }
  }
  draw() {
    for (let i = 0; i < windParticleCount; i++) {
      this.windParticles[i].draw();
    }
  }
  getForceOnBlade(blade) {
    let totalForceX = 0;
    for (let i = 0; i < windParticleCount; i++) {
      totalForceX += this.windParticles[i].intersectBlade(blade);
    }
    return totalForceX;
  }
}
