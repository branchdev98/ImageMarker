<?php
$dirname = "./Image/";
$images = glob($dirname."*.{jpg,gif,png}",GLOB_BRACE);

foreach($images as $image) {
    echo '<img src="'.$image.'" /><br />';
}
?>