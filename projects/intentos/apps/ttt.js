/*  setMetaData('ttt_ai', 600, 350);
  let param;

  // Game
  let playField = new Array(9);
  let currentPlayer = 'x';

  // NN
  let weights1 = [];
  let weights2 = [];
  let outputs = [];
  let mutationRate = 0.3; // 30% of all weigths will be modified
  let fitness1 = 0;
  let fitness2 = 0;

  ttt_ai = new class {
    setup(parameterIndex) {
      param = parameterIndex;
      this.reset();
      Loop(param, 200, () => {
        this.train();
      });
    }
    main(window_width, window_height) {

      // Draw Input
      Rectangle(param, {
        x: 0,
        y: 0,
        width: window_width,
        height: 30,
        color: '#404040'
      });
      Input(param, {
        id: 'inp1',
        x: 10,
        y: 10,
        hint: 'Enter value between 0 and 9',
        singleline: true,
        width: window_width - 20,
        height: 30,
      });

      // Draw currentPlayer
      Text(param, {
        x: 10,
        y: 60,
        txt: currentPlayer + ", it's your turn:",
      });

      // Draw playField
      for (let i = 0; i < 9; i++) {
        let drwText = i + '';
        let colS = '#505050';
        if (playField[i] == 'x') {
          drwText = 'X';
          colS = '#21f396';
        } else if (playField[i] == 'o') {
          drwText = 'O';
          colS = '#2196f3';
        }
        Text(param, {
          x: 10 + (i % 3) * 20,
          y: 90 + (Math.floor(i / 3)) * 20,
          txt: drwText,
          color: colS
        });
      }

    }

    // EnterPress of input
    inp1_enterPress(str) {
      setInputText(param, 'inp1', '');
      this.setPoint(parseInt(str));
      this.predict(weights1);
    }

    // Set X or O to playField and switch currentPlayer
    setPoint(pos) {
      if (playField[pos] != undefined) {
        (currentPlayer == 'x') ? fitness1 --: fitness2 --;
      }
      if (pos >= 0 && pos <= 8) {
        playField[pos] = currentPlayer;
        currentPlayer = (currentPlayer == 'x') ? 'o' : 'x';
        if (this.getWinner() != null) {
          Hint(this.getWinner() + ' won!', true);
          (this.getWinner() == 'x') ? fitness1 += 12: fitness2 += 12;
          for (let i = 0; i < 9; i++) {
            playField[i] = undefined;
          }
        }
      } else {
        (currentPlayer == 'x') ? fitness1-- : fitness2--;
      }
    }

    getWinner() {
      let winner = null;
      // Horizontal
      if (playField[0] == playField[1] && playField[1] == playField[2] && playField[2] != undefined)
        winner = playField[0];
      if (playField[3] == playField[4] && playField[4] == playField[5] && playField[5] != undefined)
        winner = playField[3];
      if (playField[6] == playField[7] && playField[7] == playField[8] && playField[8] != undefined)
        winner = playField[6];
      // Vertical
      if (playField[0] == playField[3] && playField[3] == playField[6] && playField[6] != undefined)
        winner = playField[0];
      if (playField[1] == playField[4] && playField[4] == playField[7] && playField[7] != undefined)
        winner = playField[1];
      if (playField[2] == playField[5] && playField[5] == playField[8] && playField[8] != undefined)
        winner = playField[2];
      // Diagonal
      if (playField[0] == playField[4] && playField[4] == playField[8])
        winner = playField[0];
      if (playField[2] == playField[4] && playField[4] == playField[6])
        winner = playField[2];
      // Tie
      if (winner == null && playField[0] != undefined && playField[1] != undefined && playField[2] != undefined && playField[3] != undefined && playField[4] != undefined && playField[5] != undefined && playField[6] != undefined && playField[7] != undefined && playField[8] != undefined) {
        winner = 'tie';
      }

      return winner;
    }

    // Creates 3D Array and fills it with random weights1 between -1 and +1
    reset() {
      weights1 = []
      for (let x = 0; x < 3; x++) { // 3
        weights1[x] = [];
        for (let y = 0; y < 10; y++) { // 6
          weights1[x][y] = []
          for (let z = 0; z < 10; z++) { // 6
            weights1[x][y][z] = 2 - (Math.random(1)*4);
          }
        }
      }

      weights2 = this.mutate(weights1);

    }

    ttest(str) {
      return str + 'h';
    }

    predict(weight_arr) {
      // get and normalize inputs
      let inputs = [];
      for (let i = 0; i < 9; i++) {
        let tip = 0;
        if (playField[i] == 'x')
          tip = 0.5;
        if (playField[i] == 'o')
          tip = 1;
        inputs.push(tip);
      }

      // Create 2D Array for outputs
      outputs = [];
      for (let xx = 0; xx < 2; xx++) {
        outputs[xx] = [];
        for (let yy = 0; yy < 6; yy++) {
          outputs[xx][yy] = 0;
        }
      }

      // Feedforward, first layer
      for (let ii = 0; ii < 6; ii++) {
        let weighted_sum = 0;
        for (let i = 0; i < inputs.length; i++) {
          weighted_sum += (inputs[i] * weight_arr[0][i][ii]);
        }
        outputs[0][ii] = this.activation(weighted_sum + weight_arr[0][9][ii]*((currentPlayer=='x')?1:0.5));
      }

      // Feedforward, second layer
      for (let ii = 0; ii < 6; ii++) {
        let weighted_sum = 0;
        for (let i = 0; i < 6; i++) {
          weighted_sum += outputs[0][i] * weight_arr[1][i][ii];
        }
        outputs[1][ii] = this.activation(weighted_sum + weight_arr[1][9][ii]);
      }

      // Feedforward, output
      let weighted_sum = 0;
      for (let i = 0; i < 6; i++) {
        weighted_sum += outputs[1][i] * weight_arr[2][i][0];
      }
      let prediction = this.activation(weighted_sum + weight_arr[2][9][0]);

      //console.log(Math.round(prediction * 10));
      return Math.round(prediction * 10);
    }

    // Activation Function
    activation(num) {
      return 1 / (1 + Math.pow(Math.E, -num))
    }

    // Mutate certain percentage of the weights randomly
    mutate(w_arr) {
      let tempArr = [];
      for (let x = 0; x < 3; x++) {
        tempArr[x] = [];
        for (let y = 0; y < 10; y++) {
          tempArr[x][y] = []
          for (let z = 0; z < 10; z++) {
            if (Math.random(1) < mutationRate) {
              tempArr[x][y][z] = (w_arr[x][y][z] * (1.5 - Math.random(1) * 3));
            } else {
              tempArr[x][y][z] = w_arr[x][y][z];
            }
          }
        }
      }
      return tempArr;
    }


    // The training
    train() {
      for (let i = 0; i < 100; i++) {
        if (currentPlayer == 'x') {
          this.setPoint(this.predict(weights1));
        } else {
          this.setPoint(this.predict(weights2));
        }
      }
      console.log('Fitness 1 (x): ' + fitness1);
      console.log('Fitness 2 (o): ' + fitness2);

      fitness1 = 0;
      fitness2 = 0;
      if (fitness1 > fitness2) {
        weights2 = this.mutate(weights1);
      } else {
        weights1 = this.mutate(weights2);
      }
      drawWindowContents(param);
    }

  }

  var ttt_ai_icon = [
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0]
  ];

  let tic_icon = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
  ];

  let toe_icon = [
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0]
  ];
  */

}



// -------------------------------------------------------------------------------------
