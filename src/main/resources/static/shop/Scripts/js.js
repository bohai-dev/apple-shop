$(function () {
	
	//显示提醒框  删除分类提示
    $('.DeleteBtn').click(function () {
    	showZhezhao2()
    });
    
    $('#no').click(function () {
    	hideZhezhao()
    });
    $('.deleteBtn2').click(function () {
    	showZhezhao2()
    });
    $('#no1').click(function () {
    	hideZhezhao1()
    });
    $('#no2').click(function () {
    	hideZhezhao2()
    });
    
	//左侧导航显示
	$('.shopManage').click(function(){
		$('.shopManageChildListbox').slideToggle("500",function(){
			$(this).removeClass('db')
		})
	})
//	$('.userManage').click(function(){
//		$('.userManageChildListbox').slideToggle("500",function(){
//			$(this).removeClass('db')
//		})
//	})
//	$('.promotion').click(function(){
//		$('.promotionChildListbox').slideToggle("500",function(){
//			$(this).removeClass('db')
//		})
//	})
	$('.adShow').click(function(){
		$('.adShowChildListbox').slideToggle("500",function(){
			$(this).removeClass('db')
		})
	})
	$('.activeBg').click(function(){
		if($(this).hasClass("active")){
			return false;
		}else{
			$('.activeBg').removeClass('active')
			$(this).addClass('active')
		}
	})
    //子列表导航  顶部导航
	$('.childClassifyList').click(function(){
		if($(this).hasClass("active")){
			return false;
		}else{
			$('.childClassifyList').removeClass('active')
			$(this).addClass('active')
			$('.childContent').eq($(this).index()).addClass('df').siblings().removeClass('df')
		}
	})

	//设置控制时间
	ctrlTimeH('#startTimeH')
	ctrlTimeM('#startTimeM')
	ctrlTimeH('#endTimeH')
	ctrlTimeM('#endTimeM')
	
	//修改店铺 跳转页面查询
	$('.shopListBox').on("click","li",function(){
//		console.log($(this).data('storeno'))
		qureyStoreNo = $(this).data('storeno');
		window.location.href = "shopModify.html?qureyStoreNo="+qureyStoreNo;
	})
	
	//删除图片
	$('#ossfile').on("click","a",function(){
		$('#ossfile>div').remove();
		$('#container').removeClass('dn');
	})
	$('#ossfile1').on("click","a",function(){
		$('#ossfile1>div').remove();
		$('#container1').removeClass('dn');
	})
	$('#ossfile2').on("click","a",function(){
		$('#ossfile2>div').remove();
		$('#container2').removeClass('dn');
	})
	$('#ossfile3').on("click","a",function(){
		$('#ossfile3>div').remove();
		$('#container3').removeClass('dn');
	})
	
});


//提醒框显示
function showZhezhao(){
	$('.zhezhao').css('display', 'block');
	$('.remove').fadeIn();	
}
function showZhezhao1(){
	$('.zhezhao1').css('display', 'block');
	$('.remove1').fadeIn();	
}
function showZhezhao2(){
	$('.zhezhao2').css('display', 'block');
	$('.remove2').fadeIn();	
}

//提醒框隐藏
function hideZhezhao(){
	$('.zhezhao').css('display', 'none');
	$('.remove').fadeOut();
}
function hideZhezhao1(){
	$('.zhezhao1').css('display', 'none');
	$('.remove1').fadeOut();
}
function hideZhezhao2(){
	$('.zhezhao2').css('display', 'none');
	$('.remove2').fadeOut();
}
//提醒框提醒内容显示
function showZhezhaoMsg(msg){
	$('.zhezhao').css('display', 'block');
	$('.remove').fadeIn();	
	$(".removeMain>p").html(msg);
}
//格式划两位数
function twonumber(num) {
	if (num < 10) {
		return "0" + num;
	}
    return num;
}
//控制时间小时
function ctrlTimeH(elem){
	$(elem).blur(function(){
		if($(elem).val()<0){
			$(elem).val(0);
		}else if ($(elem).val()>23) {
			$(elem).val(23);
		} else{
			$(elem).val(twonumber(new Number($(elem).val())));
		}
	})
}
//控制时间分钟
function ctrlTimeM(elem){
	$(elem).blur(function(){
		if($(elem).val()<0){
			$(elem).val(0);
		}else if ($(elem).val()>59) {
			$(elem).val(59);
		} else{
			$(elem).val(twonumber(new Number($(elem).val())));
		}
	})
}
//获取地址值
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery); 

