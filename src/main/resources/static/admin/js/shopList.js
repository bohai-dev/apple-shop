$(function(){
	storeNo = "";
//	console.log($.getUrlParam("userType")+"------"+$.getUrlParam("storeNo")+"------"+$.getUrlParam("userName"))
	if ($.getUrlParam("storeNo")) {
		$.ajax({
			type:"get",
			url:"http://47.101.136.194:8089/queryStoreInfo/"+$.getUrlParam("storeNo"),
			async:true,
			success:function(result){
	// 			console.log(result)
				if (result.rspCode==00000) {
					$('#storeName').html(result.data.cnStoreName)
				} else{
					showZhezhaoMsg(result.cnErrorMsg)
				}
			},
			error:function(xhr){
				console.log(xhr)
			}
		});
	}
	
	//切换店铺
	$('.changeShop').click(function () {
    	showZhezhao();
    });
    
	$('.selectShopBox').on("click","li",function(){
		changeStoreNo = $(this).data('seleteshopno');
		if (changeStoreNo==$.getUrlParam("storeNo")) {
			alert('此店铺为当前店铺!')
		} else{
			hideZhezhao()
			window.parent.location.href="index.html?storeNo="+changeStoreNo+"&userType="+$.getUrlParam("userType")+"&userName="+$.getUrlParam("userName")
		}
	})
	
	//查询所有店铺
	$.ajax({
		type:"get",
		url:"http://47.101.136.194:8089/queryStores",
		async:true,
		success:function(res){
//			console.log(res)
			if (res.rspCode==00000) {
				if (res.data.length>0) {
					var elemStoreInfo = '<tr class="tableTitle">'+
						'<th>店铺编号</th><th>店铺名称</th><th>店铺介绍</th><th>店铺管理员用户名</th><th>店铺管理员密码</th><th>店铺电话</th><th>操作</th>'+
						'</tr>';
					for (var i=0;i<res.data.length;i++) {
						//店铺table
						elemStoreInfo +='<tr>'+
							'<td>'+res.data[i].storeNo+'</td>'+
							'<td>'+res.data[i].cnStoreName+'</td>'+
							'<td>'+res.data[i].cnStoreIntroduction+'</td>'+
							'<td>'+res.data[i].storeUserName+'</td>'+
							'<td>'+res.data[i].storePasswd+'</td>'+
							'<td>'+res.data[i].storePhone+'</td>'+
							'<td>'+'<span class="modifyShop" data-storeno='+res.data[i].storeNo+'>详情</span>'+'<span class="deleteShop deleteBtn2" data-storeno='+res.data[i].storeNo+'>删除</span>'+'</td>'+
						'</tr>'
					}
//					console.log(elemStoreInfo)
					$('.table').empty().append(elemStoreInfo);
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
	
	//删除店铺
	$('.table').on("click",".deleteShop",function(){
		storeNo = $(this).data('storeno');
	})
	$('.shopDeleteBtn').click(function(){
		var qureyStoreNo = storeNo;
		hideZhezhao2()
		$.ajax({
			type:"delete",
			url:"http://47.101.136.194:8089/removeStoreInfo/"+qureyStoreNo,
			async:true,
			success:function(result){
//	   			console.log(result)
				if (result.rspCode==00000) {
					showZhezhaoMsg('删除成功！');
					setTimeout(function(){
						location.reload();
					},1000)
				} else{
					showZhezhaoMsg(result.cnErrorMsg)
				}
			},
			error:function(xhr){
				console.log(xhr)
			}
		});
	})
})


//店铺查询
function queryShop(form){
	var queryCriteria = "";
	queryCriteria += form.shopNumber.value ? "&storeNo="+form.shopNumber.value : "";
	queryCriteria += form.shopName.value ? "&cnStoreName="+form.shopName.value : "";
//	console.log(queryCriteria)
	$.ajax({
		type:"get",
		url:"http://47.101.136.194:8089/queryStores?"+queryCriteria,
		async:true,
		success:function(res){
//			console.log(res)
			if (res.rspCode==00000) {
				if (res.data.length>0) {
					var elemUserInfo = '<tr class="tableTitle">'+
						'<th>店铺编号</th><th>店铺名称</th><th>店铺介绍</th><th>店铺管理员用户名</th><th>店铺管理员密码</th><th>店铺电话</th><th>操作</th>'+
						'</tr>';
					for (var i=0;i<res.data.length;i++) {
						//客户信息table
						elemUserInfo +='<tr>'+
							'<td>'+res.data[i].storeNo+'</td>'+
							'<td>'+res.data[i].cnStoreName+'</td>'+
							'<td>'+res.data[i].cnStoreIntroduction+'</td>'+
							'<td>'+res.data[i].storeUserName+'</td>'+
							'<td>'+res.data[i].storePasswd+'</td>'+
							'<td>'+res.data[i].storePhone+'</td>'+
							'<td>'+'<span class="modifyShop" data-storeno='+res.data[i].storeNo+'>详情</span>'+'<span class="deleteShop deleteBtn2" data-storeno='+res.data[i].storeNo+'>删除</span>'+'</td>'+
						'</tr>'
					}
//						console.log(elemUserInfo)
					$('.table').empty().append(elemUserInfo);
				} else{
					showZhezhaoMsg('无符合查询条件店铺！');
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

//回车查询
$(function(){
	document.onkeydown=function(e){
		var keycode=document.all?event.keyCode:e.which;
		if(keycode==13){
			var queryCriteria = "";
			queryCriteria += $('input[name=shopNumber]').val() ? "&storeNo="+$('input[name=shopNumber]').val() : "";
			queryCriteria += $('input[name=shopName]').val() ? "&cnStoreName="+$('input[name=shopName]').val() : "";
//			console.log(queryCriteria)
			$.ajax({
				type:"get",
				url:"http://47.101.136.194:8089/queryStores?"+queryCriteria,
				async:true,
				success:function(res){
//					console.log(res)
					if (res.rspCode==00000) {
						if (res.data.length>0) {
							var elemUserInfo = '<tr class="tableTitle">'+
						'<th>店铺编号</th><th>店铺名称</th><th>店铺介绍</th><th>店铺管理员用户名</th><th>店铺管理员密码</th><th>店铺电话</th><th>操作</th>'+
						'</tr>';
							for (var i=0;i<res.data.length;i++) {
								//客户信息table
								elemUserInfo +='<tr>'+
									'<td>'+res.data[i].storeNo+'</td>'+
									'<td>'+res.data[i].cnStoreName+'</td>'+
									'<td>'+res.data[i].cnStoreIntroduction+'</td>'+
									'<td>'+res.data[i].storeUserName+'</td>'+
									'<td>'+res.data[i].storePasswd+'</td>'+
									'<td>'+res.data[i].storePhone+'</td>'+
									'<td>'+'<span class="modifyShop" data-storeno='+res.data[i].storeNo+'>详情</span>'+'<span class="deleteShop deleteBtn2" data-storeno='+res.data[i].storeNo+'>删除</span>'+'</td>'+
								'</tr>'
							}
							$('.table').empty().append(elemUserInfo);
						} else{
							showZhezhaoMsg('无符合查询条件店铺！');
						}
					} else{
						showZhezhaoMsg(res.cnErrorMsg)
					}
				},
				error:function(res){
					console.log(res)
				}
			});
		};
	}
})