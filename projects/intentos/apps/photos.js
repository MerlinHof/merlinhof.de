{
  setMetaData('photos', 500, 250, false);
  let param;
  let arr = new Array();
  let cloudX = new Array();
  let cloudY = new Array();
  let lastWidth = 0;
  let sunX = 150;
  let sunY = 100;
  let rayLength = 50;

  photos = new class {
    setup(parameterIndex) {
      param = parameterIndex;

      // Add random mountains
      for (let i = 0; i < screen.width / 28; i++) {
        arr.push(random(3));
      }
    }
    main(window_width, window_height, hoverID) {

      Rectangle(param, {
        x: CENTER,
        y: 20,
        width: window_width - 150,
        height: window_height - 40,
        color: '#404040',
        borderColor: '#454545',
        radius: 10
      });

      // Draw Sun
      Icon(param, {
        icon: sun_icon,
        x: sunX - ((4 * 11) / 3),
        y: sunY - ((4 * 11) / 3),
        size: 4,
        color: '#ffffff'
      });
      for (let i = 0; i < 36; i++) {
        let deg = i * 10;
        let rad = (2 * Math.PI * deg) / 360;
        let rayLen = rayLength - ((i % 2) * 5);
        Line(param, {
          startX: sunX,
          startY: sunY,
          endX: (Math.cos(rad) * rayLen) + sunX,
          endY: (Math.sin(rad) * rayLen) + sunY,
          color: '#999999'
        });
      }

      Rectangle(param, {
        x: CENTER,
        y: window_height - 40,
        width: window_width - 150,
        height: 20,
        color: '#aaaaaa',
        radius: 10,
        cornerLocation: 'bl,br'
      });

      // Draw mountains
      for (let i = 0; i < (window_width-150) / 28; i++) {
        let rnd = arr[i];
        Icon(param, {
          icon: (rnd == 0) ? mountain1_icon : (rnd == 1) ? mountain2_icon : mountain3_icon,
          x: (i * 28) + 75,
          y: window_height - 65,
          size: 4,
          color: '#aaaaaa'
        });
      }
      Rectangle(param, {
        x: window_width - 75,
        y: 20,
        width: 75,
        height: window_height - 40,
        color: '#303030'
      });
      Rectangle(param, {
        x: 10,
        y: window_height - 20,
        width: window_width - 20,
        height: 20,
        color: '#303030'
      });


      // Back ICON
      if (hoverID == 'forwards') {
        var col = '#454545'
      } else {
        var col = '#00000000'
      }
      Rectangle(param, {
        x: window_width - 60,
        y: (window_height/2)-(33/2)-15,
        width: 50,
        height: 50,
        color: col,
        id: 'forwards',
        radius: 10
      });
      Icon(param, {
        icon: forwards_icon,
        x: window_width - 45,
        y: (window_height/2)-(33/2),
        size: 3,
        color: '#ffffff'
      });


      // Forwards Icon
      if (hoverID == 'backwards') {
        var col = '#454545'
      } else {
        var col = '#00000000'
      }
      Rectangle(param, {
        x: 10,
        y: (window_height/2)-(33/2)-15,
        width: 50,
        height: 50,
        color: col,
        id: 'backwards',
        radius: 10
      });
      Icon(param, {
        icon: backwards_icon,
        x: 22.5,
        y: (window_height/2)-(33/2),
        size: 3,
        color: '#ffffff'
      });

    }

    backwards_click() {
      Hint('No more images', true);
    }
    forwards_click() {
      Hint('No more images', true);
    }
  }

  var photos_icon = [
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
  ];

  let mountain1_icon = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1],
    [0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  let mountain2_icon = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  let mountain3_icon = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  let sun_icon = [
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0]
  ];

  let forwards_icon = [
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0]
  ];

  let backwards_icon = [
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0]
  ];
}
