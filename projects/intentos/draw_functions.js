// ----------------------------------------------------------------------------------------------------------------------------
// Draw Window
function drawWindow(windowX, windowY, windowWidth, windowHeight, focus, fullscr, param) {
  var cornerRad = radius;

  // Base window is in redrawWindow

  // Top bar
  ctx.fillStyle = adjustColor('#505050', param);
  if (fullscr) {
    ctx.fillRect(windowX, windowY, windowWidth, 20);
  } else {
    ctx.fillRect(windowX + radius, windowY, windowWidth - 2 * radius + 1, radius);
    ctx.fillRect(windowX, windowY + radius, windowWidth, radius);
  }

  // window corners
  for (var y = 0; y < cornerRad; y++) {
    for (var x = 0; x < cornerRad; x++) {

      // top corners
      ctx.fillStyle = adjustColor('#505050', param);

      // Top left corner
      if ((Math.sqrt(Math.pow(Math.abs(cornerRad - x), 2) + Math.pow(Math.abs(cornerRad - y), 2)) < cornerRad)) {
        ctx.fillRect(windowX + x - 0.5, windowY + y - 0.5, 2, 2);
      }

      // Top right corner
      if ((Math.sqrt(Math.pow(Math.abs(0 - x), 2) + Math.pow(Math.abs(cornerRad - y), 2)) < cornerRad)) {
        ctx.fillRect(windowX + (windowWidth - radius) + x, windowY + y, 1, 1);
      }

      // Bottom corners
      ctx.fillStyle = adjustColor('#303030', param);

      // Bottom left corner
      if ((Math.sqrt(Math.pow(Math.abs(cornerRad - x), 2) + Math.pow(Math.abs(0 - y), 2)) < cornerRad)) {
        ctx.fillRect(windowX + x, windowY + (windowHeight - cornerRad) + y, 1, 1);
      }

      // Bottom right corner
      if ((Math.sqrt(Math.pow(Math.abs(0 - x), 2) + Math.pow(Math.abs(0 - y), 2)) < cornerRad)) {
        ctx.fillRect(windowX + (windowWidth - cornerRad) + x, windowY + (windowHeight - cornerRad) + y, 1, 1);
      }

    }
  }


  // Window controls
  ctx.fillStyle = adjustColor('#aaaaaa', param);
  ctx.beginPath();
  ctx.arc(windowX + 10, windowY + 10, 6, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(windowX + 27, windowY + 10, 6, 0, 2 * Math.PI);
  ctx.fill();

  if (focusIndex == param) {
    Icon(null, {
      icon: system_close_icon,
      x: windowX + 6.5,
      y: windowY + 6.5,
      size: 1,
      color: '#202020'
    });
    if (fullscr) {
      Icon(null, {
        icon: system_minimize_icon,
        x: windowX + 23.5,
        y: windowY + 6.5,
        size: 1,
        color: '#202020'
      });
    } else {
      Icon(null, {
        icon: system_maximize_icon,
        x: windowX + 23.5,
        y: windowY + 6.5,
        size: 1,
        color: '#202020'
      });
    }
  }

  // Window Title
  var title = windows[param];
  Text(null, {
    txt: title,
    x: windowX + (windowWidth / 2) - ((title.length * 6.5 * fontSize) / 2),
    y: windowY + 5,
    color: adjustColor('#FFFFFF', param),
    intern_dontAdjustColor: true
  });
}


// ----------------------------------------------------------------------------------------------------------------------------
// Draw Line
function Line(param, {
  startX = 10,
  startY = 10,
  endX = 50,
  endY = 10,
  color = '#555555'
}) {

  if (color != null) {
    ctx.strokeStyle = adjustColor(color, param);

    if (startX > windowWidth[param] - 1)
      startX = windowWidth[param] - 1;
    if (startX < 1)
      startX = 1;
    if (endX > windowWidth[param] - 1)
      endX = windowWidth[param] - 1;
    if (endX < 1)
      endX = 1;

    if (startY > windowHeight[param] - 21)
      startY = windowHeight[param] - 21;
    if (startY < 1)
      startY = 1;
    if (endY > windowHeight[param] - 21)
      endY = windowHeight[param] - 21;
    if (endY < 1)
      endY = 1;

    startX += windowX[param];
    startY += windowY[param] + 20;
    endX += windowX[param];
    endY += windowY[param] + 20;
  }

  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}


// ----------------------------------------------------------------------------------------------------------------------------
// Draw rectangle
function Rectangle(param, {
  x = 10,
  y = 10,
  width = 100,
  height = 50,
  id = null,
  color = '#aaaaaa',
  radius = 0,
  cornerLocation = 'tl,tr,bl,br',
  borderColor = null
}) {
  var cornerRadius = radius;
  if (color != '#00000000') {
    color = adjustColor(color, param);
  }

  // CENTER (x)
  if (x.toString().includes('1874201') || x.toString().includes('98125799')) {
    x = (windowWidth[param] / 2 - width / 2) + Math.round(x);
  }
  // CENTEROVER (x)
  if (x.toString().includes('1874202') || x.toString().includes('98125798')) {
    x = Math.round(x) - width / 2;
  }

  if (borderColor != null) {
    Rectangle(param, {
      x: x,
      y: y,
      width: width,
      height: height,
      id: id,
      color: borderColor,
      radius: cornerRadius + 1,
      cornerLocation: cornerLocation,
      borderColor: null
    });
    x += 2;
    y += 2;
    width -= 4;
    height -= 4;
    id = null;
  }

  ctx.fillStyle = color;
  var draw = true;

  if (param != null) {
    if ((width + x) > windowWidth[param])
      width = windowWidth[param] - x;
    if ((height + y) > windowHeight[param] - 20)
      height = windowHeight[param] - y - 20;
    if (y > windowHeight[param] - 20)
      draw = false;
    if (x > windowWidth[param])
      draw = false;
    if ((x + width) < 0)
      draw = false;
    if ((y + height) < 0)
      draw = false;

    x += windowX[param];
    y += windowY[param] + 20;
  }

  if (color != '#00000000') {
    if (draw && cornerRadius == null) {
      ctx.fillRect(x, y, width, height);
    } else if (draw) {
      if (cornerRadius > height / 2 || cornerRadius > width / 2 || cornerRadius == 'max') {
        if (height > width) {
          cornerRadius = width / 2;
        } else {
          cornerRadius = height / 2;
        }
      }
      // Draw base
      ctx.fillRect(x + cornerRadius, y, width - (2 * cornerRadius), height);
      ctx.fillRect(x + 0.5, y + cornerRadius, cornerRadius, height - (2 * cornerRadius));
      ctx.fillRect(x + width - cornerRadius - 0.5, y + cornerRadius, cornerRadius + 0.5, height - (2 * cornerRadius));

      if (!cornerLocation.includes('tl'))
        ctx.fillRect(x + 0.5, y, cornerRadius, cornerRadius);
      if (!cornerLocation.includes('tr'))
        ctx.fillRect(x + width - cornerRadius - 0.5, y, cornerRadius, cornerRadius);
      if (!cornerLocation.includes('bl'))
        ctx.fillRect(x + 0.5, y + height - cornerRadius, cornerRadius, cornerRadius);
      if (!cornerLocation.includes('br'))
        ctx.fillRect(x + width - cornerRadius - 0.5, y + height - cornerRadius, cornerRadius, cornerRadius);

      // Rounded Corners
      for (var py = 0; py < cornerRadius; py++) {
        for (var px = 0; px < cornerRadius; px++) {
          ctx.fillStyle = color;

          // Top left
          if (cornerLocation.includes('tl')) {
            if ((Math.sqrt(Math.pow(Math.abs(cornerRadius - px), 2) + Math.pow(Math.abs(cornerRadius - py), 2)) < cornerRadius)) {
              ctx.fillRect(x + px, y + py - 0.5, 2, 2);
            }
          }

          // Top right
          if (cornerLocation.includes('tr')) {
            if ((Math.sqrt(Math.pow(Math.abs(0 - px), 2) + Math.pow(Math.abs(cornerRadius - py), 2)) < cornerRadius)) {
              ctx.fillRect(width - cornerRadius + x + px - 1, y + py, 2, 2);
            }
          }

          // Bottom left
          if (cornerLocation.includes('bl')) {
            if ((Math.sqrt(Math.pow(Math.abs(cornerRadius - px), 2) + Math.pow(Math.abs(0 - py), 2)) < cornerRadius)) {
              ctx.fillRect(x + px, y + py + height - cornerRadius - 1, 2, 2);
            }
          }

          // Bottom right
          if (cornerLocation.includes('br')) {
            if ((Math.sqrt(Math.pow(Math.abs(0 - px), 2) + Math.pow(Math.abs(0 - py), 2)) < cornerRadius)) {
              ctx.fillRect(width - cornerRadius + x + px - 1, y + py + height - cornerRadius - 1, 2, 2);
            }
          }
        }
      }
    }
  }

  // Create object for clickListener
  var tempArr = new Array();
  if (id != null && param != null) {
    tempArr[0] = id;
    tempArr[1] = x;
    tempArr[2] = y;
    tempArr[3] = width; // Width
    tempArr[4] = height; // Heigth
    elements.push(tempArr);
  }
}


// ----------------------------------------------------------------------------------------------------------------------------
// DRAW TEXT
function Text(param, {
  txt = 'Hello there!',
  id = null,
  x = 10,
  y = 10,
  size = fontSize,
  color = '#ffffff',
  width = null,
  height = null,
  highlight = null,
  singleline = false,
  lowercaseEnabled = false,
  intern_dontAdjustColor = false
}) {

  var str = txt;
  var dispX = x;
  var dispY = y;

  var showY = 0;
  var showX = 0;
  var space = 0;
  var lines = 1;
  str = str.replace(/##/g, '⇩');
  str = str.replace(/(\r\n|\n|\r)/gm, ''); // Don't try to draw enter characters
  if (!lowercaseEnabled)
    str = str.toUpperCase();
  if (singleline)
    str = str.removeAll('⇩');

  if (color == null)
    color = '#ffffff';
  if (width == null)
    width = canvas.width;
  if (height == null)
    height = canvas.height;
  if (size == null)
    size = fontSize;

  if (param != null && !intern_dontAdjustColor) {
    color = adjustColor(color, param);
  }

  // Center Options
  if (param != null) {
    var widthOfArea = windowWidth[param];
  } else {
    var widthOfArea = screen.width;
  }
  // CENTER (x)
  if (dispX.toString().includes('1874201') || dispX.toString().includes('98125799')) {
    dispX = (widthOfArea / 2 - (str.length * (size * 6.5)) / 2) + Math.round(dispX);
  }
  // CENTEROVER (x)
  if (dispX.toString().includes('1874202') || dispX.toString().includes('98125798')) {
    dispX = Math.round(dispX) - (str.length * (size * 6.5)) / 2;
  }

  if (param != null) {
    dispX += windowX[param];
    dispY += windowY[param] + 20;
  }

  for (var pos = -1; pos <= str.length; pos++) {
    if (pos >= 0 && pos < str.length) {
      var lette = str.substr(pos + space, 1);
    } else {
      var lette = '';
    }
    let tempCol = color;
    let yOffset = 0;
    if (lowercaseEnabled && (lette == 'g' || lette == 'p' || lette == 'q' || lette == 'y')) {
      yOffset = 2 * size;
    }

    if (highlight != null) {
      for (let h = 0; h < highlight.length; h++) {
        let hgt = highlight[h][0];
        if (isPartOf(pos + space, str, (lowercaseEnabled) ? hgt : hgt.toUpperCase())) {
          tempCol = adjustColor(highlight[h][1]);
          break;
        }
      }
    }

    if (lette != '') {

      for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 5; x++) {
          if (letter(x, y, lette) == 1) {
            ctx.fillStyle = tempCol;
          } else {
            ctx.fillStyle = "#00000000";
          }

          pixelX = (dispX + (size * x) + (pos * (size * 6.5)) + showX);
          pixelY = ((size * y) + dispY + showY);

          if (param != null) {
            if (pixelY < (height + dispY)) { // dont overflow set max height
              if (pixelX <= (windowX[param] + windowWidth[param] - size) && pixelX >= windowX[param] && pixelX <= (width + dispX)) { // Dont overflow window on x
                if (pixelY + yOffset < (windowY[param] + windowHeight[param] - size) && pixelY + yOffset > (windowY[param]) && pixelY > (windowY[param] + 20 - size)) { // Dont overflow Window on y
                  ctx.fillRect(pixelX, pixelY + yOffset, size, size);
                } else {
                  break;
                }
              } else {
                break;
              }
            } else {
              break;
            }
          } else {
            ctx.fillRect(pixelX, pixelY, size, size);
          }
        }
      }

      // Zeilenumbruch
      if ((pos * (size * 6.5)) + showX >= (width - (2 * size * 6.5)) || lette == '⇩') {
        showY += 20;
        showX -= ((pos * (size * 6.5)) + showX + 10);
        lines++;

        // No spaces at line break
        if (str.substr(pos + space + 1, 1) == ' ') {
          if (str.substr(pos + space, 1) != '⇩') {
            space++;
          }
        }
      }
    }

    // (Blinking) Cursor
    if (textInputFocus == id && id != null && cursorOn && (cursorPosition - 1 == (pos - space))) {
      let xxx = dispX + (pos * (size * 6.5)) + showX + (size * 5) - windowX[param];
      let yyy = (size * 5) + dispY + showY - 30 - windowY[param];
      Rectangle(param, {
        x: xxx,
        y: yyy,
        width: 2,
        height: 15,
        color: '#ffffff'
      });
    }

  }

  // Create object for clickListener
  var tempArr = new Array();
  if (id != null && param != null) {
    tempArr[0] = id;
    tempArr[1] = dispX;
    tempArr[2] = dispY;
    tempArr[3] = (str.length * (size * 6.5)); // Width
    tempArr[4] = (lines * 20) - 10; // Heigth
    elements.push(tempArr);
  }
}


