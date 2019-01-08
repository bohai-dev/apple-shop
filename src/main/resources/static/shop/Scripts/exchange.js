$(function () {
    var href = document.referrer;
    // console.log(href);
    var addr = href.split("?");
    var addrVal = addr[1].split("=");
    var storeNo = addrVal[1];
    console.log(storeNo);
    $("#search").click(function () {
        var orderNo = $("#orderNo").val() == "" ? null : $("#orderNo").val();
        var userNo = $("#userNo").val() == "" ? null : $("#userNo").val();
        var totalPage = 1;//总共多少页
        var totalRecords = 1;//总共多少条
        var pageSize = 20;//每页显示多少条
        loadList(1);
        function loadList(pno) {
            var data = {
                pageNumber: pno,
                pageSize: pageSize,
                params: {
                    // beginDate: selectedDate1,
                    // endDate: selectedDate2,
                    orderNo: orderNo,
                    // orderStatus: orderStatus,
                    // payStatus: payStatus,
                    storeNo: storeNo,
                    // telephone: phoneNo,
                    userNo: userNo,
                }
            }
            // console.log(data);
            $.ajax({
                type: "post",
                url: "http://47.101.136.194:8089/returngoods/selectbypage",
                contentType: "application/json",
                data: JSON.stringify(data),
                async: true,
                success: function (result) {
                    console.log(result);
                    // console.log(result.rows.length);
                    if (result.rspCode == 00000) {
                        var count = result.total;
                        $("#order-count").text(count);
                        var data = result.rows;
                        console.log(data);
                        totalRecords = count;
                        totalPage = Math.ceil(count / pageSize);
                        var datalist = "<table class='tb' id='list'>";
                        datalist += "<tr><th>订单编号</th><th>用户编号</th><th>退换货理由</th><th>处理状态</th><th>处理人</th><th>处理备注</th><th>创建时间</th><th>处理成功时间</th><th>详情</th></tr>";
                        var datalist3 = "";
                        var orderStatus = "";
                        if (result.rows == 0) {
                            alert("无数据");
                        } else {
                            // debugger;
                            for (var i = 0; i < result.rows.length; i++) {
                                var name = "";
                                var ingredients = "";
                                var handleStatus = "";
                                if (result.rows[i].handleStatus == 0) {
                                    handleStatus = "待处理";
                                } else if (result.rows[i].handleStatus == 1) {
                                    handleStatus = "处理中";
                                } else if (result.rows[i].handleStatus == 2) {
                                    handleStatus = "处理成功";
                                }
                                if (result.rows[i].handleRemark == null) {
                                    result.rows[i].handleRemark = "暂无";
                                }
                                datalist += '<tr>' +
                                    '<td>' + result.rows[i].orderId + '</td>' +
                                    '<td>' + result.rows[i].userId + '</td>' +
                                    '<td>' + result.rows[i].reason + '</td>' +
                                    '<td>' + handleStatus + '</td>' +
                                    '<td>' + result.rows[i].handlePerson + '</td>' +
                                    '<td>' + result.rows[i].handleRemark + '</td>' +
                                    '<td>' + result.rows[i].createTime + '</td>' +
                                    '<td>' + result.rows[i].confirmTime + '</td>' +
                                    '<td><input class="opener btn btn-mini btnedit"  type="button" value="查看详情"></td>' +
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
                        // console.log($(this))
                        var tds = $(this).parent().parent().children();
                        orderNo = tds[0].innerHTML;
                        var data = {
                            orderNo: orderNo
                        }
                        $.ajax({
                            type: "post",
                            url: "http://47.101.136.194:8089/queryOrderByOrderNo",
                            contentType: "application/json",
                            data: JSON.stringify(data),
                            async: true,
                            success: function (result) {

                                // console.log(result.data.length);
                                if (result.rspCode == 00000) {
                                    console.log(result);
                                    console.log(result.data);
                                    var data = result.data;
                                    var name = "";
                                    // for (var i = 0; i < result.data.length; i++) {
                                    //     console.log(result.data);
                                    if (data.orderDetails == null) {
                                        name = ""
                                    } else {
                                        for (var j = 0; j < data.orderDetails.length; j++) {
                                            name += data.orderDetails[j].goodsName + "  *" + data.orderDetails[j].standardNum + " &nbsp;&nbsp;共计 " + data.orderDetails[j].orderPrice + "元 &nbsp;规格:" + data.orderDetails[j].standardName + "<br/><div style='width:100%;height:3px'></div>";
                                        }
                                    }
                                    if (data.remark == null) {
                                        data.remark = "无";
                                    }
                                    if (data.takeNo == null) {
                                        data.takeNo = "暂无";
                                    }
                                    if (data.orderStatus == 0) {
                                        orderStatus = "待发货";
                                    } else if (data.orderStatus == 1) {
                                        orderStatus = '已发货';
                                    } else if (data.orderStatus == 2) {
                                        orderStatus = '用户退货';
                                    } else if (data.orderStatus == 3) {
                                        orderStatus = '用户确认收货';
                                    } else if (data.orderStatus == 4) {
                                        orderStatus = '系统确认收货';
                                    } else if (data.orderStatus == 5) {
                                        orderStatus = '用户取消订单';
                                    }
                                    if (data.postName == null) {
                                        data.postName = "暂无"
                                    }
                                    if (data.postTel == null) {
                                        data.postTel = "暂无"
                                    }
                                    if (data.postAddress == null) {
                                        data.postAddress = "暂无";
                                    }
                                    console.log($('#reciverName'));
                                    $('#orderNumber').html(data.orderNo);
                                    $('#userPhone').html(data.telephone);
                                    $('#orderTime').html(data.orderTime);
                                    $('#totalPrice').html(data.orderPrice);
                                    // $('#payStatus').html(data.payStatus);
                                    $('#orderStatus').html(orderStatus);
                                    $('#goodsInfo').html(name);
                                    $('#userRemark').html(data.remark);
                                    $('#wuliuNo').html(data.takeNo);
                                    $('#reciverName').html(data.postName);
                                    $('#reciverTel').html(data.postTel);
                                    $('#reciveAddr').html(data.postAddress);
                                    // $('#reciveAddr').html(tds[10].innerHTML);
                                    // }
                                }
                            }
                        })

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
                },
                // error: function (XMLHttpRequest, textStatus, errorThrown) {
                // 	alert('网络连接异常，请重试！')
                // }
            });
        }
        //回调函数  
        PageClick = function (index) {
            // $('.now').text(index.getCurrent());
            loadList(index.getCurrent());//点击分页加载列表数据  */
        }
    })

})
