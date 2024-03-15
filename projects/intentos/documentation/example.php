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

        <a class='section'>Commented example</a>
        <a class='text'>This is an example for an intentOS app. Hopefully this will clear any last uncertainties!
        </a>
        <div class='codeframe'>
          <a class='code'>
          setMetaData(<str>'demo'</str>, 400, 130);<br>
          <br>
          <cmt>// Define (global) variables for your app here</cmt><br>
          <key>let</key> param;<br>
          <key>let</key> offs = 0;<br>
          <br>
          demo = <key>new class</key> {<br>
            &emsp;&emsp;<fnc>setup</fnc>(parameterIndex) {<br>
              &emsp;&emsp;&emsp;&emsp;param = parameterIndex;<br>
            &emsp;&emsp;}<br>
            <br>
            &emsp;&emsp;<fnc>main</fnc>(window_width, window_height, hoverID) {<br>
              <br>
              &emsp;&emsp;&emsp;&emsp;<key>let</key> <par>myColor</par> = <str>'#808080'</str>;<br>
              &emsp;&emsp;&emsp;&emsp;<key>if</key> (hoverID == <str>'text1'</str>) {<br>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<par>myColor</par> = <str>'#ffffff'</str>;<br>
              &emsp;&emsp;&emsp;&emsp;}<br>
              <br>
              &emsp;&emsp;&emsp;&emsp;<fnc>Text</fnc>(param, {<br>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;txt: <str>'Hello World'</str>,<br>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;x: <key>CENTER</key> + offs,<br>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;y: 30,<br>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id: <str>'text1'</str>,<br>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;color: <par>myColor</par><br>
              &emsp;&emsp;&emsp;&emsp;});<br>
            &emsp;&emsp;}<br>
            <br>
              &emsp;&emsp;<cmt>// Room for other functions</cmt><br>
              &emsp;&emsp;<fnc>text1_click</fnc>() {<br>
                &emsp;&emsp;&emsp;&emsp;offs = <key>random</key>(100);<br>
                &emsp;&emsp;}<br>
            }<br>
            <br>
            <key>var</key> demo_icon = [<br>
              &emsp;&emsp;[1,1,1,1,1,0,1,1,1,1,1],<br>
              &emsp;&emsp;[1,0,0,0,1,0,1,0,0,0,1],<br>
              &emsp;&emsp;[1,1,1,1,1,0,1,0,0,0,1],<br>
              &emsp;&emsp;[0,0,0,0,0,0,1,0,0,0,1],<br>
              &emsp;&emsp;[1,1,1,1,1,0,1,0,0,0,1],<br>
              &emsp;&emsp;[1,0,0,0,1,0,1,0,0,0,1],<br>
              &emsp;&emsp;[1,0,0,0,1,0,1,1,1,1,1],<br>
              &emsp;&emsp;[1,0,0,0,1,0,0,0,0,0,0],<br>
              &emsp;&emsp;[1,0,0,0,1,0,1,1,1,1,1],<br>
              &emsp;&emsp;[1,0,0,0,1,0,1,0,0,0,1],<br>
              &emsp;&emsp;[1,1,1,1,1,0,1,1,1,1,1],<br>
            ];<br>
          </a>
        </div>
        <br>
      <a class='text'>
        Now let's explain.<br>
        What this app does is basically showing a 'Hello World' text in the middle of the window. When you hover over the text, it's color changes from
        <str>'#808080'</str> to <str>'#FFFFFF'</str>, and when you click it, it's x position is randomly modified.
        <br><br>The window is redrawn everytime anything is about to change. So, if you hover your mouse over the text, something is about to change and so the main function of your app is called with the ID of the currently hovered element.
        So, you can simply check, if the hovered element is your text and adjust it's color based on that.
        <br>When you click the text, also something is about to change, so the main function is called. But before the main function, the click function from the text is called. So you can change the variable <key>offs</key> here, from which the position of the text depends.
        After the click function the main function is called and the text with the new x value is drawn.
        <br><br>If you want to know how to create icons go to UI Elements -> Icons.
      </a>

    </body>


</html>
