// Made by Merlin Hof, 2021 🇺🇦
// Revision 2 (August 2022)

class NeuralNetwork {
  constructor(shape) {
    this.shape = shape;
    this.learningRate = 0.01;
    this.epochs = 10;
    this.progress = 0;
    this.weights = [];
    this.weightCount = 0;
    for (let i = 0; i < shape.length-1; i++) {
      this.weightCount += shape[i]*shape[i+1] + shape[i+1];
    }
    this.initializeWeights();
    this.neuronInputs = [];
    this.neuronOutputs = [];
    this.deltas = [];
    for (let i = 0; i < this.shape.length; i++) {
      this.neuronInputs.push([]);
      this.neuronOutputs.push([]);
      this.deltas.push([]);
      for (let j = 0; j < this.shape[i]; j++) {
        this.neuronInputs[i].push(0);
        this.neuronOutputs[i].push(0);
        this.deltas[i].push(0);
      }
    }
  }

  // Initializes The Weights (-1 to +1)
  initializeWeights() {
    for (let i = 0; i < this.shape.length-1; i++) {
      this.weights.push([]);
      for (let j = 0; j < this.shape[i]+1; j++) {
        this.weights[i].push([]);
        for (let k = 0; k < this.shape[i+1]; k++) {
          this.weights[i][j].push(1-(2*Math.random()));
        }
      }
    }
  }

  // Mutates The Network Randomly
  mutate(probability) {
    if (probability == undefined) probability = 0.01;
    let maxDelta = 0.5;
    for (let layer = 0; layer < this.shape.length-1; layer++) {
      for (let node = 0; node < this.shape[layer]+1; node++) {
        for (let k = 0; k < this.shape[layer+1]; k++) {
          this.weights[layer][node][k] += Math.pow(probability, 2)*maxDelta*(1-Math.random()*2)/Math.random();
          if (Math.random() < probability) this.weights[layer][node][k] += (maxDelta-Math.random()*2*maxDelta);
          if (Math.random() < probability/10) this.weights[layer][node][k] = 2-Math.random()*4;
        }
      }
    }
  }

  // Predicts The Output Based On The Given Inputs
  predict(inputs, startLayer = 0) {
    if (inputs.length != this.shape[startLayer]) {
      console.error("Dimension Error: Number of inputs does not match the amount of neurons");
      return;
    }
    this.neuronInputs[startLayer] = [...inputs];
    this.neuronOutputs[startLayer] = [...inputs];
    for (let layer = startLayer; layer < this.shape.length-1; layer++) {
      for (let node = 0; node < this.shape[layer+1]; node++) {
        let sum = 0;
        for (let k = 0; k < this.shape[layer]; k++) {
          sum += this.neuronOutputs[layer][k] * this.weights[layer][k][node];
        }
        let bias = this.weights[layer][this.shape[layer]][node];
        let neuronInput = sum + bias;
        this.neuronInputs[layer+1][node] = neuronInput;
        this.neuronOutputs[layer+1][node] = this.activate(neuronInput);
      }
    }
    return this.neuronOutputs[this.shape.length-1];
  }

  // Activation Function (Sigmoid)
  activate(x) {
    return 1/(1+Math.pow(Math.E, -x));
  }

  // Activation Function Derivative
  activationDerivative(x) {
    return this.activate(x) * (1 - this.activate(x));
  }

  // Learns a Single Example Using Backpropagation (Gradient Descent)
  learn(inputs, solution) {
    this.predict(inputs);
    for (let layer = this.shape.length-1; layer > 0; layer--) {
      for (let node = 0; node < this.shape[layer]; node++) {
        let delta = 0;
        if (layer == this.shape.length-1) {
          delta = this.neuronOutputs[layer][node] - solution[node];
        } else {
          for (let k = 0; k < this.shape[layer+1]; k++) {
            delta += this.deltas[layer+1][k] * this.weights[layer][node][k];
          }
        }
        delta *= this.activationDerivative(this.neuronInputs[layer][node]);
        this.deltas[layer][node] = delta;
      }
    }
    for (let layer = 0; layer < this.shape.length; layer++) {
      for (let node = 0; node < this.shape[layer]+1; node++) {
        for (let k = 0; k < this.shape[layer+1]; k++) {
          let neuronOutput = this.neuronOutputs[layer][node];
          if (neuronOutput == undefined) neuronOutput = 1;
          let weightDelta = -this.learningRate * this.deltas[layer+1][k] * neuronOutput;
          this.weights[layer][node][k] += weightDelta;
        }
      }
    }
  }

  // Trains The Network On a Given DataSet
  async train(dataSet, callback) {
    for (let epoch = 0; epoch < this.epochs; epoch++) {
      for (let dataIndex = 0; dataIndex < dataSet.length; dataIndex++) {
        this.learn(dataSet[dataIndex][0], dataSet[dataIndex][1]);
        let progress = Math.floor((epoch/this.epochs + (dataIndex/(dataSet.length-1))/this.epochs)*1000)/10;
        if (progress != this.progress) {
          let prediction = this.predict(dataSet[0][0]);
          let error = this.getMeanSquaredError(prediction, dataSet[0][1]);
          callback(progress, error);
          await new Promise(res => setTimeout(res, 100));
        }
        this.progress = progress;
      }
    }
  }

  // Calculates The Mean Error Of a Given Prediction
  getMeanSquaredError(prediction, solution) {
    let error = 0;
    for (let i = 0; i < prediction.length; i++) {
      error += Math.pow(prediction[i] - solution[i], 2);
    }
    return error/prediction.length;
  }
}