// ----------------------------------------------------------------------------------------------------------------------------
// Text input
function Input(param, {
  hint = 'Enter text here...',
  id = null,
  x = 10,
  y = 10,
  size = fontSize,
  width = null,
  height = null,
  highlight = null,
  color = '#ffffff',
  inactiveColor = '#909090',
  singleline = false,
  lowercaseEnabled = false
}) {
  var dispX = x;
  var dispY = y;
  var str;
  var idkey = param + '_textinput_' + id;
  isSingleline[idkey] = singleline;

  if (inputtext[idkey] == undefined)
    inputtext[idkey] = '';

  if (clickedElementID == idkey) {
    if (inputtext[idkey] == undefined) {
      inputtext[textInputFocus] = '';
    }
    if (textInputFocus != idkey) {
      cursorOn = true;
      skipNextBlink = true;
      cursorPosition = inputtext[idkey].length;
    }
    textInputFocus = idkey;
  }

  if (inputtext[idkey].length == 0 && textInputFocus != idkey) {
    str = hint;
  } else if (inputtext[idkey].length == 0 && textInputFocus == idkey) {
    str = '';
    cursorPosition = 0;
  }

  if (inputtext[idkey].length > 0) {
    str = inputtext[idkey];
  }

  if (textInputFocus == idkey) {
    var col = color;
  } else {
    if (previousHoverID == idkey) {
      var col = color;
    } else {
      var col = inactiveColor;
    }
  }

  Text(param, {
    txt: str,
    id: idkey,
    x: dispX,
    y: dispY,
    size: size,
    color: col,
    width: width,
    highlight: highlight,
    singleline: singleline,
    lowercaseEnabled: lowercaseEnabled
  });

  Rectangle(param, {
    x: dispX - 10,
    y: dispY - 10,
    width: width,
    height: height,
    id: idkey,
    color: '#00000000',
  });
}


