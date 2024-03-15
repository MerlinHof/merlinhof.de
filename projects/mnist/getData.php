<?php

$type = $_POST['type'];
$block = $_POST['block'];

if ($type == 0) {
  $content = file_get_contents('trainImages');
  $arr = array();
  for($n = $block*1000*784+16; $n < ($block+1)*1000*784+16; $n++) {
    $arr[] = ord(substr($content, $n, 1));
  }
  echo '['.implode(', ', $arr).']';
}

if ($type == 1) {
  $content = file_get_contents('trainLabels');
  $arr = array();
  for($n = $block*1000+8; $n < ($block+1)*1000+8; $n++) {
    $arr[] = ord(substr($content, $n, 1));
  }
  echo '['.implode(', ', $arr).']';
}


?>
