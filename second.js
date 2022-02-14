var img_width, img_height;
let number = 1;
let point_array=[];
 
    let myImg = document.querySelector("#blah");
    var canvas = document.getElementById("imgCanvas");
    var load = function(e){
        
        canvas.width = e.width;
        canvas.height = e.height;
        canvas.style.left = e.offsetLeft + "px";
        canvas.style.top = e.offsetTop + "px";
        loadXML();
    }
    document.addEventListener('DOMContentLoaded',function() {
        document.querySelector("#pen_number").onchange=loadedit;
    },false);
    let pen_number=1;
   var loadedit = function(e){
    pen_number = parseInt(document.getElementById("pen_number").value);
   // pen_number++;
   }
    canvas.style.position = "absolute";
   
    var context = canvas.getContext("2d");
    context.drawImage(myImg, 0, 0);
    const pos = { x: 0, y: 0 };
    const pen_style = {
        color: "#FF0000",
        cap: "circle",
        radius: 5,
        canvas: document.createElement("canvas"),
        cursor_url: null
      };
      document.querySelector( "fieldset" ).oninput = updatePenStyle;
      updatePenStyle();
      function updatePenStyle() {
        // grab the new values
        const rad = pen_style.radius = pen_radius.value;
        const color = pen_style.color;
        const cap = pen_style.cap;
        // reuse the same canvas every time
        const cursor_canvas = pen_style.canvas;
        const cursor_ctx = cursor_canvas.getContext( "2d" );
      
        // update the canvas's drawing
        cursor_canvas.width = cursor_canvas.height = rad;
      //  cursor_ctx.fillStyle = color;
      
          cursor_ctx.arc( rad / 2, rad / 2, rad / 2, 0, Math.PI * 2 );
     
      cursor_ctx.strokeStyle=color;
        cursor_ctx.stroke();
        // extract it as a png image
        cursor_canvas.toBlob( function( blob ) {
          // revoke the previous blob URL we created (if any)
          URL.revokeObjectURL( pen_style.cursor_url );
          // store the new one
          pen_style.cursor_url = URL.createObjectURL( blob );
          // use it as CSS 'cursor'
          canvas.style.cursor = `url(${ pen_style.cursor_url }) ${ rad/2 } ${ rad/2 }, auto`;
        });  
      }
     
    
      function loadXML()
      {
        var xhr = new XMLHttpRequest();
  
      //convert array to xml format
        var filename = document.getElementById("filename").getAttribute('value');
        
        var xmlfilename = filename.slice(0,-3)+"xml";
        
        var xmlcontent;
        xhr.open("GET", "loadxml.php?filename=" + xmlfilename);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                
                
                xmlcontent = this.response;
                var arrayTags = ["documents", "point"];
                point_array=  parseXml(xmlcontent, arrayTags);
                redraw();
                //xmltoarray(xmlcontent);        
            }
        }
        
        
        
      }

      function parseXml(xml, arrayTags) {
        let dom = null;
        if (window.DOMParser) dom = (new DOMParser()).parseFromString(xml, "text/xml");
        else if (window.ActiveXObject) {
            dom = new ActiveXObject('Microsoft.XMLDOM');
            dom.async = false;
            if (!dom.loadXML(xml)) throw dom.parseError.reason + " " + dom.parseError.srcText;
        }
        else throw new Error("cannot parse xml string!");
    
        function parseNode(xmlNode, result) {
            if (xmlNode.nodeName == "#text") {
                let v = xmlNode.nodeValue;
                if (v.trim()) result['#text'] = v;
                return;
            }
    
            let jsonNode = {},
                existing = result[xmlNode.nodeName];
            if (existing) {
                if (!Array.isArray(existing)) result[xmlNode.nodeName] = [existing, jsonNode];
                else result[xmlNode.nodeName].push(jsonNode);
            }
            else {
                if (arrayTags && arrayTags.indexOf(xmlNode.nodeName) != -1) result[xmlNode.nodeName] = [jsonNode];
                else result[xmlNode.nodeName] = jsonNode;
            }
    
            if (xmlNode.attributes) for (let attribute of xmlNode.attributes) jsonNode[attribute.nodeName] = attribute.nodeValue;
    
            for (let node of xmlNode.childNodes) parseNode(node, jsonNode);
        }
    
        let result = {};
        for (let node of dom.childNodes) parseNode(node, result);
        
        return result.documents[0].point;
    }

  
function drawCircle(context, point){


    context.strokeStyle=pen_style.color;
    context.beginPath();
    context.font = point.size/2 + "px Arial";
    
    context.fillStyle = pen_style.color;
    console.log(pen_style.color);
    
    let offset_w = point.number>9 ? point.size/4 :  point.size/8;
       
    context.arc(point.x,point.y,point.size/2,0, 2*Math.PI);
    context.linewidth = 1;
    context.stroke();
    
    context.fillText(point.number, parseInt(point.x)-parseInt(offset_w), parseInt(point.y) + parseInt(point.size)/7);
}
function redraw(){
    for (var i=0; i<point_array.length; i++){
        drawCircle(context, point_array[i] );
    }
}
function draw(event) {
    var pos = getMousePos(canvas, event);
    posx = pos.x;
    posy = pos.y;
   
    

   
    const point = {number: pen_number, x: posx, y: posy, size: pen_style.radius};
    point_array.push(point);
    drawCircle(context, point );
    

    pen_number++;
    var pen_number_edit =  document.getElementById("pen_number1");
    pen_number_edit.setAttribute("value", pen_number);
   
}

function save(){
    var content = toXML(point_array); //convert array to xml format
    var filename = document.getElementById("filename").getAttribute('value');
    
    var xmlfilename = filename.slice(0,-3)+"xml";
    var xhr = new XMLHttpRequest();
  
    // Making our connection  
    var url = 'savexml.php';
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("filename=" + xmlfilename + "&content=" + content);
    // function execute after request is successful 
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "success")
                alert("successfully saved xml file");
            //console.log(this.responseText);
        }
    }
    // Sending our request 
    



    //file_put_contents($xmlfilename, $content); //write to file
  
  
}
function toXML(point_array){
    var toXml  = "<documents>";

 toXml = (point_array) => {
    return point_array.reduce((result, el) => {
     return result + `<point number="${el.number}" x="${el.x}" y="${el.y}" size="${el.size}"></point>\n`
    }, '')
  }
  toXML += "</documents>";
  return "<documents>" + toXml(point_array);
}
function getMousePos(canvas, evt) {
var rect = canvas.getBoundingClientRect();
return {
  x: evt.clientX - rect.left,
  y: evt.clientY - rect.top
};
}