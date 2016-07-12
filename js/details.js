$(function(){
	function getUrlParam(name) {
    	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    	if (r != null) return unescape(r[2]);
    	return null; //返回参数值
	}
	var Session=getUrlParam('session');
	var barcode=getUrlParam('barcode');
	var id=getUrlParam('id');

	if(barcode){

	$('#back').click(function(){
		window.location.href='main.html?session='+Session;
	})
	$.ajax({
		url: 'http://api.xiyoumobile.com/xiyoulibv2/book/detail/barcode/'+barcode,
		type: 'GET',
		dataType: 'jsonp',
		data: {barcode: barcode}
	})
	.done(function(returnData) {
		var title = returnData.Detail.Title;//书名
            		var sort = returnData.Detail.Sort;//图书馆索书号
           	 	var author = returnData.Detail.Author;//作者
            		var isbn = returnData.Detail.ISBN;//标准号
            		var Pub = returnData.Detail.Pub;//出版社
            		var id = returnData.Detail.ID;//图书馆内控制号
            		var Pages = returnData.Detail.Form;//书的页数
            		
            		var favTimes = returnData.Detail.FavTimes;//收藏次数
            		var subject = returnData.Detail.Subject;//主题分类
            		var total = returnData.Detail.Total;//藏书总数
            		var rentTimes = returnData.Detail.RentTimes;//数
            		var available = returnData.Detail.Available;//可借书数
            		var browseTimes = returnData.Detail.BrowseTimes;//可借书数
            		var Summary = returnData.Detail.Summary;//图书摘要

            		/*豆瓣信息*/
            		var img=returnData.Detail.DoubanInfo.Images.medium;//图片
            		var price=returnData.Detail.DoubanInfo.Price;//价格
		if(returnData.Result){
			if(returnData.Detail.DoubanInfo!=null){
				if(!img){
					img='images/no picture.jpg';
				}
				if(!Summary){
					Summary='暂无';
				}
				$('#book_detail').html('<img src="'+img+'"><p class="book_param">'+title+'</p><h4>基本信息</h4><p class="book_param det">索书号：'+sort+'</p><p class="book_param det">标准号：'+isbn+'</p><p class="book_param">作者：'+author+'</p><p class="book_param">出版社：'+Pub+'</p><p class="book_param">总页数：'+Pages+'</p><h4>图书简介</h4><p class="book_param">'+Summary+'</p><h4>流通情况</h4><p class="lt">藏书数量：<span class="blue">'+total+'</span></p><p class="lt">可借数量：<span class="blue">'+available+'</span></p><p class="lt">借阅次数：<span class="blue">'+rentTimes+'</span></p><p class="lt">收藏次数：<span class="blue">'+favTimes+'</span></p>');
			}
		}
		
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	}else if(id){
		$('#back').click(function(){
		window.location.href='index.html';
	})
		$.ajax({
			url: 'http://api.xiyoumobile.com/xiyoulibv2/book/detail/id/'+id,
			type: 'GET',
			dataType: 'jsonp',
			data: {id: id},
		})
		.done(function(returnData) {
		var title = returnData.Detail.Title;//书名
            		var sort = returnData.Detail.Sort;//图书馆索书号
           	 	var author = returnData.Detail.Author;//作者
            		var isbn = returnData.Detail.ISBN;//标准号
            		var Pub = returnData.Detail.Pub;//出版社
            		var id = returnData.Detail.ID;//图书馆内控制号
            		var Pages = returnData.Detail.Form;//书的页数
            		
            		var favTimes = returnData.Detail.FavTimes;//收藏次数
            		var subject = returnData.Detail.Subject;//主题分类
            		var total = returnData.Detail.Total;//藏书总数
            		var rentTimes = returnData.Detail.RentTimes;//数
            		var available = returnData.Detail.Available;//可借书数
            		var browseTimes = returnData.Detail.BrowseTimes;//可借书数
            		var Summary = returnData.Detail.Summary;//图书摘要
            		
		if(returnData.Result){
			if(returnData.Detail.DoubanInfo!=null){
				if(!Summary){
					Summary='暂无';
				}
				$('#book_detail').html('<p class="book_param">'+title+'</p><h4>基本信息</h4><p class="book_param det">索书号：'+sort+'</p><p class="book_param det">标准号：'+isbn+'</p><p class="book_param">作者：'+author+'</p><p class="book_param">出版社：'+Pub+'</p><p class="book_param">总页数：'+Pages+'</p><h4>图书简介</h4><p class="book_param">'+Summary+'</p><h4>流通情况</h4><p class="lt">藏书数量：<span class="blue">'+total+'</span></p><p class="lt">可借数量：<span class="blue">'+available+'</span></p><p class="lt">借阅次数：<span class="blue">'+rentTimes+'</span></p><p class="lt">收藏次数：<span class="blue">'+favTimes+'</span></p>');
			}else{
				$('#book_detail').html('<p class="book_param">'+title+'</p><h4>基本信息</h4><p class="book_param det">索书号：'+sort+'</p><p class="book_param det">标准号：'+isbn+'</p><p class="book_param">作者：'+author+'</p><p class="book_param">出版社：'+Pub+'</p><p class="book_param">总页数：'+Pages+'</p><h4>图书简介</h4><p class="book_param">'+Summary+'</p><h4>流通情况</h4><p class="lt">藏书数量：<span class="blue">'+total+'</span></p><p class="lt">可借数量：<span class="blue">'+available+'</span></p><p class="lt">借阅次数：<span class="blue">'+rentTimes+'</span></p><p class="lt">收藏次数：<span class="blue">'+favTimes+'</span></p>');
			}
		}
		
	})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	}
	else{
		alert('无法查看图书详情！');
	}
	

})