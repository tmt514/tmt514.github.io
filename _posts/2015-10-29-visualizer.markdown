---
layout: post
title: Data Structure Visualizer
draft: true
customjs:
  - Visualizers.js
---

# This is a test of using SVG graphics

<div id="result" style="border:3px solid grey"></div>
<button id="save" class="btn btn-primary">Save
</button>


<button id="updateSVG" class="btn btn-primary">updateSVG</button>

<canvas id="canvas" style="display:none;"></canvas>

<script>
d3.select("#save").on("click", function(){
  var svg  = document.getElementById('svg'),
      xml  = new XMLSerializer().serializeToString(svg),
      data = "data:image/svg+xml;base64," + btoa(xml),
      img  = new Image(),
      canvas = document.getElementById('canvas'),
      context = canvas.getContext("2d")

  img.setAttribute('src', data)
  $('#result').html('')
  $('#result').append(img)
  /*img.onload = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0);

    var canvasdata = canvas.toDataURL("image/png");
    var a = document.createElement("a");
    a.download = "sample.png";
    a.href = canvasdata;
    a.click();
  };*/

});
</script>
