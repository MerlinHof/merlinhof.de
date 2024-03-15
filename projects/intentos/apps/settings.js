{
  setMetaData('settings', 300, 320, true);
  let param;

  settings = new class {
    setup(parameterIndex) {
      param = parameterIndex
      if (localStorage['settings_lightmode'] == 'true') {
        setChecked(param, 'checkbox_lightmode', true);
      }
    }
    main(window_width, window_height) {

      Text(param, {
        txt: 'Design',
        x: 10,
        y: 20,
        color: '#909090'
      });
      Text(param, {
        txt: 'Lightmode',
        x: 10,
        y: 40
      });
      Checkbox(param, {
        id: 'checkbox_lightmode',
        x: window_width - 30,
        y: 40
      });

      Text(param, {
        txt: 'Coming soon',
        x: 10,
        y: 60
      });
      Checkbox(param, {
        id: 'checkbox1',
        x: window_width - 30,
        y: 60
      });

      // Reset Button
      Button(param, {
        txt: 'Reset all',
        x: CENTER,
        y: window_height - 60,
        id: 'reset_button'
      });
    }

    reset_button_click() {
      window.localStorage.clear();
    }

    checkbox_lightmode_switched(isChecked) {
      localStorage['settings_lightmode'] = isChecked;
      toggleLightmode(isChecked);
    }
  }


  var settings_icon = [
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
}
