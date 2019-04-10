$(function(){
	deleteFlag = "";
	qureyStoreNo = $.getUrlParam("qureyStoreNo");
	oldData = {};
	$.ajax({
		type:"get",
		url:"http://47.101.136.194:8089/queryStoreInfo/"+qureyStoreNo,
		async:true,
		success:function(result){
//			console.log(result)
			if (result.rspCode==00000) {
				$('.storeNo').text(result.data.storeNo)
				$('input[name="cnStoreName"]').val(result.data.cnStoreName)
				$('textarea[name="cnStoreIntroduction"]').val(result.data.cnStoreIntroduction)
//				var cnGoodsPictureBig = "<div><img src="+res.data.cnStorePicture+" /><a href='javascript:void(0);' class='btn delBtn'>删除</a></div>"
				$('#ossfile').empty().append("<div><img src="+result.data.cnStorePicture+" /><a href='javascript:void(0);' class='btn delBtn'>删除</a></div>")
				$('#ossfile1').empty().append("<div><img src="+result.data.logo+" /><a href='javascript:void(0);' class='btn delBtn'>删除</a></div>")
				$('#container,#container1').addClass('dn')
				$('input[name="storeUserName"]').val(result.data.storeUserName)
				$('input[name="storePasswd"]').val(result.data.storePasswd)
				$('input[name="storePhone"]').val(result.data.storePhone)
				$('input[name="cnStoreAddress"]').val(result.data.cnStoreAddress)
				$('input[name="latitude"]').val(result.data.latitude)
				$('input[name="longitude"]').val(result.data.longitude)
				deleteFlag = result.data.deleteFlag;
				oldData = {
					storeNo:result.data.storeNo,
					cnStoreName:result.data.cnStoreName,
					cnStoreIntroduction:result.data.cnStoreIntroduction,
					cnStorePicture:result.data.cnStorePicture,
					logo:result.data.logo,
					storeUserName:result.data.storeUserName,
					storePasswd:result.data.storePasswd,
					storePhone:result.data.storePhone,
					cnStoreAddress:result.data.cnStoreAddress,
					latitude:result.data.latitude,
					longitude:result.data.longitude,
					deleteFlag:result.data.deleteFlag
				}
			} else{
				showZhezhaoMsg(result.cnErrorMsg+"<br/>请返回重试。")
			}
		},
		error:function(err){
			console.log(err)
		}
	});
});
//修改店铺
function modifyShop(form){
	if (!form.cnStoreName.value) {
		showZhezhaoMsg('请输入店铺名称！');
	}else if(!form.cnStoreIntroduction.value){
		showZhezhaoMsg('请输入店铺介绍！');
	}else if(!$('#ossfile>div>img').attr("src")){
		showZhezhaoMsg('请上传店铺图片！');
	}else if(!$('#ossfile1>div>img').attr("src")){
		showZhezhaoMsg('请上传店铺logo！');
	}else if(!form.storeUserName.value){
		showZhezhaoMsg('请输入店铺管理员用户名！');
	}else if(!form.storePasswd.value){
		showZhezhaoMsg('请输入店铺管理员密码！');
	}else if(!form.storePhone.value){
		showZhezhaoMsg('请输入店铺电话！');
	}else if(!form.cnStoreAddress.value){
		showZhezhaoMsg('请输入店铺地址！');
	}else{
		var data = {
			storeNo:qureyStoreNo,
			cnStoreName:form.cnStoreName.value,
			cnStoreIntroduction:form.cnStoreIntroduction.value,
			cnStorePicture:$('#ossfile>div>img').attr("src"),
			logo:$('#ossfile1>div>img').attr("src"),
			storeUserName:form.storeUserName.value,
			storePasswd:form.storePasswd.value,
			storePhone:form.storePhone.value,
			cnStoreAddress:form.cnStoreAddress.value,
			latitude:form.latitude.value?parseFloat(form.latitude.value):null,
			longitude:form.longitude.value?parseFloat(form.longitude.value):null,
			deleteFlag:deleteFlag,
		}
//		console.log(oldData)
//		console.log(data)
		var isEqual= cmp(oldData, data);
		if (isEqual) {
			showZhezhaoMsg('您没有做任何修改！');
		} else{
			$.ajax({
				type:"post",
				url:"http://47.101.136.194:8089/modifyStoreInfo",
				contentType:"application/json",
				data:JSON.stringify(data),
				async:true,
				success:function(res){
					if (res.rspCode==00000) {
						showZhezhaoMsg('修改店铺成功！');
						$(".publicMian").animate({scrollTop:0}, 200);
						setTimeout(function(){
							window.location.href = "shopList.html"
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
	}
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