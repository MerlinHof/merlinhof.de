// ----------------------------------------------------------------------------------------------------------------------------
// Set input text
function setInputText(param, id, str) {
  var idkey = param + '_textinput_' + id;
  inputtext[idkey] = str;
}

// ----------------------------------------------------------------------------------------------------------------------------
// Get input text
function getInputText(param, id) {
  var idkey = param + '_textinput_' + id;
  return inputtext[idkey];
}

// ----------------------------------------------------------------------------------------------------------------------------
// passData between apps
function passData(app, string) {
  for (var i = 0; i < windows.length; i++) {
    if (windows[i] == app) {
      if (focusIndex != i) {
        openWindowByParameter(i);
      }
      window[app]['loadData'](string);
      drawWindowContents(i);
    }
  }
}

// ----------------------------------------------------------------------------------------------------------------------------
// open window by name
function openWindowByName(app) {
  for (var i = 0; i < windows.length; i++) {
    if (windows[i] == app) {
      openWindowByParameter(i);
    }
  }
}

// ----------------------------------------------------------------------------------------------------------------------------
// Open window function
function openWindowByParameter(param) {

  if (!windowVisible[param]) {
    windowVisible[param] = true;
    rearrangeFocusHierachy(param);
    windowWidth[param] = originalWindowWidth[param];
    windowHeight[param] = originalWindowHeight[param];
    windowX[param] = originalWindowX[param];
    windowY[param] = originalWindowY[param];
    fullscreen[param] = false;
    drawDock();
  }

  rearrangeFocusHierachy(param);
  drawWindows();
}

// ----------------------------------------------------------------------------------------------------------------------------
// Set initial app meta data
function setMetaData(name, width, height, visibleInDock) {
  var x = random(screen.width - width);
  var y = random(screen.height - height - dockHeight - 5);

  windows.push(name);
  windowWidth.push(width);
  windowHeight.push(height);
  windowX.push(x);
  windowY.push(y);

  originalWindowWidth.push(width);
  originalWindowHeight.push(height);
  originalWindowX.push(x);
  originalWindowY.push(y);

  if (visibleInDock == undefined) {
    dockApps.push(true);
  } else {
    dockApps.push(visibleInDock);
  }
}

// ----------------------------------------------------------------------------------------------------------------------------
// Push given index to top of focus hierachy
function rearrangeFocusHierachy(focus) {
  focusIndex = focus;
  if (focusHierachy.includes(focus)) {
    focusHierachy.splice(focusHierachy.indexOf(focus), 1);
  }
  focusHierachy.push(focus);
}

