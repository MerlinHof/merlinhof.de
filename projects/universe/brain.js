class Neuron {
  constructor() {
    this.connections = [];
    this.bias = 1-Math.random()*2;
    this.activate = this.sigmoid;
    this.weightedSum = 0;
    this.output;
    this.add(0);

    this.getsMemoryCellValue = false;
    this.memoryCellIndex = false;
  }

  setIsOutputOfMemoryCell(index) {
    this.getsMemoryCellValue = true;
    this.memoryCellIndex = index;
  }

  add(val) {
    this.weightedSum += val;
    this.output = this.activate(this.weightedSum) + this.bias;
  }

  sigmoid(x) {
    return (4/(1+Math.pow(Math.E, -x)))-2;
  }
}



class Connection {
  constructor(toNeuron, controlledBy = false) {
    this.toNeuron = toNeuron;
    this.weight = 2-Math.random()*4;
    this.isConditional = (controlledBy != false);
    this.condition = {
      controlledBy: controlledBy,
      threshold: 2-Math.random()*4,
      openedWeight: 0.9+Math.random()/10,
      closedWeight: Math.random()/10-0.05
    };
  }
}



class MemoryCell {
  static counter = 0;
  constructor(brain, inputNeuron, outputNeurons, inController, outController) {
    this.savedValue = 0;
    this.inputNeuron = inputNeuron;
    this.outController = outController;
    this.inController = inController;
    this.inThreshold = Math.random()/10 - 0.05;
    this.outThreshold = Math.random()/10 - 0.05;
    this.offValue = Math.random()/10 - 0.05;
    this.brain = brain;
    this.id = MemoryCell.counter;

    for (let i = 0; i < outputNeurons.length; i++) {
      brain.neurons[outputNeurons[i]].setIsOutputOfMemoryCell(MemoryCell.counter);
    }
    MemoryCell.counter++;
  }

  updateValue() {
    if (this.brain.neurons[this.inController].output > this.inThreshold) {
      this.savedValue = this.brain.neurons[this.inputNeuron].output;
    }
  }

  getValue() {
    if (this.brain.neurons[this.outController].output > this.outThreshold) {
      return this.savedValue;
    } else {
      return this.offValue;
    }
  }
}



class Brain {
  constructor(inputCount, outputCount, neuronCount, connectionsPerNeuron, conditionalSynapseCount, memoryCellCount) {
    if (connectionsPerNeuron == undefined) connectionsPerNeuron = 4;
    if (conditionalSynapseCount == undefined) conditionalSynapseCount = Math.floor(Math.sqrt(neuronCount));
    if (memoryCellCount == undefined) memoryCellCount = Math.floor(neuronCount/50);
    this.inputCount = inputCount;
    this.outputCount = outputCount;
    this.neuronCount = neuronCount;
    this.connectionsPerNeuron = connectionsPerNeuron;
    this.conditionalSynapseCount = conditionalSynapseCount;
    this.memoryCellCount = memoryCellCount;
    this.neurons = [];
    this.memoryCells = [];
    this.inputNeurons = [];
    this.outputNeurons = [];
    this.activeNeurons = [];

    // Create Neurons
    for (let i = 0; i < neuronCount; i++) {
      let n = new Neuron();
      this.neurons.push(n);
    }

    // Wire up
    for (let i = 0; i < neuronCount; i++) {
      for (let j = 0; j < connectionsPerNeuron; j++) {
        let toNeuron = Math.floor(Math.random()*neuronCount);
        let connection = new Connection(toNeuron);
        this.neurons[i].connections.push(connection);
      }
    }

    // Create Conditional Synapses
    for (let i = 0; i < conditionalSynapseCount; i++) {
      let fromNeuron = 0;
      let toNeuron = 0;
      let controlledBy = 0;
      while (fromNeuron == controlledBy || toNeuron == controlledBy) {
        fromNeuron = Brain.randomInt(neuronCount);
        toNeuron = Brain.randomInt(neuronCount);
        controlledBy = Brain.randomInt(neuronCount);
      }
      let connection = new Connection(toNeuron, controlledBy);
      this.neurons[fromNeuron].connections.push(connection);
    }

    // Create Memory Cells
    for (let i = 0; i < memoryCellCount; i++) {
      let input = Brain.randomInt(neuronCount);
      let outputs = [Brain.randomInt(neuronCount), Brain.randomInt(neuronCount)];
      let inController = Brain.randomInt(neuronCount);
      let outController = Brain.randomInt(neuronCount);
      let mc = new MemoryCell(this, input, outputs, inController, outController);
      this.memoryCells.push(mc);
    }

    // Set Inputs and Outputs
    for (let i = 0; i < inputCount; i++) this.inputNeurons.push(Brain.randomInt(neuronCount));
    for (let i = 0; i < outputCount; i++) this.outputNeurons.push(Brain.randomInt(neuronCount));
  }

