// Prepare Canvas
var canvas = document.getElementById("myCanvas");
var height = screen.height;
var width = canvas.clientWidth;
canvas.width = height * (width / height);
canvas.height = width * (height / width);
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#404040";

// Load custom App
console.log('');
console.log('%c--------------------', 'color: orange; font-weight: bold;');
console.log('%cWelcome to intentOS!', 'color: orange; font-weight: bold;');
console.log('%c--------------------', 'color: orange; font-weight: bold;');
console.log('');
console.log('Inserting custom app code...');
console.log(localStorage['customApp'] || 'No code found!');
eval(localStorage['customApp'] || '');
console.log('');

// Load file tree
//fileLocator = localStorage['fileLocator'] || fileLocator;

// Define Variables
var focusIndex;
var radius = 10; // Do not change
var dockWidth = dockApps.toString().match(/true/g).length * 71.25;
var dockX = canvas.width / 2 - dockWidth / 2;
var dockY = canvas.height - dockHeight;
var dragOffset;
var mousedown = false;
var dragdown = false;
var resizeDown = false;
var startWidth, startHeight;
var click = false;
var clickedInWindow = false;
var tempWindows = new Array();
var additionalHitBoxArea = 2;
var previousHoverID;
var seekbarStart = null;

// ----------------------------------------------------------------------------------------------------------------------------
// Prepare window parameters
for (var i = 0; i < windows.length; i++) {
  fullscreen[i] = false;
  windowVisible[i] = false;
}
drawDock();

// ----------------------------------------------------------------------------------------------------------------------------
// Lightmode / Darkmode
if (localStorage['settings_lightmode'] == 'true') {
  toggleLightmode(true);
} else {
  toggleLightmode(false);
}

// ----------------------------------------------------------------------------------------------------------------------------
// DRAW WINDOWS IN FOCUS ORDER
function drawWindows() {
  for (var i = 0; i < focusHierachy.length; i++) {
    if (focusHierachy[i] != undefined) {

      if (focusIndex == focusHierachy[i]) {
        focus = true;
      } else {
        focus = false;
      }

      drawWindow(windowX[focusHierachy[i]], windowY[focusHierachy[i]], windowWidth[focusHierachy[i]], windowHeight[focusHierachy[i]], focus, fullscreen[focusHierachy[i]], focusHierachy[i]);
      drawWindowContents(focusHierachy[i]);
    }
  }


}

// ----------------------------------------------------------------------------------------------------------------------------
// DRAW DOCK
function drawDock() {
  Rectangle(null, {
    x: dockX,
    y: canvas.height - dockHeight,
    width: dockWidth,
    height: dockHeight,
    color: '#303030',
    radius: 10,
    cornerLocation: 'tl, tr'
  });

  var offset = 0;
  for (var i = 0; i < windows.length; i++) {
    if (dockApps[i] == true) {
      if (smartInvert) {
        if (windowVisible[i]) {
          ctx.fillStyle = adjustColor('#000000');
        } else {
          ctx.fillStyle = adjustColor('#202020');
        }
      } else {
        if (windowVisible[i]) {
          ctx.fillStyle = adjustColor('#505050');
        } else {
          ctx.fillStyle = adjustColor('#252525');
        }
      }

      // Drack Dock Icon background circles
      ctx.beginPath();
      ctx.arc((dockX + 40 + (70 * i) - offset * 70), dockY + dockHeight / 2, 30, 0, 2 * Math.PI);
      ctx.fill();

      // Draw Dock Icons
      if (windowVisible[i]) {
        var col = '#ffffff'
      } else {
        var col = '#aaaaaa';
      }
      var iconname = windows[i];
      var x = (dockX + 25 + (70 * i) - offset * 70);
      Icon(null, {
        icon: iconname,
        x: x,
        y: dockY + dockHeight / 2 - 13,
        size: 4,
        color: col
      });

      dockAppsPos.push(x);
      dockAppsNam.push(windows[i]);
    } else {
      // Fill gaps from non-dock Apps
      offset++;
    }
  }
}

