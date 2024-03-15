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

        <a class='section'>Save and load data</a>
        <a class='text'>
          If you want to save data to use it later, you can use this function. You need a key to store the object and access it later.
        </a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>saveData</fnc>(param, <str>'name'</str>, <str>'Merlin'</str>);
          </a>
        </div>
        <br>
        <a class='text'>
          If you want to load the data you saved previously, you can use this function. It returns the object you saved into&nbsp;it.
        </a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>getData</fnc>(param, <str>'name'</str>);
          </a>
        </div>

    </body>


</html>
