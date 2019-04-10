//登陆
function submitFrom(form){
	if(!form.username.value){
		$('#user').next().addClass('db')
		if (form.password.value) {
			$('#mima').next().removeClass('db')
		}
	}else if(!form.password.value){
		$('#mima').next().addClass('db')
		if (form.username.value) {
			$('#user').next().removeClass('db')
		}
	}else{
		$('#user,#mima').next().removeClass('db')
		var data = {
			userName:form.username.value,
			password:form.password.value
		}
//		console.log(JSON.stringify(data))
		$.ajax({
			type:"post",
			url:"http://47.101.136.194:8089/login",
			async:true,
			data:JSON.stringify(data),
//			dataType:"jsonp",
			contentType:"application/json",
			success:function(result){
				if (result.rspCode==00000) {
					if(result.data.userType==0){
                        window.location.href="index.html?storeNo="+result.data.storeNo+"&userType="+result.data.userType+"&userName="+result.data.userName;
					}else{
                        showZhezhaoMsg('用户名或密码错误！')
					}


//					console.log(result.data.storeNo+"~~~~"+result.data.userType+"~~~~"+result.data.userName)
				} else{
					showZhezhaoMsg(result.cnErrorMsg)
				}
//				console.log(result)
			},
			error:function(xhr){
				console.log(xhr)
			}
		});
	}
}
//回车
$(function(){
	document.onkeydown=function(e){
		var keycode=document.all?event.keyCode:e.which;
		if(keycode==13){
			if($(".zhezhao").is(":hidden")){
			    $('.loginBtn').click();
			}else{
				$('#no').click()
			}
		};
	}
})