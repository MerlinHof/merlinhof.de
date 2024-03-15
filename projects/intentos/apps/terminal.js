{
  setMetaData('terminal', 470, 270);

  let param;
  let inputstr = 'user>> ';
  let output;

  terminal = new class {
    setup(parameterIndex) {
      param = parameterIndex;
    }

    main(window_width, window_height) {

      Text(param, {
        txt: output || '>> ',
        x: 10,
        y: 10,
        width: window_width - 20
      });

      let col = '#505050';
      Rectangle(param, {
        x: 0,
        y: window_height - 40,
        width: window_width,
        height: 40,
        color: col,
        radius: 10,
        cornerLocation: 'bl,br'
      });
      Line(param, {
        startX: 0,
        startY: window_height - 40,
        endX: window_width,
        endY: window_height - 40
      });

      Input(param, {
        id: 'inputid',
        hint: 'Enter command here...',
        x: 10,
        y: window_height - 25,
        width: window_width,
        height: 30,
        singleline: true
      });
    }

    inputid_enterPress(str) {
      str = str.toLowerCase();
      setInputText(param, 'inputid', '');

      switch (str) {
        case 'help':
          output = `All Commands:####-> echo *         -> open *##-> close *        -> exit##-> clear          -> hint *##-> customapp      -> info##-> changelog      -> log##-> clear log      -> ...##`;
          break;
        case 'shutdown':
          output = 'Shutting down.... failed';
          break;
        case 'clear':
          output = '';
          break;
        case 'exit':
          output = '';
          closeWindow(param);
          break;
        default:
          output = 'Unknown command. Type "help"⇩';
          break;
      }

      if (str.substring(0, 4) == 'echo') {
        let dat = str.substring(5, str.length);
        if (dat.length > 0) {
          output = dat;
        } else {
          output = 'Missing string after "echo"';
        }
      }

      if (str.substring(0, 4) == 'open') {
        let winname = str.substring(5, str.length);
        if (winname.length > 0) {
          if (windows.includes(winname, 0)) {
            output = 'Opened ' + winname;
            openWindowByName(winname);
          } else {
            output = 'App not found';
          }
        } else {
          output = 'Missing string after "open"';
        }
      }

      if (str.substring(0, 5) == 'close') {
        let winname = str.substring(6, str.length);
        if (winname.length > 0) {
          if (windows.includes(winname, 0)) {
            if (windowVisible[windows.indexOf(winname)]) {
              output = 'Closed ' + winname;
              closeWindow(windows.indexOf(winname));
            } else {
              output = 'App already closed';
            }
          } else {
            output = 'App not found';
          }
        } else {
          output = 'Missing string after "close"';
        }
      }

      if (str.substring(0, 4) == 'hint') {
        let dat = str.substring(5, str.length);
        if (dat.length > 0) {
          output = 'Done';
          Hint(dat, true);
        } else {
          output = 'Missing string after "hint"';
        }
      }

      if (str == 'customapp') {
        output = "How to use 'customapp':####customapp -l: Load new app##customapp -r: Remove current app";
      } else if (str == 'customapp -l') {
        let answer = prompt('Paste your code here. Reload the site afterwards!', '');
        loadCustomCode(answer);
      } else if (str == 'customapp -r') {
        localStorage['customApp'] = '';
        output = 'Removed app successfully';
      }

      if (str == 'info') {
        let startDate = new Date('11/20/2019'); // 20.11.2019
        let todaysDate = new Date();
        let age = Math.round((todaysDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        output = 'Info for intentOS####-------------------------##Version: ' + versionCode + ' (' + versionName + ')##Age: ' + age + ' Days##Last Update: ' + lastUpdateDate + '##-------------------------####By Merlin Hof';
      }

      if (str == 'changelog') {
        output = "What's New in Version " + versionCode + '?####' + changelog;
      }

      if (str == 'log') {
        if (localStorage['fatalErrorLog'] == '') {
          output = 'No errors logged so far';
        } else {
          var obj = fileLocator;
          obj.root.user.documents['log01.doc'] = localStorage['fatalErrorLog'];
          output = "Saved as 'log01' in Documents";
        }
      }
      if (str == 'clear log') {
        localStorage['fatalErrorLog'] = '';
        output = 'All log data deleted successfully';
      }
    }


  }

  function loadCustomCode(code) {
    let valid = true;
    error_msg = 'Unexpected error';
    code = code.removeAll('⇩');

    // Remove all strings from code
    while (code.includes('"') || code.includes('`')) {
      code = code.replace('"', "'");
      code = code.replace('`', "'");
    }
    let reddy = code;
    while (reddy.includes("'")) {
      let repl = reddy.substring(reddy.indexOf("'"), reddy.substring(reddy.indexOf("'") + 1).indexOf("'") + reddy.substring(0, reddy.indexOf("'") + 2).length);
      reddy = reddy.replace(repl, '');
    }

    // Remove multi line comments from code
    while (reddy.includes("/*")) {
      let repl = reddy.substring(reddy.indexOf("/*"), reddy.indexOf("*/") + 2);
      reddy = reddy.replace(repl, '');
    }

    // Counts occurances of 'var'
    var varCnt = reddy.count('var ');
    if (varCnt > 1) {
      valid = false;
      error_msg = "'var' not allowed. Use 'let' instead";
    }

    // Invalid code
    let invalidCode = [
      'localStorage',
      'ctx',
      'fillRect(',
      'canvas',
      'windowX[',
      'windowY[',
      'fullscreen[',
      'windowVisible[',
      'focusHierachy[',
      'drawWindows(',
      'drawWindowContents(',
      'elements[',
      'focusIndex',
      'fileLocator',
      'addEventListener',
      'redrawWindow(',
      'checkboxstate[',
      'setTimeout(',
      'setInterval(',
      'loadCustomCode('
    ];

    // Check if custom code includes illegal code
    for (let i = 0; i < invalidCode.length; i++) {
      if (reddy.includes(invalidCode[i])) {
        valid = false;
        let close = '';
        let lastChar = invalidCode[i].slice(-1);
        if (lastChar == '(') {
          close = '...)'
        } else if (lastChar == '[') {
          close = '...]'
        }
        error_msg = "'" + invalidCode[i] + close + "' is not allowed"
      }
    }


    // Save Code or display error message
    if (valid) {
      try {
        let finalCode = '{' + code + '}';
        eval(finalCode);
        localStorage['customApp'] = finalCode;
        output = 'Code inserted successfully!';
        dockWidth += 71.25;
        drawDock();
      } catch (e) {
        output = 'There was an error running your app:##' + e;
      }
    } else {
      output = 'An error occured:##' + error_msg;
    }
  }

  var terminal_icon = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
  ];
}
