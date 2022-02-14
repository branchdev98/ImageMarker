<!DOCTYPE html>
<html>
    <head>
        <?php
            $file = $_GET['file'];
        ?>
    </head>
<body>
    <fieldset>
    <legend>Circle Size</legend>

    <label>
    <input type="hidden" id="filename" value=<?php echo($file); ?>>
    </label><br/>
    <label for="cars">Choose a Method</label>

    <select name="method" id="method">
    <option value="draw">Draw</option>
    <option value="delete">Delete</option>
    
    </select>
    <br>
    <label>
    Input Number to change<t><input type="number" min="1" max="99" value="1" id="pen_number" onchange="loadedit(this)">
    </label><br/>
    <label>
    Next Number<t><input disabled type="number" min="1" max="99" value="1" id="pen_number1" onchange="loadedit(this)">
    </label><br/>

    <label>
    Circle Radius<t><input type="number" min="10" max="100" value="30" id="pen_radius">
    </label><br/>
    <label>
    Save<t><input type="button"  value="Save" id="save" onclick="save()">
    </label><br/>

    </fieldset>
    <div class="container" id="container">
    <canvas id="imageCanvas" width="500"></canvas>
    </div>

    <img id="blah" src="<?php echo $file; ?>" alt="your image" onload="load(this)"/>
    <canvas style="margin:0;padding:0;position:relative;left:0px;top:0px;" id="imgCanvas" width="0" height="0" onclick="draw(event)"></canvas>
</body>

<script src="second.js"></script>
</html>




