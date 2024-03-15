// Variables
let gridsize = 5;
let backgroundColor = "rgba(10, 20, 40, 0.4)";
let cellColor = "#ffffff";

// Color style
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
   backgroundColor = "rgba(255, 255, 255, 0.4)";
   cellColor = "#000000";
}

// Create and intialize 2D array
let elements = new Array(width);
for (var i = 0; i < elements.length; i++) {
   elements[i] = new Array(height);
}
for (var i = 0; i < width; i++) {
   for (var j = 0; j < height; j++) {
      elements[i][j] = random(10) == 0 ? true : false;
   }
}

// Save survival state temporary
let surviveArray = new Array(width);
for (var i = 0; i < elements.length; i++) {
   surviveArray[i] = new Array(height);
}
for (var i = 0; i < width; i++) {
   for (var j = 0; j < height; j++) {
      surviveArray[i][j] = false;
   }
}

// Canvas
ctx.lineWidth = 2;
ctx.strokeStyle = "#202020";
ctx.fillStyle = cellColor;

function start() {
   document.getElementById("startbutton").style.transform = "scale(0.0, 0.0)";
   setInterval(loop, 30);
}

// Loop
function loop() {
   // ctx.clearRect(0, 0, width, height);
   ctx.fillStyle = backgroundColor;
   ctx.fillRect(0, 0, width, height);

   // Draw alive cells
   ctx.fillStyle = cellColor;
   for (let y = 0; y < height; y += gridsize) {
      for (let x = 0; x < width; x += gridsize) {
         if (elements[x / gridsize][y / gridsize]) {
            ctx.fillRect(x, y, gridsize - 1, gridsize - 1);
         }
      }
   }

   // Decide for every cell, if it survives or not
   for (let y = 0; y < height; y += gridsize) {
      for (let x = 0; x < width; x += gridsize) {
         let survives = false;

         // 1. Eine tote Zelle mit genau drei lebenden Nachbarn wird in der Folgegeneration neu geboren.
         if (!elements[x / gridsize][y / gridsize] && neighbourCount(x / gridsize, y / gridsize) == 3) {
            survives = true;
         }
         // 2. Eine lebende Zelle mit zwei oder drei lebenden Nachbarn bleibt in der Folgegeneration am Leben.
         else if ((elements[x / gridsize][y / gridsize] && neighbourCount(x / gridsize, y / gridsize) == 2) || neighbourCount(x / gridsize, y / gridsize) == 3) {
            survives = true;
         }
         // 3. Lebende Zellen mit weniger als zwei lebenden Nachbarn sterben in der Folgegeneration an Einsamkeit.
         else if (elements[x / gridsize][y / gridsize] && neighbourCount(x / gridsize, y / gridsize) < 2) {
            survives = false;
         }
         // 4. Lebende Zellen mit mehr als drei lebenden Nachbarn sterben in der Folgegeneration an Überbevölkerung.
         else if (elements[x / gridsize][y / gridsize] && neighbourCount(x / gridsize, y / gridsize) > 3) {
            survives = false;
         }
         // Save
         surviveArray[x / gridsize][y / gridsize] = survives;
      }
   }

   // Copy 'work' array to 'draw' array
   for (let y = 0; y < height; y += gridsize) {
      for (let x = 0; x < width; x += gridsize) {
         elements[x / gridsize][y / gridsize] = surviveArray[x / gridsize][y / gridsize];
      }
   }
}

function neighbourCount(x, y) {
   let nbc = 0;
   for (let yy = -1; yy <= 1; yy++) {
      for (let xx = -1; xx <= 1; xx++) {
         if (x + xx > 0 && y + yy > 0 && x + xx < elements.length && y + yy < elements[0].length) {
            if (elements[x + xx][y + yy]) {
               nbc++;
            }
         }
      }
   }
   if (elements[x][y]) {
      nbc--;
   }
   if (nbc < 0) nbc = 0;
   return nbc;
}

// Mouse Events
let mouseIsDown = false;
document.body.addEventListener(
   "mousedown",
   () => {
      mouseIsDown = true;
   },
   true,
);
document.body.addEventListener(
   "mouseup",
   () => {
      mouseIsDown = false;
   },
   true,
);
onmousemove = function (e) {
   draw(e.clientX, e.clientY);
};

function draw(x, y) {
   if (mouseIsDown) {
      for (let dx = -2; dx <= 2; dx++) {
         for (let dy = -2; dy <= 2; dy++) {
            elements[Math.floor((x + dx) / gridsize)][Math.floor((y + dy) / gridsize)] = true;
            surviveArray[Math.floor((x + dx) / gridsize)][Math.floor((y + dy) / gridsize)] = true;
         }
      }
   }
}
