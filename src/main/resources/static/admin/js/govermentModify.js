$(function(){
	modifyGovergrntId = "";
	deleteGovermentId = "";
	
	qureyGoverment()
	
	//宣传修改查询
	$('.table').on("click",".modifyGoverment",function(){
		$('.zhezhao1').show()
		$('.modelView').css('display', 'flex');
		console.log($(this).data('id'))
		$.ajax({
			type:"get",
			url:"http://47.101.136.194:8089/queryGoverment/"+$(this).data('id'),
			async:true,
			success:function(res){
//				console.log(res)
				if (res.rspCode==00000) {
					$('#modifyGovermentFrom input[name="govermentTitle"]').val(res.data.title)
					$('#ossfile').empty().append("<div><img src="+res.data.picture+" /><a href='javascript:void(0);' class='btn delBtn'>删除</a></div>")
					$('#container').addClass('dn')
					$('#modifyGovermentFrom textarea[name="govermentContext"]').val(res.data.context)
					modifyGovergrntId = res.data.id;
				} else{
					showZhezhaoMsg(res.cnErrorMsg)
				}
			},
			error:function(res){
				console.log(res)
			}
		});
	})
	
	//删除宣传
	$('.table').on("click",".deleteGoverment",function(){
		deleteGovermentId = $(this).data('id');
	})
	$('.govermentDeleteBtn').click(function(){
//		console.log(deleteGovermentId)
		hideZhezhao2()
		$.ajax({
			type:"delete",
			url:"http://47.101.136.194:8089/removeGoverment/"+deleteGovermentId,
			async:true,
			success:function(result){
//	   			console.log(result)
				if (result.rspCode==00000) {
					showZhezhaoMsg('删除成功！');
					qureyGoverment()
				} else{
					showZhezhaoMsg(result.cnErrorMsg)
				}
			},
			error:function(xhr){
				console.log(xhr)
			}
		});
	})
	
	//关闭模态框
	$('.closeBtn').click(function(){
		closeModel();
	})
})

//修改宣传
function govermentModity(form){
	
	if (!form.govermentTitle.value) {
		showZhezhaoMsg('请输入宣传标题！');
	} else if(!$('#ossfile>div>img').attr("src")){
		showZhezhaoMsg('请上传宣传图片！');
	}else{
		var data = {
			id:modifyGovergrntId,
			title:form.govermentTitle.value,
			picture:$('#ossfile>div>img').attr("src"),
			context:form.govermentContext.value
		}
		console.log(data)
		$.ajax({
			type:"post",
			url:"http://47.101.136.194:8089/updateGoverment",
			contentType:"application/json",
			data:JSON.stringify(data),
			async:true,
			success:function(res){
//				console.log(res)
				if (res.rspCode==00000) {
					showZhezhaoMsg('修改商品成功！');
					closeModel();
					qureyGoverment()
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

//查询宣传
function qureyGoverment(){
	loadList(1);
	function loadList(num){
		var data = {
			pageNumber:num,
			pageSize:5,
		}
//		console.log(data)
		$.ajax({
			type:"post",
			url:"http://47.101.136.194:8089/queryPageGoverment",
			contentType:"application/json",
			data:JSON.stringify(data),
			async:true,
			success:function(res){
//				console.log(res)
				if (res.rspCode==00000) {
					if (res.rows.length>0) {
						$('.tips').show().children('.totalNumber').html(res.total)
						$('.m-style').pagination({
					        pageCount: Math.ceil(res.total/5), //总页数,默认为9
					        current: num, //当前第几页
					        coping: true, //首页和尾页
					        count: 2, //mode为unfixed时显示当前选中页前后页数，mode为fixed显示页码总数
					        jump: true, //跳转到指定页数
					        jumpBtn: '跳转', //跳转按钮文本
					        callback: function (index) {
					        	loadList(index.getCurrent())
					        } //回调
						});
						var elemGovermentInfo = '<tr class="tableTitle">'+
							'<th>标题</th><th>图片</th><th>内容</th><th>操作</th>'+
							'</tr>';
						for (var i=0;i<res.rows.length;i++) {
							//宣传信息table
							elemGovermentInfo +='<tr>'+
								'<td>'+res.rows[i].title+'</td>'+
								'<td>'+'<img class="govermentImg" src="'+res.rows[i].picture+'" alt="" /></td>'+
								'<td>'+(res.rows[i].context?res.rows[i].context:"-")+'</td>'+
								'<td>'+'<span class="modifyGoverment" data-id='+res.rows[i].id+'>详情</span>'+'<span class="deleteGoverment deleteBtn2" data-id='+res.rows[i].id+'>删除</span>'+'</td>'+
							'</tr>'
						}
//						console.log(elemGovermentInfo)
						$('.table').empty().append(elemGovermentInfo);
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
	}
}

//关闭修改商品模态框
function closeModel(){
	$('.zhezhao1,.modelView').hide()
}
