function loadScene0(game, inventory) {

  // Floor
  for (let x = -50; x <= 50; x++) {
    let line = new Path();
    line.addPoint(new Point(5*x, 0, 0));
    line.addPoint(new Point(5*x, 500, 0));
    line.lineWidth = 1;
    line.lineColor = new Color(90, 110, 140, 0.6);
    game.addObject(line);
  }
  for (let y = 0; y <= 100; y++) {
    let line = new Path();
    line.addPoint(new Point(-250, 5*y, 0));
    line.addPoint(new Point(250, 5*y, 0));
    line.lineWidth = 1;
    line.lineColor = new Color(90, 110, 140, 0.6);
    game.addObject(line);
  }
  let floorPlane = new Plane();
  floorPlane.position = new Point(0, 250, 0);
  floorPlane.size = new Vector(500, 0, 500);
  floorPlane.rotation = new Vector(Math.PI/2, 0, 0);
  floorPlane.lineWidth = 0;
  floorPlane.lineColor = new Color(0, 0, 0, 0);
  floorPlane.fillColor = new Color(200, 220, 255, 0.1);
  floorPlane.filled = true;
  game.addObject(floorPlane);

  // House
  let cube = new Cube();
  cube.position = new Point(0, 120, 20);
  cube.size = new Vector(90, 50, 40);
  cube.lineWidth = 3;
  cube.lineColor = new Color(255, 255, 255);
  game.addObject(cube);

  // Roof
  let rline1 = new Path();
  rline1.addPoint(new Point(-45, 120, 55));
  rline1.addPoint(new Point(-45, 95, 40));
  rline1.lineWidth = 3;
  rline1.lineColor = new Color(255, 255, 255);
  game.addObject(rline1);
  let rline2 = new Path();
  rline2.addPoint(new Point(-45, 120, 55));
  rline2.addPoint(new Point(-45, 145, 40));
  rline2.lineWidth = 3;
  rline2.lineColor = new Color(255, 255, 255);
  game.addObject(rline2);
  let rline3 = new Path();
  rline3.addPoint(new Point(45, 120, 55));
  rline3.addPoint(new Point(45, 95, 40));
  rline3.lineWidth = 3;
  rline3.lineColor = new Color(255, 255, 255);
  game.addObject(rline3);
  let rline4 = new Path();
  rline4.addPoint(new Point(45, 120, 55));
  rline4.addPoint(new Point(45, 145, 40));
  rline4.lineWidth = 3;
  rline4.lineColor = new Color(255, 255, 255);
  game.addObject(rline4);
  let rline5 = new Path();
  rline5.addPoint(new Point(-45, 120, 55));
  rline5.addPoint(new Point(45, 120, 55));
  rline5.lineWidth = 3;
  rline5.lineColor = new Color(255, 255, 255);
  game.addObject(rline5);

  // Door
  let doorFrame = new Plane();
  doorFrame.position = new Point(-30, 95, 10);
  doorFrame.size = new Vector(10, 0, 20);
  doorFrame.lineWidth = 3;
  doorFrame.lineColor = new Color(255, 255, 255);
  game.addObject(doorFrame);
  let door = new Plane();
  door.position = new Point(-30, 95, 10);
  door.size = new Vector(10, 0, 20);
  door.lineWidth = 3;
  door.lineColor = new Color(255, 255, 255);
  game.addObject(door);
  let doorWindow = new Plane();
  doorWindow.position = new Point(-30, 95, 16);
  doorWindow.size = new Vector(8, 0, 6);
  doorWindow.lineWidth = 3;
  doorWindow.lineColor = new Color(255, 255, 255);
  game.addObject(doorWindow);
  let doorHandle = new Path();
  doorHandle.addPoint(new Point(-29, 95, 10));
  doorHandle.addPoint(new Point(-27, 95, 10));
  doorHandle.lineWidth = 3;
  doorHandle.lineColor = new Color(255, 255, 255);
  game.addObject(doorHandle);

  // Door Way
  let way1 = new Path();
  way1.addPoint(new Point(-35, 95, 0));
  way1.addPoint(new Point(-35, 50, 0));
  way1.addPoint(new Point(-160, 50, 0));
  way1.lineWidth = 3;
  way1.lineColor = new Color(255, 255, 255, 0.3);
  game.addObject(way1);
  let way2 = new Path();
  way2.addPoint(new Point(-25, 95, 0));
  way2.addPoint(new Point(-25, 40, 0));
  way2.addPoint(new Point(-160, 40, 0));
  way2.lineWidth = 3;
  way2.lineColor = new Color(255, 255, 255, 0.3);
  game.addObject(way2);

  // Door Hover
  let whiteColor = new Color(255, 255, 255);
  let blueColor = new Color(80, 160, 255);
  game.addHoverEvent(doorHandle, inside => {
    doorHandle.lineColor = inside ? blueColor : whiteColor;
    doorHandle.lineWidth = inside ? 7 : 3;
    door.lineColor = inside ? blueColor : whiteColor;
    door.lineWidth = inside ? 7 : 3;
    doorWindow.lineColor = inside ? blueColor : whiteColor;
    doorWindow.lineWidth = inside ? 7 : 3;
  });
  game.addClickEvent(doorHandle, () => {
    if (!inventory.containsItem("key")) {
      showMessage("The Door is Locked", "lock.png");
      return;
    }
    let center = new Point(-35, 95, 0);
    let to = new Vector(0, 0, Math.PI/4+0.25);
    let duration = 500;
    game.animate(GameEngine.rotateAnimation, doorHandle, center, to, duration);
    game.animate(GameEngine.rotateAnimation, door, center, to, duration);
    game.animate(GameEngine.rotateAnimation, doorWindow, center, to, duration);
    if (this.foundEntrance == undefined) {
      showMessage("Bravo, You solved the first Riddle! One more to go.");
      this.foundEntrance = true;
    }
  });


  // Key
  let key = drawKey();
  game.addHoverEvent(key, inside => {
    if (inside) {
      key.lineColor = new Color(255, 190, 0);
      key.lineWidth = 7;
    } else {
      key.lineColor = new Color(190, 190, 0);
      key.lineWidth = 3;
    }
  });
  game.addClickEvent(key, () => {
    if (inventory.containsItem("key")) {
      showMessage("Still a key. Nothing new.");
    } else {
      showMessage("That looks like a key. It's yours now.");
      inventory.addItem(new Item("key", "key.png"));
    }
  });


  let button = new Ellipse();
  button.position = new Point(35, 135, 0);
  button.size = new Point(2, 2, 0);
  button.lineColor = new Color(230, 20, 180);
  game.addObject(button);
  // game.addClickEvent(button, () => {
  //   game.animate(GameEngine.rotateAnimation, button, circle.position, new Vector(0, Math.PI*2, 0), 100);
  // });
}




function drawKey() {
  let key = new Path();
  // key.addPoint(new Point(-180, 50, 0));
  // key.addPoint(new Point(-170, 50, 0));
  // key.addPoint(new Point(-170, 40, 0));
  // key.addPoint(new Point(-180, 40, 0));
  // key.addPoint(new Point(-180, 50, 0));
  key.addPoint(new Point(-173, 50, 0));
  key.addPoint(new Point(-185, 50, 0));
  key.addPoint(new Point(-185, 45, 0));
  key.addPoint(new Point(-180, 45, 0));
  key.addPoint(new Point(-180, 48, 0));
  key.addPoint(new Point(-173, 48, 0));
  key.addPoint(new Point(-173, 50, 0));
  game.addObject(key);
  return key;
}
