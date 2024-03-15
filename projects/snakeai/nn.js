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

  // Randomizes / Initializes the weights (-2 to +2)
  randomizeWeights() {
    for (let i = 0; i < this.weightCount; i++) {
      this.weights[i] = 2-(4*Math.random());
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
  mutate(probability) {
    if (probability == undefined) probability = 0.01;
    let maxDelta = 0.5;
    for (let i = 0; i < this.weightCount; i++) {
      this.weights[i] += Math.pow(probability, 2)*maxDelta*(1-Math.random()*2)/Math.random();
      if (Math.random() < probability) this.weights[i] += (maxDelta-Math.random()*2*maxDelta);
      if (Math.random() < probability/10) this.weights[i] = 2-Math.random()*4;
    }
  }

  clone() {
    let copy = new NeuralNetwork(this.shape);
    copy.weights = [...this.weights];
    return copy;
  }

}
