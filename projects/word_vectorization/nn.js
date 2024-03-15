class NeuralNetwork {
  constructor(shape) {
    this.shape = shape;
    this.weights = [];
    this.weightCount = 0;
    for (let i = 0; i < shape.length-1; i++) {
      this.weightCount += shape[i]*shape[i+1] + shape[i+1];
    }
    this.randomizeWeights();
  }

  // Randomizes / Initializes the weights (-1 to +1)
  randomizeWeights() {
    for (let i = 0; i < this.weightCount; i++) {
      this.weights[i] = 1-Math.random()*2;
    }
  }

  // Predicts the output based on the given inputs
  predict(inputs) {
    let weightIndex = 0;
    let outputs = [...inputs];
    for (let i = 0; i < this.shape.length-1; i++) {
      let tmp = [];
      for (let j = 0; j < this.shape[i+1]; j++) {
        let weightedSum = 0;
        for (let k = 0; k < this.shape[i]; k++) {
          weightedSum += outputs[k] * this.weights[weightIndex];
          weightIndex++;
        }
        tmp.push(this.activate(weightedSum + this.weights[weightIndex]));
        weightIndex++;
      }
      outputs = [...tmp];
    }
    return outputs;
  }

  // Activation Function
  activate(x) {
    return (1 / (1 + Math.pow(Math.E, -x)));
  }

  // Mutates some weights by random values
  mutate(baseProb, deviation) {
    if (deviation == undefined) deviation = 0.01;
    let probability = (baseProb-deviation) + 2*Math.random()*deviation;
    let extent = 0.2+Math.random()*0.5;
    for (let i = 0; i < this.weightCount; i++) {
      if (Math.random() < probability) this.weights[i] += extent-Math.random()*2*extent;
      if (Math.random() < probability/6) this.weights[i] = 2-(4*Math.random());
    }
  }
}


Array.prototype.clone = function() {
  let res = [];
  for (let i = 0; i < this.length; i++) {
    if (Array.isArray(this[i])) {
      res.push(this[i].clone());
    } else {
      res.push(this[i]);
    }
  }
  return res;
}
