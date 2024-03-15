let game;
let inventory;

function startGame() {
  inventory = new Inventory(document.getElementById("inventoryContainer"));
  game = new GameEngine(document.getElementById("canvasContainer"));
  game.setCameraPosition(new Point(0, -50, 15));
  game.player.rotateCameraWithMouse = true;
  game.lockPointer(true);

  // Start the Graphics Engine
  game.start();

  loadScene0(game, inventory);
}
