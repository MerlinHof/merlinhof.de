<?php
set_time_limit(300);

echo 'Creating preview files...<br>';
$path = "./originals/";
if ($handle = opendir($path)) {
  while (false !== ($file = readdir($handle))) {
      if ('.' === $file) continue;
      if ('..' === $file) continue;

      echo $file.'<br>';
      $image = imagecreatefromjpeg('./originals/'.$file);
      $imgResized = imagescale($image, 600, 400);
      imagejpeg($imgResized, './previews/'.$file);
  }
  closedir($handle);
}

?>
