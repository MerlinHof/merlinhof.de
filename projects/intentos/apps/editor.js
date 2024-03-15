{
  // Variablen
  setMetaData('editor', 550, 300);
  let param;
  let fileOpened = false;
  let scrollY = 0;
  let nav = [
    ['File', 'New document', 'New app', 'Open', 'Save', 'Exit'],
    ['Code', 'Execute', 'Soon'],
    ['Help', 'Manual', 'Exit']
  ];

  let hlght = [
    // Keywords
    ['let', '#c678dd'],
    ['var', '#c678dd'],
    ['if', '#c678dd'],
    ['else', '#c678dd'],
    ['new', '#c678dd'],
    ['class', '#c678dd'],
    ['for', '#c678dd'],
    ['function', '#c678dd'],
    ['return', '#c678dd'],

    // intentOS clickFunctions
    ['Text', '#56b6c2'],
    ['Icon', '#56b6c2'],
    ['Rectangle', '#56b6c2'],
    ['Circle', '#56b6c2'],
    ['Line', '#56b6c2'],
    ['setMetaData', '#56b6c2'],
    ['main', '#56b6c2'],
    ['setup', '#56b6c2'],
    ['saveData', '#56b6c2'],
    ['loadData', '#56b6c2'],
    ['random', '#56b6c2'],
    ['Hint', '#56b6c2'],

    // else blue
    ['=', '#56b6c2'],
    ['+', '#56b6c2'],
    ['+=', '#56b6c2'],
    ['-', '#56b6c2'],
    ['-=', '#56b6c2'],
    ['<', '#56b6c2'],
    ['<=', '#56b6c2'],
    ['>', '#56b6c2'],
    ['>=', '#56b6c2'],
    ['*', '#56b6c2'],
    ['*=', '#56b6c2'],
    ['/', '#56b6c2'],
    ['/=', '#56b6c2'],
    ['&&', '#56b6c2'],
    ['||', '#56b6c2'],
    ['sin', '#56b6c2'],
    ['cos', '#56b6c2'],
    ['log', '#56b6c2'],
    ['null', '#56b6c2'],

    // Everything else
    ['//', '#5c6370'],
    ['"', '#98c379'],
    ["'", '#98c379'],
    ["1", '#bbbbff'],

    // Instance
    ['true', '#e5c07b'],
    ['false', '#e5c07b'],
    ['CENTER', '#e5c07b'],
    ['CENTEROVER', '#e5c07b'],
    ['console', '#e5c07b'],
    ['param', '#e5c07b']

    //["'number is small'", '#00ee00'],
    //["// test num", '#808080']
  ];

  editor = new class {
    setup(parameterIndex) {
      param = parameterIndex;
    }

    main(window_width, window_height, hoverID) {

      // Text mode
      if (fileOpened) {
        Input(param, {
          hint: 'Enter text here...',
          id: 'input1',
          x: 40,
          y: 40 + scrollY,
          width: window_width - 80,
          height: window_height + scrollY,
          highlight: hlght,
          inactiveColor: '#ffffff',
          lowercaseEnabled: true
        });

        // Line numbers
        for (let i = 1; i < (((window_height - 20 - scrollY) / 20)); i++) {
          if (('' + i).toString().length > 1) {
            var x = 5
          } else {
            var x = 10
          }
          Text(param, {
            txt: '' + i,
            x: x,
            y: (20 * i) + 20 + scrollY,
            color: '#707070'
          });
        }
        Line(param, {
          startX: 30,
          startY: 30,
          endX: 30,
          endY: window_height,
          color: '#505050'
        });

        // Scroll bar
        Rectangle(param, {
          x: window_width - 25,
          y: 70,
          width: 20,
          height: window_height - 110,
          radius: 10,
          color: '#505050'
        });
        Rectangle(param, {
          x: window_width - 25,
          y: 70 - scrollY,
          width: 20,
          height: 40,
          radius: 10,
          color: '#a0a0a0'
        });
        Icon(param, {
          icon: up_icon,
          id: 'scroll_up',
          x: window_width - 22.5,
          y: 45,
          size: 2
        });
        Icon(param, {
          icon: down_icon,
          id: 'scroll_down',
          x: window_width - 22.5,
          y: window_height - 25,
          size: 2
        });
        Line(param, {
          startX: window_width - 30,
          startY: 30,
          endX: window_width - 30,
          endY: window_height,
          color: '#505050'
        });

      } else {
        // Nothing opened screen
        Icon(param, {
          icon: nofile_icon,
          x: CENTER,
          y: 100,
          size: 6,
        });
        Button(param, {
          txt: 'OPEN FILE',
          id: 'choosebutton',
          x: CENTER,
          y: 170
        });
      }

      // Draw the toolbar
      Toolbar(param, nav);
    }

    loadData(dat) {
      fileOpened = true;
      setInputText(param, 'input1', dat);
    }

    scroll_up_click() {
      if (scrollY < 0) {
        scrollY += 11;
      }
    }

    scroll_down_click() {
      scrollY -= 11;
    }

    // Choose - a - file - button
    choosebutton_click() {
      passData('finder', 'documents');
      Hint('Select a file to open', true);
    }

    appClosed() {
      fileOpened = false;
    }

    // New file
    toolbar_0_0_click() {
      fileOpened = true;
      setInputText(param, 'input1', '');
    }

    // App
    toolbar_0_1_click() {
      fileOpened = true;
      setInputText(param, 'input1', standardAppCode);
    }

    // Open
    toolbar_0_2_click() {
      passData('finder', 'documents');
      Hint('Select a file to open', true);
    }

    // Save
    toolbar_0_3_click() {
      saveToFile(param, 'myapp.doc', getInputText(param, 'input1').toString());
      Hint('Saved as "myapp.doc"', true);
    }

    // Exit
    toolbar_0_4_click() {
      closeWindow(param);
    }

    // Execute
    toolbar_1_0_click() {
      loadCustomCode(getInputText(param, 'input1'));
      openWindowByName('terminal');
    }

    // Manual
    toolbar_2_0_click() {
      fileOpened = true;
      let str = 'This is the manual for the editor####On Top of the editor is the toolbar with all its functions. Below that (here) is the text area.';
      setInputText(param, 'input1', str);
    }

    toolbar_2_1_click() {
      closeWindow(param);
    }
  }

  var editor_icon = [
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1]
  ];

  let nofile_icon = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
  ];

  let up_icon = [
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
  ];

  let down_icon = [
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
  ];
}

let standardAppCode =
"setMetaData('myapp', 500, 300);⇩" +
'let param;⇩⇩' +

'myapp = new class {⇩' +
'  setup(p) {⇩' +
'    param = p;⇩' +
'  }⇩' +
'  main(window_width, window_height, hoverID) {⇩⇩' +

"    let col = '#909090';⇩" +
"    if (hoverID == 'mytext') {col = '#FFFFFF'}⇩" +
'    Text(param, {⇩' +
"      txt: 'Hello!',⇩" +
"      id: 'mytext',⇩" +
'      color: col,⇩' +
'      x: CENTER,⇩' +
'      y: 60⇩' +
'    });⇩' +
'  }⇩' +
'}⇩⇩'
