$(function () {
	goodsId = "";

	$.ajax({
		type: "get",
		url: "http://47.101.136.194:8089/queryClasses",
		contentType: "application/json",
		async: true,
		success: function (res) {
			// console.log(res)
			if (res.rspCode == 00000) {
				var options = ""
				for (var i = 0; i < res.data.length; i++) {
					options += "<option value='" + res.data[i].classId + "'>" + res.data[i].cnClassName + "</option>"
				}
				$('#classify').append(options);
			} else {
				showZhezhaoMsg(res.cnErrorMsg)
			}
		},
		error: function (res) {
			console.log(res)
		}
	});
	$('.opener').click(function () {
		$('#guigeName').val('');
		$('#guigeDesc').val('');
		$('#guigePrice').val('');
		$('#guigeStock').val('');
		$("#dialog").dialog("open");
		return false;
	})
	$('#dialog').dialog({
		title: "新增规格",
		autoOpen: false,//如果设置为true，则默认页面加载完毕后，就自动弹出对话框；相反则处理hidden状态。 
		bgiframe: true, //解决ie6中遮罩层盖不住select的问题  
		width: 400,
		height: 500,
		modal: true,//遮罩效果   
		buttons: {
			"确认添加": function () {
				if (!$('#guigeName').val()) {
					alert('请填写规格名称！')
				} else if (!$('#guigePrice').val()) {
					alert('请填写规格价格！')
				} else if (!$('#guigeStock').val()) {
					alert('请填写库存！')
				}
				if ($('#guigeName').val() && $('#guigePrice').val() && $('#guigeStock').val()) {
					var confirm = $('#moren option:selected').val() == 1 ? '是' : '否';
					$("#guigeContent").append("<tr>" +
						"<td>" + $('#guigeName').val() + "</td>" +
						"<td>" + $('#guigeDesc').val() + "</td>" +
						"<td>" + $('#guigePrice').val() + "</td>" +
						"<td>" + $('#guigeStock').val() + "</td>" +
						"<td>" + confirm + "</td>" +
						"<td><span class='opener1' onclick='modifyDialog(this)' style='color:blue;cursor:pointer'>修改</span><span onclick='delContent(this)' style='color:blue;padding-left:15px;cursor:pointer'>删除</span></td>" +
						"</tr>");
					// form[0].reset();
					$(this).dialog("close");

				}
			},
			"取消": function () {
				$(this).dialog("close");
			}
		}
	});
})

function modifyDialog(r) {
	tds = r.parentNode.parentNode.children;
	// console.log(tds);
	$("#guigeName1").val(tds[0].innerHTML);
	$("#guigeDesc1").val(tds[1].innerHTML);
	$("#guigePrice1").val(tds[2].innerHTML);
	$("#guigeStock1").val(tds[3].innerHTML);
	if (tds[4].innerHTML == "是") {
		$("#moren1").find("option")[1].setAttribute("selected", true);
		console.log($("#moren1 option")[0])
	} else {
		// $("#moren").find("option")[0].attr("selected",true);
		$("#moren option")[0].setAttribute("selected", true);
	}
	$('#dialogModify').dialog({
		title: "操作提示",
		autoOpen: true,//如果设置为true，则默认页面加载完毕后，就自动弹出对话框；相反则处理hidden状态。 
		bgiframe: true, //解决ie6中遮罩层盖不住select的问题  
		width: 400,
		height: 500,
		modal: true,//遮罩效果   
		buttons: {
			"确认修改": function () {
				console.log(r)
				if (!$('#guigeName1').val()) {
					alert('请填写规格名称！')
				} else if (!$('#guigePrice1').val()) {
					alert('请填写规格价格！')
				} else if (!$('#guigeStock1').val()) {
					alert('请填写库存！')
				}
				if ($('#guigeName1').val() && $('#guigePrice1').val() && $('#guigeStock1').val()) {
					var confirm = $('#moren1 option:selected').val() == 1 ? '是' : '否';
					// var tds = $(this).parent().parent().find('td');
					console.log($(this));
					tds[0].innerHTML = $("#guigeName1").val();
					tds[1].innerHTML = $("#guigeDesc1").val();
					tds[2].innerHTML = $("#guigePrice1").val();
					tds[3].innerHTML = $("#guigeStock1").val();
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
}

function delContent(r) {
	// var trNow = r.parents();
	if (confirm("确定删除此规格吗？")) {
		var tr = r.parentNode.parentNode;
		tr.remove();
	}
}

//增加商品
function addGoodsFrom(form) {
	var href = window.parent.location.href;//获取上一级地址
	var addr = href.split("?");
	var addrVal = addr[1].split("=");
	var storeNo = addrVal[1];
	console.log(storeNo);
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
	// console.log(standardList);
	// console.log(classInfos);

	if (!form.chinaName.value) {
		showZhezhaoMsg('请输入商品名称！');
	} else if (!$('#ossfile>div>img').attr("src")) {
		showZhezhaoMsg('请上传商品大图！');
	} else {

		// var goodsAttrs = [];
		var data = {
			storeNo: storeNo,
			cnGoodsName: form.chinaName.value,
			cnGoodsPictureBig: $('#ossfile>div>img').attr("src"),
			cnGoodsIntroduction: form.chinaDescription.value,
			goodsStatus: form.goodsStatus.value,
			classInfos: classInfos,
			standardList: standardList
		}
		console.log(data);
		$.ajax({
			type: "post",
			url: "http://47.101.136.194:8089/saveGoods",
			contentType: "application/json",
			data: JSON.stringify(data),
			async: true,
			success: function (res) {
				console.log(res)
				if (res.rspCode == 00000) {
					showZhezhaoMsg('新增商品成功！');
					$('#addGoodsFrom')[0].reset();
					$('#guigeContent').empty();
					$('#ossfile>div,#ossfile1>div,#ossfile2>div,#ossfile3>div').remove();
					$('#container,#container1,#container2,#container3').removeClass('dn');
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