// ----------------------------------------------------------------------------------------------------------------------------
// Draw Circle
function Circle(param, {
  x = 50,
  y = 50,
  radius = 10,
  color = null
}) {
  if (color == null)
    color = '#aaaaaa';
  color = adjustColor(color, param);

  if (y + radius > (windowHeight[param] - 20)) {
    radius = windowHeight[param] - y - 20;
  }

  if (param != null) {
    x += windowX[param];
    y += windowY[param] + 20;
  }

  if (radius > 0) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  }

}


// ----------------------------------------------------------------------------------------------------------------------------
// DRAW ICON
function Icon(param, {
  icon = system_notfound_icon,
  id = null,
  x = 10,
  y = 10,
  size = 3,
  color = '#aaaaaa'
}) {
  if (icon != null) {
    var str = icon;
    var dispX = x;
    var dispY = y;
    var colorStr = color;
    colorStr = adjustColor(colorStr, param);

    // Figure out arrayName
    if (typeof str === 'string') {
      // Deprecated
      try {
        var iconname = str + '_' + windows[param] + '_icon';
        if (window[iconname] == undefined) {
          iconname = str + '_icon';
        }
        var arr = window[iconname];
      } catch (e) {
        var arr = system_notfound_icon;
      }

      if (arr == null)
        arr = system_notfound_icon;
    } else {
      arr = str;
    }

    // Center Options
    if (param != null) {
      var widthOfArea = windowWidth[param];
    } else {
      var widthOfArea = screen.width;
    }
    // CENTER (x)
    if (dispX.toString().includes('1874201') || dispX.toString().includes('98125799')) {
      x = (windowWidth[param] / 2 - width / 2)
      if (arr.length == 7) {
        dispX = (widthOfArea / 2 - (size * 7) / 2) + Math.round(dispX);
      } else {
        dispX = (widthOfArea / 2) - ((size * 11) / 3) + Math.round(dispX);
      }
    }
    // CENTEROVER (x)
    if (dispX.toString().includes('1874202') || dispX.toString().includes('98125798')) {
      if (arr.length == 7) {
        dispX = Math.round(dispX) - ((size * 7) / 2);
      } else {
        dispX = Math.round(dispX) - ((size * 11) / 3);
      }
    }

    if (param != null) {
      dispX += windowX[param];
      dispY += windowY[param] + 20;
    }

    if (arr.length == 7) {
      // 7x7
      loop1: for (var y = 0; y < 7; y++) {
        loop2: for (var x = 0; x < 7; x++) {
          if (arr[y][x] == 1) {
            ctx.fillStyle = colorStr;
          } else {
            ctx.fillStyle = "#00000000";
          }
          if (param != null && ((size * x) + dispX) < (windowX[param] + windowWidth[param] - size) && ((size * y) + dispY) < (windowY[param] + windowHeight[param] - size)) { // Dont Overflow X and Y
            ctx.fillRect(dispX + (size * x), (size * y) + dispY, size + 0.5, size + 0.5);
          } else if (param == null) {
            ctx.fillRect(dispX + (size * x), (size * y) + dispY, size + 0.5, size + 0.5);
          } else {
            break loop2;
          }
        }
      }
    }
    else {
      // 11x11
      loop1: for (var y = 0; y < 11; y++) {
        loop2: for (var x = 0; x < 11; x++) {
          if (arr[y][x] == 1) {
            ctx.fillStyle = colorStr;
          } else {
            ctx.fillStyle = "#00000000";
          }
          if (param != null && (((size * x) / (11 / 7)) + dispX) <= (windowX[param] + windowWidth[param] - size) && (((size * y) / (11 / 7)) + dispY) <= (windowY[param] + windowHeight[param] - size) && (((size * x) / (11 / 7)) + dispX) >= windowX[param] && (((size * y) / (11 / 7)) + dispY) >= (windowY[param] + 20)) { // Dont Overflow X and Y
            ctx.fillRect(dispX + ((size * x) / (11 / 7)), ((size * y) / (11 / 7)) + dispY, size / (11 / 7) + 0.5, size / (11 / 7) + 0.5);
          } else if (param == null) {
            ctx.fillRect(dispX + ((size * x) / (11 / 7)), ((size * y) / (11 / 7)) + dispY, size / (11 / 7) + 0.5, size / (11 / 7) + 0.5);
          } else {
            break loop2;
          }
        }
      }
    }

    // Create object for clickListener
    var tempArr = new Array();
    if (id != null) {
      tempArr[0] = id;
      tempArr[1] = dispX;
      tempArr[2] = dispY;
      tempArr[3] = size * 7; // Width
      tempArr[4] = size * 7; // Heigth
      elements.push(tempArr);
    }
  }
}