  update(inputs) {
    if (this.activeNeurons.length == 0 || inputs != undefined) {
      console.log('Updated');
      for (let i = 0; i < this.inputNeurons.length; i++) {
        this.neurons[this.inputNeurons[i]].weightedSum = 0;
        this.neurons[this.inputNeurons[i]].add(inputs[i]);
        this.activeNeurons.push(this.inputNeurons[i]);
      }
    }

    // Feed to next Neurons
    let tmpNeurons = this.neurons.copy();
    let tmpActive = [];
    for (let i = 0; i < this.activeNeurons.length; i++) {
      let neuronIndex = this.activeNeurons[i];
      if (this.neurons[neuronIndex].getsMemoryCellValue) {
        let value = this.memoryCells[this.neurons[neuronIndex].memoryCellIndex].getValue();
        this.neurons[neuronIndex].add(value);
      }

      for (let j = 0; j < this.neurons[neuronIndex].connections.length; j++) {
        let connection = this.neurons[neuronIndex].connections[j];
        let targetNeuronIndex = connection.toNeuron;
        let connectionWeight = connection.weight;
        if (connection.isConditional) {
          if (this.neurons[connection.condition.controlledBy].output > connection.condition.threshold) {
            connectionWeight = connection.condition.openedWeight;
          } else {
            connectionWeight = connection.condition.closedWeight;
          }
        }
        this.neurons[targetNeuronIndex].add(tmpNeurons[neuronIndex].output * connectionWeight);
        if (!tmpActive.includes(targetNeuronIndex)) tmpActive.push(targetNeuronIndex);
      }
    }
    this.activeNeurons = tmpActive.copy();

    // Update Memory Cells
    for (let i = 0; i < this.memoryCells.length; i++) {
      this.memoryCells[i].updateValue();
    }

    // Get Outputs
    let ops = [];
    for (let i = 0; i < this.outputNeurons.length; i++) {
      ops.push(this.neurons[this.outputNeurons[i]].output);
    }
    return ops;
  }



