{
  setMetaData('music', 500, 370);

  let param;
  let playIconX, playIconY;
  let active = 0;
  let playy = true;
  let songs;
  let hoverID;
  let newEntry;
  let searchBarOpen = false;
  let searchString = '';

  music = new class {
    setup(parameterIndex) {
      param = parameterIndex;
    }
    main(window_width, window_height, hoverID) {
      // Window Layout
      if (searchBarOpen) {
        Rectangle(param, {
          x: 10,
          y: 10,
          width: window_width-55,
          height: 30,
          color: '#505050',
          radius: 10
        });
        Input(param, {
          hint: 'Search...',
          id: 'searchinput',
          x: 20,
          y: 20,
          width: window_width - 60,
          height: 30
        });

        if (hoverID == 'search') {
          var col = '#454545'
        } else {
          var col = '#00000000'
        }
        Rectangle(param, {
          x: window_width-37.5,
          y: 10,
          width: 30,
          height: 30,
          id: 'search',
          color: col,
          radius: 10
        });
        Icon(param, {
          icon: close_icon,
          x: window_width - 31,
          y: 16,
          size: 2.5,
          color: '#ffffff'
        });
      } else {
        Text(param, {
          txt: 'New music',
          x: 10,
          y: 20
        });

        if (hoverID == 'search') {
          var col = '#454545'
        } else {
          var col = '#00000000'
        }
        Rectangle(param, {
          x: window_width-37.5,
          y: 10,
          width: 30,
          height: 30,
          id: 'search',
          color: col,
          radius: 10
        });
        Icon(param, {
          icon: search_icon,
          x: window_width - 31,
          y: 16,
          size: 2.5,
          color: '#ffffff'
        });
      }

      songs = ['Thefatrat: Mayday', 'Billie Eilish: Bad Guy', 'Aronchupa: Rave in the Grave', 'Toto: Africa', 'The Offspring: Pretty Fly', 'Alan Walker: Faded', 'Anne-Marie: Friends'];
      if (newEntry != null) {
        songs.unshift(newEntry);
      }

      let secondI = 0;
      for (let i = 0; i < songs.length; i++) {
        let name = songs[i].toLowerCase();
        if (name.includes(searchString.toLowerCase()) || !searchBarOpen) {
          if (active == i) {
            var icon = albumfilled_icon;
            var col = '#606060';
          } else {
            var icon = album_icon;
            var col = '#00000000';
          }

          if (hoverID == ('song' + i) && active != i) {
            col = '#404040';
          }
          Rectangle(param, {
            x: 5,
            y: (secondI * 30) + 47,
            width: window_width - 10,
            height: 28,
            id: ('song' + i),
            color: col,
            radius: 10
          });
          Icon(param, {
            icon: icon,
            x: 10,
            y: (secondI * 30) + 50,
            size: 3,
            color: '#ffffff'
          });
          Text(param, {
            txt: songs[i],
            x: 40,
            y: (secondI * 30) + 55
          });

          secondI++;
        }
      }
      if (secondI == 0) {
        Text(param, {
          txt: 'No search results',
          x: CENTER,
          y: (window_height / 2) - 20
        });
      }

      Rectangle(param, {
        x: 0,
        y: window_height - 70,
        width: window_width,
        height: 70,
        color: '#303030',
        id : 'hider',
        radius: 10,
        cornerLocation: 'bl,br'
      });
      playIconY = (window_height - 40);
      if (hoverID == 'play') {
        var col = '#454545'
      } else {
        var col = '#00000000'
      }
      Rectangle(param, {
        x: CENTER,
        y: playIconY - 15,
        width: 50,
        height: 50,
        color: col,
        id: 'play',
        radius: 10
      });
      Icon(param, {
        icon: (playy) ? pause_icon:play_icon,
        x: CENTER,
        y: playIconY,
        size: 3,
        color: '#ffffff'
      });

      if (hoverID == 'backwards') {
        var col = '#454545'
      } else {
        var col = '#00000000'
      }
      Rectangle(param, {
        x: CENTER-90,
        y: playIconY - 15,
        width: 50,
        height: 50,
        color: col,
        id: 'backwards',
        radius: 10
      });
      Icon(param, {
        icon: backwards_icon,
        x: CENTER-90,
        y: window_height - 40,
        size: 3,
        color: '#ffffff'
      });

      if (hoverID == 'forwards') {
        var col = '#454545'
      } else {
        var col = '#00000000'
      }
      Rectangle(param, {
        x: CENTER+90,
        y: playIconY - 15,
        width: 50,
        height: 50,
        color: col,
        id: 'forwards',
        radius: 10
      });
      Icon(param, {
        icon: forwards_icon,
        x: CENTER+90,
        y: window_height - 40,
        size: 3,
        color: '#ffffff'
      });

      Seekbar(param, {
        id: 'seekbar1',
        x: 10,
        y: window_height - 70,
        width: window_width - 20,
        max: 150,
        progress: 100
      });

    }

    play_click() {
      if (playy) {
        playy = false;
      } else {
        playy = true
      }
    }

    backwards_click() {
      if ((active - 1) >= 0) {
        active--;
        playy = true;
      }
    }

    forwards_click() {
      if ((active) < songs.length - 1) {
        active++;
        playy = true;
      }
    }

    click(id) {

      if (id.includes('song')) {
        active = id.substring(4, 5);
        playy = true;
        searchBarOpen = false;
      }
    }

    loadData(dat) {
      newEntry = dat;
    }

    search_click() {
      searchBarOpen = !searchBarOpen;
      searchString = '';
    }

    searchinput_enterPress(str) {
      searchString = str;
    }

    seekbar1_seeked(progress) {
      console.log(progress);
    }

  }

  var music_icon = [
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0]
  ];


  let pause_icon = [
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1]
  ]

  let play_icon = [
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
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

  let album_icon = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
  ];

  let albumfilled_icon = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
  ];

  let search_icon = [
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
  ];

  let close_icon = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
  ];
}
