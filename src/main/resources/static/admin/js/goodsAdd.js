$(function(){
	storeNo = $.getUrlParam("storeNo");
	goodsId = "";
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
	
	$.ajax({
		type:"get",
		url:"http://47.101.136.194:8089/queryClasses",
		async:true,
		success:function(res){
//			console.log(res)
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
			$('tr:last-child').before('<tr class="addData"><td>'+addStandard.name+'</td><td>'+addStandard.description+'</td><td>'+addStandard.price+'</td><td>'+addStandard.stock+'</td><td>'+(addStandard.showFlag==1?'是':'否')+'</td><td><span class="modifySpec">修改</span><span class="deleteSpec deleteBtn2">删除</span></td></tr>')
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
		hideZhezhao4()
		var modifyStandard = {
			name:$('.remove4 input[name="specName"]').val(),
			description:$('.remove4 input[name="specDescripti"]').val(),				
			price:$('.remove4 input[name="specPrice"]').val(),
			stock:$('.remove4 input[name="specStock"]').val(),
			showFlag:$('.remove4 select[name="specStatus"]').val()
		}
		standardList.splice(standardIndex,1,modifyStandard)
//		console.log(standardList)
		$('tr').eq(standardIndex+2).html('<td>'+modifyStandard.name+'</td><td>'+modifyStandard.description+'</td><td>'+modifyStandard.price+'</td><td>'+modifyStandard.stock+'</td><td>'+(modifyStandard.showFlag==1?'是':'否')+'</td><td><span class="modifySpec">修改</span><span class="deleteSpec deleteBtn2">删除</span></td>')
	})
	
	//删除商品规格
	var deleteStandardIndex = 0;
	$('.table').on("click",".deleteSpec",function(){
		deleteStandardIndex = $(this).parents('tr').index();
	})
	$('.specDeleteBtn').click(function(){
		hideZhezhao2();
		standardList.splice(deleteStandardIndex-2,1);
		$('tr').eq(deleteStandardIndex).remove();
//		console.log(standardList)
	})
})
//增加商品
function addGoodsFrom(form){
	
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
		var data = {
			cnGoodsName:form.chinaName.value,
			cnGoodsPictureBig:$('#ossfile>div>img').attr("src"),
			cnGoodsIntroduction:form.chinaDescription.value,
			storeNo:form.storeNo.value,
			goodsStatus:form.goodsStatus.value,
			classInfos:classInfos,
			standardList:standardList
		}
//		console.log(classInfos);
//		console.log(data);
		$.ajax({
			type:"post",
			url:"http://47.101.136.194:8089/saveGoods",
			contentType:"application/json",
			data:JSON.stringify(data),
			async:true,
			success:function(res){
//				console.log(res)
				if (res.rspCode==00000) {
					showZhezhaoMsg('新增商品成功！');
					$('#addGoodsFrom')[0].reset();
					$('#ossfile>div').remove();
					$('#container').removeClass('dn');
					$('.addData').remove();
					standardList = [];
				} else{
					showZhezhaoMsg(res.cnErrorMsg)
					console.log(res.cnErrorMsg)
				}
			},
			error:function(res){
				console.log(res)
			}
		});
	}
}