  mutate(prob) {
    let biasProb = prob;
    let connectionProb = prob/2;
    let weightProb = prob;
    let connectionTypeChangeProb = prob/10;
    let conditionalControllerProb = prob/8;
    let conditionalThresholdProb = prob/2;
    let conditionalOpenedProb = prob/4;
    let conditionalClosedProb = prob/4;
    let memoryCellChangeProb = prob/6;

    // Connections and Weigths
    for (let i = 0; i < this.neurons.length; i++) {

      // Bias
      if (Math.random() < biasProb) {
        this.neurons[i].bias += Math.random()/5-0.1;
      }

      for (let j = 0; j < this.neurons[i].connections.length; j++) {
        // Connection Position
        if (Math.random() < connectionProb) {
          this.neurons[i].connections[j].toNeuron = Brain.randomInt(this.neurons.length);
        }

        // Remove Connection
        if (Math.random() < connectionProb) {
          this.neurons[i].connections.splice(Brain.randomInt(this.neurons[i].connections.length), 1);
        }

        // New Connection
        if (Math.random() < connectionProb) {
          let toNeuronIndex = Brain.randomInt(this.neurons.length);
          this.neurons[i].connections.push(new Connection(toNeuronIndex));
        }

        // Connection Weight
        if (Math.random() < weightProb) {
          this.neurons[i].connections[j].weight += Math.random()/4 - 0.2;
        }

        // Connection Type (Normal / Conditional)
        if (Math.random() < connectionTypeChangeProb) {
          if (this.neurons[i].isConditional) {
            this.neurons[i].isConditional = false;
          } else {
            this.neurons[i].isConditional = true;
            this.neurons[i].condition = {
              controlledBy: Brain.randomInt(this.neurons.length),
              threshold: 2-Math.random()*4,
              openedWeight: 0.9+Math.random()/10,
              closedWeight: Math.random()/10-0.05
            };
          }
        }

        // Conditional Connection Values
        if (this.neurons[i].isConditional) {
          if (Math.random() < conditionalControllerProb) {
            this.neurons[i].connections[j].condition.controlledBy = Brain.randomInt(this.neurons.length);
          }
          if (Math.random() < conditionalThresholdProb) {
            this.neurons[i].connections[j].condition.threshold += Math.random()/2-0.25;
          }
          if (Math.random() < conditionalOpenedProb) {
            this.neurons[i].connections[j].condition.openedWeight += Math.random()/10-0.05;
          }
          if (Math.random() < conditionalClosedProb) {
            this.neurons[i].connections[j].condition.closedWeight += Math.random()/10-0.05;
          }
        }

        // Memory Cell Outputs
        if (this.neurons[i].getsMemoryCellValue) {
          if (Math.random() < memoryCellChangeProb) {
            this.neurons[i].getsMemoryCellValue = false;
          }
          if (Math.random() < 3*memoryCellChangeProb/(this.neuronCount/this.memoryCellCount)) {
            this.neurons[Brain.randomInt(this.neurons.length)].setIsOutputOfMemoryCell(Brain.randomInt(this.memoryCells.length));
          }
        }
      }
    }

    // Memory Cells
    let memoryCellInputChangeProb = prob/8;
    let memoryCellInControllerChangeProb = prob/8;
    let memoryCellOutControllerChangeProb = prob/8;
    let memoryCellInThresholdChangeProb = prob;
    let memoryCellOutThresholdChangeProb = prob;
    let memoryCellOffValueChangeProb = prob/2;
    for (let i = 0; i < this.memoryCells.length; i++) {
      if (Math.random() < memoryCellInputChangeProb) {
        this.memoryCells[i].inputNeuron = Brain.randomInt(this.memoryCells.length);
      }
      if (Math.random() < memoryCellInControllerChangeProb) {
        this.memoryCells[i].inController = Brain.randomInt(this.memoryCells.length);
      }
      if (Math.random() < memoryCellOutControllerChangeProb) {
        this.memoryCells[i].outController = Brain.randomInt(this.memoryCells.length);
      }
      if (Math.random() < memoryCellInThresholdChangeProb) {
        this.memoryCells[i].inThreshold += Math.random()/5-0.1;
      }
      if (Math.random() < memoryCellOutThresholdChangeProb) {
        this.memoryCells[i].outThreshold += Math.random()/5-0.1;
      }
      if (Math.random() < memoryCellOffValueChangeProb) {
        this.memoryCells[i].offValue += Math.random()/5-0.1;
      }
    }

    // Input / Output Neuron Positions
    let inputNeuronChangeProb = prob/32;
    let outputNeuronChangeProb = prob/32;
    for (let i = 0; i < this.inputCount; i++) {
      if (Math.random() < inputNeuronChangeProb) {
        this.inputNeurons[i] = Brain.randomInt(this.neurons.length);
      }
    }
    for (let i = 0; i < this.outputCount; i++) {
      if (Math.random() < outputNeuronChangeProb) {
        this.outputNeurons[i] = Brain.randomInt(this.neurons.length);
      }
    }
  }





  // Useful methods
  static randomInt(max) {
    return Math.floor(Math.random()*max);
  }


