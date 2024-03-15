<html>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<head>
  <base href="/code/intentos/">
  <title>intentOS Web Operating System (Beta)</title>
  <meta name="description" content="Completely based on pixel manipulations. Beta, works just in Chrome."/>
  <link rel="stylesheet" href="index.css">
  <script type="text/javascript" src="global_variables.js"></script>
  <script type="text/javascript" src="letters.js"></script>
  <script type="text/javascript" src="draw_functions.js"></script>
  <script type="text/javascript" src="do_functions.js"></script>
  <script type="text/javascript" src="prototypes.js"></script>
</head>

<!-- Load all Apps -->
<?php
$handle = opendir("./apps/");
while (($file = readdir($handle)) !== false) {
    if ($file != '.') {
        echo '<script type="text/javascript" src="apps/' . $file . '"></script>';
    }
}
closedir($handle);
?>
<!--  End loading all apps-->

<body>

    <div id="cursor" class="cursor"></div>

    <canvas id="myCanvas" class="canvas">
        Your browser does not support the canvas element.
    </canvas>


    <script>
    // JS BEFORE main
        function toggleLightmode(bool) {
            smartInvert = bool;

            if (bool) {
                var cv = document.getElementById('myCanvas');
                cv.style.backgroundColor = '#808080';
            } else {
                var cv = document.getElementById('myCanvas');
                cv.style.backgroundColor = '#000000';
            }

            ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
            drawWindows();
            drawDock();
        }
    </script>

    <script type="text/javascript" src="main.js"></script>

    <script>
        fullscreentoggle();

        function fullscreentoggle() {
            if ((window.fullScreen) || (canvas.clientHeight == screen.height)) {
                if (!browserIsInFullscreen) {
                    browserIsInFullscreen = true;

                    ctx.clearRect(0, 0, screen.width, screen.height);
                    drawWindows();
                    drawDock();
                }
            } else {
                if (browserIsInFullscreen) {
                    browserIsInFullscreen = false;

                    ctx.fillStyle = adjustColor('#303030');
                    ctx.fillRect(0, 0, screen.width, screen.height);
                    Text(null, {
                      txt: "Press 'F' to pay respect",
                      x: CENTER,
                      y: screen.height / 2 - 40,
                      size: 2.6,
                      color: '#ffffff'
                    });
                    Text(null, {
                      txt: "intentOS will only work in fullscreen mode",
                      x: CENTER,
                      y: screen.height / 2 + 0,
                      size: 1.5,
                      color: '#909090'
                    });
                }
            }

            setTimeout(fullscreentoggle, 200);
        }

        function enterFullscreen(element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            }
        }

        /*
        function hideMouse() {
            var cursor = document.getElementById('cursor');
            cursor.style.display = 'none';
        }

        function showMouse() {
            var cursor = document.getElementById('cursor');
            cursor.style.display = 'block';
        }
        */

        setInterval(cursorColor, 20);

        function cursorColor() {
            try {
                var cursor = document.getElementById('cursor');
                var p1 = ctx.getImageData(currentMousePosition[0] - 3.5, currentMousePosition[1] - 3.5, 1, 1).data;
                var p2 = ctx.getImageData(currentMousePosition[0] + 3.5, currentMousePosition[1] - 3.5, 1, 1).data;
                var p3 = ctx.getImageData(currentMousePosition[0] - 3.5, currentMousePosition[1] + 3.5, 1, 1).data;
                var p4 = ctx.getImageData(currentMousePosition[0] + 3.5, currentMousePosition[1] + 3.5, 1, 1).data;
                var p5 = ctx.getImageData(currentMousePosition[0], currentMousePosition[1], 1, 1).data;
                var totalRed = (p1[0] + p2[0] + p3[0] + p4[0] + p5[0]) / 5;
                var totalGreen = (p1[1] + p2[1] + p3[1] + p4[1] + p5[1]) / 5;
                var totalBlue = (p1[2] + p2[2] + p3[2] + p4[2] + p5[2]) / 5;

                cursor.style.backgroundColor = 'rgb(' + (255 - totalRed) + ', ' + (255 - totalGreen) + ', ' + (255 - totalBlue) + ')';
            } catch (e) {}
        }
    </script>

</body>

</html>
