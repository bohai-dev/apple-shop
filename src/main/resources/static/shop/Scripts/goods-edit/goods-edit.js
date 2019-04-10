$(function () {
	var href = window.parent.location.href;//获取上一级地址
	var addr = href.split("?");
	var addrVal = addr[1].split("=");
	var storeNo = addrVal[1];
	var nowHref = window.location.href;
	var idAddr = nowHref.split("?");
	var idAddrVal = idAddr[1].split("=");
	var goodsId = idAddrVal[1];
	// console.log(goodsId);
	// console.log(storeNo);

	$.ajax({
		type: "get",
		url: "http://47.101.136.194:8089/queryClasses",
		async: true,
		success: function (res) {
			console.log(res)
			if (res.rspCode == 00000) {
				var options = ""
				for (var i = 0; i < res.data.length; i++) {
					options += "<option value='" + res.data[i].classId + "'>" + res.data[i].cnClassName + "</option>"
				}
				$('#classify').append(options);
			} else {
				showZhezhaoMsg(res.cnErrorMsg)
			}
		}
	});
	//左侧导航 商品修改查询
	// console.log(goodsId)
	$.ajax({
		type: "get",
		url: "http://47.101.136.194:8089/queryGoodsDetail/" + goodsId,
		async: true,
		success: function (res) {
			console.log(res)
			if (res.rspCode == 00000) {
				$('.goodsModifyContainer input[name="chinaName"]').val(res.data.cnGoodsName)
				if (res.data.cnGoodsPictureBig) {
					var cnGoodsPictureBig = "<div><img src=" + res.data.cnGoodsPictureBig + " /><a href='javascript:void(0);' class='btn delBtn'>删除</a></div>"
					$('#ossfile').empty().append(cnGoodsPictureBig)
					// $('#container').addClass('dn')
				}
				$('textarea[name="chinaDescription"]').val(res.data.cnGoodsIntroduction)
				$('select[name="goodsStatus"]').val(res.data.goodsStatus)
				for (var j = 0; j < $('.be-classify option').length; j++) {
					if ($('.be-classify option').eq(j).val() == res.data.classInfos[0].classId) {
						$('.be-classify option').eq(j).attr("selected", true);
					}
				}
				for (var i = 0; i < res.data.standardList.length; i++) {
					var showFlag = res.data.standardList[i].showFlag == 1 ? '是' : '否';
					var trs = "<tr><td>" + res.data.standardList[i].name + "</td><td>" + res.data.standardList[i].description + "</td><td>" +
						res.data.standardList[i].price + "</td><td>" + res.data.standardList[i].stock + "</td><td>" +
						showFlag + "</td><td style='color:blue;cursor:pointer'><span class='opener'>修改</span><span onclick='delContent(this)' style='padding-left:20px'>删除</span></td></tr>"
					$('#guigeAdd').append(trs);
				}
	
				$('.opener').click(function () {
					// var td = $(this).parents('tr').index();
					tds = $(this).parent().parent().find('td');
					console.log(tds);
					$("#guigeName").val(tds[0].innerHTML);
					$("#guigeDesc").val(tds[1].innerHTML);
					$("#guigePrice").val(tds[2].innerHTML);
					$("#guigeStock").val(tds[3].innerHTML);
					if(tds[4].innerHTML == "是"){
						$("#moren").find("option")[1].setAttribute("selected",true);
						console.log($("#moren option")[0])
					}else{
						// $("#moren").find("option")[0].attr("selected",true);
						$("#moren option")[0].setAttribute("selected",true);
					}
					$('#dialog').dialog('open');
					// return false;
				})
				$('#dialog').dialog({
					title: "操作提示",
					autoOpen: false,//如果设置为true，则默认页面加载完毕后，就自动弹出对话框；相反则处理hidden状态。 
					bgiframe: true, //解决ie6中遮罩层盖不住select的问题  
					width: 400,
					height: 500,
					modal: true,//遮罩效果   
					buttons: {
						"确认修改": function () {
							if (!$('#guigeName').val()) {
								alert('请填写规格名称！')
							} else if (!$('#guigePrice').val()) {
								alert('请填写规格价格！')
							} else if (!$('#guigeStock').val()) {
								alert('请填写库存！')
							}
							if ($('#guigeName').val() && $('#guigePrice').val() && $('#guigeStock').val()) {
								var confirm = $('#moren option:selected').val() == 1 ? '是' : '否';
								// var tds = $(this).parent().parent().find('td');
								console.log($(this));
								tds[0].innerHTML = $("#guigeName").val();
								tds[1].innerHTML = $("#guigeDesc").val();
								tds[2].innerHTML = $("#guigePrice").val();
								tds[3].innerHTML = $("#guigeStock").val();
								tds[4].innerHTML = confirm;
								$(this).dialog("close");
							}
						},
						"取消": function () {
							// form[ 0 ].reset();
							$(this).dialog("close");
						}
					}
				})
			} else {
				showZhezhaoMsg(res.cnErrorMsg)
			}
		},
		error: function (res) {
			console.log(res)
		}
	});
	//弹出窗口，对规格的修改操作

	
})

function delContent(r) {
	// var trNow = r.parents();
	if (confirm("确定删除此规格吗？")) {
		var tr = r.parentNode.parentNode;
		tr.remove();
		console.log(tr);
	}
	// trNow.remove();
}
//修改商品
var nowHref = window.location.href;
	var idAddr = nowHref.split("?");
	var idAddrVal = idAddr[1].split("=");
	var goodsId = idAddrVal[1];
	var href = window.parent.location.href;//获取上一级地址
	var addr = href.split("?");
	var addrVal = addr[1].split("=");
	var storeNo = addrVal[1];
function goodsModity(form) {
	if (!form.chinaName.value) {
		showZhezhaoMsg('请输入商品名称！');
	} else if (!$('#ossfile>div>img').attr("src")) {
		showZhezhaoMsg('请上传商品大图！');
	} else {
		var classInfos = [];
		var standardList = [];
		var classId = { classId: $("#classify option:selected").val() };
		classInfos.push(classId);
		var trList = $("tr");
		console.log(trList);
		for (var i = 1; i < trList.length; i++) {
			var addstandardList = {
				name: $(trList[i]).find('td').eq(0).text(),
				description: $(trList[i]).find('td').eq(1).text(),
				price: $(trList[i]).find('td').eq(2).text(),
				stock: $(trList[i]).find('td').eq(3).text(),
				showFlag: $(trList[i]).find('td').eq(4).text() == '是' ? 1 : 0
			}
			standardList.push(addstandardList);
			// console.log($(trList[i]).find('td').eq(0).text());
		}
		console.log(goodsId);
		var data = {
			goodsId: goodsId,
			storeNo: storeNo,
			cnGoodsName: form.chinaName.value,
			cnGoodsPictureBig: $('#ossfile>div>img').attr("src"),
			cnGoodsIntroduction: form.chinaDescription.value,
			goodsStatus: form.goodsStatus.value,
			classInfos: classInfos,
			standardList: standardList
		}
		$.ajax({
			type: "post",
			url: "http://47.101.136.194:8089/modiftGoods",
			contentType: "application/json",
			data: JSON.stringify(data),
			async: true,
			success: function (res) {
				//					console.log(res)
				if (res.rspCode == 00000) {
					showZhezhaoMsg('修改商品成功！');
					// $(".publicMian").animate({ scrollTop: 0 }, 200);
				} else {
					showZhezhaoMsg(res.cnErrorMsg)
				}
			},
			error: function (res) {
				console.log(res)
			}
		});
	}
}


