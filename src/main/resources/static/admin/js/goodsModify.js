$(function(){
	deleteFlag = "";
	storeNo = $.getUrlParam("storeNo");
	goodsId = "";
	deleteGoodsId = "";
	standardList = [];
	
	//店铺查询
	$.ajax({
		type:"get",
		url:"http://47.101.136.194:8089/queryStores",
		async:true,
		success:function(res){
//			console.log(res)
			if (res.rspCode==00000) {
				if (res.data.length>0) {
					var elemStoreInfo = '';
					for (var i=0;i<res.data.length;i++) {
						elemStoreInfo += '<option value="'+res.data[i].storeNo+'">'+res.data[i].cnStoreName+'</option>'
					}
//					console.log(elemStoreInfo)
					$('select[name="storeNo"]').empty().append(elemStoreInfo)
				} else{
					showZhezhaoMsg('无店铺信息！');
				}
				
			} else{
				showZhezhaoMsg(res.cnErrorMsg)
			}
		},
		error:function(res){
			console.log(res)
		}
	});
	
	$.ajax({
		type:"get",
		url:"http://47.101.136.194:8089/queryClasses",
		async:true,
		success:function(res){
//				console.log(res)
			if (res.rspCode==00000) {
				if (res.data.length>0) {
					var elemClassList = "";
					for (var i=0;i<res.data.length;i++) {
						elemClassList += '<option value="'+res.data[i].classId+'">'+res.data[i].cnClassName+'</option>'
					}
//					console.log(elemClassList)
					$('select[name="classList"]').empty().append(elemClassList)
				}else{
					showZhezhaoMsg('无商品分类，请添加！');
				}
			} else{
				showZhezhaoMsg(res.cnErrorMsg)
			}
		}
	});
	
	queryGoods()
	
	//商品修改查询
	$('.table').on("click",".modifyGoods",function(){
		$('.zhezhao1').show()
		$('.modelView').css('display', 'flex');
//		console.log(standardList)
		$.ajax({
			type:"get",
			url:"http://47.101.136.194:8089/queryGoodsDetail/"+$(this).data('goodsid'),
			async:true,
			success:function(res){
//				console.log(res)
				if (res.rspCode==00000) {
					$('#modifyGoodsFrom input[name="chinaName"]').val(res.data.cnGoodsName)
					$('#ossfile').empty().append("<div><img src="+res.data.cnGoodsPictureBig+" /><a href='javascript:void(0);' class='btn delBtn'>删除</a></div>")
					$('#container').addClass('dn')
					$('#modifyGoodsFrom textarea[name="chinaDescription"]').val(res.data.cnGoodsIntroduction)
					$('#modifyGoodsFrom select[name="storeNo"]').val(res.data.storeNo)
					$('#modifyGoodsFrom select[name="goodsStatus"]').val(res.data.goodsStatus)
					$('#modifyGoodsFrom select[name="classList"]').val(res.data.classInfos[0].classId)
					var elemGoodsInfoSpec = ""
					for (var i=0;i<res.data.standardList.length;i++) {
						elemGoodsInfoSpec += '<tr class="addData"><td>'+res.data.standardList[i].name+'</td><td>'+res.data.standardList[i].description+'</td><td>'+res.data.standardList[i].price+'</td><td>'+res.data.standardList[i].stock+'</td><td>'+(res.data.standardList[i].showFlag==1?'是':'否')+'</td><td><span class="modifySpec">修改</span><span class="deleteSpec deleteBtn5">删除</span></td></tr>'
					}
					$('.addData').remove()
					$('.addGoodsSpec .tableTitle').after(elemGoodsInfoSpec)
					goodsId = res.data.goodsId;
					standardList = res.data.standardList;
				} else{
					showZhezhaoMsg(res.cnErrorMsg)
				}
			},
			error:function(res){
				console.log(res)
			}
		});
	})
	
	//删除商品
	$('.table').on("click",".deleteGoods",function(){
		deleteGoodsId = $(this).data('goodsid');
	})
	$('.goodsDeleteBtn').click(function(){
//		console.log(deleteGoodsId)
		hideZhezhao2()
		$.ajax({
			type:"delete",
			url:"http://47.101.136.194:8089/removeGoods/"+deleteGoodsId,
			async:true,
			success:function(result){
//	   			console.log(result)
				if (result.rspCode==00000) {
					showZhezhaoMsg('删除成功！');
					queryGoods()
				} else{
					showZhezhaoMsg(result.cnErrorMsg)
				}
			},
			error:function(xhr){
				console.log(xhr)
			}
		});
	})
	
	//添加商品规格
	$('.specBtn').click(function(){
		showZhezhao3()
	})
	$('.addSpec').click(function(){
		if (!$('.remove3 input[name="specName"]').val()) {
			alert("请输入规格名称")
		} else if(!$('.remove3 input[name="specPrice"]').val()){
			alert('请输入规格价格！');
		} else if(!$('.remove3 input[name="specStock"]').val()){
			alert('请输入规格库存！');
		} else{
			hideZhezhao3();
			var addStandard = {
				name:$('.remove3 input[name="specName"]').val(),
				description:$('.remove3 input[name="specDescripti"]').val(),				
				price:$('.remove3 input[name="specPrice"]').val(),
				stock:$('.remove3 input[name="specStock"]').val(),
				showFlag:$('.remove3 select[name="specStatus"]').val()
			}
			standardList.push(addStandard)
			$('.addGoodsSpec tr:last-child').before('<tr class="addData"><td>'+addStandard.name+'</td><td>'+addStandard.description+'</td><td>'+addStandard.price+'</td><td>'+addStandard.stock+'</td><td>'+(addStandard.showFlag==1?'是':'否')+'</td><td><span class="modifySpec">修改</span><span class="deleteSpec deleteBtn5">删除</span></td></tr>')
			$('.remove3 input[name="specName"],.remove3 input[name="specDescripti"],.remove3 input[name="specPrice"],.remove3 input[name="specStock"]').val("")
			$('.remove3 select[name="specStatus"]').val(0)
		}
	})
	
	//修改商品规格
	var standardIndex = 0;
	$('.table').on("click",".modifySpec",function(){
		showZhezhao4()
		standardIndex = $(this).parents('tr').index()-2;
		$('.remove4 input[name="specName"]').val(standardList[standardIndex].name)
		$('.remove4 input[name="specDescripti"]').val(standardList[standardIndex].description)
		$('.remove4 input[name="specPrice"]').val(standardList[standardIndex].price)
		$('.remove4 input[name="specStock"]').val(standardList[standardIndex].stock)
		$('.remove4 select[name="specStatus"]').val(standardList[standardIndex].showFlag)
	})
	$('.modifySpecBtn').click(function(){
		if (!$('.remove4 input[name="specName"]').val()) {
			alert("请输入规格名称")
		} else if(!$('.remove4 input[name="specPrice"]').val()){
			alert('请输入规格价格！');
		} else if(!$('.remove4 input[name="specStock"]').val()){
			alert('请输入规格库存！');
		} else{
			hideZhezhao4()
			var modifyStandard = {
				name:$('.remove4 input[name="specName"]').val(),
				description:$('.remove4 input[name="specDescripti"]').val(),				
				price:$('.remove4 input[name="specPrice"]').val(),
				stock:$('.remove4 input[name="specStock"]').val(),
				showFlag:$('.remove4 select[name="specStatus"]').val()
			}
			standardList.splice(standardIndex,1,modifyStandard)
			console.log(standardList)
			$('.addGoodsSpec tr').eq(standardIndex+2).html('<td>'+modifyStandard.name+'</td><td>'+modifyStandard.description+'</td><td>'+modifyStandard.price+'</td><td>'+modifyStandard.stock+'</td><td>'+(modifyStandard.showFlag==1?'是':'否')+'</td><td><span class="modifySpec">修改</span><span class="deleteSpec deleteBtn5">删除</span></td>')
		}
	})
	
	//删除商品规格
	var deleteStandardIndex = 0;
	$('.table').on("click",".deleteSpec",function(){
		deleteStandardIndex = $(this).parents('tr').index();
	})
	$('.specDeleteBtn').click(function(){
		hideZhezhao5();
		standardList.splice(deleteStandardIndex-2,1);
		$('.addGoodsSpec tr').eq(deleteStandardIndex).remove();
//		console.log(standardList)
	})
	
	//关闭模态框
	$('.closeBtn').click(function(){
		closeModel();
	})
	
	//回车查询
	document.onkeydown=function(e){
		var keycode=document.all?event.keyCode:e.which;
		if(keycode==13){
			$('.orderQureyBtn').click()
		}
	}
})

