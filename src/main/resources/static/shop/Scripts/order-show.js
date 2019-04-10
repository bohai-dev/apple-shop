$(function () {
  var href = document.referrer;
  // console.log(href);
  var addr = href.split("?");
  var addrVal = addr[1].split("=");
  var storeNo = addrVal[1];
  // console.log(storeNo);
  var orderNo = "";

  function reload() {
    var totalPage = 1;//总共多少页
    var totalRecords = 1;//总共多少条
    var pageSize = 20;//每页显示多少条
    var orderStatus = "0";
    loadList(1);
    // console.log($("tr").length);
    // for(var i=1;i<$("tr").length;i++){
    //   if($("tr")[i]){

    //   }
    // }

    function loadList(pno) {
      var data = {
        pageNumber: pno,
        pageSize: pageSize,
        params: {
          storeNo: storeNo,
          orderStatus: orderStatus,
          payStatus: 1
        }
      }
      // console.log(data);
      $.ajax({
        type: "post",
        url: "http://47.101.136.194:8089/queryOrderPage",
        contentType: "application/json",
        data: JSON.stringify(data),
        async: true,
        success: function (result) {
          // console.log(result);
          // console.log(result.rows.length);
          if (result.rspCode == 00000) {
            var count = result.total;
            $("#order-count").text(count);
            var data = result.rows;
            // console.log(data);
            totalRecords = count;
            totalPage = Math.ceil(count / pageSize);
            var datalist = "<table class='tb' id='list'>";
            datalist += "<tr><th>订单编号</th><th>收货人姓名</th><th>收货人电话</th><th>收货地址</th><th>下单时间</th><th>订单总金额</th><th>支付状态</th><th>订单状态</th><th>订单详情</th><th>选择操作</th><th class='hideThis'>商品详情</th><th class='hideThis'>用户备注</th><th class='hideThis'>物流编号</th><th class='hideThis'>用户手机号</th></tr>";
            var datalist3 = "";
            
            if (result.rows == null) {
              alert("暂无数据！");
            } else {
              // debugger;
              for (var i = 0; i < result.rows.length; i++) {
                var name = "";
                var ingredients = "";
                var payStatus = "";
                var takeNo = "";
                var orderStatus = "";
                if (result.rows[i].orderDetails == null) {
                  name = ""
                } else {
                  for (var j = 0; j < result.rows[i].orderDetails.length; j++) {
                    name += result.rows[i].orderDetails[j].goodsName +" &nbsp;规格："+ result.rows[i].orderDetails[j].standardName + "  *" + result.rows[i].orderDetails[j].standardNum + " &nbsp;&nbsp; 共计：" + result.rows[i].orderDetails[j].orderPrice + "元" + "<br/><div style='width:100%;height:3px'></div>";
                  }
                }
                if (result.rows[i].orderStatus == 0) {
                  orderStatus = "待发货";
                }
                if (result.rows[i].remark == null) {
                  result.rows[i].remark = "无";
                }
                // console.log(result.rows[i].takeNo);
                if (result.rows[i].takeNo == null) {
                  result.rows[i].takeNo = "暂无";
                }

                if (result.rows[i].payStatus == 0) {
                  payStatus = "待支付"
                } else if (result.rows[i].payStatus == 1) {
                  payStatus = '支付成功'
                } else if (result.rows[i].payStatus == 2) {
                  payStatus = '支付失败'
                }
                if(result.rows[i].postName == null) {
                  result.rows[i].postName = "暂无"
                }
                if(result.rows[i].postTel == null) {
                  result.rows[i].postTel = "暂无"
                }
                if(result.rows[i].postAddress == null) {
                  result.rows[i].postAddress = "暂无";
                }
                datalist += '<tr>' +
                  '<td>' + result.rows[i].orderNo + '</td>' +
                  '<td>' + result.rows[i].postName + '</td>' +
									'<td>' + result.rows[i].postTel + '</td>' +
									'<td>' + result.rows[i].postAddress + '</td>' +
                  '<td>' + result.rows[i].orderTime + '</td>' +
                  '<td>' + result.rows[i].orderPrice + '</td>' +
                  '<td>' + payStatus + '</td>' +
                  '<td>' + orderStatus + '</td>' +
                  '<td><span class="opener">查看详情</span></td>' +
                  '<td><span class="opener1">点击此处输入物流编号</span></td>' +
                  '<td  class="hideThis orderNo">' + name + '</td>' +
                  '<td class="hideThis">' + result.rows[i].remark + '</td>' +
                  '<td class="hideThis">' + result.rows[i].takeNo + '</td>' +
                  '<td class="hideThis">' + result.rows[i].orderTime + '</td>' +
                  '</tr>'
              }
            }
            datalist += '</table>'
            $(".result-show").html(datalist);
            $('.total').text(totalPage);
            $('.count').text(count);
            $('.now').text(pno);
            $('.M-box').pagination({
              pageCount: totalPage,
              current: pno,//当前第几页
              jump: true,
              coping: true,
              homePage: '首页',
              endPage: '末页',
              prevContent: '上页',
              nextContent: '下页',
              callback: PageClick
            });
            // console.log(pno)
          }
          $(".opener").click(function () {
            //debugger;
            var tds = $(this).parent().parent().children();
            // console.log(tds[0].innerHTML);
            $('#orderNumber').html(tds[0].innerHTML);
            $('#reciverName').html(tds[1].innerHTML)
						$('#reciverTel').html(tds[2].innerHTML)
						$('#reciveAddr').html(tds[3].innerHTML)
            $('#orderTime').html(tds[4].innerHTML);
            $('#totalPrice').html(tds[5].innerHTML)
            $('#payStatus').html(tds[6].innerHTML)
            $('#orderStatus').html(tds[7].innerHTML)
            $('#goodsInfo').html(tds[10].innerHTML)
            $('#userRemark').html(tds[11].innerHTML)
            $('#wuliuNo').html(tds[12].innerHTML)
            // $('#reciveAddr').html(tds[12].innerHTML)
            $("#dialog").dialog("open");
            return false;
          });
          if (window.screen) {
            var myw = screen.availWidth * 0.4;
            var myh = screen.availHeight * 0.6;

            $('#dialog').dialog({
              title: "订单详情",
              autoOpen: false,//如果设置为true，则默认页面加载完毕后，就自动弹出对话框；相反则处理hidden状态。 
              bgiframe: true, //解决ie6中遮罩层盖不住select的问题  
              width: myw,
              height: myh,
              resizeble: true,
              modal: true,//这个就是遮罩效果   
              buttons: {
                "返回": function () {
                  $(this).dialog("close");
                }
              }
            })
          }

          $(".opener1").click(function () {
            tr1 = $(this).parent().parent();
            td = $(this).parent().parent().children();
            orderNo = td[0].innerHTML;
            $("#dialogOrdernumber").html(orderNo);
            if (td[7].innerHTML == "待发货") {
              $("#dialog1").dialog("open");
            } else {
              alert("已有物流编号，请勿重复输入！");
            }
            return false;
          });
          if (window.screen) {
            var myw = screen.availWidth * 0.4;
            var myh = screen.availHeight * 0.3;

            $('#dialog1').dialog({
              title: "订单详情",
              autoOpen: false,//如果设置为true，则默认页面加载完毕后，就自动弹出对话框；相反则处理hidden状态。 
              bgiframe: true, //解决ie6中遮罩层盖不住select的问题  
              width: myw,
              height: myh,
              resizeble: true,
              modal: true,//这个就是遮罩效果   
              buttons: {
                "确定": function () {
                  if (!$("#logistics").val()) {
                    alert("请输入物流编号！")
                  } else {
                    var orderStatus = "1";
                    var takingNo = $("#logistics").val();
                    var data = {
                      orderNo: orderNo,
                      orderStatus: orderStatus,
                      trakingNo: takingNo
                    }
                    console.log(data);
                    console.log(JSON.stringify(data));
                    $.ajax({
                      type: "post",
                      url: "http://47.101.136.194:8089/modifyOrder",
                      contentType: "application/json",
                      data: JSON.stringify(data),
                      async: true,
                      success: function (result) {
                        // tr1[0].removeNode;
                        // console.log(leng);
                        showZhezhaoMsg('物流编号填写成功！')
                        reload();
                      }
                    })
                    $(this).dialog("close");
                  }
                },
                "返回": function () {
                  $(this).dialog("close");
                }
              }
            })
          }
        },
      });
    }
    //回调函数  
    PageClick = function (index) {
      // $('.now').text(index.getCurrent());
      loadList(index.getCurrent());//点击分页加载列表数据  */
    }
  }
  reload();

})

