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

        <a class='section'>Pass Data between apps</a>
        <a class='text'>
          When you want to pass data to a different app in intentOS, you can use the ‘passData’ function.
          <br>You just have to know the name of the App you want to share the Data with and the other app has to support this.
        </a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>passData</fnc>(<str>'editor'</str>, <str>'This text is goint to be opened in the editor.'</str>);
          </a>
        </div>
        <br>
        <a class='text'>
          To receive data from other Apps sent with to method above, you have to add a function which name is <key>loadData</key>.
          <br>When another app sends data to your app, your app is started automatically and the loadData function is called. You get one argument, which is the object the other app sent to yours.
        </a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>loadData</fnc>(dat) {<br>
            }
          </a>
        </div>

    </body>


</html>
