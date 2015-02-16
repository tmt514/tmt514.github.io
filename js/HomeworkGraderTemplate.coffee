---
# Grader use
---

update = ->
  str = ''
  sumscore = 0
  console.log('update')
  $('div[name=hw-probs]').each( (idx, obj) ->
    probname = $(obj).data('prob-name')
    totalscore = $(obj).data('prob-score')
    finalscore = totalscore
    msg = ''


    # Active Remark
    activeRemark = ''
    p = $(obj).find('span.hw-remark-active')[0]
    if p != undefined
      activeRemark = " - #{$(p).data('remark')}"
    
    
    $(obj).find('input:checked').each( (idy, box) ->
      finalscore -= parseInt($(box).data('score'))
      msg += $(box).next().text() + "\n"
    )
    
    # Comments
    comment = $(obj).find('input.hw-comments-input').val()
    if comment != ''
      msg += comment + "\n"

    sumscore += parseInt(finalscore)
    str += "#{probname}. #{finalscore}/#{totalscore}#{activeRemark}\n#{msg}\n"
  )

  str = "Total Score: #{sumscore}\n\n" + str
  $('.hw-output').text(str)

$('.hw-rubics').click( ->
  update()
)
$('.hw-remark').click( ->
  probname = $(this).data('prob-name')
  $("span.hw-remark-active[data-prob-name='#{probname}']").removeClass('hw-remark-active')
  $(this).toggleClass('hw-remark-active')
  update()
)
$('.hw-clearall').click( ->
  $("input:checked").attr('checked', false)
  $("span.hw-remark-active").removeClass('hw-remark-active')
  update()
)

myidx = 514
$('.hw-add').click( ->
  probname = $(this).data('prob-name')
  commentbox = $("input.hw-comments-input[data-prob-name='#{probname}']")
  comment = commentbox.val()
  v = comment.replace(/\(-(\d*)pts\) (.*)/g,'$1,$2').split(',')
  score = parseInt(v[0])
  return if isNaN(score)
  comment = v[1]
  t = "<div class='hw-rubics hw-rubics-unsaved'><input class='hw-rubics-checkbox' type='checkbox' name='prob-#{probname}' id='rule-#{probname}-#{myidx}' data-score='#{score}' checked><label class='hw-rubics-label' for='rule-#{probname}-#{myidx}'>(-#{score}pts) #{comment}</label></div>"
  $("div.hw-rubics-group[data-prob-name='#{probname}']").find('input.hw-comments-input').before(t)
  myidx += 1
  commentbox.val('')
  update()
)
$('.hw-comments-input').keyup( ->
  console.log('hi')
  update()
)