// ----------------------------------------------------------------------------------------------------------------------------
// Button
function Button(param, {
  txt = 'Button',
  id = null,
  x = 10,
  y = 10
}) {
  var text = txt;
  var height = 30;
  var width = (text.length * (fontSize * 6.5)) + 50;

  // CENTER (x)
  if (x.toString().includes('1874201') || x.toString().includes('98125799')) {
    x = windowWidth[param] / 2 - width / 2 + Math.round(x);
  }
  // CENTEROVER (x)
  if (x.toString().includes('1874202') || x.toString().includes('98125798')) {
    x = Math.round(x) - width / 2;
  }

  if (smartInvert) {
    if (previousHoverID == id) {
      var col = '#000000';
      var textCol = '#ffffff';
    } else {
      var col = '#505050';
      var textCol = '#FFFFFF';
    }
  } else {
    if (previousHoverID == id) {
      var col = '#aaaaaa';
      var textCol = '#000000';
    } else {
      var col = '#505050';
      var textCol = '#FFFFFF';
    }
  }
  Rectangle(param, {
    x: x,
    y: y,
    width: width,
    height: height,
    id: id,
    color: col,
    radius: 'max',
  });
  Text(param, {
    txt: text,
    x: x + 25,
    y: y + 10,
    color: textCol
  });
}

