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

        <a class='section'>Draw Texts</a>
        <a class='text'>With the Text function you can draw text in your app. Basically all of the parameters are optional and they don't have to be set in order.</a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>Text</fnc>(param, {<br>
              &emsp;&emsp;<par>txt</par>: <str>'Hello World'</str>,<br>
              &emsp;&emsp;<par>x</par>: 10,<br>
              &emsp;&emsp;<par>y</par>: 10,<br>
              &emsp;&emsp;<par>id</par>: <str>'text1'</str>,<br>
              &emsp;&emsp;<par>size</par>: 1.5,<br>
              &emsp;&emsp;<par>color</par>: <str>'#FFFFFF'</str>,<br>
              &emsp;&emsp;<par>width</par>: 500,<br>
              &emsp;&emsp;<par>height</par>: 50,<br>
              &emsp;&emsp;<par>highlight</par>: highlight_array,<br>
              &emsp;&emsp;<par>singleline</par>: <key>false</key>,<br>
              &emsp;&emsp;<par>lowercaseEnabled</par>: <key>false</key><br>
            });
          </a>
        </div>
        <a class='text'>
          If you want to center the text horizontally in the window, write <key>CENTER</key> instead of the X value.
          <br>If you want an offset relative to the center, write eg. <key>CENTER + 20</key> instead of the X value.
          <br>If you want to center it over an x value, write eg. <key>CENTEROVER(20)</key> instead of the X value.
          <br><br>
          To highlight certain words in a special color, just create a 2-dimensional array. The first entry is the string which is goint to be highlighted and the second one is the color.
        </a>
        <div class='codeframe'>
          <a class='code'>
              <key>let</key> highlight_array = [<br>
                &emsp;&emsp;[<str>'var'</str>, <str>'#ffbb00'</str>],<br>
                &emsp;&emsp;[<str>'function'</str>, <str>'#2196f3'</str>],<br>
                &emsp;&emsp;[<str>'main'</str>, <str>'#00ff00'</str>],<br>
                &emsp;&emsp;[<str>'new'</str>, <str>'#ffff00'</str>]<br>
              ];
          </a>
        </div>

    </body>


</html>
