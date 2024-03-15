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

class Items {
   static Sand = 0;
   static Stone = 1;
   static Water = 2;
   static Erasor = 3;
}

// Global Variables & Hyperparameters
let particleSize = 3;
let grid = [];
let mouseDown = false;
let selectedItem = Items.Sand;

document.getElementById("inventoryItemSand").addEventListener("click", () => {
   selectedItem = Items.Sand;
   selectInventoryItem(document.getElementById("inventoryItemSand"));
});
document.getElementById("inventoryItemStone").addEventListener("click", () => {
   selectedItem = Items.Stone;
   selectInventoryItem(document.getElementById("inventoryItemStone"));
});
document.getElementById("inventoryItemWater").addEventListener("click", () => {
   selectedItem = Items.Water;
   selectInventoryItem(document.getElementById("inventoryItemWater"));
});
document.getElementById("inventoryItemErasor").addEventListener("click", () => {
   selectedItem = Items.Erasor;
   selectInventoryItem(document.getElementById("inventoryItemErasor"));
});

function selectInventoryItem(item) {
   for (el of document.getElementsByClassName("selected")) {
      el.classList.remove("selected");
   }
   item.classList.add("selected");
}

// Mouse / Touch Events
document.body.addEventListener("mousedown", () => {
   mouseDown = true;
});
document.body.addEventListener("mouseup", () => {
   mouseDown = false;
});
document.body.addEventListener("mousemove", (event) => {
   inputMoved(event);
});

document.body.addEventListener("touchstart", () => {
   mouseDown = true;
});
document.body.addEventListener("touchend", () => {
   mouseDown = false;
});
document.body.addEventListener("touchcancel", () => {
   mouseDown = false;
});
document.body.addEventListener("touchmove", (event) => {
   inputMoved(event);
});

function inputMoved(event) {
   if (mouseDown) {
      if (selectedItem == Items.Sand) {
         let rect = canvas.getBoundingClientRect();
         let x = event.clientX - rect.left;
         let y = event.clientY - rect.top;
         let gridX = Math.floor(x / particleSize);
         let gridY = Math.floor(y / particleSize);
         let radius = 7;
         for (let i = -radius; i <= radius; i++) {
            for (let j = -radius; j <= radius; j++) {
               if (Math.random() < 0.8) continue;
               if (i * i + j * j <= radius * radius) {
                  let fillX = gridX + i;
                  let fillY = gridY + j;
                  if (fillX >= 0 && fillX < grid.length && fillY >= 0 && fillY < grid[0].length) {
                     grid[fillX][fillY] = 0.5 + Math.random() * 0.5;
                  }
               }
            }
         }
         return;
      }

      let rect = canvas.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;
      let gridX = Math.floor(x / particleSize);
      let gridY = Math.floor(y / particleSize);
      let radius = 3;
      for (let i = -radius; i <= radius; i++) {
         for (let j = -radius; j <= radius; j++) {
            if (i * i + j * j <= radius * radius) {
               let fillX = gridX + i;
               let fillY = gridY + j;
               if (fillX >= 0 && fillX < grid.length && fillY >= 0 && fillY < grid[0].length) {
                  let val = selectedItem == Items.Erasor ? 0 : selectedItem == Items.Stone ? 2 : -1;
                  grid[fillX][fillY] = val;
               }
            }
         }
      }
   }
}

// Prepares Grid
function prepareGrid() {
   for (let x = 0; x < Math.floor(width / particleSize); x++) {
      grid.push([]);
      for (let y = 0; y < Math.floor(height / particleSize); y++) {
         grid[x].push(0);
      }
   }
}

// Draw Grid
function drawGrid() {
   ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
   ctx.fillRect(0, 0, width, height);
   for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
         let val = grid[x][y];
         if (val != 0) {
            if (val == 2) {
               ctx.fillStyle = `rgb(20, 40, 60)`;
            } else if (val == -1) {
               ctx.fillStyle = `rgb(20, 40, 220)`;
            } else {
               ctx.fillStyle = `rgb(${200 * val}, ${170 * val}, 20)`;
            }
            ctx.fillRect(x * particleSize, y * particleSize, particleSize, particleSize);
         }
      }
   }
}

// Simulation
function simulateStep() {
   for (let x = 0; x < grid.length; x++) {
      for (let y = grid[x].length - 1; y >= 0; y--) {
         let val = grid[x][y];
         if (val != 0 && val != 2) {
            if (grid[x][y + 1] <= 0) {
               // Fall Elements
               grid[x][y] = 0;
               grid[x][y + 1] = val;
            } else if (val != -1) {
               // Fall Left
               if (grid[x - 1]?.[y + 1] === 0 && Math.random() < 0.1) {
                  grid[x][y] = 0;
                  grid[x - 1][y + 1] = val;
               }
               // Fall Right
               if (grid[x + 1]?.[y + 1] == 0 && Math.random() < 0.1) {
                  grid[x][y] = 0;
                  grid[x + 1][y + 1] = val;
               }
            } else {
               // Water Move Left or Right
               let dist = Math.floor(Math.random() * 5);
               if (grid[x - dist]?.[y] == 0 && Math.random() < 0.2) {
                  grid[x][y] = 0;
                  grid[x - dist][y] = val;
               }
               if (grid[x + dist]?.[y] == 0 && Math.random() < 0.2) {
                  grid[x][y] = 0;
                  grid[x + dist][y] = val;
               }
            }
         }
      }
   }
}

function startSimulation() {
   prepareGrid();
   setInterval(() => {
      drawGrid();
      simulateStep();
   }, 1000 / 60);
}

startSimulation();
