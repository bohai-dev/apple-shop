$(function(){
	storeNo = $.getUrlParam("storeNo");
	goodsExchangeId = "";
	queryGoodsExchange()
	
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
						handleStatus:$('select[name=status]').val()?$('select[name=status]').val():null,
					}
				}
				console.log(data)
				$.ajax({
					type:"post",
					url:"http://47.101.136.194:8089/returngoods/selectbypage",
					contentType:"application/json",
					data:JSON.stringify(data),
					async:true,
					success:function(res){
						console.log(res)
						if (res.rspCode==00000) {
							if (res.rows.length>0) {
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
								var elemgoodsExchangeData = '<tr class="tableTitle">'+
								'<th>订单编号</th><th>店铺编号</th><th>用户编号</th><th>退货理由</th><th>状态</th><th>处理人</th><th>处理时间</th><th>操作</th>'+
								'</tr>';
								for (var i=0;i<res.rows.length;i++) {
									//退换货信息table
									elemgoodsExchangeData +='<tr>'+
										'<td class="originOrderDetail">'+res.rows[i].orderId+'</td>'+
										'<td>'+res.rows[i].shopId+'</td>'+
		//								'<td>'+res.rows[i].storeName+'</td>'+<th>店铺名称</th>
										'<td>'+res.rows[i].userId+'</td>'+
										'<td>'+res.rows[i].reason+'</td>'+
										'<td class="hiddenData">'+res.rows[i].reasonImagePaths+'</td>'+
										'<td data-status="'+res.rows[i].handleStatus+'">'+(res.rows[i].handleStatus==0?'待处理':res.rows[i].handleStatus==1?'处理中':'处理成功')+'</td>'+
										'<td class="hiddenData">'+res.rows[i].price+'</td>'+
										'<td class="hiddenData">'+res.rows[i].trackingNo+'</td>'+
										'<td class="hiddenData">'+res.rows[i].handlePerson+'</td>'+
										'<td class="hiddenData">'+res.rows[i].handleRemark+'</td>'+
										'<td class="hiddenData">'+res.rows[i].confirmPerson+'</td>'+
										'<td>'+(res.rows[i].handlePerson?res.rows[i].handlePerson:"")+'</td>'+
										'<td>'+(res.rows[i].handleTime?res.rows[i].handleTime:"")+'</td>'+
										'<td class="goodsExchangeBtn" data-id='+res.rows[i].id+' data-status='+res.rows[i].handleStatus+'>修改</td>'+
									'</tr>'
								}
		//						console.log(elemgoodsExchangeData)
								$('.flexDirCol .table').empty().append(elemgoodsExchangeData);
							} else{
								showZhezhaoMsg('无符合条件订单！');
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
	}
	
	//显示详情
	$('.table').on("click",".originOrderDetail",function(){
		$('.orderDetail').css("display","flex");
		$('.detailTable').show()
		var data = {orderNo:$(this).text()}
		$.ajax({
			type:"post",
			url:"http://47.101.136.194:8089/queryOrderByOrderNo",
			contentType:"application/json",
			data:JSON.stringify(data),
			async:true,
			success:function(res){
//				console.log(res)
				var elemOrderDetails = '<tr class="tableTitle"><th>订单编号</th><th>用户编号</th><th>手机号</th><th>订单金额</th><th>订单状态</th><th>下单时间</th><th>支付状态</th><th>备注</th></tr>'+
				'<tr>'+
					'<td>'+res.data.orderNo+'</td>'+
					'<td>'+res.data.userNo+'</td>'+
					'<td>'+res.data.telephone+'</td>'+
					'<td>'+res.data.orderPrice+'</td>'+
					'<td>'+(res.data.orderStatus==0?'下单成功，待发货':res.data.orderStatus==1?'已发货，待收货':res.data.orderStatus==2?'用户退货':res.data.orderStatus==3?'用户退货':res.data.orderStatus==4?'系统确认收货（15天后由客服联系用户后在后台确认收货），本单完成':'用户取消订单')+'</td>'+
					'<td>'+res.data.orderTime+'</td>'+
					'<td>'+(res.data.payStatus==0?'待支付':res.data.payStatus==1?'支付成功':'支付失败')+'</td>'+
					'<td>'+(res.data.remark?res.data.remark:"-")+'</td>'+
				'</tr>';
				
				$('.orderDetail .table').empty().append(elemOrderDetails)
			},
			error:function(res){
				console.log(res)
			}
		})
	})
	//隐藏详情
	$('.orderDetail').click(function(){
		$('.orderDetail,.detailTable').hide();
		$('.orderDetailBtn').css("color","#87C212");
	})
	
	//显示修改退换货
	$('.table').on("click",".goodsExchangeBtn",function(){
//		console.log($(this).data('status'))
//		if ($(this).data('status')==2) {
//			showZhezhaoMsg('此订单已处理成功！')
//		} else{
			$('.zhezhao1').show()
			$('.modelView').css('display', 'flex');
			goodsExchangeId = $(this).data('id').toString();
			$('.exOrderNo').text($(this).siblings().eq(0).html())
			$('.exStoreNo').text($(this).siblings().eq(1).html())
			$('.exUserNo').text($(this).siblings().eq(2).html())
			$('.exReason').text($(this).siblings().eq(3).html())
			var imgPathArr = $(this).siblings().eq(4).html().split(";");
			var imgPath = "";
			for (var i=0;i<imgPathArr.length;i++) {
				imgPath += '<img class="goodsExchangeImg" src="'+imgPathArr[i]+'"/>';
			}
			$('.exchangeImg').html(imgPath)
			if ($(this).siblings().eq(5).data('status')==2) {
				$('.exchangeInfo').fadeIn(100)
				$('#modifyGoodsFrom select[name="handleStatus"]').val($(this).siblings().eq(5).data('status'))
				$('#modifyGoodsFrom input[name="price"]').val($(this).siblings().eq(6).html())
				$('#modifyGoodsFrom input[name="trackingNo"]').val($(this).siblings().eq(7).html())
				$('#modifyGoodsFrom input[name="handlePerson"]').val($(this).siblings().eq(8).html())
				$('#modifyGoodsFrom input[name="handleRemark"]').val($(this).siblings().eq(9).html())
				$('#modifyGoodsFrom input[name="confirmPerson"]').val($(this).siblings().eq(10).html())
			} else{
				$('#modifyGoodsFrom select[name="handleStatus"]').val($(this).siblings().eq(5).data('status'))
			}
	//		console.log($(this).siblings().eq(5).data('status'))
//		}
	})
	//关闭退换货
	$('.closeBtn').click(function(){
		closeModel();
	})
	
	//显示退换货填写
	$('#modifyGoodsFrom select[name="handleStatus"]').change(function(){
		if ($('#modifyGoodsFrom select[name="handleStatus"]').val()==2) {
			$('.exchangeInfo').fadeIn(100)
		} else{
			$('.exchangeInfo').fadeOut(100)
		}
	})
	
	//显示退货图片大图
	$('.modelView').on("click",".goodsExchangeImg",function(){
//		console.log($(this).attr("src"))
		$('.showImg').css("display","flex").children().attr("src",$(this).attr("src"))
	})
	//关闭退货图片大图
	$('.showImg').click(function(){
		$(this).hide()
	})
})

//查询退换货订单
function queryGoodsExchange(form){
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
					handleStatus:form.status.value?form.status.value:null
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
					handleStatus:0
				}
			}
		}
