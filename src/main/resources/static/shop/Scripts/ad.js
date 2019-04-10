$(function () {
	deleteFlag = "";
	var href = document.referrer;
	console.log(href);
	var addr = href.split("?");
	var addrVal = addr[1].split("=");
	storeNo = addrVal[1];
	console.log("storeNo=" + storeNo);
	oldData = {};
	figureId = "";
	//轮播图查询
	$('.bannerModify').click(function () {
		qureyFigure()
	})

	//左侧导航切换
	$('.figureModify').on('click', "li", function () {
		if ($(this).hasClass("active")) {
			return false;
		} else {
			$('.figureModifyList').removeClass('active')
			$(this).addClass('active')
			//			console.log($(this).data('figureid'))
			var data = {
				storeNo: storeNo,
				figureId: $(this).data('figureid')
			}
			//			console.log(data)
			$.ajax({
				type: "post",
				url: "http://47.101.136.194:8089/queryCarouselFigure",
				contentType: "application/json",
				data: JSON.stringify(data),
				async: true,
				success: function (res) {
					//					console.log(res)
					if (res.rspCode == 00000) {
						//查询结果后赋值
						var cnClassLogoClassify = "<div><img src=" + res.data[0].cnFigureAddress + " /><a href='javascript:void(0);' class='btn delBtn'>删除</a></div>"
						$('#ossfile2').empty().append(cnClassLogoClassify)
						$('#container2').addClass('dn')
						// var usClassLogoClassify = "<div><img src=" + res.data[0].usFigureAddress + " /><a href='javascript:void(0);' class='btn delBtn'>删除</a></div>"
						// $('#ossfile3').empty().append(usClassLogoClassify)
						$('#container3').addClass('dn')
						$('.childRight select[name="indexNo"]').val(res.data[0].indexNo)
						figureId = res.data[0].figureId;
						oldData = {
							figureId: res.data[0].figureId,
							cnFigureAddress: res.data[0].cnFigureAddress,
							// usFigureAddress: res.data[0].usFigureAddress,
							indexNo: res.data[0].indexNo,
							storeNo: res.data[0].storeNo,
						}
					} else {
						showZhezhaoMsg(res.cnErrorMsg)
					}
				}
			});
		}
	})
	//删除轮播图
	$('.figureDeleteBtn').click(function () {
		//		console.log(figureId)
		hideZhezhao2()
		$.ajax({
			type: "delete",
			url: "http://47.101.136.194:8089/removeCarouselFigure/" + figureId,
			async: true,
			success: function (result) {
				//	   			console.log(result)
				if (result.rspCode == 00000) {
					showZhezhaoMsg('删除成功！');
					qureyFigure()
				} else {
					showZhezhaoMsg(result.cnErrorMsg)
				}
			},
			error: function (xhr) {
				console.log(xhr)
			}
		});
	})
})

