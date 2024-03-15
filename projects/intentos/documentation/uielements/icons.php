<html>

    <head>
        <!-- Style -->
        <link rel="stylesheet" href='../index.css'>

        <!-- general -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <meta name="theme-color" content="#FFFFFF" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <meta name="author" content="Merlin Hof" />
        <title>intentOS Documentation</title>
        <link rel="shortcut icon" type="image/png" href="imgs/smallicon.png">
    </head>

    <body>

        <a id='titl1'>intentOS</a>
        <a id='titl2'>Documentation</a>

        <a class='section'>Draw Icons</a>
        <a class='text'>With the Icon function you can draw icons in your app. Basically all of the parameters are optional and they don't have to be set in order.</a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>Icon</fnc>(param, {<br>
              &emsp;&emsp;<par>icon</par>: open_icon,<br>
              &emsp;&emsp;<par>x</par>: 10,<br>
              &emsp;&emsp;<par>y</par>: 10,<br>
              &emsp;&emsp;<par>id</par>: <str>'icon1'</str>,<br>
              &emsp;&emsp;<par>size</par>: 1.5,<br>
              &emsp;&emsp;<par>color</par>: <str>'#FFFFFF'</str><br>
            });
          </a>
        </div>
        <a class='text'>
          If you want to center the icon horizontally in the window, write <key>CENTER</key> instead of the X value.
          <br>If you want an offset relative to the center, write eg. <key>CENTER + 20</key> instead of the X value.
          <br>If you want to center it over an x value, write eg. <key>CENTEROVER(20)</key> instead of the X value.
        </a>
        <br>
        <a class='text'>To make icons just create a 11x11 2D array. 7x7 arrays also work, but are not recommended due to the lack of detail. Every <key>1</key> represents a colored pixel, every <key>0</key> a transparent pixel.</a>
        <div class='codeframe'>
          <a class='code'>
            <key>var</key> demo_icon = [<br>
              &emsp;&emsp;[1,1,1,1,1,0,1,1,1,1,1],<br>
              &emsp;&emsp;[1,0,0,0,1,0,1,0,0,0,1],<br>
              &emsp;&emsp;[1,0,0,0,1,0,1,0,0,0,1],<br>
              &emsp;&emsp;[1,0,0,0,1,0,1,0,0,0,1],<br>
              &emsp;&emsp;[1,1,1,1,1,0,1,1,1,1,1],<br>
              &emsp;&emsp;[0,0,0,0,0,0,0,0,0,0,0],<br>
              &emsp;&emsp;[1,1,1,1,1,0,1,1,1,1,1],<br>
              &emsp;&emsp;[1,0,0,0,1,0,1,0,0,0,1],<br>
              &emsp;&emsp;[1,0,0,0,1,0,1,0,0,0,1],<br>
              &emsp;&emsp;[1,0,0,0,1,0,1,0,0,0,1],<br>
              &emsp;&emsp;[1,1,1,1,1,0,1,1,1,1,1],<br>
            ];<br>
          </a>
        </div>

    </body>


</html>
