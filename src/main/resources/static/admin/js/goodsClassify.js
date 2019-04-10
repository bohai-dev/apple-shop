$(function(){
	deleteFlag = "";
	storeNo = $.getUrlParam("storeNo");
	oldData = {};
	classId= "";
	//商品分类查询
	$('.classifyModifyBtn').click(function(){
		queryClassify()
	})
	
	//左侧导航 商品分类修改查询
	$('.classifyModify').on('click',"li",function(){
		if($(this).hasClass("active")){
			return false;
		}else{
			$('.classifyModifyList').removeClass('active')
			$(this).addClass('active')
//			console.log($(this).data('classid'))
			$.ajax({
				type:"get",
				url:"http://47.101.136.194:8089/queryClassInfo/"+$(this).data('classid'),
				async:true,
				success:function(res){
//					console.log(res)
					if (res.rspCode==00000) {
						$('.childRight input[name="chinaName"]').val(res.data.cnClassName)
						$('.childRight input[name="order"]').val(res.data.indexNo)
						if(res.data.cnClassLogo){
							var cnClassLogoClassify = "<div><img src="+res.data.cnClassLogo+" /><a href='javascript:void(0);' class='btn delBtn'>删除</a></div>"
							$('#ossfile1').empty().append(cnClassLogoClassify)
							$('#container1').addClass('dn')
						}
						deleteFlag = res.data.deleteFlag;
						classId = res.data.classId;
						oldData = {
							classId:res.data.classId,
							cnClassName:res.data.cnClassName,
							cnClassLogo:res.data.cnClassLogo,
							indexNo:res.data.indexNo,
							deleteFlag:res.data.deleteFlag
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
	})
	
	//删除分类
	$('.classifyDeleteBtn').click(function(){
//		console.log(classId)
		hideZhezhao2()
		$.ajax({
			type:"delete",
			url:"http://47.101.136.194:8089/removeClass/"+classId,
			async:true,
			success:function(result){
//	   			console.log(result)
				if (result.rspCode==00000) {
					showZhezhaoMsg('删除成功！');
					queryClassify()
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
//添加分类
function classifyFrom(form){
	if (!form.chinaName.value) {
		showZhezhaoMsg('请输入分类名称！');
	}else if(!form.order.value){
		showZhezhaoMsg('请输入顺序！');
	}else{
		var classifyData = {
			cnClassName:form.chinaName.value,
			cnClassLogo:$('#ossfile>div>img').attr("src"),
			indexNo:form.order.value,
		}
		$.ajax({
			type:"post",
			url:"http://47.101.136.194:8089/saveClass",
			contentType:"application/json",
			data:JSON.stringify(classifyData),
			async:true,
			success:function(res){
//				console.log(res)
				if (res.rspCode==00000) {
					showZhezhaoMsg('添加分类成功！');
					$('#addClassifyFrom')[0].reset();
					$('#ossfile>div').remove();
					$('#container').removeClass('dn');
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

//修改分类
function classifyModity(form){
	if (!form.chinaName.value) {
		showZhezhaoMsg('请输入分类名称！');
	}else if(!form.order.value){
		showZhezhaoMsg('请输入顺序！');
	}else{
		var classifyData = {
			classId:classId,
			cnClassName:form.chinaName.value,
			cnClassLogo:$('#ossfile1>div>img').attr("src"),
			indexNo:parseInt(form.order.value),
			deleteFlag:deleteFlag
		}
		var isEqual= cmp(oldData, classifyData);
//		console.log(isEqual)
		if (isEqual) {
			showZhezhaoMsg('您没有做任何修改！');
		} else{
			$.ajax({
				type:"post",
				url:"http://47.101.136.194:8089/modifyClass",
				contentType:"application/json",
				data:JSON.stringify(classifyData),
				async:true,
				success:function(res){
//					console.log(res)
					if (res.rspCode==00000) {
						showZhezhaoMsg('修改分类成功！');
						queryClassify()
//						$('#addClassifyFrom')[0].reset();
//						$('#ossfile>div,#ossfile1>div').remove();
//						$('#container,#container1').removeClass('dn');
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
//查询分类
function queryClassify(){
	$.ajax({
		type:"get",
		url:"http://47.101.136.194:8089/queryClasses",
		async:true,
		success:function(res){
//			console.log(res)
			if (res.rspCode==00000) {
				if (res.data.length>0) {
					var elemClassifyList = "";
					for (var i=0;i<res.data.length;i++) {
						elemClassifyList += 
						'<li class="classifyModifyList" data-classid = "'+res.data[i].classId+'">'+res.data[i].cnClassName+'</li>'
					}
//					console.log(elemClassifyList)
					$('.classifyModifyList').remove()
					$('.classifyModify').append(elemClassifyList)
					$('.classifyModifyList').eq(0).addClass('active')
					$('.childRight input[name="chinaName"]').val(res.data[0].cnClassName)
					$('.childRight input[name="order"]').val(res.data[0].indexNo)
					if(res.data[0].cnClassLogo){
						var cnClassLogoClassify = "<div><img src="+res.data[0].cnClassLogo+" /><a href='javascript:void(0);' class='btn delBtn'>删除</a></div>"
						$('#ossfile1').empty().append(cnClassLogoClassify)
						$('#container1').addClass('dn')
					}
					deleteFlag = res.data[0].deleteFlag;
					classId = res.data[0].classId;
					oldData = {
						classId:res.data[0].classId,
						cnClassName:res.data[0].cnClassName,
						cnClassLogo:res.data[0].cnClassLogo,
						indexNo:res.data[0].indexNo,
						deleteFlag:res.data[0].deleteFlag
					}
				} else{
					showZhezhaoMsg('无商品分类，请添加！');
				}
			} else{
				showZhezhaoMsg(res.cnErrorMsg)
			}
		}
	});
}

//比较字段
cmp = function( x, y ) { 
	// If both x and y are null or undefined and exactly the same 
	if ( x === y ) { 
		return true; 
	} 
	
	// If they are not strictly equal, they both need to be Objects 
	if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) { 
		return false; 
	} 
	
	//They must have the exact same prototype chain,the closest we can do is
	//test the constructor. 
	if ( x.constructor !== y.constructor ) { 
		return false; 
	} 
	 
	for ( var p in x ) {
		//Inherited properties were tested using x.constructor === y.constructor
		if ( x.hasOwnProperty( p ) ) {
			// Allows comparing x[ p ] and y[ p ] when set to undefined 
			if ( ! y.hasOwnProperty( p ) ) {
				return false; 
			} 
	
			// If they have the same strict value or identity then they are equal 
			if ( x[ p ] === y[ p ] ) { 
				continue; 
			} 
	
			// Numbers, Strings, Functions, Booleans must be strictly equal 
			if ( typeof( x[ p ] ) !== "object" ) { 
				return false; 
			} 
	
			// Objects and Arrays must be tested recursively 
			if ( ! Object.equals( x[ p ], y[ p ] ) ) { 
				return false; 
			} 
	 	} 
	} 
	
	for ( p in y ) { 
		// allows x[ p ] to be set to undefined 
		if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) { 
			return false; 
		} 
	} 
	return true; 
};