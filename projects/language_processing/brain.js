class Brain {
  constructor(numberOfNeurons, numberOfConnectionsPerNeuron) {
    this.neurons = [];
    for (let i = 0; i < numberOfNeurons; i++) {
      this.neurons.push(new Neuron());
    }
    for (let i = 0; i < this.neurons.length; i++) {
      this.neurons[i].index = i;
      for (let j = 0; j < numberOfConnectionsPerNeuron; j++) {
        let randInd = Math.floor(Math.random()*numberOfNeurons);
        this.neurons[i].addConnection(this.neurons[randInd]);
      }
    }
  }

  tick(inputs) {
    // Set Inputs
    for (let i = 0; i < inputs.length; i++) {
      this.neurons[i].inputValue = inputs[i];
    }

    // Calculate New Neuron Values
    let newValues = [];
    for (let i = 0; i < this.neurons.length; i++) {
      for (let j = 0; j < this.neurons[i].connections.length; j++) {
        let targetNeuron = this.neurons[i].connections[j].targetNeuron;
        if (newValues[targetNeuron.index] == undefined) {
          newValues[targetNeuron.index] = 0;
        }
        newValues[targetNeuron.index] += this.neurons[i].getOutput()*this.neurons[i].connections[j].weight;
      }
    }

    // Update New Neuron Values
    for (let i = 0; i < this.neurons.length; i++) {
      this.neurons[i].inputValue = newValues[i];
    }
  }

  getOutputs(n) {
    let outputs = [];
    for (let i = 0; i < n; i++) {
      let val = this.neurons[this.neurons.length-1-i].getOutput();
      outputs.push(val);
    }
    return outputs;
  }
}





class Neuron {
  #connectsTo;
  constructor() {
    this.#connectsTo = [];
    this.connections = [];
    this.inputValue = 0;
    this.index;
    this.bias = 1-Math.random()*2;
  }
  addConnection(neuron) {
    if (this.#connectsTo.includes(neuron)) return;
    this.#connectsTo.push(neuron);
    this.connections.push(new Connection(this, neuron));
  }
  getOutput() {
    return this.sigmoid(this.inputValue) + this.bias;
  }
  sigmoid(x) {
    return 1.0/(1.0+Math.pow(Math.E, -x));
  }
}


class Connection {
  constructor(from, to) {
    this.fromNeuron = from;
    this.targetNeuron = to;
    this.weight = 1-Math.random()*2;
  }
}
