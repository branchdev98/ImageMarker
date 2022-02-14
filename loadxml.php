<?php
$path = $_GET['filename'];

if(file_exists($path))
{
        
        // Read entire file into string
    $xmlfile = file_get_contents($path);

    echo(($xmlfile));

}

?>