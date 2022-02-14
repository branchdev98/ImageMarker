<!DOCTYPE html>
<html>

<h1>Please select image file </h1>
<?php
    $dirname = "./Image/";
    $images = glob($dirname."*.{jpg,jpeg,gif,png}",GLOB_BRACE);

    foreach($images as $image) {
        echo '<a href="./second.php?file='.$image.'">' . $image. '</a><br />';
    }
?>

</html>