// Prepare Canvas
let canvas = document.getElementById('canvas');
let height = canvas.clientHeight;
let width = canvas.clientWidth;
let ctx = canvas.getContext("2d");
let pixelFactor = window.devicePixelRatio;
canvas.setAttribute("height", height * pixelFactor);
canvas.setAttribute("width", width * pixelFactor);
ctx.scale(pixelFactor, pixelFactor);
ctx.lineCap = 'round';
let previewCanvas = document.getElementById("previewCanvas");
let previewCtx = previewCanvas.getContext("2d");

let originalPixelData = [];
let pixelData = [];

function triggerFileInput() {
  const fileInput = document.getElementById('fileInput');
  fileInput.click();
}

function processImage() {
  originalPixelData = [];
  log("Processing Image...");
  setTimeout(() => {
    const fileInput = document.getElementById('fileInput');
    // const imageRes = 1800;
    const imageRes = 1500;

    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
          let startX = 0;
          let startY = 0;
          let sideLength = Math.min(img.width, img.height);

          if (img.width > img.height) {
            startX = (img.width - sideLength) / 2;
          } else {
            startY = (img.height - sideLength) / 2;
          }

          const tempCanvas = document.createElement("canvas");
          const tempCtx = tempCanvas.getContext("2d");
          tempCanvas.width = imageRes;
          tempCanvas.height = imageRes;
          tempCtx.drawImage(img, startX, startY, sideLength, sideLength, 0, 0, imageRes, imageRes);

          const imageData = tempCtx.getImageData(0, 0, imageRes, imageRes);
          const data = imageData.data;

          for (let y = 0; y < imageRes; y++) {
            const row = [];
            for (let x = 0; x < imageRes; x++) {
              const index = (y * imageRes + x) * 4;
              const avg = (data[index] + data[index + 1] + data[index + 2]) / 3;
              row.push(avg);
              data[index] = avg;
              data[index + 1] = avg;
              data[index + 2] = avg;
            }
            originalPixelData.push(row);
          }
          drawFromBrightnessArray(originalPixelData);
        }
        img.src = event.target.result;
      }
      reader.readAsDataURL(file);
    }
    log("Done");
    document.getElementById("calcButton").style.display = "block";
  }, 500);
}

function drawFromBrightnessArray(brightnessArray) {
  for (let y = 0; y < brightnessArray.length; y++) {
    for (let x = 0; x < brightnessArray[y].length; x++) {
      const brightness = brightnessArray[y][x];
      previewCtx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
      let posX = Math.round(100*x/brightnessArray[0].length);
      let posY = Math.round(100*y/brightnessArray.length);
      previewCtx.fillRect(posX, posY, 1, 1);
    }
  }
}




// Eigentlicher Code
let numOfPins = 240;
let density = 0;
let isCalculating = false;
let pinSequence = [];

let plateRadius = Math.min(Math.min(width, height)*0.5*0.9, 500);
let centerX = width/2;
let centerY = height/2;

drawPlate();
function drawPlate() {
  ctx.fillStyle = "#2196f3";
  for (let i = 0; i < numOfPins; i++) {
    let x = plateRadius * Math.cos(i/numOfPins*2*Math.PI);
    let y = plateRadius * Math.sin(i/numOfPins*2*Math.PI);
    ctx.beginPath();
    ctx.arc(centerX + x, centerY + y, 2, 0, Math.PI*2);
    ctx.fill();
  }
}

function getImagePathBrightness(fromPin, toPin, clear = false) {
  let radius = Math.floor((pixelData.length-1)/2);
  let fromX = radius + Math.floor(radius * Math.cos(fromPin/numOfPins*2*Math.PI));
  let fromY = radius + Math.floor(radius * Math.sin(fromPin/numOfPins*2*Math.PI));
  let toX = radius + Math.floor(radius * Math.cos(toPin/numOfPins*2*Math.PI));
  let toY = radius + Math.floor(radius * Math.sin(toPin/numOfPins*2*Math.PI));

  let dx = Math.abs(toX - fromX);
  let dy = Math.abs(toY - fromY);
  let sx = (fromX < toX) ? 1 : -1;
  let sy = (fromY < toY) ? 1 : -1;
  let err = dx - dy;
  let brightnessSum = 0;
  let lenCounter = 0;

  while(true) {
    lenCounter++;
    brightnessSum += pixelData[fromY][fromX];
    // if (clear) pixelData[fromY][fromX] = Math.min(pixelData[fromY][fromX]+90, 255);
    if (clear) pixelData[fromY][fromX] = Math.min(pixelData[fromY][fromX]+255*threadOpacity, 255);
    if ((fromX === toX) && (fromY === toY)) break;
    let e2 = 2 * err;
    if (e2 > -dy) { err -= dy; fromX += sx; }
    if (e2 < dx) { err += dx; fromY += sy; }
  }
  return brightnessSum/lenCounter;
}



function drawLine(fromPin, toPin) {
  let fromX = centerX + plateRadius * Math.cos(fromPin/numOfPins*2*Math.PI);
  let fromY = centerY + plateRadius * Math.sin(fromPin/numOfPins*2*Math.PI);
  let toX = centerX + plateRadius * Math.cos(toPin/numOfPins*2*Math.PI);
  let toY = centerY + plateRadius * Math.sin(toPin/numOfPins*2*Math.PI);
  ctx.strokeStyle = `rgba(25, 28, 34, ${ threadOpacity })`;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
  drawPlate();
}

function calcPath() {
  if (isCalculating) {
    document.getElementById("calcButton").innerText = "CALCULATE";
  } else {
    document.getElementById("calcButton").innerText = "STOP";
    ctx.clearRect(0, 0, width, height);
    numOfPins = parseInt(document.getElementById("inputNumberOfPins").value);
    threadOpacity = parseFloat(document.getElementById("inputThreadOpacity").value);
    pixelData = originalPixelData.deepCopy();
    let startPin = 0;
    pinSequence = [startPin];
    calcPathLoop(startPin);
  }
  isCalculating = !isCalculating;
}

function calcPathLoop(currentPin) {
  let minBrightness = Infinity;
  let bestPin = 0;
  for (let i = 0; i < numOfPins; i++) {
    if (i == currentPin) continue;
    let brightness = getImagePathBrightness(currentPin, i);
    if (brightness < minBrightness) {
      minBrightness = brightness;
      bestPin = i;
    }
  }
  if (minBrightness < 255*0.9) {
    getImagePathBrightness(currentPin, bestPin, true);
    drawLine(currentPin, bestPin);
    pinSequence.push(bestPin);
  } else {
    isCalculating = false;
  }

  log("To Pin " + bestPin);

  setTimeout(() => {
    if (isCalculating) {
      calcPathLoop(bestPin);
    } else {
      sendToServer();
      console.log(pinSequence);
      log("Done");
      isCalculating = true;
      calcPath();
    }
  }, 1);
}

function sendToServer() {
  var formData = new FormData();
  formData.append("data", JSON.stringify(pinSequence));
  fetch('http://192.168.1.1/postData', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.error('Error:', error));
}



function log(msg) {
  document.getElementById("logText").innerText = msg;
}

Array.prototype.deepCopy = function() {
  return this.map(elem =>
    Array.isArray(elem) ? elem.deepCopy() : elem
  );
}
