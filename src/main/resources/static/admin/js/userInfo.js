$(function(){
	
	queryCustomer();
	
	//回车查询
	document.onkeydown=function(e){
		var keycode=document.all?event.keyCode:e.which;
		if(keycode==13){
			loadList(1);
			function loadList(num){
				var data = {
					pageNumber:num,
					pageSize:10,
					params:{
						telephone:$('input[name=telephone]').val()?$('input[name=telephone]').val():null,
						userNo:$('input[name=userNo]').val()?$('input[name=userNo]').val():null,
					}
				}
		//		console.log(data)
				$.ajax({
					type:"post",
					url:"http://47.101.136.194:8089/queryUsersPage",
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
								var elemUserInfo = '<tr class="tableTitle">'+
									'<th>用户编号</th><th>用户名</th><th>微信ID</th><th>电话</th><th>积分</th><th>注册日期</th><th>收货地址</th>'+
									'</tr>';
								for (var i=0;i<res.rows.length;i++) {
									//客户信息table
									elemUserInfo +='<tr>'+
										'<td>'+res.rows[i].userNo+'</td>'+
										'<td>'+res.rows[i].userName+'</td>'+
										'<td>'+(res.rows[i].weixinId?res.rows[i].weixinId:"-")+'</td>'+
										'<td>'+(res.rows[i].telephone?res.rows[i].telephone:"-")+'</td>'+
										'<td>'+(res.rows[i].points?res.rows[i].points:"-")+'</td>'+
										'<td>'+(res.rows[i].registerDate?res.rows[i].registerDate:"-")+'</td>'+
										'<td>'+(res.rows[i].deliveryAddress?res.rows[i].deliveryAddress:"-")+'</td>'+
									'</tr>'
								}
		//						console.log(elemUserInfo)
								$('.table').empty().append(elemUserInfo);
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
})
function queryCustomer(form){
	loadList(1);
	function loadList(num){
		if (form) {
			var data = {
				pageNumber:num,
				pageSize:10,
				params:{
					telephone:form.telephone.value?form.telephone.value:null,
					userNo:form.userNo.value?form.userNo.value:null,
				}
			}
		} else{
			var data = {
				pageNumber:num,
				pageSize:10,
				params:{
					telephone:null,
					userNo:null
				}
			}
		}
//		console.log(data)
		$.ajax({
			type:"post",
			url:"http://47.101.136.194:8089/queryUsersPage",
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
						var elemUserInfo = '<tr class="tableTitle">'+
							'<th>用户编号</th><th>用户名</th><th>微信ID</th><th>电话</th><th>积分</th><th>注册日期</th><th>收货地址</th>'+
							'</tr>';
						for (var i=0;i<res.rows.length;i++) {
							//客户信息table
							elemUserInfo +='<tr>'+
								'<td>'+res.rows[i].userNo+'</td>'+
								'<td>'+res.rows[i].userName+'</td>'+
								'<td>'+(res.rows[i].weixinId?res.rows[i].weixinId:"-")+'</td>'+
								'<td>'+(res.rows[i].telephone?res.rows[i].telephone:"-")+'</td>'+
								'<td>'+(res.rows[i].points?res.rows[i].points:"-")+'</td>'+
								'<td>'+(res.rows[i].registerDate?res.rows[i].registerDate:"-")+'</td>'+
								'<td>'+(res.rows[i].deliveryAddress?res.rows[i].deliveryAddress:"-")+'</td>'+
							'</tr>'
						}
//						console.log(elemUserInfo)
//						$('.detailView').empty().append(elemUserInfo);
						$('.table').empty().append(elemUserInfo);
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