//增加轮播图
function bannerFrom(form) {
	if (!$('#ossfile>div>img').attr("src")) {
		showZhezhaoMsg('请上传轮播图片(中文)！');
	} else {
		var data = {
			cnFigureAddress: $('#ossfile>div>img').attr("src"),
			// usFigureAddress: $('#ossfile1>div>img').attr("src"),
			indexNo: form.indexNo.value,
			storeNo: storeNo,
		}
		//		console.log(data)
		$.ajax({
			type: "post",
			url: "http://47.101.136.194:8089/saveCarouselFigure",
			contentType: "application/json",
			data: JSON.stringify(data),
			async: true,
			success: function (res) {
				//				console.log(res)
				if (res.rspCode == 00000) {
					showZhezhaoMsg('添加轮播图成功！');
					$('#addAdvertisement')[0].reset();
					$('#ossfile>div,#ossfile1>div').remove();
					$('#container,#container1').removeClass('dn');
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
//修改轮播图
function adModity(form) {
	if (!$('#ossfile2>div>img').attr("src")) {
		showZhezhaoMsg('请上传轮播图片(中文)！');
	} else {
		var data = {
			figureId: figureId,
			cnFigureAddress: $('#ossfile2>div>img').attr("src"),
			// usFigureAddress: $('#ossfile3>div>img').attr("src"),
			indexNo: parseInt(form.indexNo.value),
			storeNo: storeNo,
		}
		//		console.log(data)
		//		console.log(oldData)
		var isEqual = cmp(oldData, data);
		if (isEqual) {
			showZhezhaoMsg('您没有做任何修改！');
		} else {
			$.ajax({
				type: "post",
				url: "http://47.101.136.194:8089/modifyCarouselFigure",
				contentType: "application/json",
				data: JSON.stringify(data),
				async: true,
				success: function (res) {
					//					console.log(res)
					if (res.rspCode == 00000) {
						showZhezhaoMsg('修改轮播图成功！');
						qureyFigure()
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
}
//查询轮播图
function qureyFigure() {
	var data = {
		storeNo: storeNo
	}
	$.ajax({
		type: "post",
		url: "http://47.101.136.194:8089/queryCarouselFigure",
		contentType: "application/json",
		data: JSON.stringify(data),
		async: true,
		success: function (res) {
			//			console.log(res)
			if (res.rspCode == 00000) {
				if (res.data.length > 0) {
					var elemFigureList = "";
					for (var i = 0; i < res.data.length; i++) {
						elemFigureList +=
							'<li class="figureModifyList" data-figureid ="' + res.data[i].figureId + '">轮播图片' + (i + 1) + '</li>'
					}
					//					console.log(elemFigureList)
					$('.figureModifyList').remove()
					$('.figureModify').append(elemFigureList)
					$('.figureModifyList').eq(0).addClass('active')
					//查询结果后赋值
					var cnClassLogoClassify = "<div><img src=" + res.data[0].cnFigureAddress + " /><a href='javascript:void(0);' class='btn delBtn'>删除</a></div>"
					$('#ossfile2').empty().append(cnClassLogoClassify)
					$('#container2').addClass('dn')
					// var usClassLogoClassify = "<div><img src=" + res.data[0].usFigureAddress + " /><a href='javascript:void(0);' class='btn delBtn'>删除</a></div>"
					// $('#ossfile3').empty().append(usClassLogoClassify)
					$('#container3').addClass('dn')
					$('.childRight select[name="indexNo"]').val(res.data[0].indexNo)
					figureId = res.data[0].figureId;
					oldData = {
						figureId: res.data[0].figureId,
						cnFigureAddress: res.data[0].cnFigureAddress,
						// usFigureAddress: res.data[0].usFigureAddress,
						indexNo: res.data[0].indexNo,
						storeNo: res.data[0].storeNo,
					}
				} else {
					showZhezhaoMsg('暂无轮播图，请添加！');
				}
			} else {
				showZhezhaoMsg(res.cnErrorMsg)
			}
		}
	});
}
//比较字段
cmp = function (x, y) {
	// If both x and y are null or undefined and exactly the same 
	if (x === y) {
		return true;
	}

	// If they are not strictly equal, they both need to be Objects 
	if (!(x instanceof Object) || !(y instanceof Object)) {
		return false;
	}

	//They must have the exact same prototype chain,the closest we can do is
	//test the constructor. 
	if (x.constructor !== y.constructor) {
		return false;
	}

	for (var p in x) {
		//Inherited properties were tested using x.constructor === y.constructor
		if (x.hasOwnProperty(p)) {
			// Allows comparing x[ p ] and y[ p ] when set to undefined 
			if (!y.hasOwnProperty(p)) {
				return false;
			}

			// If they have the same strict value or identity then they are equal 
			if (x[p] === y[p]) {
				continue;
			}

			// Numbers, Strings, Functions, Booleans must be strictly equal 
			if (typeof (x[p]) !== "object") {
				return false;
			}

			// Objects and Arrays must be tested recursively 
			if (!Object.equals(x[p], y[p])) {
				return false;
			}
		}
	}

	for (p in y) {
		// allows x[ p ] to be set to undefined 
		if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
			return false;
		}
	}
	return true;
};