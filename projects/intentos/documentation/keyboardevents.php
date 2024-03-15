<html>

    <head>
        <!-- Style -->
        <link rel="stylesheet" href='index.css'>

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

        <a class='section'>Keyboard events</a>
        <a class='text'>
          It is possible to receive every key press the user makes when your app is in focus. This function gets called every time the user presses a key on the keyboard.
          It passes you the key code of the pressed key and it’s string. For example, when the user presses ‘M’ on the keyboard, the key code would be ‘77’ and the key string ‘M’.
        </a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>keyPress</fnc>(keyCode, keyString) {<br>
              &emsp;&emsp;...<br>
            }
          </a>
        </div>

    </body>


</html>
