<?php

$data = $_POST['pixelData'];
$file = 'pixelData/images';

file_put_contents($file, $data, FILE_APPEND);
?>
