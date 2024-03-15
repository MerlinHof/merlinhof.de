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

        <a class='section'>General</a>
        <a class='text'>Welcome to the intentOS Development Documentation. It contains all the objects you need to implement the user interface and functionality into your intentOS App. intentOS handles all the details for you as it efficiently draws on the screen what you want.<br>
        <br>Here is what a basic intentOS app looks like:
        </a>
        <div class='codeframe'>
          <a class='code'>
          setMetaData(<str>'demo'</str>, 400, 130);<br>
          <br>
          <cmt>// Define (global) variables for your app here</cmt><br>
          <key>let</key> param;<br>
          <br>
          demo = <key>new class</key> {<br>
            &emsp;&emsp;<fnc>setup</fnc>(parameterIndex) {<br>
              &emsp;&emsp;&emsp;&emsp;param = parameterIndex;<br>
            &emsp;&emsp;}<br>
            <br>
            &emsp;&emsp;<fnc>main</fnc>(window_width, window_height, hoverID) {<br>
              &emsp;&emsp;&emsp;&emsp;<fnc>Text</fnc>(param, {<br>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;txt: <str>'Hello World'</str>,<br>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;x: <key>CENTER</key>,<br>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;y: 30<br>
              &emsp;&emsp;&emsp;&emsp;});<br>
            &emsp;&emsp;}<br>
            <br>
              &emsp;&emsp;<cmt>// Room for other functions</cmt><br>
            }<br>
            <br>
            <key>var</key> demo_icon = [<br>
              &emsp;&emsp;...<br>
            ];<br>
          </a>
        </div>
        <br>
      <a class='text'>At first you set the basic information of your window with the 'setMetaData' function. The first parameter is the name of your app, follwed by the initial width and height of your window.
        <br>Next you define your global variables. One variable the will pass your way everywhere in intentOS is 'param'. Just take it as it is, it's a global variable for your app and you need to pass it within every function you call.
        <br><br>The app class is the location where most of your code will be in. It's name has to be exactly the same as defined earlier in 'setMetaData'.
        <br>Two important functions are located in the class: the setup and the main function. The setup function is called once when the user starts the app. Here you can prepare variables or load saved data. All the draw functions like 'Text' oder 'Icon' will only work in the main function! It's called everytime your window is redrawn, so be careful.
        <br><br>In the main function you get the current width and height of the windows, as well as the ID of the currently hovered element to create nice hover effects.
        <br><br>If you want to know how to create icons go to UI Elements -> Icons.
      </a>

    </body>


</html>
