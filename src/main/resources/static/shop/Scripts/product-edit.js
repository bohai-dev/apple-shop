$(function () {
  var href = window.parent.location.href;//获取上一级地址
	var addr = href.split("?");
	var addrVal = addr[1].split("=");
	var storeNo = addrVal[1];
  var storeNo = { storeNo: addrVal[1] };
  var goodsId = "";
  // console.log("storeNo=" + storeNo);
  // 商品信息
  var goodsId = "";
  function reload() {
    $.ajax({
      type: 'POST',
      url: 'http://47.101.136.194:8089/queryGoodsInfo',
      contentType: "application/json",
      data: JSON.stringify(storeNo),
      success: function (msg) {
        //alert(msg);
        // setTimeout("closeDiv()",2000);
        console.log(msg);
        // console.log(JSON.parse(msg.data));
        if (msg.rspCode == 00000) {
          var str = "<table class='tb' id='list'>";
          var guige = "";
          str += "<tr><th>商品名称</th><th style='display:none'>商品图片</th><th>所属分类</th><th>商品介绍</th><th>状态</th><th>操作</th></tr>"
          for (var i = 0; i < msg.data.length; i++) {
            for (var j = 0; j < msg.data[i].classInfos.length; j++) {
              guige = msg.data[i].classInfos[j].cnClassName;
            }
            var beIntroduction = msg.data[i].cnGoodsIntroduction == null ? '暂无' : msg.data[i].cnGoodsIntroduction;
            if (msg.data[i].goodsStatus == 1) {
              str += "<tr><td class='aquireId' data-goodsid='" + msg.data[i].goodsId + "'>" + msg.data[i].cnGoodsName + "</td><td style='display:none'>" + msg.data[i].cnGoodsPictureBig + "</td><td>" + guige + "</td><td>" + beIntroduction + "</td><td class='showStatus'>在售</td><td><a href='goods-edit.html?goodsId=" + msg.data[i].goodsId + "' class='edit-content padding-distance'>修改</a><span onclick='delElement(this)' class='opener1 edit-content'>删除</span></td></tr>";
            } else if (msg.data[i].goodsStatus == 0) {
              str += "<tr><td class='aquireId' data-goodsid='" + msg.data[i].goodsId + "'>" + msg.data[i].cnGoodsName + "</td><td style='display:none'>" + msg.data[i].cnGoodsPictureBig + "</td><td>" + guige + "</td><td>" + beIntroduction + "</td><td class='showStatus'>不在售</td><td><a href='goods-edit.html?goodsId=" + msg.data[i].goodsId + "' class='edit-content padding-distance'>修改</a><span onclick='delElement(this)' class='opener1 edit-content'>删除</span></td></tr>";
            }
          }
          str += "</table>";
          $("#goods-show").append(str);
          
        } else {
          alert(msg.cnErrorMsg);
        }
      },
      error: function (xhr) {
        console.log(xhr)
      }
    })
  }
  reload();
});
function delElement(r) {
  if (confirm("确定删除此规格吗？")) {
    var href = document.referrer;
    console.log(href);
    var addr = href.split("?");
    var addrVal = addr[1].split("=");
    var storeNo = { storeNo: addrVal[1] };
    goodsId = r.parentNode.parentNode.children;
    console.log(goodsId[0]);
    goodsId = goodsId[0].getAttribute('data-goodsId');
    console.log(goodsId);
    $.ajax({
      type: 'delete',
      url: 'http://47.101.136.194:8089/removeGoods/' + goodsId,
      contentType: "application/json",
      // data: JSON.stringify(storeNo),
      success: function (msg) {
        //alert(msg);
        // setTimeout("closeDiv()",2000);
        console.log(msg);
        // console.log(JSON.parse(msg.data));

        if (msg.rspCode == 00000) {
          var tr = r.parentNode.parentNode;
          tr.remove();
          // reload();
        }
      }
    })
  }
}