//增加店铺
function saveShop(form){
	if (!form.cnStoreName.value) {
		showZhezhaoMsg('请输入店铺名称(中文)！');
	}else if(!form.usStoreName.value){
		showZhezhaoMsg('请输入店铺名称(英文)！');
	}else if(!form.cnStoreAddress.value){
		showZhezhaoMsg('请输入店铺地址(中文)！');
	}else if(!form.usStoreAddress.value){
		showZhezhaoMsg('请输入店铺地址(英文)！');
	}else if(!form.cnStoreIntroduction.value){
		showZhezhaoMsg('请输入店铺介绍(中文)！');
	}else if(!form.usStoreIntroduction.value){
		showZhezhaoMsg('请输入店铺介绍(英文)！');
	}else if(!form.isDefault.value){
		showZhezhaoMsg('请选择是否默认店铺！');
	}else if(!form.startTimeH.value || !form.startTimeM.value){
		showZhezhaoMsg('请输入营业开始时间！');
	}else if(!form.endTimeH.value || !form.endTimeM.value){
		showZhezhaoMsg('请输入营业结束时间！');
	}else if(!form.cnStoreCity.value){
		showZhezhaoMsg('请输入店铺所在城市(中文)！');
	}else if(!form.usStoreCity.value){
		showZhezhaoMsg('请输入店铺所在城市(英文)！');
	}else if(!form.storeUserName.value){
		showZhezhaoMsg('请输入店铺管理员用户名！');
	}else if(!form.storePasswd.value){
		showZhezhaoMsg('请输入店铺管理员密码！');
	}else if(!form.storePhone.value){
		showZhezhaoMsg('请输入店铺电话！');
	}else if(!form.storeStatus.value){
		showZhezhaoMsg('请选择店铺状态！');
	}else{
		var data = {
			cnStoreName:form.cnStoreName.value,
			usStoreName:form.usStoreName.value,
			cnStoreAddress:form.cnStoreAddress.value,
			usStoreAddress:form.usStoreAddress.value,
			cnStoreIntroduction:form.cnStoreIntroduction.value,
			usStoreIntroduction:form.usStoreIntroduction.value,
			isDefault:form.isDefault.value,
			isSend:form.isSend.value,
			latitude:parseFloat(form.latitude.value),
			longitude:parseFloat(form.longitude.value),
			reserveBeginTime:form.startTimeH.value+":"+form.startTimeM.value+":"+"00",
			reserveEndTime:form.endTimeH.value+":"+form.endTimeM.value+":"+"00",
			cnStoreCity:form.cnStoreCity.value,
			usStoreCity:form.usStoreCity.value,
			storeUserName:form.storeUserName.value,
			storePasswd:form.storePasswd.value,
			storePhone:form.storePhone.value,
			storeStatus:form.storeStatus.value,
		}
//		console.log(data)
		$.ajax({
			type:"post",
			url:"http://47.101.136.194:8089/saveStoreInfo",
			contentType:"application/json",
			data:JSON.stringify(data),
			async:true,
			success:function(res){
				if (res.rspCode==00000) {
					showZhezhaoMsg('新增店铺成功！');
					$('#addShopFrom')[0].reset();
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
//店铺查询
function queryShop(form){
	var queryCriteria = "";
	queryCriteria += form.shopNumber.value ? "&storeNo="+form.shopNumber.value : "";
	queryCriteria += form.shopCity.value ? "&cnStoreCity="+form.shopCity.value : "";
	queryCriteria += form.shopAddress.value ? "&cnStoreAddress="+form.shopAddress.value : "";
//	console.log(queryCriteria)
	$.ajax({
		type:"get",
		url:"http://47.101.136.194:8089/queryStores?"+queryCriteria,
		async:true,
		success:function(res){
//			console.log(res)
			if (res.rspCode==00000) {
				if (res.data.length>0) {
					var elemQueryStoreList = "";
					for (var i=0;i<res.data.length;i++) {
						elemQueryStoreList += 
						'<li class="shopList" data-storeno = "'+res.data[i].storeNo+'">'+res.data[i].cnStoreName+'</li>'
					}
//					console.log(elemQueryStoreList)
					$('.shopList').remove()
					$('.shopListBox').append(elemQueryStoreList)
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

//重写alert方法，去掉地址显示
//window.alert = function(name){
//var iframe = document.createElement("IFRAME");
//iframe.style.display="none";
//iframe.setAttribute("src", 'data:text/plain,');
//document.documentElement.appendChild(iframe);
//window.frames[0].window.alert(name);
//iframe.parentNode.removeChild(iframe);
//}