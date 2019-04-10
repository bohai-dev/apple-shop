$(function(){
	J('#cal1').calendar({ maxDate:'#cal2',disDate:['%y-%M-%d']});
	J('#cal2').calendar({ minDate:'#cal1',maxDate:'%y-%M-%d',disDate:['%y-%M-%d']});
	J('#cal1').val(new Date(new Date().setDate(new Date().getDate() - 1)).format("yyyy-MM-dd"))
	J('#cal2').val(new Date(new Date().setDate(new Date().getDate() - 1)).format("yyyy-MM-dd"))

	queryFundManage()
	
	//详情
	$('.table').on("click",".fundManageInfo",function(){
		window.location.href = "orderQuery.html?beginTime="+$('#cal1').val()+"&finishTime="+$('#cal2').val()+"&storeNo="+$(this).data('storeno');
	})
})

//查询结算
function queryFundManage(form){
	
	if (form) {
		var data = {
			beginTime:form.startTime.value,
			finishTime:form.endTime.value,
			storeNo:form.storeNo.value?form.storeNo.value:null
		};
	} else{
		var data = {
			beginTime:$('#cal1').val(),
			finishTime:$('#cal2').val(),
			storeNo:null
		};
	}
	
	$.ajax({
		type:"post",
		url:"http://47.101.136.194:8089/account",
		data:JSON.stringify(data),
		contentType:"application/json",
		async:true,
		success:function(res){
//			console.log(res)
			if (res.data.length>0) {
				var elemFundManage = '<tr class="tableTitle">'+
						'<th>店铺编号</th><th>店铺名称</th><th>结算周期</th><th>订单总数</th><th>订单总金额</th><th>退换次数</th><th>退换金额</th><th>合计金额</th><th>结算时间</th><th>操作</th>'+
						'</tr>';
				for (var i=0;i<res.data.length;i++) {
					elemFundManage +='<tr>'+
							'<td>'+res.data[i].storeNo+'</td>'+
							'<td>'+res.data[i].storeName+'</td>'+
							'<td>'+res.data[i].beginTime+'~'+res.data[i].finishTime+'</td>'+
							'<td>'+res.data[i].orderCount+'</td>'+
							'<td>'+res.data[i].orderTotalMoney+'</td>'+
							'<td>'+res.data[i].returnCount+'</td>'+
							'<td>'+res.data[i].returnMoney+'</td>'+
							'<td>'+res.data[i].finalMoney+'</td>'+
							'<td>'+res.data[i].accountDate+'</td>'+
							'<td>'+'<span class="fundManageInfo" data-storeno='+res.data[i].storeNo+'>详情</span>'+'</td>'+
						'</tr>'
				}
//				console.log(elemFundManage)
				$('.table').empty().append(elemFundManage);
			}else{
				showZhezhaoMsg('无数据！');
			}
		}
	});
}