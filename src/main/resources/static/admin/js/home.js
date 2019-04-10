$(function(){
	storeNo = $.getUrlParam("storeNo");
	if(!storeNo){
		window.location.href="login.html"
	}else{
	//	console.log($.getUrlParam("storeNo")+"==="+$.getUrlParam("userType")+"==="+$.getUrlParam("userName"))
	 	$('#Conframe').attr('src',"shopList.html?storeNo="+$.getUrlParam("storeNo")+"&userType="+$.getUrlParam("userType")+"&userName="+$.getUrlParam("userName"))
	 	$('#accountName').html($.getUrlParam("userName"));
	 	//店铺编号、用户类型、用户名字赋值
	   	for (var i=0;i<$('.navList').length;i++) {
	// 		console.log($('.navList').eq(i).attr('href'))
	   		$('.navList').eq(i).attr('href',$('.navList').eq(i).attr('href')+"?storeNo="+$.getUrlParam("storeNo")+"&userType="+$.getUrlParam("userType")+"&userName="+$.getUrlParam("userName"))
	   	}
	 	//更换店铺名
//	 	$.ajax({
//	 		type:"get",
//	   		url:"http://47.89.247.54:8081/queryStoreInfo/"+$.getUrlParam("storeNo"),
//	 		async:true,
//	 		success:function(result){
//				if (result.rspCode==00000) {
//					$('#storeName').html(result.data.cnStoreName)
//				} else{
//					showZhezhaoMsg(result.cnErrorMsg)
//				}
//			},
//			error:function(xhr){
//				console.log(xhr)
//			}
//	 	});
	}
	//注销
	$('#logOff').click(function(){
		storeNo = "";
		window.location.href="login.html";
	})
})