class GameEngine {
  static rotateAnimation = 0;
  static translateAnimation = 1;
  static colorAnimation = 2;
  #graphics;
  #hoverEvents;
  #clickEvents;
  constructor(container) {
    this.#graphics = new GraphicsEngine(container);
    this.#hoverEvents = [];
    this.#clickEvents = [];
    this.player = new Player(this);

    // Click & Hover Handlers
    this.addFrameFunction(() => {
      for (let hoverEvent of this.#hoverEvents) {
        let obj = hoverEvent.object;
        let dist = obj.projectedDistanceTo2dPoint(this.#graphics, new Point(this.#graphics.camera.screenWidth/2, this.#graphics.camera.screenHeight/2));
        let inside = dist<15;
        if (obj.inside != inside) {
          obj.inside = inside;
          hoverEvent.callback(inside);
        }
      }
    });
    document.body.addEventListener("mousedown", event => {
      for (let clickEvent of this.#clickEvents) {
        let obj = clickEvent.object;
        let dist = obj.projectedDistanceTo2dPoint(this.#graphics, new Point(this.#graphics.camera.screenWidth/2, this.#graphics.camera.screenHeight/2));
        if (dist < 15) {
          clickEvent.callback();
        }
      }
      document.getElementById("centerPointer").style.transform = "scale(0.6)";
    });
    document.body.addEventListener("mouseup", event => {
      document.getElementById("centerPointer").style.transform = "scale(1)";
    });
  }

  // Locks or unlocks the Mouse Pointer
  lockPointer(lock=true) {
    let canvas = this.#graphics.canvas;
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
    if (lock) {
      canvas.requestPointerLock();
    } else {
      canvas.exitPointerLock();
    }
  }

  // General Methods for easier interface and allowing to hide the graphics object from the user
  getCamera() {
    return this.#graphics.camera;
  }
  setCameraPosition(newPos) {
    this.#graphics.camera.position = newPos;
  }
  getCameraPosition() {
    return this.#graphics.camera.position;
  }
  setCameraRotation(vector) {
    this.#graphics.camera.rotation = vector;
  }
  getCameraRotation() {
    return this.#graphics.camera.rotation;
  }
  addObject(object) {
    this.#graphics.scene.add(object);
  }
  removeObject(object) {
    this.#graphics.scene.remove(object);
  }
  start() {
    this.#graphics.start();
  }
  stop() {
    this.#graphics.stop();
  }
  addFrameFunction(func) {
    return this.#graphics.addFrameFunction(func);
  }
  removeFrameFunction(id) {
    this.#graphics.removeFrameFunction(id);
  }


  // Animatis a value from val to to in a specified duration
  #animateValue(val=0, to=0, duration=0, callback=()=>{}, doneCallback=()=>{}) {
    let progress = 0;
    let initial = val;
    let delta = to-val;
    let id = this.addFrameFunction(() => {
      progress += 0.15;
      val = initial+delta*(1+Math.cos(Math.PI+progress));
      callback(val);
      if (progress >= Math.PI) {
        this.removeFrameFunction(id);
        doneCallback();
      }
    });
  }

  // Event Handlers for Hovering
  addHoverEvent(obj, callback) {
    this.#hoverEvents.push({
      object: obj,
      callback: callback,
      inside: false
    });
  }

  // Event Handlers for Clicking
  addClickEvent(obj, callback) {
    this.#clickEvents.push({
      object: obj,
      callback: callback
    });
  }

  // Animations
  animate(type, object, center, to, duration, doneCallback=()=>{}) {
    if (type == GameEngine.rotateAnimation) {
      object.rotationCenter = center;
      let xr = object.rotation.x;
      let yr = object.rotation.y;
      let zr = object.rotation.z;
      this.#animateValue(xr, to.x, duration, val => {
        object.rotation.x = val;
      }, doneCallback);
      this.#animateValue(yr, to.y, duration, val => {
        object.rotation.y = val;
      }, doneCallback);
      this.#animateValue(zr, to.z, duration, val => {
        object.rotation.z = val;
      }, doneCallback);
    }
    if (type == GameEngine.translateAnimation) {
      let xp = object.position.x;
      let yp = object.position.y;
      let zp = object.position.z;
      this.#animateValue(xp, to.x, duration, val => {
        object.position.x = val;
      }, doneCallback);
      this.#animateValue(yp, to.y, duration, val => {
        object.position.y = val;
      }, doneCallback);
      this.#animateValue(zp, to.z, duration, val => {
        object.position.z = val;
      }, doneCallback);
    }
    if (type == GameEngine.colorAnimation) {
      let red = object.lineColor.red;
      let green = object.lineColor.green;
      let blue = object.lineColor.blue;
      let alpha = object.lineColor.alpha;
      this.#animateValue(red, to.red, duration, val => {
        object.lineColor.red = val;
      }, doneCallback);
      this.#animateValue(green, to.green, duration, val => {
        object.lineColor.green = val;
      }, doneCallback);
      this.#animateValue(blue, to.blue, duration, val => {
        object.lineColor.blue = val;
      }, doneCallback);
      this.#animateValue(alpha, to.alpha, duration, val => {
        object.lineColor.alpha = val;
      }, doneCallback);
    }
  }
}





