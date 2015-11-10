---
# Visualizers
# Visualize given models such as arrays, trees, graphs
---


guid = ( ->
  s4 = () ->
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1)
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
)

SvgHelper = {
  createRectangle: (elem) ->
    return {
      id: guid(),
      x: 20,
      y: 20,
      width: 50,
      height: 50,
      strokeWidth: 2,
      stroke: 'black',
      bgcolor: 'rgba(0,0,0,0)',
      text: elem.data
    }
  align1DArray: (arr, x=20, y=20, w=50, h=50) ->
    for i in [0..arr.length-1]
      arr[i].x = x
      arr[i].y = y
      arr[i].width = w
      arr[i].height = h
      x += w
}

SvgTextHelper = {
  giveMeMathjax: (d) ->
    return "<body xmlns='http://www.w3.org/1999/xhtml'><div id='#{d.id}'>$#{d.text}$</div></body>"

  updateMathJaxDone: (d) ->
    obj = $("##{d.id} .MathJax_SVG")
    w = obj.width()
    h = obj.height()
    foreignObj = $(obj).closest(".tmtobj")[0]
    d3.select(foreignObj).attr('x', d.width/2 - w/2)
                         .attr('y', d.height/2 - h/2)
    

  updateMathJax: (d) ->
    MathJax.Hub.Typeset(d.id, SvgTextHelper.updateMathJaxDone.bind(null, d))

  dblclicked: (d) ->
    meow = d
    d.text = window.prompt(d.text, d.text)
    d3.select(this).html(SvgTextHelper.giveMeMathjax(d))
    SvgTextHelper.updateMathJax(meow)
}

SvgRectHelper = {
  dragstarted: (d) ->
    d3.event.sourceEvent.stopPropagation()
    d3.select(this).classed('dragging', true)
  dragged: (d) ->
    dx = d.x = d3.event.x
    dy = d.y = d3.event.y
    d3.select(this).attr('transform', "translate(#{dx}, #{dy})")
  dragended: (d) ->
    d3.select(this).classed('dragging', false)
}

class DataNode
  constructor: (@data) ->
    @svg = null

class DataArray
  constructor: (@arr) ->
    @data = new Array()
    for i in [0..@arr.length-1]
      @data[i] = new DataNode(@arr[i])


  setSVG: (@svg) ->
    @jsonArray = new Array()
    for elem in @data
      jsonRect = SvgHelper.createRectangle(elem)
      @jsonArray.push(jsonRect)
    SvgHelper.align1DArray(@jsonArray)
    @updateSVG()

  updateSVG: () ->

    drag = d3.behavior.drag()
             .origin((d) -> return d)
             .on('dragstart', SvgRectHelper.dragstarted)
             .on('drag', SvgRectHelper.dragged)
             .on('dragend', SvgRectHelper.dragended)

    rects = @svg.selectAll("rect").data(@jsonArray).enter().append("g")
    rects.attr('transform', (d) -> return "translate(" + d.x + "," + d.y + ")" )
         .call(drag)
    rects.append('rect')
         .attr('x', (d) -> return 0 )
         .attr('y', (d) -> return 0 )
         .attr('width', (d) -> return d.width )
         .attr('height', (d) -> return d.height )
         .style('fill', (d) -> return d.bgcolor )
         .style('stroke', (d) -> return d.stroke )
         .style('stroke-width', (d) -> return d.strokeWidth )
    rects.append('foreignObject')
         .classed('tmtobj', true)
         .attr('x', (d) -> return d.height/2 )
         .attr('y', (d) -> return d.width/2 )
         .html( (d) -> return SvgTextHelper.giveMeMathjax(d) )
         .on('dblclick', SvgTextHelper.dblclicked)
         #.attr('text-anchor', 'middle')
         #.attr('alignment-baseline', 'central')
         #.attr('font-family', 'sans-serif')
         #.attr('font-size', '20px')
         #.attr('fill', 'black')

class Visualizer
  constructor: (@data, @svg) ->

  initialize: () ->
    if !@svg
      @svg = d3.select('.post').append('svg').attr('width', 300).attr('height', 300).attr('id', 'svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg').attr('version', '1.1').style('position', 'relative')
      @data.setSVG(@svg)

class Array1DVisualizer extends Visualizer
  constructor: (@data, @svg) ->
    super(@data, @svg)

window.Visualizer = Visualizer

$(document).ready( ->
  data = new DataArray([1, 2, 15, "x"])
  v = new Array1DVisualizer(data, null)
  v.initialize()
)
