let words = [];
let autoencoder;

function log(msg) {
  document.getElementById("statusText").innerHTML = msg;
}

function start() {
  log("Fetching Words...");
  fetch("wordlist.txt") // Word List from: https://www.mit.edu/~ecprice/wordlist.10000    AND     https://www.ef-australia.com.au/english-resources/english-vocabulary/top-3000-words/
  .then(res => res.text())
  .then(res => {
    words = res.split("\n");
    log("Fetched " + words.length + " Words");
    setTimeout(() => {
      startTraining();
    }, 100);
  });
}





function startTraining() {
  let generation = [];
  let wordCount = words.length;
  for (let i = 0; i < 30; i++) {
    let autoencoder = new NeuralNetwork([wordCount, 700, 100, 700, wordCount]);
    generation.push(autoencoder);
  }
  train(generation, 0);
}



function train(generation, generationCount) {
  let bestNetIndex = testGen(generation);
  log("Gen " + generationCount + " Done.");

  let bestWeights = generation[bestNetIndex].weights.clone();
  for (let i = 0; i < generation.length; i++) {
    if (i == bestNetIndex) continue;
    generation[i].weights = bestWeights.clone();
    generation[i].mutate(0.2, 0.2);
  }
  log("Evaluating Gen " + ++generationCount);
  setTimeout(() => {
    train(generation, generationCount);
  }, 100);
}



function testGen(generation) {
  let bestError = Infinity;
  let bestNetIndex = 0;
  for (let i = 0; i < generation.length; i++) {
    let error = testNet(generation[i]);
    if (error < bestError) {
      bestError = error;
      bestNetIndex = i;
    }
    console.log(i + ": " + Math.round(error) + " (" + Math.round(bestError) + ")");
  }
  return bestNetIndex;
}


function testNet(autoencoder) {
  let testWordCount = 80;
  let totalError = 0;
  const baseInputVector = [];
  for (let j = 0; j < words.length; j++) {
    baseInputVector.push(0);
  }

  for (let i = 0; i < testWordCount; i++) {
    let wordIndex = Math.floor(Math.random()*words.length);
    let inputVector = [...baseInputVector];
    inputVector[wordIndex] = 1;

    let outputVector = autoencoder.predict(inputVector);
    for (let j = 0; j < inputVector.length; j++) {
      totalError += Math.pow(inputVector[j]-outputVector[j], 2);
    }
  }
  return totalError;
}
