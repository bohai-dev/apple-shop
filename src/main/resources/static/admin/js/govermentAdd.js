//添加宣传
function govermentFrom(form){
	if (!form.govermentTitle.value) {
		showZhezhaoMsg('请输入宣传标题！');
	} else if(!$('#ossfile>div>img').attr("src")){
		showZhezhaoMsg('请上传宣传图片！');
	}else{
		var govermentData = {
			title:form.govermentTitle.value,
			picture:$('#ossfile>div>img').attr("src"),
			context:form.govermentContext.value,
		}
		console.log(govermentData)
		$.ajax({
			type:"post",
			url:"http://47.101.136.194:8089/saveGoverment",
			contentType:"application/json",
			data:JSON.stringify(govermentData),
			async:true,
			success:function(res){
//				console.log(res)
				if (res.rspCode==00000) {
					showZhezhaoMsg('添加宣传成功！');
					$('#addGovermentFrom')[0].reset();
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