{
  setMetaData('corona', 642, 340);

  // Variables
  let param;
  let simWidth = 300;
  let simHeight = 300;
  let people = [];
  let infectedArray = [];
  let immuneArray = [];
  let deathArray = [];
  let cnt = 0;
  let isRunning = false;
  let infectedCount = 0;
  let immuneCount = 0;
  let deadCount = 0;
  let settingsOpened = false;
  let hoverID = null;
  let peopleCount = 300;
  let walkSpeed = 1;
  let contagiousness = 6;
  let infectTime = 500;
  let immuneTime = 10000;

  corona = new class {
    setup(parameterIndex) {
      param = parameterIndex;

      // Load parameters from file
      peopleCount = parseInt(getData(param, 'peopleCount') || '300');
      walkSpeed = parseFloat(getData(param, 'walkSpeed') || '1');
      contagiousness = parseInt(getData(param, 'contagiousness') || '5');
      infectTime = parseInt(getData(param, 'infecttime') || '200');
      immuneTime = parseInt(getData(param, 'immunetime') || '10000');

      // Set the freshly load data
      setInputText(param, 'peopleCount', '' + peopleCount);
      setInputText(param, 'walkSpeed', '' + walkSpeed);
      setInputText(param, 'contagiousness', '' + contagiousness);
      setInputText(param, 'infecttime', '' + infectTime);
      setInputText(param, 'immunetime', '' + immuneTime);
    }
    main(window_width, window_height, hoverID) {

      // Draw Frame
      Rectangle(param, {
        x: 10,
        y: 10,
        width: simWidth,
        height: simHeight,
        color: '#353535',
        radius: 5,
        borderColor: '#404040'
      });

      // Start / Restart buttons
      if (!isRunning) {
        Button(param, {
          txt: 'START',
          id: 'start',
          x: 330,
          y: 20
        });
      } else {
        Button(param, {
          txt: 'RESTART',
          id: 'restart',
          x: 330,
          y: 20
        });
      }

      // Settings icon
      Icon(param, {
        icon: settings_icon,
        id: 'settings',
        x: window_width - 42.5,
        y: 27.5,
        size: 3,
        color: (hoverID == 'settings') ? '#ffffff' : '#aaaaaa'
      });

      // Texts to show currently simulated data
      Text(param, {
        txt: 'Infected:    ' + ((infectedCount * 100) / people.length).toFixed(1) + '%',
        x: 330,
        y: 80
      });
      Text(param, {
        txt: 'Immune:      ' + ((immuneCount * 100) / people.length).toFixed(1) + '%',
        x: 330,
        y: 100
      });
      Text(param, {
        txt: 'Deaths:      ' + deadCount,
        x: 330,
        y: 120
      });

      // Graph Frame
      Rectangle(param, {
        x: 332,
        y: 150,
        width: 300,
        height: 160,
        color: '#353535',
        radius: 5,
        borderColor: '#404040'
      });

      // Draw Graphs
      let scale = Math.min((150 / Math.max(...immuneArray)), (150 / Math.max(...infectedArray)), (150 / Math.max(...deathArray)));
      let singleWidth = 300 / infectedArray.length
      let step = Math.ceil((infectedArray.length + 1) / 80); // 80 is the graph drawing accuracity. Higher is better.

      for (let i = 0; i < infectedArray.length; i += step) {
        Line(param, {
          startX: i * singleWidth + 332 - (singleWidth * step),
          startY: (310 - infectedArray[i - step] * scale),
          endX: i * singleWidth + 332 + (singleWidth * step) - (singleWidth * step),
          endY: (310 - infectedArray[i] * scale),
          color: '#aa0000'
        });
        Line(param, {
          startX: i * singleWidth + 332 - (singleWidth * step),
          startY: (310 - immuneArray[i - step] * scale),
          endX: i * singleWidth + 332 + (singleWidth * step) - (singleWidth * step),
          endY: (310 - immuneArray[i] * scale),
          color: '#00aa00'
        });
        Line(param, {
          startX: i * singleWidth + 332 - (singleWidth * step),
          startY: (310 - deathArray[i - step] * scale),
          endX: i * singleWidth + 332 + (singleWidth * step) - (singleWidth * step),
          endY: (310 - deathArray[i] * scale),
          color: '#aaaaaa'
        });
      }

      // SIMULATION
      if (isRunning) {

        // Draw Frame
        Rectangle(param, {
          x: 8,
          y: 8,
          width: simWidth + 4,
          height: simHeight + 4,
          color: '#353535',
          radius: 5,
          borderColor: '#404040'
        });

        // Collision detection && Update
        for (let i = 0; i < people.length; i++) {
          people[i].move((i<50)?true:false);
          people[i].draw();
          for (let j = 0; j < i; j++) {
            let distX = Math.abs(people[i].x - people[j].x);
            let distY = Math.abs(people[i].y - people[j].y);
            if (Math.round(Math.sqrt((distX * distX) + (distY * distY))) <= contagiousness) {
              // Infect, if the other is infected
              if (people[i].infected && !people[j].immune && !people[i].dead && !people[j].dead)
                people[j].infect();
              if (people[j].infected && !people[i].immune)
                people[i].infect();

            }
          }
        }

        // Save data for the live data texts
        infectedCount = 0;
        immuneCount = 0;
        deadCount = 0;
        for (let i = 0; i < people.length; i++) {
          if (people[i].infected)
            infectedCount++;
          if (people[i].immune)
            immuneCount++;
          if (people[i].dead)
            deadCount++;
        }

        // Save data for the Graphs
        cnt++;
        if (cnt % 1 == 0) {
          if (infectedCount > 0 || immuneCount > 0) {
            infectedArray.push(infectedCount);
            immuneArray.push(immuneCount);
            deathArray.push(deadCount);
          }
        }
      }

      // Settings
      if (settingsOpened) {
        Rectangle(param, {
          x: CENTER,
          y: 60,
          width: window_width - 200,
          height: 200,
          color: '#404040',
          radius: 10,
          borderColor: '#454545'
        });

        Text(param, {
          txt: 'Parameters',
          x: 120,
          y: 80,
          color: '#909090'
        });
        Text(param, {
          txt: 'People count',
          x: 120,
          y: 100
        });
        Input(param, {
          hint: '10 - 1000',
          id: 'peopleCount',
          x: 290,
          y: 100,
          width: 200,
          height: 20,
          singleline: true
        });

        Text(param, {
          txt: 'Walk speed: ',
          x: 120,
          y: 120
        });
        Input(param, {
          hint: '0.1 - 2',
          id: 'walkSpeed',
          x: 290,
          y: 120,
          width: 200,
          height: 20,
          singleline: true
        });

        Text(param, {
          txt: 'Contagiousness: ',
          x: 120,
          y: 140
        });
        Input(param, {
          hint: '1 - 10',
          id: 'contagiousness',
          x: 290,
          y: 140,
          width: 200,
          height: 20,
          singleline: true
        });

        Text(param, {
          txt: 'Infect time: ',
          x: 120,
          y: 160
        });
        Input(param, {
          hint: '0 - 1000',
          id: 'infecttime',
          x: 290,
          y: 160,
          width: 200,
          height: 20,
          singleline: true
        });

        Text(param, {
          txt: 'Immune time',
          x: 120,
          y: 180
        });
        Input(param, {
          hint: '500 - 20000',
          id: 'immunetime',
          x: 290,
          y: 180,
          width: 200,
          height: 20,
          singleline: true
        });

        Button(param, {
          txt: 'SAVE AND CLOSE',
          id: 'close_settings',
          x: CENTER,
          y: 210
        });
      }

    }

    // Start button
    start_click() {
      people = [];
      for (let i = 0; i < peopleCount; i++) {
        people[i] = new person();
      }
      people[0].infect();

      isRunning = true;
      Loop(param, 20, () => drawWindowContents(param));
    }

    // Restart button
    restart_click() {
      people = [];
      for (let i = 0; i < peopleCount; i++) {
        people[i] = new person();
      }
      people[0].infect();

      infectedArray = [];
      immuneArray = [];
      deathArray = [];
      cnt = 0;
      infectedCount = 0;
      immuneCount = 0;
      deadCount = 0;
    }

    // Settings events
    settings_click() {
      settingsOpened = !settingsOpened;
    }
    close_settings_click() {
      let str = getInputText(param, 'peopleCount');
      saveData(param, 'peopleCount', str);
      peopleCount = parseInt(str);

      str = getInputText(param, 'walkSpeed');
      saveData(param, 'walkSpeed', str);
      walkSpeed = parseFloat(str);

      str = getInputText(param, 'contagiousness');
      saveData(param, 'contagiousness', str);
      contagiousness = parseInt(str);

      str = getInputText(param, 'infecttime');
      saveData(param, 'infecttime', str);
      infectTime = parseInt(str);

      str = getInputText(param, 'immunetime');
      saveData(param, 'immunetime', str);
      immuneTime = parseInt(str);

      settingsOpened = false;
    }


  }

  var corona_icon = [
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0]
  ];

  let settings_icon = [
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1]
  ];

  // Class for every dot
  let person = class {

    // Persons parameters
    constructor() {
      this.x = randomInt(simWidth - 5);
      this.y = randomInt(simHeight - 5);
      this.xSpeed = (walkSpeed*2) - (Math.random(1)*walkSpeed*4);
      this.ySpeed = (walkSpeed*2) - (Math.random(1)*walkSpeed*4);
      this.infected = false;
      this.immune = false;
      this.dead = false;
      this.timeCounter = 0;
    }

    // Move a person by a randomly modified velocity
    move(travaller) {
      if (!this.dead) {
        if (!travaller) {
          this.xSpeed += ((walkSpeed / 2.0) - (Math.random(1)*walkSpeed));
          this.ySpeed += ((walkSpeed / 2.0) - (Math.random(1)*walkSpeed));

          // Limit speed
          if (this.xSpeed > walkSpeed)
            this.xSpeed = walkSpeed;
          if (this.xSpeed < -walkSpeed)
            this.xSpeed = -walkSpeed;
          if (this.ySpeed > walkSpeed)
            this.ySpeed = walkSpeed;
          if (this.ySpeed < -walkSpeed)
            this.ySpeed = -walkSpeed;
        }

        if (this.x + this.xSpeed >= simWidth - 5 || this.x + this.xSpeed <= 0)
          this.xSpeed = -this.xSpeed;
        if (this.y + this.ySpeed >= simHeight - 5 || this.y + this.ySpeed <= 0)
          this.ySpeed = -this.ySpeed;

        this.x += this.xSpeed;
        this.y += this.ySpeed;


        this.timeCounter++;
        if (this.infected && this.timeCounter > (50 + randomInt(infectTime))) {
          this.timeCounter = 0;
          this.infected = false;
          this.immune = true;

          var deathRate = 3 + ((infectedCount * 100) / people.length)/2;
          if (randomInt(100) <= deathRate) {
            this.dead = true;
            this.infected = false;
            this.immune = false;
          }
        }
        if (this.immune && this.timeCounter > (500 + randomInt(immuneTime))) {
          this.timeCounter = 0;
          this.infected = false;
          this.immune = false;
        }
      }
    }

    // Draw a person
    draw() {
      if (!this.dead) {
        if (this.infected) {
          var col = '#aa0000';
        } else if (this.immune) {
          var col = '#00aa00';
        } else {
          var col = '#606060';
        }
        Circle(param, {
          x: this.x + 12.5,
          y: this.y + 12.5,
          radius: 2.5,
          color: col
        });
      }
    }

    // Infect a person
    infect() {
      if (!this.immune && !this.dead) {
        this.infected = true;
        this.timeCounter = 0;
      }
    }
  }

  function randomInt(max) {
    return Math.round(Math.random(1) * max);
  }
}