// ----------------------------------------------------------------------------------------------------------------------------
// MOUSE ELEMENTS
var downX;
var downY;
var windowIndex = 0;
document.body.addEventListener('mousedown', e => {
  if (e.button == 0) {
    click = true;
    downX = e.clientX;
    downY = e.clientY;
    clickedInWindow = false;
    tempWindows = [];
    mousedown = true;

    // Clear cursor
    if (inputtext[textInputFocus] != undefined) {
      inputtext[textInputFocus] = inputtext[textInputFocus].replace('⏙', '');
    }
    textInputFocus = null;

    var offset = 0; // To skip non-dock Apps
    var clickedClose = false;
    for (var i = 0; i < windows.length; i++) {

      // Close button
      if (downX > windowX[i] && (downX < windowX[i] + 20) && downY > windowY[i] && downY < (windowY[i] + 20)) {
        if ((focusHierachy[focusHierachy.length - 1] == i)) {
          closeWindow(i);
          clickedClose = true;
        }
      }

      // Fullscreen Button
      if ((downX < windowX[i] + 40) && downX > windowX[i] + 20 && downY > windowY[i] && downY < (windowY[i] + 20)) {
        if (windowVisible[i] && (focusHierachy[focusHierachy.length - 1] == i)) {
          if (fullscreen[i]) {

            var distLeft = originalWindowX[i];
            var distTop = originalWindowY[i];
            var distRight = canvas.width - originalWindowX[i] - originalWindowWidth[i];
            var distBottom = canvas.height - originalWindowY[i] - originalWindowHeight[i] - dockHeight - 5;

            var leftSpeed = distLeft / frameCount;
            var topSpeed = distTop / frameCount;
            var rightSpeed = (distRight / frameCount) + leftSpeed;
            var bottomSpeed = (distBottom / frameCount) + topSpeed;

            // Animate fullscreen off
            (function myLoop(k) {
              setTimeout(function() {

                ctx.clearRect(windowX[i] - 1, windowY[i] - 1, windowWidth[i] + 2, windowHeight[i] + 2);
                windowWidth[i] -= rightSpeed;
                windowHeight[i] -= bottomSpeed;
                windowX[i] += leftSpeed;
                windowY[i] += topSpeed;
                drawWindows();

                if (--k) myLoop(k);
              }, 16.6667) // Time between frames
            })(frameCount); // Frame count

            setTimeout(function() {
              windowVisible[i] = true;
              fullscreen[i] = false;
              ctx.clearRect(0, 0, canvas.width, canvas.height - dockHeight);
              drawWindows();
            }, 100)
          } else {
            // Save window data to apply after fullscreen off
            originalWindowWidth[i] = windowWidth[i];
            originalWindowHeight[i] = windowHeight[i];
            originalWindowX[i] = windowX[i];
            originalWindowY[i] = windowY[i];

            var distLeft = windowX[i];
            var distTop = windowY[i];
            var distRight = canvas.width - windowX[i] - windowWidth[i];
            var distBottom = canvas.height - windowY[i] - windowHeight[i] - dockHeight - 5;

            var leftSpeed = distLeft / frameCount;
            var topSpeed = distTop / frameCount;
            var rightSpeed = ((distRight / frameCount) + leftSpeed);
            var bottomSpeed = ((distBottom / frameCount) + topSpeed);

            // Animate fullscreen on
            (function myLoop(k) {
              setTimeout(function() {

                windowWidth[i] += rightSpeed;
                windowHeight[i] += bottomSpeed;
                windowX[i] -= leftSpeed;
                windowY[i] -= topSpeed;
                drawWindows();

                if (--k) myLoop(k);
              }, 16.6667) // Time between frames
            })(frameCount); // Frame count

            setTimeout(function() {
              windowVisible[i] = true;
              fullscreen[i] = true;
              drawWindows();
            }, 100)


          }
        }
      }

      // Click Elements in Window
      if ((downX > windowX[i]) && (downX < (windowX[i] + windowWidth[i])) && (downY > windowY[i] + 0) && (downY < (windowY[i] + windowHeight[i]))) {
        if (windowVisible[i]) {
          clickedInWindow = true;
          tempWindows.push(i);
        }
      }

      // Open button (skip non-dock Apps)
      if (downY > (canvas.height - dockHeight) && downX > dockX && downX < (dockX + dockWidth)) {
        if (dockApps[i] == true) {
          if (Math.sqrt(Math.pow(Math.abs((dockX + 40 + (70 * i) - offset * 70) - downX), 2) + Math.pow(Math.abs((dockY + dockHeight / 2) - downY), 2)) < 30) { // Check if clicked in dock icon
            openWindowByParameter(i);
          }
        } else {
          offset++;
        }
      }
    }

    // Click Elements in Window (outside of loop) !!
    if (clickedInWindow && !clickedClose) {

      // Get view on top of stack
      var topWindowIndex = undefined;
      if (tempWindows.length > 1) {
        var prevMax = 0;
        for (var m = 0; m < tempWindows.length; m++) {
          if (focusHierachy.indexOf(tempWindows[m]) > prevMax) {
            prevMax = focusHierachy.indexOf(tempWindows[m]);
            topWindowIndex = tempWindows[m];
          }
        }
      } else {
        topWindowIndex = tempWindows[0];
      }

      var i = topWindowIndex;
      windowIndex = i;
      rearrangeFocusHierachy(i);
      dragOffset = downX - windowX[i];
      prevClickedElementID = clickedElementID;
      clickedElementID = null;
      if (i == focusIndex) {
        drawWindows();
      }

      // Drag Window
      if (downX > (windowX[i]) && downX < windowX[i] + windowWidth[i] && downY > windowY[i] && downY < (windowY[i] + 20)) {
        if (windowVisible[i]) {
          dragdown = true;
        }
      } else {

        // ClickListener
        if (windowVisible[i]) {
          if (focusIndex == i) {
            for (var m = elements.length - 1; m >= 0; m--) {
              if (downX >= (elements[m][1] - additionalHitBoxArea) && downX <= (elements[m][1] + elements[m][3] + additionalHitBoxArea) && downY >= (elements[m][2] - additionalHitBoxArea) && downY <= (elements[m][2] + elements[m][4] + additionalHitBoxArea)) {
                clickedElementID = elements[m][0];
                prevClickedElementID = null;

                // Call clickFunctions in App
                try {
                  var name = windows[i];
                  var func = elements[m][0].toLowerCase() + '_click'
                  window[name][func]();
                } catch (e) {
                  error(i, e.toString());
                }

                try {
                  var name = windows[i];
                  var func = 'click';
                  window[name][func](elements[m][0].toLowerCase());
                } catch (e) {}

                // Allow max. one click at once
                break;
              }
            }
          }

          drawWindowContents(focusIndex);

          // Resize Window
          if (downX > (windowX[i] + windowWidth[i] - 20) && downY > (windowY[i] + windowHeight[i] - 20)) {
            if (!fullscreen[i]) {
              windowIndex = i;
              resizeDown = true;
              startHeight = windowHeight[i];
              startWidth = windowWidth[i];
            }
          }
        }
      }
    } else {
      clickedElementID = null;
      textInputFocus = null;
      drawWindowContents(focusIndex);
    }
  }
});

