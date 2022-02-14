<?php
$dirname = "./Image/";
$images = glob($dirname."*.{jpg,gif,png}",GLOB_BRACE);

foreach($images as $image) {
    echo '<a href="./second.php?file='.$image.'">' . $image. '</a><br />';
}
?>