// ----------------------------------------------------------------------------------------------------------------------------
// Seekbar
function Seekbar(param, {
  id = null,
  x = 10,
  y = 10,
  width = 300,
  max = 100,
  progress = 20
}) {

  if (id != null) {
    let idkey = param + '_seekbar_' + id;

    if (seekbarProgress[idkey] == null)
      seekbarProgress[idkey] = 5;
    if (seekbarProgress[idkey] < 0)
      seekbarProgress[idkey] = 0;
    if (seekbarProgress[idkey] > width)
      seekbarProgress[idkey] = width;

    Rectangle(param, {
      x: x,
      y: y - 5,
      id: idkey,
      width: width,
      height: 15,
      color: '#00000000'
    });

    if (previousHoverID == idkey || seekbarIsCurrentlyDragged) {

      Rectangle(param, {
        x: x,
        y: y - 5,
        width: width,
        height: 15,
        color: '#808080'
      });
      Rectangle(param, {
        x: x,
        y: y - 5,
        width: seekbarProgress[idkey],
        height: 15,
        color: '#ffffff'
      });

      try {
        let val = Math.round((seekbarProgress[idkey] / width) * max);
        if (val != prevSeek) {
          prevSeek = val;
          var func = id + '_seeked';
          window[windows[param]][func](val);
        }
      } catch {}

    } else {

      Rectangle(param, {
        x: x,
        y: y,
        width: width,
        height: 5,
        color: '#808080'
      });
      Rectangle(param, {
        x: x,
        y: y,
        width: seekbarProgress[idkey],
        height: 5,
        color: '#ffffff'
      });
    }
  }
}


