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

        <a class='section'>Draw a Toolbar</a>
        <a class='text'>The toolbar is very useful, as it contains a lot of controls and options. It’s implementation is very easy. You have to define an array which contains all the options you want to display in the toolbar. Then you just need to call a function and pass the array. Voila, the toolbar is here.
          The first entry in each subarray is the name of the menu.</a>
        <div class='codeframe'>
          <a class='code'>
            <key>var</key> nav = [<br>
              &emsp;&emsp;[<str>'File'</str>, <str>'New'</str>, <str>'Open'</str>, <str>'Save'</str>, <str>'Save as'</str>, <str>'Exit'</str>],<br>
              &emsp;&emsp;[<str>'Edit'</str>, <str>'Clear Page'</str>, <str>'Soon'</str>, <str>'Soon'</str>, <str>'Soon'</str>],<br>
              &emsp;&emsp;[<str>'Help'</str>, <str>'Manual'</str>, <str>'Exit'</str>]<br>
            ];
          </a>
        </div>
        <br>
        <a class='text'>Call this at the end in your main function.</a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>Toolbar</fnc>(param, nav);
          </a>
        </div>
        <br>
        <a class='text'>For the click listeners of the entrys just add the following function to your apps class. The two numbers are just the positions of the 2D Array you defined earlier, so change them to your needs</a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>toolbar_2_1_click</fnc>() {<br>
              &emsp;&emsp;...<br>
            }
          </a>
        </div>

    </body>


</html>
