// Prepare Canvas
let canvas = document.getElementById("canvas");
let height = canvas.clientHeight;
let width = canvas.clientWidth;
let ctx = canvas.getContext("2d");
let pixelFactor = window.devicePixelRatio;
canvas.setAttribute("height", height * pixelFactor);
canvas.setAttribute("width", width * pixelFactor);
ctx.scale(pixelFactor, pixelFactor);
ctx.lineCap = "round";

// Variables
const particleCount = 1200;
let particles = [];
const senseDistance = 3;

// Particle
class Particle {
  constructor() {
    this.x = Math.random()*width;
    this.y = Math.random()*height;
    this.speedX = 1*(Math.random()-0.5);
    this.speedY = 1*(Math.random()-0.5);
  }
  update() {

    // var pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    // // Sense Front
    // let senseFrontX = Math.round(this.x + senseDistance*this.speedX);
    // let senseFrontY = Math.round(this.y + senseDistance*this.speedY);
    // let frontBrightness = pixelData[4*(senseFrontY*canvas.width+senseFrontX)];
    // // Sense Left
    // let senseLeftX = Math.round(this.x + senseDistance*this.speedX) - 3*this.speedY;
    // let senseLeftY = Math.round(this.y + senseDistance*this.speedY) - 3*this.speedX;
    // let leftBrightness = pixelData[4*(senseLeftY*canvas.width+senseLeftX)];
    // // Sense Right
    // let senseRightX = Math.round(this.x + senseDistance*this.speedX) + 3*this.speedY;
    // let senseRightY = Math.round(this.y + senseDistance*this.speedY) + 3*this.speedX;
    // let rightBrightness = pixelData[4*(senseRightY*canvas.width+senseRightX)];
    //
    // if (leftBrightness > frontBrightness && leftBrightness > rightBrightness) {
    //   this.speedX += (this.speedX/this.speedX) * 3;
    // }
    // if (rightBrightness > frontBrightness && rightBrightness > leftBrightness) {
    //   this.speedX -= (this.speedX/this.speedX) * 3;
    // }


    // Update
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > width) {
      this.x = width;
      this.speedX *= -1;
    }
    if (this.x < 0) {
      this.x = 0;
      this.speedX *= -1;
    }
    if (this.y > height) {
      this.y = height;
      this.speedY *= -1;
    }
    if (this.y < 0) {
      this.y = 0;
      this.speedY *= -1;
    }

  }
  draw() {
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(this.x, this.y, 1, 1);
  }
}

// Start the simulation
function start() {
  document.getElementById("startbutton").style.transform = "scale(0.0, 0.0)";
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
    particles[i].draw();
  }
  setInterval(loop, 1000/60);
}

// Simulation Loop
function loop() {

  // Dimming
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var pixelData = imageData.data;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      let pixelIndex = 4 * (y * canvas.width + x);
      let brightness = (pixelData[pixelIndex] + pixelData[pixelIndex + 1] + pixelData[pixelIndex + 2]) / 3;
      let newBrightness = brightness-30;
      if (newBrightness < 0) newBrightness = 0;
      imageData.data[pixelIndex] = newBrightness;
      imageData.data[pixelIndex + 1] = newBrightness;
      imageData.data[pixelIndex + 2] = newBrightness;
    }
  }
  ctx.putImageData(imageData, 0, 0);

  // Blurring
  blurCanvas(1);

  // Updating
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
}




function blurCanvas(radius) {
  StackBlur.canvasRGBA(canvas, 0, 0, canvas.width, canvas.height, radius);
}
