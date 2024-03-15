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

        <a class='section'>Text Input</a>
        <a class='text'>
          If you want the user to input text to your App, you can add an Input element to your app. It allows to write text from the keyboard into it.
          You can set a hint which is the text displayed, when no text is in the Input and it's not in focus.
        </a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>Input</fnc>(param, {<br>
              &emsp;&emsp;<par>x</par>: 10,<br>
              &emsp;&emsp;<par>y</par>: 10,<br>
              &emsp;&emsp;<par>hint</par>: <str>'Enter here...'</str>,<br>
              &emsp;&emsp;<par>id</par>: <str>'input1'</str>,<br>
              &emsp;&emsp;<par>size</par>: 1.5,<br>
              &emsp;&emsp;<par>width</par>: 300,<br>
              &emsp;&emsp;<par>height</par>: 50,<br>
              &emsp;&emsp;<par>highlight</par>: highlight_array,<br>
              &emsp;&emsp;<par>inactiveColor</par>: <str>'#909090'</str>,<br>
              &emsp;&emsp;<par>color</par>: <str>'#FFFFFF'</str>,<br>
              &emsp;&emsp;<par>singleline</par>: <key>false</key>,<br>
              &emsp;&emsp;<par>lowercaseEnabled</par>: <key>false</key><br>
            });
          </a>
        </div>
        <a class='text'>
          If you want to center the Input horizontally in the window, write <key>CENTER</key> instead of the X value.
          <br>If you want an offset relative to the center, write eg. <key>CENTER + 20</key> instead of the X value.
          <br>If you want to center it over an x value, write eg. <key>CENTEROVER(20)</key> instead of the X value.
          <br>For highlight, see UI Elements -> Text
        </a>
        <br>
        <a class='text'>
          When the User hits enter, a function in your App is called. It’s name is composed from the ID of the textInput like shown below.
          As a paramter, you get the string, the user entered into the textInput.
        </a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>input1_enterPress</fnc>(str) {<br>
              &emsp;&emsp;...<br>
            }
          </a>
        </div>
        <br>
        <a class='text'>
          To set the text of an input element, just call:
        </a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>setInputText</fnc>(param, <str>'input1'</str>, <str>'Hello'</str>);
          </a>
        </div>
        <br>
        <a class='text'>
          To get the text of an input element, just call this. It will return the text which is currently in the Input with this ID.
        </a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>getInputText</fnc>(param, <str>'input1'</str>);
          </a>
        </div>

    </body>


</html>