// ----------------------------------------------------------------------------------------------------------------------------
// Returns random int between 0 and max
function random(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// ----------------------------------------------------------------------------------------------------------------------------
// Returns X Position of an element
function getPositionX(id) {
  for (var i = 0; i < elements.length; i++) {
    if (elements[i][0] == id) {
      return elements[i][1] - windowY[focusIndex];
      break;
    }
  }
}

// ----------------------------------------------------------------------------------------------------------------------------
// Returns Y Position of an element
function getPositionY(id) {
  for (var i = 0; i < elements.length; i++) {
    if (elements[i][0] == id) {
      return elements[i][2] - windowY[focusIndex] - 20;
      break;
    }
  }
}

// ----------------------------------------------------------------------------------------------------------------------------
// Returns width of an element
function getWidth(id) {
  for (var i = 0; i < elements.length; i++) {
    if (elements[i][0] == id) {
      return elements[i][3];
      break;
    }
  }
}

// ----------------------------------------------------------------------------------------------------------------------------
// Returns height of an element
function getHeight(id) {
  for (var i = 0; i < elements.length; i++) {
    if (elements[i][0] == id) {
      return elements[i][4];
      break;
    }
  }
}

// ----------------------------------------------------------------------------------------------------------------------------
// Checkbox set checked
function setChecked(param, id, bool) {
  idkey = param + '_checkbox_' + id;
  checkboxstate[idkey] = bool;
}

// ----------------------------------------------------------------------------------------------------------------------------
// Data save
function saveData(param, key, val) {
  localStorage[param + '_' + key] = val;
}

// ----------------------------------------------------------------------------------------------------------------------------
// Data get
function getData(param, key) {
  return localStorage[param + '_' + key] || '';
}

// ----------------------------------------------------------------------------------------------------------------------------
// Show error window
function error(windowParam, string) {
  if (string.toLowerCase() != 'typeerror: window[name][func] is not a function') {
    closeWindow(windowParam);

    var errorParam = windows.indexOf('system_error');
    originalWindowX[errorParam] = screen.width / 2 - originalWindowWidth[errorParam] / 2;
    originalWindowY[errorParam] = screen.height / 2 - originalWindowHeight[errorParam] / 2;

    var dat = [];
    dat[0] = windows[windowParam] + ' quit unexpectedly';
    if (windowParam == -1) {
      dat[0] = 'A fatal error occured';
    }
    dat[1] = string;
    passData('system_error', dat);
    Hint(dat[0], true);
  }
}

// ----------------------------------------------------------------------------------------------------------------------------
// Close window
function closeWindow(param) {
  if (windowVisible[param]) {
    originalWindowX[param] = windowX[param];
    originalWindowY[param] = windowY[param];

    // Remove from focus hierachy
    focusHierachy.splice(focusHierachy.indexOf(param), 1);
    // Set new focus window
    focusIndex = focusHierachy[focusHierachy.length - 1];
    // Call closeWindow functions
    var name = windows[param];
    if (typeof window[name]['appClosed'] == 'function')
      window[name]['appClosed']();
    ctx.clearRect(windowX[param], windowY[param], windowWidth[param] + 1, windowHeight[param]);
    windowVisible[param] = false;
    drawWindows();
    drawDock();

  }
}

// ----------------------------------------------------------------------------------------------------------------------------
// Adjust color depending on focus or not focus
function adjustColor(h, param) {
  function cutHex(h) {
    return (h.charAt(0) == "#") ? h.substring(1, 7) : h
  }

  var r = parseInt((cutHex(h)).substring(0, 2), 16);
  var g = parseInt((cutHex(h)).substring(2, 4), 16);
  var b = parseInt((cutHex(h)).substring(4, 6), 16);

  if (smartInvert) {
    if (r == g && g == b) {
      r = 255 - r;
      g = 255 - g;
      b = 255 - b;
    } else {
      let brightness = ((0.33 * r) + (0.5 * g) + (0.16 * b)) / 3;
      let max = Math.max(r, g, b);
      console.log(max);
      r += (-max + 180);
      g += (-max + 180);
      b += (-max + 180);
    }
  }

  if (param == null || focusIndex == param || h == '#00000000') {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  } else {
    var notFocusDimmPercent = 100 - (10 * (Math.pow(2, -1 * (focusHierachy.length - focusHierachy.indexOf(param)) + 2.6) + 4)); // Exponentieller Abfall der Helligkeit
    if (smartInvert) {
      notFocusDimmPercent /= 4;
    }
    return 'rgb(' + (r - ((r / 100) * notFocusDimmPercent)) + ',' + (g - ((g / 100) * notFocusDimmPercent)) + ',' + (b - ((b / 100) * notFocusDimmPercent)) + ')';
  }
}

// ----------------------------------------------------------------------------------------------------------------------------
// Dims color
function dimColor(color) {
  function cutHex(h) {
    return (h.charAt(0) == "#") ? h.substring(1, 7) : h
  }

  var r = parseInt((cutHex(color)).substring(0, 2), 16);
  var g = parseInt((cutHex(color)).substring(2, 4), 16);
  var b = parseInt((cutHex(color)).substring(4, 6), 16);

  return 'rgb(' + (r - 50) + ', ' + (g - 50) + ', ' + (b - 50) + ')';
}

// ----------------------------------------------------------------------------------------------------------------------------
// On fatal crash
window.onerror = function(msg, url, line) {
  if (canvas != undefined) {
    var err = msg + ' in ' + url + ' Line ' + line;
    if (!localStorage['fatalErrorLog'].includes(err)) {
      localStorage['fatalErrorLog'] += err + '##';
    }
    error(-1, err);
  }
}


// ----------------------------------------------------------------------------------------------------------------------------
// Controlled loop function
function Loop(param, time, funct) {
  if (focusIndex == param && windowVisible[param]) {
    funct();
  }
  setTimeout(function() {
    Loop(param, time, funct);
  }, time);
}


// ----------------------------------------------------------------------------------------------------------------------------
// Controlled timeout function
function Timeout(param, time, funct) {
  if (focusIndex == param && windowVisible[param]) {
    setTimeout(function() {
      funct();
    }, time);
  }
}


// ----------------------------------------------------------------------------------------------------------------------------
// Checks, if string at a given position is part of a word
let wordBoundrys = [' ', '.', '(', ')', '&', '⇩', ';', '+', '-', '*', '/', '[', ']', '{', '}', '<', '>', ','];
function isPartOf(position, fullString, partString) {
  for (let i = -partString.length; i < 0; i++) {
    if (fullString.substr(position + i + 1, partString.length) == partString) {
      if (wordBoundrys.includes(fullString.substr(position + i, 1)) && wordBoundrys.includes(fullString.substr(position + i + partString.length + 1, 1)) || (position + i < 0) || ((position + i + partString.length) >= fullString.length - 1)) {
        console.log();
        return true;
        break;
      }
    }
  }
  return false;
}


// ----------------------------------------------------------------------------------------------------------------------------
// Saves object to file
function saveToFile(param, name, obj) {
  fileLocator.root.user.documents[name] = obj;
  //localStorage['fileLocator'] = fileLocator;
}
