<?php


$filename = $_POST['filename'];
$content = $_POST['content'];
echo $content;
if (file_put_contents($filename, $content) !== false)
{
    echo "success";
    return;
}



echo "failure";

?>