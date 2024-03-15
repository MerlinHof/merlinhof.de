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

        <a class='section'>Draw Buttons</a>
        <a class='text'>With the Button function you can simply create Buttons for your app with minimal effort.  All effects and functionalities like the hover effect are seamlessly integrated into the system. (For more, see click listeners)</a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>Button</fnc>(param, {<br>
              &emsp;&emsp;<par>txt</par>: <str>'Hello World!'</str>,<br>
              &emsp;&emsp;<par>x</par>: 10,<br>
              &emsp;&emsp;<par>y</par>: 10,<br>
              &emsp;&emsp;<par>id</par>: <str>'button1'</str><br>
            });
          </a>
        </div>
        <a class='text'>
          If you want to center the button horizontally in the window, write <key>CENTER</key> instead of the X value.
          <br>If you want an offset relative to the center, write eg. <key>CENTER + 20</key> instead of the X value.
          <br>If you want to center it over an x value, write eg. <key>CENTEROVER(20)</key> instead of the X value.
        </a>

    </body>


</html>