  // Draws Brain in Canvas (Mainly for debugging purposes)
  draw(ctx, arg1, arg2) {
    let base = Math.floor(Math.sqrt(this.neuronCount));

    // Draw normal connections
    let start = 0;
    let max = this.neurons.length;
    if (arg1 == 0 || arg1 == 3) {
      if (arg2 != undefined) {
        start = arg2;
        max = arg2+1;
        ctx.lineWidth = 4;
      }
      ctx.lineWidth = 2;
      for (let i = start; i < max; i++) {
        let start = {x: 100+(i%base)*50, y: 100+(Math.floor(i/base))*50};
        for (let n = 0; n < this.neurons[i].connections.length; n++) {
          let index = this.neurons[i].connections[n].toNeuron;
          let activity = Math.abs(this.neurons[i].connections[n].weight);
          ctx.strokeStyle = 'rgb(20, ' + (50+100*activity) + ', ' + (100+100*activity) + ')'; // 40 90 140
          if (i == index) {
            ctx.beginPath();
            ctx.arc(start.x-10, start.y, 8, 0, 2 * Math.PI);
            ctx.stroke();
          } else {
            let end = {x: 100+(index%base)*50, y: 100+(Math.floor(index/base))*50};
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
          }
        }
      }
    }

    // Draw Neurons
    for (let i = 0; i < this.neurons.length; i++) {
      ctx.fillStyle = "rgb(255, 255, 255)";
      let pos = {x: 100+(i%base)*50, y: 100+(Math.floor(i/base))*50};
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI, false);
      ctx.fill();
    }

    // Draw ConditionalSynapses
    /*if (arg1 == 1 || arg1 == 3) {
      ctx.lineWidth = 4;
      for (let i = 0; i < this.conditionalSynapses.length; i++) {
        ctx.strokeStyle = 'rgb(255, 0, 0)';
        let cs = this.conditionalSynapses[i];
        let start = {x: 100+(cs.from%base)*50, y: 100+(Math.floor(cs.from/base))*50};
        let end = {x: 100+(cs.to%base)*50, y: 100+(Math.floor(cs.to/base))*50};
        let cp1 = {x: start.x + 20, y: start.y-50};
        let cp2 = {x: end.x + 20, y: end.y-50};
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
        start = {x: 100+(cs.from%base)*50, y: 100+(Math.floor(cs.from/base))*50};
        end = {x: 100+(cs.controlledBy%base)*50, y: 100+(Math.floor(cs.controlledBy/base))*50};
        cp1 = {x: start.x + 20, y: start.y-50};
        cp2 = {x: end.x + 20, y: end.y-50};
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
        ctx.stroke();
      }
    }*/

    // Draw Memory Cells
    if (arg1 == 2 || arg1 == 3) {
      ctx.lineWidth = 4;
      for (let i = 0; i < this.memoryCells.length; i++) {
        ctx.strokeStyle = 'rgb(0, ' + (120 + Math.random()*50) + ', 0)';
        ctx.fillStyle = 'rgb(0, ' + (200 + Math.random()*55) + ', 0)';
        let mc = this.memoryCells[i];
        let input = {x: 100+(mc.input%base)*50, y: 100+(Math.floor(mc.input/base))*50};
        let output = {x: 100+(mc.output%base)*50, y: 100+(Math.floor(mc.output/base))*50};
        let inC = {x: 100+(mc.inController%base)*50, y: 100+(Math.floor(mc.inController/base))*50};
        let outC = {x: 100+(mc.outController%base)*50, y: 100+(Math.floor(mc.outController/base))*50};
        let center = {x: (input.x+output.x+inC.x+outC.x)/4, y: (input.y+output.y+inC.y+outC.y)/4};
        let positions = [input, output, inC, outC];
        ctx.beginPath();
        ctx.ellipse(center.x, center.y, 30, 15, 0, 0, 2 * Math.PI, false);
        ctx.fill();

        for (let i = 0; i < 4; i++) {
          let start = {x: center.x+(10*i)-15, y: center.y};
          let end = positions[i];
          let cp1 = {x: start.x + 20, y: start.y-50};
          let cp2 = {x: end.x + 20, y: end.y-50};
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
          ctx.stroke();
        }
      }
    }
  }
}


Array.prototype.copy = function() {
  return [...this];
};
