---
# Visualizers
# Visualize given models such as arrays, trees, graphs
---


guid = ( ->
  s4 = () ->
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1)
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
)

Colors = {
  TRANSPARENT: 'rgba(0, 0, 0, 0)',
  BLUE: 'rgb(222, 222, 255)',
  RED: 'rgb(255, 200, 200)',
  GREEN: 'rgb(200, 233, 200)',
  YELLOW: 'rgb(255, 255, 200)',
  nextColor: (t) ->
    if t == Colors.TRANSPARENT
      return Colors.BLUE
    if t == Colors.BLUE
      return Colors.RED
    if t == Colors.RED
      return Colors.GREEN
    if t == Colors.GREEN
      return Colors.YELLOW
    return Colors.TRANSPARENT
}

SvgHelper = {
  createRectangle: (elem) ->
    oo = {
      id: guid(),
      x: 20,
      y: 20,
      width: 50,
      height: 50,
      strokeWidth: 2,
      stroke: 'black',
      bgcolor: 'rgba(0, 0, 0, 0)',
      text: elem.data
    }
    #oo.me = oo
    return oo
  align1DArray: (arr, x=20, y=20, w=50, h=50) ->
    for i in [0..arr.length-1]
      arr[i].x = x
      arr[i].y = y
      if arr[i].width == undefined
        arr[i].width = w
        arr[i].height = h
      x += arr[i].width
}

SvgTextHelper = {
  giveMeMathjax: (d) ->
    return "<body xmlns='http://www.w3.org/1999/xhtml'><div id='#{d.id}'>$#{d.text}$</div></body>"

  updateMathJaxDone: (d) ->
    obj = $("##{d.id} .MathJax_SVG")
    w = obj.width()
    h = obj.height()
    foreignObj = $(obj).parents(".tmtobj")[0]
    d.width = Math.max(50, w + 20)
    d.height = Math.max(50, h + 20)
    d3.select(foreignObj).attr('x', d.width/2 - w/2)
                         .attr('y', d.height/2 - h/2)

    d3.select(foreignObj.previousSibling)
                         .attr('width', d.width)
                         .attr('height', d.height)

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
    d.x = d3.event.x
    d.y = d3.event.y
    dx = d.x
    dy = d.y
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
    @updateSVG()

  updateSVG: () ->
    SvgHelper.align1DArray(@jsonArray)
    drag = d3.behavior.drag()
             .origin((d) -> return d)
             .on('dragstart', SvgRectHelper.dragstarted)
             .on('drag', SvgRectHelper.dragged)
             .on('dragend', SvgRectHelper.dragended)

    d3.selectAll('foreignObject').html('')
    gs = @svg.selectAll("g").data(@jsonArray)
    newrects = gs.enter().append("g")
    newrects.append('rect')
    newrects.append('foreignObject')
    gs.attr('transform', (d) -> return "translate(" + d.x + "," + d.y + ")" )
      .call(drag)
    gs.exit().remove()

    gs.each( (d) ->
      ((d) ->
         d3.select(this).select('rect')
         .attr('x', 0 )
         .attr('y', 0 )
         .attr('width', d.width )
         .attr('height', d.height )
         .style('fill', d.bgcolor )
         .style('stroke', d.stroke )
         .style('stroke-width', d.strokeWidth )
         .on('click', () ->
           if d3.event.shiftKey
             rect = d3.select(this)
             d.bgcolor = Colors.nextColor(d.bgcolor)
             d3.select(this).style('fill', d.bgcolor)
         )
      ).bind(this, d)()
      d3.select(this).select('foreignObject')
         .classed('tmtobj', true)
         .html(SvgTextHelper.giveMeMathjax(d))
         .on('dblclick', SvgTextHelper.dblclicked)
         .call(((d) ->
            ret = MathJax.Hub.Typeset(d.id, SvgTextHelper.updateMathJaxDone.bind(null, d))

            # This must be the first time when page is loaded
            if !ret
              MathJax.Hub.Queue(((d) -> SvgTextHelper.updateMathJaxDone(d)).bind(null, d))
         ).bind(null, d))
    )

class Visualizer
  constructor: (@data, @svg) ->

  initialize: () ->
    if !@svg
      @svg = d3.select('.post').append('svg').attr('width', 900).attr('height', 500).attr('id', 'svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg').attr('version', '1.1').style('position', 'relative')
      @data.setSVG(@svg)

class Array1DVisualizer extends Visualizer
  constructor: (data, svg) ->
    super(data, svg)

  updateSVG: () ->
    @data.updateSVG()

window.Visualizer = Visualizer

$(document).ready( ->
  data = new DataArray([1, 2, 15, "x\\oplus y", "8x+7"])
  v = new Array1DVisualizer(data, null)
  v.initialize()
  $('#updateSVG').click(((v) -> v.updateSVG()).bind(null, v))
)
