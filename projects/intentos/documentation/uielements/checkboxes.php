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

        <a class='section'>Draw Checkboxes</a>
        <a class='text'>With this function you can integrate checkable checkboxes into your app with minimal effort.  All effects and functionalities are seamlessly integrated into the system.</a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>Checkbox</fnc>(param, {<br>
              &emsp;&emsp;<par>x</par>: 10,<br>
              &emsp;&emsp;<par>y</par>: 10,<br>
              &emsp;&emsp;<par>id</par>: <str>'cb1'</str><br>
            });
          </a>
        </div>
        <a class='text'>
          If you want to center the checkbox horizontally in the window, write <key>CENTER</key> instead of the X value.
          <br>If you want an offset relative to the center, write eg. <key>CENTER + 20</key> instead of the X value.
          <br>If you want to center it over an x value, write eg. <key>CENTEROVER(20)</key> instead of the X value.
        </a>
        <br>
        <a class='text'>You can create an switch listener for the checkbox. It gets called whenever the user checks or unchecks the checkbox. Within this function you get the isChecked boolean.</a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>cb1_switched</fnc>(isChecked) {<br>
              &emsp;&emsp;...<br>
            }
          </a>
        </div>
        <br>
        <a class='text'>To check or uncheck an checkbox, use this function. If you saved the state of an checkbox, you can load it for example in the setup function.</a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>setChecked</fnc>(param, <str>'cb1'</str>, <key>true</key>);
          </a>
        </div>

    </body>


</html>