class Player {
  #moveTimeout;
  constructor(game) {
    this.game = game;
    this.rotateCameraWithMouse = false;
    this.mouseDx = 0;
    this.mouseDy = 0;
    this.#moveTimeout = setTimeout(()=>{},0);
    let keyDown = [0, 0, 0, 0];

    // Mouse Control
    document.body.addEventListener("mousemove", event => {
      this.mouseDx -= event.movementX/600;
      this.mouseDy -= event.movementY/600;
      if (!this.rotateCameraWithMouse) return;
      if (this.mouseDy >= Math.PI/2) this.mouseDy = Math.PI/2;
      if (this.mouseDy <= -Math.PI/2) this.mouseDy = -Math.PI/2;
      this.game.setCameraRotation(new Vector(this.mouseDy, 0, this.mouseDx));
    });

    // Keyboard Control
    document.body.addEventListener("keydown", event => {
      if (event.isComposing || event.keyCode === 229) return;
      let camera = this.game.getCamera();
      let camPos = camera.position;
      let camRot = camera.rotation;
      let targetPoint;

      // Move Forwards
      if (event.keyCode == 38 || event.keyCode == 87) {
        let prev = keyDown[0];
        keyDown[0] = true;
        if (prev) return;
        let id = this.game.addFrameFunction(() => {
          if (!keyDown[0]) this.game.removeFrameFunction(id);
          let dist = 1;
          let dx = dist*Math.cos(Math.PI/2+camera.rotation.z);
          let dy = dist*Math.sin(Math.PI/2-camera.rotation.z);
          let newCamPos = new Point(camera.position.x+dx, camera.position.y+dy, camera.position.z);
          this.game.setCameraPosition(newCamPos);
        });
      }

      // Move Backwards
      if (event.keyCode == 40 || event.keyCode == 83) {
        let prev = keyDown[1];
        keyDown[1] = true;
        if (prev) return;
        let id = this.game.addFrameFunction(() => {
          if (!keyDown[1]) this.game.removeFrameFunction(id);
          let dist = 1;
          let dx = dist*Math.cos(Math.PI/2+camera.rotation.z);
          let dy = dist*Math.sin(Math.PI/2-camera.rotation.z);
          let newCamPos = new Point(camera.position.x-dx, camera.position.y-dy, camera.position.z);
          this.game.setCameraPosition(newCamPos);
        });
      }

      // Move Left
      if (event.keyCode == 37 || event.keyCode == 65) {
        let prev = keyDown[2];
        keyDown[2] = true;
        if (prev) return;
        let id = this.game.addFrameFunction(() => {
          if (!keyDown[2]) this.game.removeFrameFunction(id);
          let dist = 0.7;
          let dx = dist*Math.cos(Math.PI+camera.rotation.z);
          let dy = dist*Math.sin(Math.PI+camera.rotation.z);
          let newCamPos = new Point(camera.position.x+dx, camera.position.y+dy, camera.position.z);
          this.game.setCameraPosition(newCamPos);
        });
      }

      // Move Right
      if (event.keyCode == 39 || event.keyCode == 68) {
        let prev = keyDown[3];
        keyDown[3] = true;
        if (prev) return;
        let id = this.game.addFrameFunction(() => {
          if (!keyDown[3]) this.game.removeFrameFunction(id);
          let dist = 0.7;
          let dx = dist*Math.cos(camera.rotation.z);
          let dy = dist*Math.sin(camera.rotation.z);
          let newCamPos = new Point(camera.position.x+dx, camera.position.y+dy, camera.position.z);
          this.game.setCameraPosition(newCamPos);
        });
      }

      // Jump (Space Bar)
      if (event.keyCode == 32) {
        targetPoint = new Point(camPos.x, camPos.y, camPos.z+7);
        this.game.animate(GameEngine.translateAnimation, camera, null, targetPoint, 100, () => {
          targetPoint = new Point(camPos.x, camPos.y, camPos.z-7);
          this.game.animate(GameEngine.translateAnimation, camera, null, targetPoint, 100);
        });
      }
    });


    // Keyboard Control Up
    document.body.addEventListener("keyup", event => {
      if (event.isComposing || event.keyCode === 229) return;
      let camera = this.game.getCamera();

      if (event.keyCode == 38 || event.keyCode == 87) {
        keyDown[0] = false;
      }
      if (event.keyCode == 40 || event.keyCode == 83) {
        keyDown[1] = false;
      }
      if (event.keyCode == 37 || event.keyCode == 65) {
        keyDown[2] = false;
      }
      if (event.keyCode == 39 || event.keyCode == 68) {
        keyDown[3] = false;
      }
    });
  }
}