document.body.addEventListener('mouseup', e => {
  click = false;
  mousedown = false;
  resizeDown = false;
  dragdown = false;
  seekbarStart = null;
  if (seekbarIsCurrentlyDragged) {
    seekbarIsCurrentlyDragged = false;
    drawWindowContents(focusIndex);
  }
});

document.body.addEventListener('mousemove', e => {
  currentMousePosition = [e.clientX, e.clientY];

  // Seekbars
  if (focusIndex != null && clickedElementID != null) {
    if (mousedown && clickedElementID.includes(focusIndex + '_seekbar_')) {
      if (seekbarStart == null) {
        if (seekbarProgress[clickedElementID] == undefined) {
          seekbarProgress[clickedElementID] = 0;
        }
        seekbarStart = seekbarProgress[clickedElementID];
      }

      let deltaX = e.clientX - downX;
      seekbarProgress[clickedElementID] = seekbarStart + deltaX;
      seekbarIsCurrentlyDragged = true;
      drawWindowContents(focusIndex);
    }
  }

  // Custom cursor
  document.getElementById("cursor").style.left = e.clientX - 3.5; // 3.5 is half of cursor height
  document.getElementById("cursor").style.top = e.clientY - 3.5;

  // DRAG WINDOWS (only if not fullscreen)
  if (dragdown && !fullscreen[windowIndex]) {
    posX = e.clientX;
    posY = e.clientY - 10; // Grab vertical center in the top bar
    if (posY + windowHeight[windowIndex] < (canvas.height - dockHeight - 5)) {
      ctx.clearRect(windowX[windowIndex], windowY[windowIndex], windowWidth[windowIndex], windowHeight[windowIndex]);
      windowX[windowIndex] = posX - dragOffset;
      windowY[windowIndex] = posY;
      focusIndex = windowIndex;
      drawWindows();
    } else {
      ctx.clearRect(windowX[windowIndex], windowY[windowIndex], windowWidth[windowIndex], windowHeight[windowIndex]);
      windowX[windowIndex] = posX - dragOffset;
      windowY[windowIndex] = (canvas.height - dockHeight - windowHeight[windowIndex] - 5);
      focusIndex = windowIndex;
      drawWindows();
    }
  }

  // Resize window
  if (resizeDown) {
    ctx.clearRect(windowX[windowIndex], windowY[windowIndex], windowWidth[windowIndex], windowHeight[windowIndex]);
    if ((windowY[windowIndex] + startHeight + (e.clientY - downY)) < (canvas.height - dockHeight - 5)) {
      if (startHeight + (e.clientY - downY) > 100) { // Window min height
        windowHeight[windowIndex] = startHeight + (e.clientY - downY);
      } else {
        windowHeight[windowIndex] = 100;
      }
    } else {
      windowHeight[windowIndex] = (canvas.height - dockHeight - 5) - windowY[windowIndex];
    }
    if (startWidth + (e.clientX - downX) > 200) { // Window min width
      windowWidth[windowIndex] = startWidth + (e.clientX - downX);
    } else {
      windowWidth[windowIndex] = 200;
    }
    drawWindows();
  }

  // Hover
  hover = false;
  var par;
  if (!resizeDown && !dragdown) {
    var hover = false;
    for (var m = elements.length - 1; m >= 0; m--) {
      if (e.clientX >= elements[m][1] - additionalHitBoxArea && e.clientX <= (elements[m][1] + elements[m][3] + additionalHitBoxArea) && e.clientY >= elements[m][2] - additionalHitBoxArea && e.clientY <= (elements[m][2] + elements[m][4] + additionalHitBoxArea)) {
        hover = true;
        par = m;
        break;
      }
    }

    // Call Window functions
    if (hover && (elements[par][0] != previousHoverID) && windowVisible[focusIndex] && focusIndex != undefined) {
      //console.log('Hovering: ' + elements[par][0]);
      previousHoverID = elements[par][0];
      drawWindowContents(focusIndex);
    } else if (!hover && previousHoverID != null && focusIndex != undefined) {
      previousHoverID = null;
      drawWindowContents(focusIndex);
    }

    // Hover Dock Icons
    if (e.clientY > screen.height - dockHeight) {
      offset = 0;
      var hover = false;
      var hoverX = 0;
      var hoverI = 0;
      for (var i = 0; i < dockApps.length; i++) {
        if (dockApps[i] == true) {
          var x = (dockX + 40 + (70 * i) - offset * 70);
          if (Math.sqrt(Math.pow(Math.abs(x - e.clientX), 2) + Math.pow(Math.abs((dockY + dockHeight / 2) - e.clientY), 2)) < 30) { // Check if hovered over dock icon
            hover = true;
            hoverX = x;
            hoverI = i;
          }
        } else {
          offset++;
        }
      }

      if (hover) {
        if (hoverI != prevHoverI) {
          ctx.clearRect(dockX - 100, screen.height - dockHeight - 55, dockWidth + 200, 50);
          drawWindows();
          prevHoverI = hoverI;
          Rectangle(null, {
            x: hoverX - 60,
            y: screen.height - dockHeight - 50,
            width: 120,
            height: 30,
            color: '#aaaaaa',
            radius: 10
          });
          Text(null, {
            txt: windows[hoverI],
            x: CENTEROVER(hoverX),
            y: screen.height - dockHeight - 40,
            color: '#000000'
          });
          Icon(null, {
            icon: system_arrow_icon,
            x: CENTEROVER(hoverX),
            y: screen.height - dockHeight - 20,
            size: 2,
            color: '#aaaaaa'
          });
        }
      } else if (hoverI != null) {
        hoverI = null;
        prevHoverI = -2;
        ctx.clearRect(dockX - 100, screen.height - dockHeight - 55, dockWidth + 200, 50);
        drawWindows();
      }
    } else if (prevHoverI != null) {
      prevHoverI = null;
      ctx.clearRect(dockX - 100, screen.height - dockHeight - 55, dockWidth + 200, 50);
      drawWindows();
    }

  }
});


