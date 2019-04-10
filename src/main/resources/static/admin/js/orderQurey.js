$(function(){
	storeNo = $.getUrlParam("storeNo");
	beginTime = $.getUrlParam("beginTime");
	finishTime = $.getUrlParam("finishTime");
//	console.log(storeNo+"--"+beginTime+"--"+finishTime)
	
	if (beginTime) {
		$('input[name=storeNo]').val(storeNo)
		$('input[name=startTime]').val(beginTime)
		$('input[name=endTime]').val(finishTime)
		$(".activeBg", parent.document).removeClass('active')
		$('.list>li', parent.document).eq(4).addClass('active')
	}
	queryOrder();
	
	document.onkeydown=function(e){
		var keycode=document.all?event.keyCode:e.which;
		if(keycode==13){
			loadList(1);
			function loadList(num){
				var data = {
					pageNumber:num,
					pageSize:10,
					params:{
						storeNo:$('input[name=storeNo]').val()?$('input[name=storeNo]').val():null,
						storeName:$('input[name=storeName]').val()?$('input[name=storeName]').val():null,
						orderNo:$('input[name=orderNumber]').val()?$('input[name=orderNumber]').val():null,
						userNo:$('input[name=userNo]').val()?$('input[name=userNo]').val():null,
						beginDate:$('input[name=startTime]').val()?$('input[name=startTime]').val():null,
						endDate:$('input[name=endTime]').val()?$('input[name=endTime]').val():null,
						orderStatus:$('select[name=orderStatus]').val()?$('select[name=orderStatus]').val():null,
						payStatus:$('select[name=payStatus]').val()?$('select[name=payStatus]').val():null,
						telephone:$('input[name=telephone]').val()?$('input[name=telephone]').val():null
					}
				}
				console.log(data)
				$.ajax({
					type:"post",
					url:"http://47.101.136.194:8089/queryOrderPage",
					contentType:"application/json",
					data:JSON.stringify(data),
					async:true,
					success:function(res){
//						console.log(res)
						if (res.rspCode==00000) {
							if (res.rows) {
								$('.tips').show().children('.totalNumber').html(res.total)
								$('.m-style').pagination({
							        pageCount: Math.ceil(res.total/10), //总页数,默认为9
							        current: num, //当前第几页
							        coping: true, //首页和尾页
							        count: 2, //mode为unfixed时显示当前选中页前后页数，mode为fixed显示页码总数
							        jump: true, //跳转到指定页数
							        jumpBtn: '跳转', //跳转按钮文本
							        callback: function (index) {
							        	loadList(index.getCurrent())
							        } //回调
								});
								var elemOrderData = '<tr class="tableTitle">'+
								'<th>订单编号</th><th>用户编号</th><th>收货人姓名</th><th>收货人地址</th><th>收货人电话</th><th>订单金额</th><th>订单状态</th><th>下单时间</th><th>支付状态</th><th>操作</th>'+
								'</tr>';
								var elemOrderDetails = "";
								for (var i=0;i<res.rows.length;i++) {
									//订单详情
									var elemOrderDetailsData = "";
									if (res.rows[i].orderDetails) {
										for (var j=0;j<res.rows[i].orderDetails.length;j++) {
											elemOrderDetailsData += '<tr>'+
												'<td>'+res.rows[i].orderDetails[j].goodsId+'</td>'+
												'<td>'+res.rows[i].orderDetails[j].goodsName+'</td>'+
												'<td>'+res.rows[i].orderDetails[j].standardName+'</td>'+
												'<td>'+res.rows[i].orderDetails[j].standardNum+'</td>'+
												'<td>'+res.rows[i].orderDetails[j].orderPrice+'</td>'+
												(j==0?'<td rowspan="'+res.rows[i].orderDetails.length+'">'+(res.rows[i].remark?res.rows[i].remark:"-")+'</td>':'')+
											'</tr>'
										}
									} else{
										elemOrderDetailsData += '<tr><td colspan="5">无订单详情</td></tr>'
									}
									elemOrderDetails += '<table border="1" class="table detailTable"><tr class="tableTitle">'+
								'<th>商品ID</th><th>商品名称</th><th>规格</th><th>数量</th><th>金额</th><th>备注</th></tr>'+
								elemOrderDetailsData+
								'</table>';
									//订单信息table
									elemOrderData +='<tr>'+
										'<td>'+res.rows[i].orderNo+'</td>'+
										'<td>'+res.rows[i].userNo+'</td>'+
										'<td>'+(res.rows[i].postName?res.rows[i].postName:"")+'</td>'+
										'<td>'+(res.rows[i].postAddress?res.rows[i].postAddress:"")+'</td>'+
										'<td>'+(res.rows[i].postTel?res.rows[i].postTel:"")+'</td>'+
										'<td>'+res.rows[i].orderPrice+'</td>'+
										'<td>'+(res.rows[i].orderStatus==0?'下单成功，待发货':res.rows[i].orderStatus==1?'已发货，待收货':res.rows[i].orderStatus==2?'用户退货':res.rows[i].orderStatus==3?'用户退货':res.rows[i].orderStatus==4?'系统确认收货（15天后由客服联系用户后在后台确认收货），本单完成':'用户取消订单')+'</td>'+
										'<td>'+res.rows[i].orderTime+'</td>'+
										'<td>'+(res.rows[i].payStatus==0?'待支付':res.rows[i].payStatus==1?'支付成功':'支付失败')+'</td>'+
		//								'<td>'+(res.rows[i].remark?res.rows[i].remark:"-")+'</td>'+
										'<td class="orderDetailBtn">详情</td>'+
									'</tr>'
								}
		//						console.log(elemOrderData)
								$('.flexDirCol .table').empty().append(elemOrderData);
								$('.orderDetail').hide().empty().append(elemOrderDetails)
							} else{
								showZhezhaoMsg('无数据！');
							}
							
						} else{
							showZhezhaoMsg(res.cnErrorMsg)
						}
					},
					error:function(res){
						console.log(res)
					}
				});
			}
		};
	}
	
	//显示详情
	$('.table').on("click",".orderDetailBtn",function(){
		$('.orderDetailBtn').css("color","#87C212");
		$(this).css("color","#60B3E7")
		$('.orderDetail').css("display","flex");
		$('.detailTable').eq($(this).parents('tr').index()-1).show()
	})
	//隐藏详情
	$('.orderDetail').click(function(){
		$('.orderDetail,.detailTable').hide();
		$('.orderDetailBtn').css("color","#87C212");
	})
})

