// let cubeMaterial = Material.default();
// cubeMaterial.color = new Color(255, 54, 145);
// let roomMaterial = Material.default();
// roomMaterial.color = new Color(50, 100, 130);
// let thingMaterial = Material.default();
// thingMaterial.color = new Color(60, 150, 220);
// thingMaterial.reflectivity = 0;
// thingMaterial.roughness = 0;
//
// let objects = [
//   new Cube({
//     pos: new Point(-50, 120, -80),
//     size: new Vector(100, 100, 100),
//     rotation: new Vector(Math.PI/10, 0, Math.PI/5),
//     material: cubeMaterial,
//   }),
//   new Cube({
//     pos: new Point(-200, -10, -100),
//     size: new Vector(400, 300, 200),
//     rotation: new Vector(0, 0, 0),
//     material: roomMaterial,
//   }),
//
//   new Cube({
//     pos: new Point(-200, -10, -100),
//     size: new Vector(20, 300, 20),
//     rotation: new Vector(0, 0, 0),
//     material: thingMaterial,
//   }),
//   new Cube({
//     pos: new Point(180, -10, -100),
//     size: new Vector(20, 300, 20),
//     rotation: new Vector(0, 0, 0),
//     material: thingMaterial,
//   }),
//   new Cube({
//     pos: new Point(-180, 270, -100),
//     size: new Vector(360, 20, 20),
//     rotation: new Vector(0, 0, 0),
//     material: thingMaterial,
//   }),
// ];



let cubeMaterial = Material.default();
cubeMaterial.color = new Color(255, 54, 145);

let roomMaterial = Material.default();
roomMaterial.color = new Color(120, 170, 200);

let thingMaterial = Material.default();
thingMaterial.color = new Color(60, 150, 220);
thingMaterial.reflectivity = 0.02;
thingMaterial.roughness = 20;

let woodMaterial = Material.default();
woodMaterial.color = new Color(104, 75, 0);
woodMaterial.reflectivity = 0.04;
woodMaterial.roughness = 60;


let objects = [

  // Cube
  new Cube({
    pos: new Point(-80, 140, -100),
    size: new Vector(90, 90, 90),
    rotation: new Vector(Math.PI/10, 0, Math.PI/5),
    material: cubeMaterial,
  }),

  // Room
  new Cube({
    pos: new Point(-200, -10, -130),
    size: new Vector(400, 300, 200),
    rotation: new Vector(0, 0, 0),
    material: roomMaterial,
  }),

  // Leisten
  new Cube({
    pos: new Point(-200, -10, -130),
    size: new Vector(20, 300, 20),
    rotation: new Vector(0, 0, 0),
    material: thingMaterial,
  }),
  new Cube({
    pos: new Point(180, -10, -130),
    size: new Vector(20, 300, 20),
    rotation: new Vector(0, 0, 0),
    material: thingMaterial,
  }),
  new Cube({
    pos: new Point(-180, 270, -130),
    size: new Vector(360, 20, 20),
    rotation: new Vector(0, 0, 0),
    material: thingMaterial,
  }),

  // Table legs
  new Cube({
    pos: new Point(90, 190, -130),
    size: new Vector(15, 15, 65),
    rotation: new Vector(0, 0, 0),
    material: woodMaterial,
  }),
  new Cube({
    pos: new Point(90, 255, -130),
    size: new Vector(15, 15, 65),
    rotation: new Vector(0, 0, 0),
    material: woodMaterial,
  }),

  // Table Plate
  new Cube({
    pos: new Point(70, 170, -65),
    size: new Vector(130, 140, 7),
    rotation: new Vector(0, 0, 0),
    material: woodMaterial,
  }),
];
