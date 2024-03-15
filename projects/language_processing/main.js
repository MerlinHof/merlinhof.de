function log(msg) {
  document.getElementById("statusText").innerHTML = msg;
}

function startTraining() {
  let data = getTrainingData();
}

// let brain = new Brain(1000, 500);
let brain = new Brain(10000, 30);

let inputs = [0.1, 0.8, -0.5];
setInterval(() => {
  log(brain.getOutputs(3).map(x => Math.round(x*100)/100));
  brain.tick(inputs);
}, 500);
