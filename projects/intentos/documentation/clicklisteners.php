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

        <a class='section'>Click Listeners</a>
        <a class='text'>
          If you want to change the layout or execute a certain code when an element is clicked, the click function will help you. You have to give your element from which you want the click to be listened from an ID.
          <br>The click function gets called whenever the user clicks an element with the ID in the function name.
          <br><br>Outside of your main function, create a new function with its name composed from the ID of the element and&nbsp;_click:
        </a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>id_click</fnc>() {<br>
              &emsp;&emsp;...<br>
            }
          </a>
        </div>
        <br>
        <a class='text'>
          There is also an click function for every element in your app. When you display a huge list of data, it would be very annoying to write an click function for every element and sometimes even not possible.
          <br>With this function you can let all this work getting done by intentOS, it gets called every time the user clicks any element (with an ID) in your App. This function passes you the ID of the clicked element.
        </a>
        <div class='codeframe'>
          <a class='code'>
            <fnc>all_click</fnc>(id) {<br>
              &emsp;&emsp;...<br>
            }
          </a>
        </div>

    </body>


</html>
