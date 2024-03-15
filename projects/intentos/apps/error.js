{
  setMetaData('system_error', 500, 270, false);
  let param;
  let title = 'An unexpected error occured'
  let exp = 'If this is an repeating error, try to contact the app developer or the intentOS support.';
  let appParam;

  system_error = new class {
    setup(parameterIndex) {
      param = parameterIndex;
    }
    main(window_width, window_height) {
      let errorDescriptionHeight = (Math.floor((exp.length * (fontSize * 6.5)) / (window_width - 40)) * 20) + 30;
      Icon(param, {
        icon: error_icon,
        x: CENTER,
        y: 30,
        size: 5,
      });
      Text(param, {
        txt: title,
        x: CENTER,
        y: 90,
        width: window_width - 30
      });
      Rectangle(param, {
        x: 10,
        y: 120,
        width: window_width - 20,
        height: errorDescriptionHeight,
        color: '#101010',
        radius: 10
      });
      Text(param, {
        txt: exp,
        x: 20,
        y: 130,
        width: window_width - 40
      });

      Button(param, {
        txt: 'CLOSE',
        id: 'closebutton',
        x: CENTER,
        y: window_height - 50
      });
    }

    closebutton_click() {
      closeWindow(appParam);
      closeWindow(param);
    }

    detailsbutton_click() {
      passData('editor', det);
    }

    loadData(obj) {
      if (obj != '') {
        title = obj[0];
        exp = obj[1];
      }
    }
  }

  var system_error_icon = [
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0]
  ];

  let error_icon = [
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0]
  ];
}
