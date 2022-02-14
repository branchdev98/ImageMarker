    var img_width, img_height;
    function readURL(input) {
           
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#blah')
                        .attr('src', e.target.result);

                      
                      
                        //.width(150)
                        //.height(200);
                      // 
        
                      //

                     
                        //canvas.height =  $('#blah').attr('height');
                   
                       
                };

                reader.readAsDataURL(input.files[0]);
            }
        }
        function readXML(input) {
            if (input.files && input.files[0]) {
          
                var reader = new FileReader();
             
                
                reader.onload = function (e) {
                    
                    $('#xml')
                        .val(reader.result);
                        //.width(150)
                        //.height(200);
                };
                var data = reader.readAsText(input.files[0]);

                
            }
        }
 
        let myImg = document.querySelector("#blah");
        var canvas = document.getElementById("imgCanvas");
        var load = function(e){
            
            canvas.width = e.width;
            canvas.height = e.height;
            canvas.style.left = e.offsetLeft + "px";
            canvas.style.top = e.offsetTop + "px";
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
            const color = pen_style.color = pen_color.value;
            const cap = pen_style.cap = pen_cap.value;
            // reuse the same canvas every time
            const cursor_canvas = pen_style.canvas;
            const cursor_ctx = cursor_canvas.getContext( "2d" );
          
            // update the canvas's drawing
            cursor_canvas.width = cursor_canvas.height = rad;
          //  cursor_ctx.fillStyle = color;
            if( cap === "round" ) {
              cursor_ctx.arc( rad / 2, rad / 2, rad / 2, 0, Math.PI * 2 );
            }
            else {
              cursor_ctx.rect( 0, 0, rad, rad );
            }
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
function draw(event) {
    var pos = getMousePos(canvas, event);
    posx = pos.x;
    posy = pos.y;
    //context.fillStyle = "transparent";
    context.strokeStyle=pen_style.color;
    context.beginPath();
    if( pen_style.cap === "round" ) {
        context.arc(posx,posy,pen_style.radius/2,0, 2*Math.PI);
    }else{
        context.rect( posx-pen_style.radius/2,posy-pen_style.radius/2, pen_style.radius, pen_style.radius );
    }
    context.linewidth = 1;
    context.stroke();
   
    //context.fill();
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}