// ----------------------------------------------------------------------------------------------------------------------------
// Call mainFunctions in the app files to draw their contents
function drawWindowContents(param) {
  if (browserIsInFullscreen) {
    try {
      if (windowVisible[param]) {
        clearWindow(param);
        var name = windows[param];
        if (!windowCalled[param]) {
          windowCalled[param] = true;
          try {
            window[name]['setup'](param);
          } catch (e) {}
        }
        window[name]['main'](windowWidth[param], windowHeight[param] - 20, previousHoverID);
      }
    } catch (e) {
      error(param, e.toString());
    }
  }
}

// ----------------------------------------------------------------------------------------------------------------------------
// Clear window contents by redrawing its background
function clearWindow(i) {
  elements = [];
  ctx.fillStyle = adjustColor('#303030', i);
  ctx.fillRect(windowX[i], windowY[i] + 20, windowWidth[i], windowHeight[i] - radius - 20);
  ctx.fillRect(windowX[i] + radius, windowY[i] + windowHeight[i] - radius, windowWidth[i] - (2 * radius), radius);
}

// ----------------------------------------------------------------------------------------------------------------------------
// Draw hint
function Hint(str, create) {
  if (create) {
    hintY = canvas.height + dockHeight;
    hintX = 0 + (canvas.width / 2 - dockWidth / 2 - hintWidth) / 2;
    if ((canvas.width - dockWidth) / 2 <= hintWidth) {
      hintWidth = ((canvas.width - dockWidth) / 2) - 20;
      hintX = 10;
    }
  }
  if ((str.length * (fontSize * 6.5)) > hintWidth) {
    str = str.substring(0, hintWidth / (fontSize * 6.5) - 7) + '...';
  }

  Rectangle(null, {
    x: hintX,
    y: hintY,
    width: hintWidth,
    height: 100,
    color: '#303030',
    radius: 10,
    cornerLocation: 'tl,tr'
  });

  Text(null, {
    txt: str,
    x: CENTEROVER(hintX + ((hintWidth) / 2)),
    y: hintY + dockHeight / 2 - 5
  });

  // Slide in
  if (create) {
    (function myLoop(i) {
      setTimeout(function() {

        if (hintY > dockY + 1)
          hintY -= 3;
        ctx.clearRect(0, dockY, (canvas.width - dockWidth) / 2, dockHeight);
        Hint(str, false);

        if (--i) myLoop(i); //  decrement i and call myLoop again if i > 0
      }, 1)
    })(180);

    // Animate out
    clearTimeout(animout);
    animout = setTimeout(function() {

      // Slide out
      (function myLoop(i) {
        setTimeout(function() {

          hintY += 3;
          ctx.clearRect(0, dockY, (canvas.width - dockWidth) / 2, dockHeight);
          Hint(str, false);

          if (--i) myLoop(i);
        }, 1)
      })(180);
    }, 3000);

  }
}

