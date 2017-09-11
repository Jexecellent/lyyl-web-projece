$(function() {
  var subData = {
    pageNum:1,
    pageSize:20,
    anchorId:1,
  };
  $('#cm-form').on('submit', function(e) {
    e.preventDefault();
    var t = $(this),
        arrData = t.serializeArray(),
        sData = {};
      $.each(arrData, function(i,e) {
        if(e.value!=='') {
          sData[e.name] = e.value;
        }
      });
      $.extend(subData, sData);

      loadList(subData);
  })

  // loadList(subData);

  var temp1 = template('tpl-smlist')

  // 拉取列表
  function loadList(data) {
    lib.api.senPost('LIVE_RECORD', data, function(resp){
        $('#mm_data1').html(temp1(resp));
    });

  }

  loadList(subData);

})