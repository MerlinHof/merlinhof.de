<html>

<head>
  <base href="/more/bilder/">
  <link rel="stylesheet" href="index.css?v=18">
  <link rel=icon href=sources/favicon.png>
  <meta name="viewport" content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' >
  <title>Merlin Hof</title>
  <meta charset="utf-8"/>
</head>

<body>
<?php createImages(); ?>
</body>
</html>

<?php
function createImages() {
  $path = "previews/";
  $imgs = array();
  if ($handle = opendir($path)) {
    while (false !== ($file = readdir($handle))) {
        if ('.' === $file) continue;
        if ('..' === $file) continue;

        $ext = pathinfo($file, PATHINFO_EXTENSION);
        if ($ext != 'DS_Store') {
          array_push($imgs, $file);
        }
    }
    closedir($handle);
  }

  shuffle($imgs);
  foreach ($imgs as &$file) {
    echo '<img class="image" onclick="window.location.href = \'originals/'.$file.'\';" src="previews/'.$file.'">';
  }
}
?>