// ----------------------------------------------------------------------------------------------------------------------------
// Toolbar
function Toolbar(param, arr) {

  ctx.fillStyle = adjustColor('#505050', param);
  ctx.fillRect(windowX[param], windowY[param] + 19, windowWidth[param], 30);

  // Draw the stuff
  var addedX = 10;
  for (var i = 0; i < arr.length; i++) {
    if (previousHoverID == 'toolbarTitle_' + i || clickedElementID == 'toolbarTitle_' + i) {
      var col = '#ffffff';
    } else {
      var col = '#aaaaaa';
    }
    Rectangle(param, {
      x: addedX - 5,
      y: 0,
      width: (arr[i][0].length * (fontSize * 6.5)) + 10,
      height: 30,
      id: 'toolbarTitle_' + i,
      color: '#00000000',
    });
    Text(param, {
      txt: arr[i][0],
      x: addedX,
      y: 10,
      color: col
    });

    //let prevID = (clickedElementID == null) ? ((prevClickedElementID == null) ? null : prevClickedElementID) : clickedElementID;
    console.log(prevClickedElementID + '\n' + clickedElementID + '\n---');
    if (clickedElementID == ('toolbarTitle_' + i) || prevClickedElementID == ('toolbarTitle_' + i)) {

      // Calculate dropDown width
      var width = 0;
      for (var m = 1; m < arr[i].length; m++) {
        var tempWidth = (arr[i][m].length * (fontSize * 6.5));
        if (tempWidth > width)
          width = tempWidth;
      }
      width += 10;

      // DropDown height
      var height = arr[i].length * (fontSize * 7) + (arr[i].length * (20 - (fontSize * 7))) - 15;
      Rectangle(param, {
        x: addedX - 5,
        y: 30,
        width: width,
        height: height,
        color: '#aaaaaa',
        radius: 10,
        cornerLocation: 'bl,br'
      });

      for (var j = 0; j < arr[i].length - 1; j++) {
        if (previousHoverID == 'toolbar_' + i + '_' + j) {
          var col = '#ffffff';
        } else {
          var col = '#00000000';
        }
        Rectangle(param, {
          x: addedX - 5,
          y: 30 + (20 * j),
          width: width,
          height: (fontSize * 7) + 10,
          color: col,
          id: 'toolbar_' + i + '_' + j
        });
        Text(param, {
          id: null,
          txt: arr[i][j + 1],
          x: addedX,
          y: 35 + (20 * j),
          color: '#000000'
        });
      }
    }
    addedX += 10 + (arr[i][0].length * (fontSize * 6.5));
  }

  Line(param, {
    startX: 0,
    startY: 29,
    endX: windowWidth[param],
    endY: 29
  });

}


function Checkbox(param, {
  id = null,
  x = 10,
  y = 10
}) {
  idkey = param + '_checkbox_' + id;

  if (clickedElementID == idkey) {
    clickedElementID = null;
    if (checkboxstate[idkey]) {

      checkboxstate[idkey] = false;
      try {
        var func = id + '_switched';
        window[windows[param]][func](false);
      } catch {}
    } else {

      checkboxstate[idkey] = true;
      try {
        var func = id + '_switched';
        window[windows[param]][func](true);
      } catch {}
    }
    drawWindowContents(param);
  }

  if (checkboxstate[idkey]) {
    Icon(param, {
      icon: system_checkbox_true_icon,
      id: idkey,
      x: x,
      y: y,
      size: 2,
      color: '#ffffff'
    });
  } else {
    Icon(param, {
      icon: system_checkbox_false_icon,
      id: idkey,
      x: x,
      y: y,
      size: 2,
      color: '#ffffff'
    });
  }
}