//查询订单
function queryOrder(form){
	loadList(1);
	function loadList(num){
		if (form) {
			var data = {
				pageNumber:num,
				pageSize:10,
				params:{
					storeNo:form.storeNo.value?form.storeNo.value:null,
					storeName:form.storeName.value?form.storeName.value:null,
					orderNo:form.orderNumber.value?form.orderNumber.value:null,
					userNo:form.userNo.value?form.userNo.value:null,
					beginDate:form.startTime.value?form.startTime.value:null,
					endDate:form.endTime.value?form.endTime.value:null,
					orderStatus:form.orderStatus.value?form.orderStatus.value:null,
					payStatus:form.payStatus.value?form.payStatus.value:null,
					telephone:form.telephone.value?form.telephone.value:null
				}
			}
		} else{
			if (beginTime) {
				var data = {
					pageNumber:num,
					pageSize:10,
					params:{
						storeNo:storeNo,
						storeName:null,
						orderNo:null,
						userNo:null,
						beginDate:beginTime,
						endDate:finishTime,
						orderStatus:null,
						payStatus:null,
						telephone:null
					}
				}
			} else{
				var data = {
					pageNumber:num,
					pageSize:10,
					params:{
						storeNo:null,
						storeName:null,
						orderNo:null,
						userNo:null,
						beginDate:null,
						endDate:null,
						orderStatus:null,
						payStatus:null,
						telephone:null
					}
				}
			}
		}
//		console.log(data)
		$.ajax({
			type:"post",
			url:"http://47.101.136.194:8089/queryOrderPage",
			contentType:"application/json",
			data:JSON.stringify(data),
			async:true,
			success:function(res){
				console.log(res)
				if (res.rspCode==00000) {
					if (res.rows) {
						$('.tips').show().children('.totalNumber').html(res.total)
						$('.m-style').pagination({
					        pageCount: Math.ceil(res.total/10), //总页数,默认为9
					        current: num, //当前第几页
					        coping: true, //首页和尾页
					        count: 2, //mode为unfixed时显示当前选中页前后页数，mode为fixed显示页码总数
					        jump: true, //跳转到指定页数
					        jumpBtn: '跳转', //跳转按钮文本
					        callback: function (index) {
					        	loadList(index.getCurrent())
					        } //回调
						});
						var elemOrderData = '<tr class="tableTitle">'+
						'<th>订单编号</th><th>用户编号</th><th>收货人姓名</th><th>收货人地址</th><th>收货人电话</th><th>订单金额</th><th>订单状态</th><th>下单时间</th><th>支付状态</th><th>操作</th>'+
						'</tr>';
						var elemOrderDetails = "";
						for (var i=0;i<res.rows.length;i++) {
							//订单详情
							var elemOrderDetailsData = "";
							if (res.rows[i].orderDetails) {
								for (var j=0;j<res.rows[i].orderDetails.length;j++) {
									elemOrderDetailsData += '<tr>'+
										'<td>'+res.rows[i].orderDetails[j].goodsId+'</td>'+
										'<td>'+res.rows[i].orderDetails[j].goodsName+'</td>'+
										'<td>'+res.rows[i].orderDetails[j].standardName+'</td>'+
										'<td>'+res.rows[i].orderDetails[j].standardNum+'</td>'+
										'<td>'+res.rows[i].orderDetails[j].orderPrice+'</td>'+
										(j==0?'<td rowspan="'+res.rows[i].orderDetails.length+'">'+(res.rows[i].remark?res.rows[i].remark:"-")+'</td>':'')+
									'</tr>'
								}
							} else{
								elemOrderDetailsData += '<tr><td colspan="5">无订单详情</td></tr>'
							}
							elemOrderDetails += '<table border="1" class="table detailTable"><tr class="tableTitle">'+
						'<th>商品ID</th><th>商品名称</th><th>规格</th><th>数量</th><th>金额</th><th>备注</th></tr>'+
						elemOrderDetailsData+
						'</table>';
							//订单信息table
							elemOrderData +='<tr>'+
								'<td>'+res.rows[i].orderNo+'</td>'+
								'<td>'+res.rows[i].userNo+'</td>'+
								'<td>'+(res.rows[i].postName?res.rows[i].postName:"")+'</td>'+
								'<td>'+(res.rows[i].postAddress?res.rows[i].postAddress:"")+'</td>'+
								'<td>'+(res.rows[i].postTel?res.rows[i].postTel:"")+'</td>'+
								'<td>'+res.rows[i].orderPrice+'</td>'+
								'<td>'+(res.rows[i].orderStatus==0?'下单成功，待发货':res.rows[i].orderStatus==1?'已发货，待收货':res.rows[i].orderStatus==2?'用户退货':res.rows[i].orderStatus==3?'用户退货':res.rows[i].orderStatus==4?'系统确认收货（15天后由客服联系用户后在后台确认收货），本单完成':'用户取消订单')+'</td>'+
								'<td>'+res.rows[i].orderTime+'</td>'+
								'<td>'+(res.rows[i].payStatus==0?'待支付':res.rows[i].payStatus==1?'支付成功':'支付失败')+'</td>'+
//								'<td>'+(res.rows[i].remark?res.rows[i].remark:"-")+'</td>'+
								'<td class="orderDetailBtn">详情</td>'+
							'</tr>'
						}
//						console.log(elemOrderData)
						$('.flexDirCol .table').empty().append(elemOrderData);
						$('.orderDetail').hide().empty().append(elemOrderDetails)
					} else{
						showZhezhaoMsg('无数据！');
					}
					
				} else{
					showZhezhaoMsg(res.cnErrorMsg)
				}
			},
			error:function(res){
				console.log(res)
			}
		});
	}
}
