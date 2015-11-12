---
layout: post
title: Data Structure Visualizer
draft: true
customjs:
  - Visualizers.js
---

# This is a test of using SVG graphics

<input id='arrayDisplayStyle-equalSizeBox' type='radio' name='arrayDisplayStyle' value='equalSizeBox'>
<label for='arrayDisplayStyle-equalSizeBox'>All box have equal size</label>
<input id='arrayDisplayStyle-minBox' type='radio' name='arrayDisplayStyle' value='minBox' checked>
<label for='arrayDisplayStyle-minBox'>Minimum size box</label>

<button id="updateSVG" class="btn btn-primary">updateSVG</button>

<canvas id="canvas" style="display:none;"></canvas>
