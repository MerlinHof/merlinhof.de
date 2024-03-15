class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  toVector() {
    return new Vector(this.x, this.y, this.z);
  }
  equals(p) {
    let accuracy = 1e-12;
    return (Math.abs(this.x-p.x) < accuracy && Math.abs(this.y-p.y) < accuracy && Math.abs(this.z-p.z) < accuracy)
  }
  rotate(center, angles) {
    this.x -= center.x;
    this.y -= center.y;
    this.z -= center.z;

    // Rotate X
    this.y = this.y * Math.cos(angles.x) - this.z * Math.sin(angles.x);
    this.z = this.y * Math.sin(angles.x) + this.z * Math.cos(angles.x);

    // Rotate Y
    this.x = this.x * Math.cos(angles.y) + this.z * Math.sin(angles.y);
    this.z = -this.x * Math.sin(angles.y) + this.z * Math.cos(angles.y);

    // Rotate Z
    this.x = this.x * Math.cos(angles.z) - this.y * Math.sin(angles.z);
    this.y = this.x * Math.sin(angles.z) + this.y * Math.cos(angles.z);

    this.x += center.x;
    this.y += center.y;
    this.z += center.z;
    return this;
  }
}

class Vector {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  toPoint() {
    return new Point(this.x, this.y, this.z);
  }
  negate() {
    return new Vector(-this.x, -this.y, -this.z);
  }
  sub(v) {
    return new Vector(this.x-v.x, this.y-v.y, this.z-v.z);
  }
  add(v) {
    return new Vector(this.x+v.x, this.y+v.y, this.z+v.z);
  }
  scale(f) {
    return new Vector(this.x*f, this.y*f, this.z*f);
  }
  length() {
    return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
  }
  normalize() {
    return this.scale(1/this.length());
  }
}

class Ray {
  constructor(startPoint, direction) {
    this.startPoint = startPoint;
    this.direction = direction;
  }
}

class Geometry {
  static intersect(triangle, ray) {
    let a = triangle.p1.toVector();
    let b = triangle.p2.toVector();
    let c = triangle.p3.toVector();
    let rayStart = ray.startPoint.toVector();
    let rayDirection = ray.direction;

    // Intersection Point
    let n = Geometry.crossProduct(a.sub(b), a.sub(c));
    let angle = Geometry.angleBetweenVectors(rayDirection, n);
    if (angle >= Math.PI/2) {
      angle -= Math.PI/2;
      angle = Math.PI/2 - angle;
    }
    let t = -(Geometry.dotProduct(n, rayStart) - Geometry.dotProduct(n, a)) / Geometry.dotProduct(n, rayDirection);
    let intersectionPoint = rayStart.add(rayDirection.scale(t)).toPoint();

    // Reflection Vector
    n = n.normalize();
    n = n.scale(2*Geometry.dotProduct(rayDirection, n));
    let reflectionVector = rayDirection.sub(n);
    return {
      point: intersectionPoint,
      angle: angle,
      reflectionVector: reflectionVector
    };
  }

  static angleBetweenVectors(a, b) {
    return Math.acos(Geometry.dotProduct(a, b)/(a.length()*b.length()));
  }

  static pointIsInTriangle(p, a, b, c) {
    p = p.toVector();
    a = a.toVector();
    b = b.toVector();
    c = c.toVector();
    return (Geometry.sameSide(p, a, b, c) && Geometry.sameSide(p, b, a, c) && Geometry.sameSide(p, c, a, b))
  }

  static sameSide(p1, p2, a, b) {
    let cp1 = Geometry.crossProduct(b.sub(a), p1.sub(a));
    let cp2 = Geometry.crossProduct(b.sub(a), p2.sub(a));
    return (Geometry.dotProduct(cp1, cp2) >= 0);
  }

  static dotProduct(v1, v2) {
    return v1.x*v2.x + v1.y*v2.y + v1.z*v2.z;
  }

  static crossProduct(v1, v2) {
    let x = (v1.y*v2.z) - (v1.z*v2.y);
    let y = (v1.z*v2.x) - (v1.x*v2.z);
    let z = (v1.x*v2.y) - (v1.y*v2.x);
    return new Vector(x, y, z);
  }

}



class Material {
  constructor(color, roughness, reflectivity, glow = 0) {
    this.color = color;
    this.roughness = roughness;
    this.reflectivity = reflectivity;
    this.glow = glow;
  }
  static default() {
    return new Material(new Color(100, 200, 255), 30, 0.1, 0);
  }
}



class Color {
  constructor(r, g, b) {
    this.red = r;
    this.green = g;
    this.blue = b;
  }
  combine(color, factor) {
    let r = this.red*(1-factor) + color.red*factor;
    let g = this.green*(1-factor) + color.green*factor;
    let b = this.blue*(1-factor) + color.blue*factor;
    return new Color(r, g, b);
  }
  darken(factor) {
    this.red -= this.red*factor;
    this.green -= this.green*factor;
    this.blue -= this.blue*factor;
    return this;
  }
  toString() {
    return "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
  }
  static random() {
    return new Color(Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255));
  }
}


class Triangle {
  constructor(p1, p2, p3, material) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.material = material;
  }
}


// -------------------------------------------------------
// "User"
class Cube {
  constructor(params) {
    this.pos = params.pos;
    this.size = params.size;
    this.rotation = params.rotation;
    this.material = params.material;
  }
}

class Plane {
  constructor(params) {
    this.pos = params.pos;
    this.size = params.size;
    this.rotation = params.rotation;
    this.material = params.material;
  }
}