// ----------------------------------------------------------------------------------------------------------------------------
// Keyboard
document.addEventListener('keydown', function(event) {
  //console.log('KEYCODE: ' + event.keyCode + '   KEYSTRING: ' + event.key);

  // Disable cursor blinking while typing
  cursorOn = true;
  skipNextBlink = true;

  // Start fullscreen
  if (event.keyCode == 70) {
    enterFullscreen(document.documentElement);
  }

  // Remove cursor
  if (textInputFocus != undefined) {
    inputtext[textInputFocus] = inputtext[textInputFocus].replace('⏙', '');

    if (event.keyCode != 37 && event.keyCode != 16) {
      cursorPosition++;
    }

    switch (event.keyCode) {
      case 8: // Backspace
        inputtext[textInputFocus] = inputtext[textInputFocus].substring(0, cursorPosition - 2) + inputtext[textInputFocus].substring(cursorPosition - 1, inputtext[textInputFocus].length);
        cursorPosition -= 2;
        break;
      case 16: // Shift
        break;
      case 13: // Enter
        try {
          var func = textInputFocus.substring(textInputFocus.indexOf('_textinput_') + 11, textInputFocus.length) + '_enterPress';
          window[windows[textInputFocus.substring(0, textInputFocus.indexOf('_'))]][func](inputtext[textInputFocus]);
          //inputtext[textInputFocus] = '';
          inputtext[textInputFocus] = inputtext[textInputFocus].replace('⏙', '');
          textInputFocus = undefined;
        } catch (e) {
          // Add new line
          if (!isSingleline[textInputFocus]) {
            var char = '⇩';
            inputtext[textInputFocus] = inputtext[textInputFocus].substring(0, cursorPosition - 1) + char + inputtext[textInputFocus].substring(cursorPosition - 1, inputtext[textInputFocus].length);
          }
        }
        break;
      case 39: // Move cursor to the right
        break;
      case 37: // Move cursor to the left
        cursorPosition--;
        break;
      default:
        // Add char to the text
        var char = event.key;
        if (char.toString().length > 1) {
          char = '';
          cursorPosition--;
        }
        if (event.keyCode == 9) {
          char = '  ';
          cursorPosition++;
        }
        inputtext[textInputFocus] = inputtext[textInputFocus].substring(0, cursorPosition - 1) + char + inputtext[textInputFocus].substring(cursorPosition - 1, inputtext[textInputFocus].length);
        if (event.keyCode == 9) {
          cursorPosition++;
        }
        break;
    }

    if (textInputFocus != undefined) {
      // Dont 'overflow' cursor left and right
      if (cursorPosition < 0)
        cursorPosition = 0;
      if (cursorPosition > inputtext[textInputFocus].length)
        cursorPosition = inputtext[textInputFocus].length;

      // Add cursor
      //inputtext[textInputFocus] = inputtext[textInputFocus].substring(0, cursorPosition) + '⏙' + inputtext[textInputFocus].substring(cursorPosition, inputtext[textInputFocus].length);
    }

    // Redraw focus window content
    if (windowVisible[focusIndex]) {
      drawWindowContents(focusIndex);
    }
  }

  // Call textfunctions in Apps
  try {
    var fctn = windows[focusIndex];
    var keyString = event.key;
    var keyCode = event.keyCode;

    switch (keyCode) {
      case 186:
        keyString = ':';
        break;
      case 189:
        keyString = '-';
        break;
    }

    window[fctn]['keyPress'](keyCode, keyString);

    drawWindowContents(focusIndex);
  } catch (e) {}

  if (event.keyCode != 123 && event.keyCode != 91 && event.keyCode != 16 && event.keyCode != 82 && event.keyCode != 17 && event.keyCode != 73) {
    event.preventDefault();
  }

});


// ----------------------------------------------------------------------------------------------------------------------------
// Disable right click menu
document.addEventListener('contextmenu', function(ev) {
  ev.preventDefault();
  return false;
}, false);


// Blinking cursor
setInterval(blinkingCursor, 500);

function blinkingCursor() {
  if (textInputFocus != undefined && textInputFocus != null) {
    if (!skipNextBlink) {
      if (cursorOn) {
        cursorOn = false;
        if (windowVisible[focusIndex]) {
          drawWindowContents(focusIndex);
        }
      } else {
        cursorOn = true;
        if (windowVisible[focusIndex]) {
          drawWindowContents(focusIndex);
        }
      }
    } else {
      skipNextBlink = false;
    }
  }
}
