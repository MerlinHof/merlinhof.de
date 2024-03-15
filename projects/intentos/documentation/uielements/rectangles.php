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

        <a class='section'>Draw Rectangles</a>
        <a class='text'>With this function you can draw Rectangles. You can give Rectangles a corner radius, the default (and recommended one) is set to 10.
          If you for example want only the bottom corners to be rounded, you set the cornerLocation string to <str>'bl,br'</str>.
          <br><str>'tl'</str>: Top left
          <br><str>'tr'</str>: Top right
          <br><str>'br'</str>: Bottom right
          <br><str>'bl'</str>: Bottom left).<br>
          <br>If you want the rectangle to have a border, simply define the border color.</a>
          <div class='codeframe'>
            <a class='code'>
              <fnc>Rectangle</fnc>(param, {<br>
                &emsp;&emsp;<par>x</par>: 10,<br>
                &emsp;&emsp;<par>y</par>: 10,<br>
                &emsp;&emsp;<par>width</par>: 50,<br>
                &emsp;&emsp;<par>height</par>: 30,<br>
                &emsp;&emsp;<par>id</par>: <str>'rect1'</str>,<br>
                &emsp;&emsp;<par>color</par>: <str>'#808080'</str>,<br>
                &emsp;&emsp;<par>radius</par>: 10,<br>
                &emsp;&emsp;<par>cornerLocation</par>: <str>'tl,bl'</str>,<br>
                &emsp;&emsp;<par>borderColor</par>: <str>'#909090'</str><br>
              });
            </a>
          </div>
        <br>
        <a class='text'>
          If you want to set the maxiumal possible corner radius, write <str>'max'</str> instead of the radius.
          <br>If you want to center the rectangle horizontally in the window, write <key>CENTER</key> instead of the X value.
          <br>If you want an offset relative to the center, write eg. <key>CENTER + 20</key> instead of the X value.
          <br>If you want to center it over an x value, write eg. <key>CENTEROVER(20)</key> instead of the X value.
        </a>

    </body>


</html>
