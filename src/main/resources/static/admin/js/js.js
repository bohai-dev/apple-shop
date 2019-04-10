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
    $('.table').on("click",".deleteBtn2",function(){
		showZhezhao2()
	})
    $('.table').on("click",".deleteBtn5",function(){
		showZhezhao5()
	})
    $('#no1').click(function () {
    	hideZhezhao1()
    });
    $('#no2').click(function () {
    	hideZhezhao2()
    });
    $('#no3').click(function () {
    	hideZhezhao3()
    });
    $('#no4').click(function () {
    	hideZhezhao4()
    });
    $('#no5').click(function () {
    	hideZhezhao5()
    });
    
	//左侧导航显示
	$('.shopManage').click(function(){
		$('.shopManageChildListbox').stop(true,false).slideToggle("500",function(){
			$(this).removeClass('db')
		})
	})
	$('.adShow').click(function(){
		$('.adShowChildListbox').stop().slideToggle("500",function(){
			$(this).removeClass('db')
		})
	})
	$('.fundManage').click(function(){
		$('.fundManageChildListbox').slideToggle("500",function(){
			$(this).removeClass('db')
		})
	})
	$('.govermentManage').click(function(){
		$('.govermentManageChildListbox').slideToggle("500",function(){
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
	
	//修改店铺 跳转页面
	$('.table').on("click",".modifyShop",function(){
//		console.log($(this).data('storeno'))
		qureyStoreNo = $(this).data('storeno');
		window.location.href = "shopModify.html?qureyStoreNo="+qureyStoreNo;
	})
	
	//编辑当前店铺信息
	$('.storeName').click(function(){
//		console.log($.getUrlParam("storeNo"))
		window.location.href = "shopModify.html?qureyStoreNo="+$.getUrlParam("storeNo");
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
function showZhezhao3(){
	$('.zhezhao3').css('display', 'block');
	$('.remove3').fadeIn();	
}
function showZhezhao4(){
	$('.zhezhao3').css('display', 'block');
	$('.remove4').fadeIn();	
}
function showZhezhao5(){
	$('.zhezhao5').css('display', 'block');
	$('.remove5').fadeIn();	
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
function hideZhezhao3(){
	$('.zhezhao3').css('display', 'none');
	$('.remove3').fadeOut();
}
function hideZhezhao4(){
	$('.zhezhao3').css('display', 'none');
	$('.remove4').fadeOut();
}
function hideZhezhao5(){
	$('.zhezhao5').css('display', 'none');
	$('.remove5').fadeOut();
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
			cnStoreName:form.cnStoreName.value,
			cnStoreIntroduction:form.cnStoreIntroduction.value,
			cnStorePicture:$('#ossfile>div>img').attr("src"),
			logo:$('#ossfile1>div>img').attr("src"),
			storeUserName:form.storeUserName.value,
			storePasswd:form.storePasswd.value,
			storePhone:form.storePhone.value,
			cnStoreAddress:form.cnStoreAddress.value,
			latitude:parseFloat(form.latitude.value),
			longitude:parseFloat(form.longitude.value),
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
					setTimeout(function(){
						window.location.href = "shopList.html"
					},1000)
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

/**
 *对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}