{
  setMetaData('graphs', 400, 130, false);
  let param;

  graphs = new class {
    setup(parameterIndex) {
      param = parameterIndex;
    }

    main(window_width, window_height) {
      // Title
      Text(param, {
        txt: 'sinus / cosinus',
        x: 10,
        y: 10
      });
      Line(param, {
        startX: 0,
        startY: window_height / 2 + 15,
        endX: window_width,
        endY: window_height / 2 + 15
      });

      // Draw cosinus
      var lastx = 10;
      var lasty = 0;
      for (var i = 0; i < window_width; i++) {
        var x = i;
        var y = Math.cos(i / 10.0) * 20;
        if (lastx != 0 && lasty != 0)
          Line(param, {
            startX: lastx,
            startY: lasty + window_height / 2 + 15,
            endX: x,
            endY: y + window_height / 2 + 15,
            color: '#606060'
          });
        lastx = x;
        lasty = y;
      }

      // Draw sinus
      var lastx = 0;
      var lasty = 0;
      for (var i = 0; i < window_width; i++) {
        var x = i;
        var y = Math.sin(i / 10.0) * 20;
        if (lastx != 0 && lasty != 0)
          Line(param, {
            startX: lastx,
            startY: lasty + window_height / 2 + 15,
            endX: x,
            endY: y + window_height / 2 + 15,
            color: '#ffffff'
          });
        lastx = x;
        lasty = y;
      }
    }

  }

  var graphs_icon = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0],
    [1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0],
    [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];
}
