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

        <a class='section'>Loops</a>
        <a class='text'>
          To create a seamless user experience, a seperate loop function is needed, when you want to repeat a block of code in a certain interval of time.
          <br>With the <key>Loop</key> function, the function in here is called every x milliseconds.
        </a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>Loop</fnc>(param, 200, <key>function</key>() {<br>
              &emsp;&emsp;console.log(<str>'Hey there!'</str>);<br>
            };
          </a>
        </div>

    </body>


</html>