//修改商品
function goodsModity(form){
	
	if (!form.chinaName.value) {
		showZhezhaoMsg('请输入商品名称！');
	} else if(!$('#ossfile>div>img').attr("src")){
		showZhezhaoMsg('请上传商品图片！');
	} else if(!form.classList.value){
		showZhezhaoMsg('请选择一种商品分类！');
	} else if(standardList.length==0){
		showZhezhaoMsg('请添加一种商品规格！');
	} else{
		
		var classInfos = [{classId:form.classList.value}]
//		console.log(classInfos);
		
		var data = {
			goodsId:goodsId,
			cnGoodsName:form.chinaName.value,
			cnGoodsPictureBig:$('#ossfile>div>img').attr("src"),
			cnGoodsIntroduction:form.chinaDescription.value,
			storeNo:form.storeNo.value,
			goodsStatus:form.goodsStatus.value,
			classInfos:classInfos,
			standardList:standardList
		}
		console.log(data)
		$.ajax({
			type:"post",
			url:"http://47.101.136.194:8089/modiftGoods",
			contentType:"application/json",
			data:JSON.stringify(data),
			async:true,
			success:function(res){
//				console.log(res)
				if (res.rspCode==00000) {
					standardList = [];
					showZhezhaoMsg('修改商品成功！');
					closeModel();
					queryGoods();
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

//查询所有商品
function queryGoods(form){
	
	if (form) {
		var data = {
			storeNo:form.storename.value?form.storename.value:null
		};
	} else{
		if ($('input[name="storename"]').val()) {
			var data = {
				storeNo:$('input[name="storename"]').val()
			};
		} else{
			var data = {
				storeNo:null
			};
		}
	}
	
	$.ajax({
		type:"post",
		url:"http://47.101.136.194:8089/queryGoodsInfo",
		data:JSON.stringify(data),
		contentType:"application/json",
		async:true,
		success:function(res){
			console.log(res)
			if (res.data.length>0) {
				var elemGoodsInfo = '<tr class="tableTitle">'+
						'<th>店铺编号</th><th>商品分类</th><th>商品名称</th><th>商品简介</th><th>商品状态</th><th>操作</th>'+
						'</tr>';
				for (var i=0;i<res.data.length;i++) {
					elemGoodsInfo +='<tr>'+
							'<td>'+res.data[i].storeNo+'</td>'+
							'<td>'+res.data[i].classInfos[0].cnClassName+'</td>'+
							'<td>'+res.data[i].cnGoodsName+'</td>'+
//							'<td>'+res.data[i].cnGoodsPictureBig+'</td>'+
							'<td>'+(res.data[i].cnGoodsIntroduction?res.data[i].cnGoodsIntroduction:'-')+'</td>'+
							'<td>'+(res.data[i].goodsStatus==1?'在售':'不在售')+'</td>'+
							'<td>'+'<span class="modifyGoods" data-goodsid='+res.data[i].goodsId+'>详情</span>'+'<span class="deleteGoods deleteBtn2" data-goodsid='+res.data[i].goodsId+'>删除</span>'+'</td>'+
						'</tr>'
				}
//				console.log(elemGoodsInfo)
				$('.contentView .table').empty().append(elemGoodsInfo);
			}else{
				showZhezhaoMsg('无商品！');
			}
		}
	});
}

//关闭修改商品模态框
function closeModel(){
	$('.zhezhao1,.modelView').hide()
}
