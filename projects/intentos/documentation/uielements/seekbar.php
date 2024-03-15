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

        <a class='section'>Draw a Seekbar</a>
        <a class='text'>With the Seekbar function you can simply create seekbars for your app with minimal effort. You can set the initial progress and the maximal value.</a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>Seekbar</fnc>(param, {<br>
              &emsp;&emsp;<par>x</par>: 10,<br>
              &emsp;&emsp;<par>y</par>: 10,<br>
              &emsp;&emsp;<par>id</par>: <str>'seekbar1'</str>,<br>
              &emsp;&emsp;<par>width</par>: 500,<br>
              &emsp;&emsp;<par>max</par>: 100,<br>
              &emsp;&emsp;<par>progress</par>: 20<br>
            });
          </a>
        </div>
        <br>
        <a class='text'>There is the possibility to create a listener for seekbar changes. It gets called when the seekbar is dragged.
          You get the current progress, which is an integer between 0 and the maximal value.
        </a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>seekbar1_seeked</fnc>(progress) {<br>
              &emsp;&emsp;...<br>
            }
          </a>
        </div>

    </body>


</html>
