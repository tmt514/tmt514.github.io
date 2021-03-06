---
# The Domino object which can show the tilings,
# prepare for diamond lemma.
---

obj_id = 0
tile_store = new Array()
concerning = undefined

class Tile
  constructor: (@domino, @r, @c, @dir) ->
    @obj = undefined

  canmove: ->
    if @dir == 'x'
      if @c < @domino.col and @domino.grid[@r][@c+1] != undefined and @domino.grid[@r][@c+1].dir == 'x'
        return true
    else
      if @r < @domino.row and @domino.grid[@r+1][@c] != undefined and @domino.grid[@r+1][@c].dir == 'y'
        return true
    return false

  neighborTile: ->
    if @dir == 'x'
      return @domino.grid[@r][@c+1]
    if @dir == 'y'
      return @domino.grid[@r+1][@c]

  setconcern: ->
    @obj.attr('fill', 'rgb(150,150,255)')
    @obj.style({'cursor':'pointer'})

  setunconcern: ->
    @obj.attr('fill', 'rgb(255,150,150)')
    @obj.style({'cursor':'default'})

  getconcern: ->
    if concerning == this
      return
    if concerning != undefined
      concerning.unconcern()
      concerning = undefined
    if @canmove()
      @setconcern()
      @neighborTile().setconcern()
      concerning = this

  unconcern: ->
    if concerning == this and @canmove()
      @setunconcern()
      @neighborTile().setunconcern()
      concerning = undefined

  draw: (color = 'rgb(255,150,150)') ->
    if @obj == undefined
      @obj = @domino.canvas.append('rect')
      obj_id = obj_id + 1
      name = "tile" + obj_id
      @obj.attr('id', name)
      tile_store[name] = this
      @obj.on('mouseenter', ->
          id = d3.select(this).attr('id')
          tile_store[id].getconcern()
        ).on('mouseout', ->
          id = d3.select(this).attr('id')
          tile_store[id].unconcern()
        )
    @obj.attr('x', @r * @domino.cellsize + @domino.cellpadding)
    @obj.attr('y', @c * @domino.cellsize + @domino.cellpadding)
    if @dir == 'x'
      @obj.attr('width', @domino.cellsize * 2 - 2*@domino.cellpadding)
      @obj.attr('height', @domino.cellsize - 2*@domino.cellpadding)
    else
      @obj.attr('width', @domino.cellsize - 2*@domino.cellpadding)
      @obj.attr('height', @domino.cellsize * 2 - 2*@domino.cellpadding)
    @obj.attr('stroke', 'black')
    @obj.attr('stroke-width', 3)
    @obj.attr('fill', color)

  flipdir: (center_r, center_c) ->
    [@r, @c] = [center_r + (@c - center_c), center_c + (@r - center_r)]
    if @dir == 'x'
      @dir = 'y'
    else
      @dir = 'x'
    @draw('rgb(150,150,255)')

  rotate: ->
    @neighborTile().flipdir(@r, @c)
    @flipdir(@r, @c)
    tmp = @domino.grid[@r][@c+1]
    @domino.grid[@r][@c+1] = @domino.grid[@r+1][@c]
    @domino.grid[@r+1][@c] = tmp
    
    console.log('haha')


class Domino
  constructor: (options) ->
    {@row, @col, @base} = options
    console.log(@row, @col)
    @row = parseInt(@row)
    @col = parseInt(@col)
    console.log(@row, @col)
    console.log(@base)
    @grid = new Array(@row)
    for i in [0..@row]
      @grid[i] = new Array(@col)
    @tiles = []
    @createTiles()
    @canvas = @drawGrid()
    @cellsize = 25
    @cellpadding = 2
    @drawTiles()
    @canvas.on('click', ->
      if concerning == undefined
        return
      concerning.rotate()
    )

  drawTiles: ->
    for tile in @tiles
      tile.draw()

  createTiles: ->
    if @col % 2 == 0
      for i in [0...@row]
        for j in [0...@col/2]
          t = new Tile(this, i, j*2, 'y')
          @tiles.push(t)
          @grid[i][j*2] = t
    else if @row % 2 == 0
      for i in [0...@row/2]
        for j in [0...@col]
          t = new Tile(this, i*2, j, 'x')
          @tiles.push(t)
          @grid[i*2][j] = t
    else
      console.log('neither case!')

  drawGrid: ->
    if @canvas == undefined
      @canvas = @base.append('svg').attr('id', 'domino-svg')
    console.log(@canvas)
    return @canvas

base = d3.select('#domino')
if base
  a = new Domino {row: $('#domino').data('row'), col: $('#domino').data('col'), base: base}
  d3.select('#domino-svg').attr('height', 400).attr('width', 600)
  $('#domino').css('height', 400)