//		console.log(data)
		$.ajax({
			type:"post",
			url:"http://47.101.136.194:8089/returngoods/selectbypage",
			contentType:"application/json",
			data:JSON.stringify(data),
			async:true,
			success:function(res){
//				console.log(res)
				if (res.rspCode==00000) {
					if (res.rows.length>0) {
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
						var elemgoodsExchangeData = '<tr class="tableTitle">'+
						'<th>订单编号</th><th>店铺编号</th><th>用户编号</th><th>退货理由</th><th>状态</th><th>处理人</th><th>处理时间</th><th>操作</th>'+
						'</tr>';
						for (var i=0;i<res.rows.length;i++) {
							//退换货信息table
							elemgoodsExchangeData +='<tr>'+
								'<td class="originOrderDetail">'+res.rows[i].orderId+'</td>'+
								'<td>'+res.rows[i].shopId+'</td>'+
//								'<td>'+res.rows[i].storeName+'</td>'+<th>店铺名称</th>
								'<td>'+res.rows[i].userId+'</td>'+
								'<td>'+res.rows[i].reason+'</td>'+
								'<td class="hiddenData">'+res.rows[i].reasonImagePaths+'</td>'+
								'<td data-status="'+res.rows[i].handleStatus+'">'+(res.rows[i].handleStatus==0?'待处理':res.rows[i].handleStatus==1?'处理中':'处理成功')+'</td>'+
								'<td class="hiddenData">'+res.rows[i].price+'</td>'+
								'<td class="hiddenData">'+res.rows[i].trackingNo+'</td>'+
								'<td class="hiddenData">'+res.rows[i].handlePerson+'</td>'+
								'<td class="hiddenData">'+res.rows[i].handleRemark+'</td>'+
								'<td class="hiddenData">'+res.rows[i].confirmPerson+'</td>'+
								'<td>'+(res.rows[i].handlePerson?res.rows[i].handlePerson:"")+'</td>'+
								'<td>'+(res.rows[i].handleTime?res.rows[i].handleTime:"")+'</td>'+
								'<td class="goodsExchangeBtn" data-id='+res.rows[i].id+' data-status='+res.rows[i].handleStatus+'>修改</td>'+
							'</tr>'
						}
//						console.log(elemgoodsExchangeData)
						$('.flexDirCol .table').empty().append(elemgoodsExchangeData);
					} else{
						if (data.params.handleStatus==0) {
							showZhezhaoMsg('无待处理订单！');
						} else{
							showZhezhaoMsg('无符合条件订单！');
						}
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

//修改退换货
function goodsExchangeModity(form){
//	console.log(goodsExchangeId)
	if (form.handleStatus.value==2) {
		if (!form.handlePerson.value) {
			showZhezhaoMsg("请填写处理人！")
		} else if(!form.handleRemark.value){
			showZhezhaoMsg('请填写处理备注！');
		} else if(!form.confirmPerson.value){
			showZhezhaoMsg('请填写确认处理成功人！');
		} else{
			var data = {
				id:goodsExchangeId,
				handleStatus:form.handleStatus.value,
				handlePerson:form.handlePerson.value,
				handleRemark:form.handleRemark.value,
				confirmPerson:form.confirmPerson.value,
				trackingNo:form.trackingNo.value,
				price:form.price.value
			}
		}
	} else{
		var data = {
			id:goodsExchangeId,
			handleStatus:form.handleStatus.value
		}
	}
//	console.log(data)
	$.ajax({
		type:"post",
		url:"http://47.101.136.194:8089/returngoods/updatebyid",
		contentType:"application/json",
		data:JSON.stringify(data),
		async:true,
		success:function(res){
//			console.log(res)
			if (res.rspCode==00000) {
				showZhezhaoMsg('修改成功！');
				closeModel();
//				queryGoodsExchange();
				setTimeout(function(){
					window.location.reload()
				},1000)
			} else{
				showZhezhaoMsg(res.cnErrorMsg)
			}
		},
		error:function(res){
			console.log(res)
		}
	});
}

//关闭修改商品模态框
function closeModel(){
	$('.zhezhao1,.modelView').hide()
}