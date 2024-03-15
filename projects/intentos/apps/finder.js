{
  setMetaData('finder', 550, 280);
  let param;
  let selectY = 35;
  let activeTab = 'tab_desktop';
  let clickedID;
  let path = '';
  let obj = fileLocator;

  finder = new class {
    setup(parameterIndex) {
      param = parameterIndex;
    }

    main(window_width, window_height, hoverID) {

      // Sidebar
      var col = '#505050';
      Rectangle(param, {
        x: 0,
        y: 0,
        width: 120,
        height: window_height,
        color: col,
        radius: 10,
        cornerLocation: 'bl'
      });
      Line(param, {
        startX: 119,
        startY: 0,
        endX: 119,
        endY: window_height
      });
      Line(param, {
        startX: 120,
        startY: 0,
        endX: window_width,
        endY: 0
      });

      // Highlight selected tab
      Rectangle(param, {
        x: 0,
        y: selectY,
        width: 120,
        height: 20,
        color: '#808080',
      });



      // Tabs
      Text(param, {
        txt: 'Locations',
        x: 10,
        y: 15,
        color: '#aaaaaa'
      });

      // Desktop tab
      Rectangle(param, {
        x: 0,
        y: 35,
        width: 120,
        height: 20,
        color: '#00000000',
        id: 'tab_desktop'
      });
      Text(param, {
        txt: 'Desktop',
        x: 30,
        y: 40,
      });
      Icon(param, {
        icon: desktop_icon,
        x: 10,
        y: 40,
        size: fontSize,
        color: '#ffffff'
      });

      // App tab
      Rectangle(param, {
        x: 0,
        y: 55,
        width: 120,
        height: 20,
        color: '#00000000',
        id: 'tab_apps'
      });
      Text(param, {
        txt: 'Apps',
        x: 30,
        y: 60,
      });
      Icon(param, {
        icon: apps_icon,
        x: 10,
        y: 60,
        size: fontSize,
        color: '#ffffff'
      });

      // SSD tab
      Rectangle(param, {
        x: 0,
        y: 75,
        width: 120,
        height: 20,
        color: '#00000000',
        id: 'tab_ssd'
      });
      Text(param, {
        txt: 'SSD',
        x: 30,
        y: 80,
      });
      Icon(param, {
        icon: ssd_icon,
        x: 10,
        y: 80,
        size: fontSize,
        color: '#ffffff'
      });

      // USB tab
      Rectangle(param, {
        x: 0,
        y: 95,
        width: 120,
        height: 20,
        color: '#00000000',
        id: 'tab_usb'
      });
      Text(param, {
        txt: 'USB',
        x: 30,
        y: 100,
      });
      Icon(param, {
        icon: usb_icon,
        x: 10,
        y: 100,
        size: fontSize,
        color: '#ffffff'
      });

      // Title 2
      Text(param, {
        txt: 'Filetype',
        x: 10,
        y: 130,
        color: '#aaaaaa'
      });

      // Docs tab
      Rectangle(param, {
        x: 0,
        y: 155,
        width: 120,
        height: 20,
        color: '#00000000',
        id: 'tab_docs'
      });
      Text(param, {
        txt: 'Docs',
        x: 30,
        y: 160,
      });
      Icon(param, {
        icon: documents_icon,
        x: 10,
        y: 160,
        size: fontSize,
        color: '#ffffff'
      });

      // Videos tab
      Rectangle(param, {
        x: 0,
        y: 175,
        width: 120,
        height: 20,
        color: '#00000000',
        id: 'tab_videos'
      });
      Text(param, {
        txt: 'Videos',
        x: 30,
        y: 180,
      });
      Icon(param, {
        icon: videos_icon,
        x: 10,
        y: 180,
        size: fontSize,
        color: '#ffffff'
      });

      // Pictures tab
      Rectangle(param, {
        x: 0,
        y: 195,
        width: 120,
        height: 20,
        color: '#00000000',
        id: 'tab_pictures'
      });
      Text(param, {
        txt: 'Pictures',
        x: 30,
        y: 200,
      });
      Icon(param, {
        icon: pictures_icon,
        x: 10,
        y: 200,
        size: fontSize,
        color: '#ffffff'
      });

      // Music tab
      Rectangle(param, {
        x: 0,
        y: 215,
        width: 120,
        height: 20,
        color: '#00000000',
        id: 'tab_music'
      });
      Text(param, {
        txt: 'Music',
        x: 30,
        y: 220,
      });
      Icon(param, {
        icon: note_icon,
        x: 10,
        y: 220,
        size: fontSize,
        color: '#ffffff'
      });



      // Currently hovered tab
      if (hoverID != null) {
        if (hoverID.includes('tab_') && hoverID != activeTab) {
          Rectangle(param, {
            x: 0,
            y: getPositionY(hoverID) + 5,
            width: 5,
            height: 10,
            color: '#ffffff'
          });
        }
      }



      // HARD DRIVE
      if (activeTab == 'tab_ssd') {
        var folders = new Array();

        var cnt = 0;
        while (Object.keys(obj.root)[cnt] != undefined) {
          folders.push(Object.keys(obj.root)[cnt]);
          cnt++;
        }

        if (clickedID.includes('folder_') && path == '') {
          path = clickedID.substring(7, clickedID.length);
        }

        var str = 'obj.root' + path + '';
        folders = [];

        var cnt = 0;
        while (Object.keys(eval(str))[cnt] != undefined) {
          var fol = Object.keys(eval(str))[cnt];
          folders.push(fol);
          cnt++;
        }

        // Draw layout
        if (path.length - path.replace('.', '').length >= 1) {
          var textX = 150;
          Icon(param, {
            icon: stepback_icon,
            id: 'ssd_back',
            x: 130,
            y: 15,
            size: fontSize,
            color: '#ffffff'
          });
        } else {
          var textX = 130;
        }

        let el_str;
        if (folders.length == 1) {
          el_str = '1 Element';
        } else {
          el_str = folders.length + ' Elements';
        }
        Text(param, {
          txt: el_str,
          x: textX,
          y: 15,
        });

        // Button
        if (hoverID == 'newfolder') {
          var col = '#aaaaaa';
          var col2 = '#000000';
        } else {
          var col = '#505050';
          var col2 = '#ffffff';
        }
        Rectangle(param, {
          x: window_width-150,
          y: 10,
          width: 140,
          height: 20,
          color: col,
          id: 'newfolder',
          radius: 'max'
        });
        Icon(param, {
          icon: newfolder_icon,
          x: window_width - 140,
          y: 15,
          size: fontSize,
          color: col2
        });
        Text(param, {
          txt: 'New folder',
          x: window_width - 120,
          y: 15,
          color: col2
        });

        for (var i = 0; i < folders.length; i++) {
          if (hoverID == 'folder_' + folders[i] || hoverID == 'picture_' + folders[i] || hoverID == 'video_' + folders[i] || hoverID == 'doc_' + folders[i] || hoverID == 'music_' + folders[i] || hoverID == 'unknown_' + folders[i]) {
            var col = '#ffffff';
          } else {
            var col = '#909090';
          }

          let id, prefix;
          if (folders[i].includes('.png')) {
            id = 'picture_' + folders[i];
            prefix = '-';
          } else if (folders[i].includes('.mp4')) {
            id = 'video_' + folders[i];
            prefix = '-';
          } else if (folders[i].includes('.doc')) {
            id = 'doc_' + folders[i];
            prefix = '-';
          } else if (folders[i].includes('.mp3')) {
            id = 'music_' + folders[i];
            prefix = '-';
          } else if (folders[i].includes('.')) {
            id = 'unknown_' + folders[i];
            prefix = '-';
          } else {
            id = 'folder_' + folders[i];
            prefix = '>';
          }
          Text(param, {
            id: id,
            txt: prefix + ' ' + folders[i],
            x: 130,
            y: (i * 20) + 40,
            color: col
          });
        }
      }

      // Tab Desktop
      if (activeTab == 'tab_desktop') {
        var desk = new Array();
        var lines = 0;
        var iks = 0;

        var cnt = 0;
        while (Object.keys(obj.root.user.desktop)[cnt] != undefined) {
          var fileName = (Object.keys(obj.root.user.desktop)[cnt]);
          if (fileName.includes('.'))
            fileName = fileName.substring(0, fileName.indexOf('.')); // Remove Suffix
          if (fileName.length > 7)
            fileName = fileName.substring(0, 6) + '-';
          desk.push(fileName);
          cnt++;
        }

        Text(param, {
          txt: desk.length + ' Items',
          x: 130,
          y: 15
        });
        Line(param, {
          startX: 120,
          startY: 40,
          endX: window_width,
          endY: 40
        });

        for (var i = 0; i < desk.length; i++) {
          iks += 80;
          if (i % Math.round(((window_width - 130) / 80) - 0.1) == 0) {
            lines++;
            iks = 160;
          }
          if (hoverID == 'desktopitem_' + desk[i]) {
            var col = '#505050'
          } else {
            var col = '#00000000'
          }
          Rectangle(param, {
            x: iks - 37.5,
            y: lines * 65 - 12.5,
            width: 75,
            height: 60,
            color: col,
            id: 'desktopitem_' + desk[i],
            radius: 10
          });
          Icon(param, {
            icon: desktopitem_icon,
            x: CENTEROVER(iks),
            y: lines * 65 - 5,
            size: 4,
            color: '#ffffff'
          });
          Text(param, {
            txt: desk[i],
            x: CENTEROVER(iks),
            y: lines * 65 + 30,
            color: '#aaaaaa'
          });
        }
      }


      // IMAGES
      if (activeTab == 'tab_pictures') {
        var pictures = new Array();
        var lines = 0;
        var iks = 0;

        var cnt = 0;
        while (Object.keys(obj.root.user.pictures)[cnt] != undefined) {
          var fileName = (Object.keys(obj.root.user.pictures)[cnt]);
          if (fileName.includes('.'))
            fileName = fileName.substring(0, fileName.indexOf('.')); // Remove Suffix
          pictures.push(fileName);
          cnt++;
        }

        Text(param, {
          txt: pictures.length + ' Images',
          x: 130,
          y: 15
        });
        Line(param, {
          startX: 120,
          startY: 40,
          endX: window_width,
          endY: 40
        });

        for (var i = 0; i < pictures.length; i++) {
          iks += 80;
          if (i % Math.round(((window_width - 130) / 80) - 0.1) == 0) {
            lines++;
            iks = 160;
          }
          if (hoverID == 'picture_' + pictures[i]) {
            var col = '#505050'
          } else {
            var col = '#00000000'
          }
          Rectangle(param, {
            x: iks - 37.5,
            y: lines * 65 - 12.5,
            width: 75,
            height: 60,
            color: col,
            id: 'picture_' + pictures[i],
            radius: 10
          });
          Icon(param, {
            icon: picture_icon,
            x: CENTEROVER(iks),
            y: lines * 65 - 5,
            size: 4,
            color: '#ffffff'
          });
          Text(param, {
            txt: pictures[i],
            x: CENTEROVER(iks),
            y: lines * 65 + 30,
            color: '#aaaaaa'
          });
        }
      }


      // VIDEOS
      if (activeTab == 'tab_videos') {
        var videos = new Array();
        var iks = 0;
        var lines = 0;

        var cnt = 0;
        while (Object.keys(obj.root.user.videos)[cnt] != undefined) {
          var fileName = Object.keys(obj.root.user.videos)[cnt];
          if (fileName.includes('.'))
            fileName = fileName.substring(0, fileName.indexOf('.')); // Remove Suffix
          videos.push(fileName);
          cnt++;
        }

        Text(param, {
          txt: videos.length + ' Videos',
          x: 130,
          y: 15
        });
        Line(param, {
          startX: 120,
          startY: 40,
          endX: window_width,
          endY: 40
        });

        for (var i = 0; i < videos.length; i++) {
          iks += 80;
          if (i % Math.round(((window_width - 130) / 80) - 0.1) == 0) {
            lines++;
            iks = 160;
          }
          if (hoverID == 'video_' + videos[i]) {
            var col = '#505050'
          } else {
            var col = '#00000000'
          }
          Rectangle(param, {
            x: iks - 37.5,
            y: lines * 65 - 12.5,
            width: 75,
            height: 60,
            color: col,
            id: 'video_' + videos[i],
            radius: 10
          });
          Icon(param, {
            icon: video_icon,
            x: CENTEROVER(iks),
            y: lines * 65 - 5,
            size: 4,
            color: '#ffffff'
          });
          Text(param, {
            txt: videos[i],
            x: CENTEROVER(iks),
            y: lines * 65 + 30,
            color: '#aaaaaa'
          });
        }
      }


      // DOCUMENTS
      if (activeTab == 'tab_docs') {
        var docs = new Array();
        var iks = 0;
        var lines = 0;

        var cnt = 0;
        while (Object.keys(obj.root.user.documents)[cnt] != undefined) {
          var fileName = Object.keys(obj.root.user.documents)[cnt];
          if (fileName.includes('.'))
            fileName = fileName.substring(0, fileName.indexOf('.')); // Remove Suffix
          docs.push(fileName);
          cnt++;
        }

        Text(param, {
          txt: docs.length + ' Documents',
          x: 130,
          y: 15
        });
        Line(param, {
          startX: 120,
          startY: 40,
          endX: window_width,
          endY: 40
        });

        for (var i = 0; i < docs.length; i++) {
          iks += 80;
          if (i % Math.round(((window_width - 130) / 80) - 0.1) == 0) {
            lines++;
            iks = 160;
          }
          if (hoverID == 'doc_' + docs[i]) {
            var col = '#505050'
          } else {
            var col = '#00000000'
          }
          Rectangle(param, {
            x: iks - 37.5,
            y: lines * 65 - 12.5,
            width: 75,
            height: 60,
            color: col,
            id: 'doc_' + docs[i],
            radius: 10
          });
          Icon(param, {
            icon: docs_icon,
            x: CENTEROVER(iks),
            y: lines * 65 - 5,
            size: 4,
            color: '#ffffff'
          });
          Text(param, {
            txt: docs[i],
            x: CENTEROVER(iks),
            y: lines * 65 + 30,
            color: '#aaaaaa'
          });
        }
      }


      // MUSIC
      if (activeTab == 'tab_music') {
        var songs = [];
        var iks = 0;
        var lines = 0;

        var cnt = 0;
        while (Object.keys(obj.root.user.music)[cnt] != undefined) {
          var fileName = Object.keys(obj.root.user.music)[cnt];
          if (fileName.includes('.'))
            fileName = fileName.substring(0, fileName.indexOf('.')); // Remove Suffix
          songs.push(fileName);
          cnt++;
        }

        Text(param, {
          txt: 'Music (' + songs.length + ' files)',
          x: 130,
          y: 15
        });
        Line(param, {
          startX: 120,
          startY: 40,
          endX: window_width,
          endY: 40
        });

        for (var i = 0; i < songs.length; i++) {
          iks += 80;
          if (i % Math.round(((window_width - 130) / 80) - 0.1) == 0) {
            lines++;
            iks = 160;
          }
          if (hoverID == 'music_' + songs[i]) {
            var col = '#505050'
          } else {
            var col = '#00000000'
          }
          Rectangle(param, {
            x: iks - 37.5,
            y: lines * 65 - 12.5,
            width: 75,
            height: 60,
            color: col,
            id: 'music_' + songs[i],
            radius: 10
          });
          Icon(param, {
            icon: music_icon,
            x: CENTEROVER(iks),
            y: lines * 65 - 5,
            size: 4,
            color: '#ffffff'
          });
          Text(param, {
            txt: songs[i],
            x: CENTEROVER(iks),
            y: lines * 65 + 30,
            color: '#aaaaaa'
          });
        }
      }

      // Tab Apps
      if (activeTab == 'tab_apps') {
        Text(param, {
          txt: 'All Apps',
          x: 130,
          y: 15,
        });

        // ----------------------------------
        var iks = 0;
        var lines = 0;
        var apps = [];

        for (var i = 0; i < windows.length; i++) {
          apps.push(windows[i]);
        }

        for (var i = 0; i < apps.length; i++) {
          iks += 140;
          if (i % Math.round(((window_width - 130) / 140) - 0.1) == 0) {
            lines++;
            iks = 195;
          }

          if (hoverID == 'app_' + apps[i]) {
            var col = '#555555';
            var col2 = '#ffffff';
          } else {
            var col = '#454545';
            var col2 = '#aaaaaa';
          }
          Rectangle(param, {
            x: iks - 67.5,
            y: lines * 80 - 40,
            width: 135,
            height: 75,
            color: col,
            id: 'app_' + apps[i],
            radius: 10
          });
          Icon(param, {
            icon: apps[i],
            x: CENTEROVER(iks),
            y: lines * 80 - 25,
            size: 4,
            color: col2
          });
          Text(param, {
            txt: apps[i],
            x: CENTEROVER(iks),
            y: lines * 80 + 10,
            color: '#aaaaaa'
          });
        }
      }

      // USB tab
      if (activeTab == 'tab_usb') {
        Text(param, {
          txt: 'No USB connected',
          x: CENTER+65,
          y: 170,
        });
        Icon(param, {
          icon: nousb_icon,
          x: CENTER+65,
          y: 100,
          size: 5,
          color: '#ffffff'
        });
      }
    }

    // All click listener
    click(id) {
      clickedID = id;
      if (id.includes('tab_')) {
        path = '';
        selectY = getPositionY(id);
        activeTab = id;
      }
      if (id.includes('app_')) {
        openWindowByName(id.substring(4, id.length));
      }
      if (id.includes('folder_')) {
        path = path + '.' + id.substring(7, id.length);
      }
      if (id.includes('doc_')) {
        let textString = obj.root.user.documents[id.substring(4, id.length) + ((id.includes('.doc')) ? '' : '.doc')];
        console.log(obj);
        passData('editor', textString);
      }
      if (id.includes('music_')) {
        passData('music', id.substring(6, id.length));
      }
      if (id.includes('picture_')) {
        passData('photos', id.substring(6, id.length));
      }
      if (id.includes('desktopitem_')) {
        Hint('No App to open this file', true);
      }
      if (id.includes('video_')) {
        Hint('No Video player installed', true);
      }
    }

    ssd_back_click() {
      path = path.substring(0, path.lastIndexOf('.'));
    }

    newfolder_click() {
      let pp = 'obj.root' + path + '.newfolder';
      eval(pp + ' = {}');
      Hint('Created new folder', true);
    }

    loadData(str) {
      if (str == 'documents') {
        activeTab = 'tab_docs';
        selectY = getPositionY('tab_docs');
      }
    }

    appClosed() {
      selectY = 35;
      activeTab = 'tab_desktop';
      clickedID;
      path = '';
      obj = fileLocator;
    }
  }

  var finder_icon = [
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  let folder_icon = [
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  let picture_icon = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  let video_icon = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  let music_icon = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  let docs_icon = [
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

  let stepback_icon = [
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
  ];

  let newfolder_icon = [
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
  ];

  let desktopitem_icon = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  let nousb_icon = [
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  let desktop_icon = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1]
  ];

  let apps_icon = [
    [1, 1, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1]
  ];

  let ssd_icon = [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0, 1, 1],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0]
  ];

  let usb_icon = [
    [0, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1]
  ];

  let documents_icon = [
    [0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0]
  ];

  let videos_icon = [
    [0, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 0]
  ];

  let pictures_icon = [
    [0, 0, 1, 1, 1, 0, 0],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 1, 1]
  ];

  let note_icon = [
    [0, 0, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 1],
    [0, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [0, 1, 0, 0, 0, 1, 0]
  ];
}
