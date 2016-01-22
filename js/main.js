 $(function(){
 	function getUrlParam(name) {
    	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    	if (r != null) return unescape(r[2]);
    	return null; //返回参数值
	}
	var Session = getUrlParam("session");
	var returnData=returnData;
	var rent=0;//借书数
	var all;//可借书数
	var ctime;//可借书时长
	var outnum=0;//超时书数
	/*var v1=window.location.pathname;
		var a=v1.substr(v1.lastIndexOf("/")+1);*/
	$.ajax({
		url: 'http://api.xiyoumobile.com/xiyoulibv2/user/info',
                   	type: 'get',
                   	dataType: 'jsonp',
		data: {session: Session}
	})
	.done(function(returnData1) {
		//可借书总数
    		switch (returnData1.Detail.ReaderType) {
       			 case '本科生': all = 15;ctime=30;break;
       			 case '研究生':all=20;ctime=45;break;
       			 case '老师': all = 30;ctime=60; break;
        			 default : all = 15;ctime=30;
    			}
		$('#sname').html(returnData1.Detail.Department+'&nbsp;'+returnData1.Detail.Name);
		$('#user_body').html('图书证号：'+returnData1.Detail.ID+'<br>姓名：'+returnData1.Detail.Name+'<br>用户类别：'+returnData1.Detail.ReaderType+'<br>专业班级：'+returnData1.Detail.Department+'<br>欠费金额：'+returnData1.Detail.Debt+'元');
	})
	.fail(function() {
		console.log("失败了/(ㄒoㄒ)/~~");
	})

	$.ajax({
		url: 'http://api.xiyoumobile.com/xiyoulibv2/user/rent',
		type: 'GET',
		dataType: 'jsonp',
		data: {session: Session}
	})
	.done(function(returnData) {
		if(returnData.Detail){
			if(returnData.Detail=='NO_RECORD'||returnData.Detail==null||returnData.Detail==''||returnData.Detail==undefined){
				rent=0;
			}
			else{
				rent=returnData.Detail.length;
				var Dates=returnData.Detail;
				var oDate=new Date();
				$.each(Dates,function(i){
				var d1 = new Date(Date.parse(Dates[i].Date));
				if(returnData.Detail[i].CanRenew==false){
					$('#bnum').append('<div class="panel panel-default book_detail"><div class="panel-heading heading"></div><div class="panel-body book_rent_list"><a class="book_detail" href="details.html?barcode='+returnData.Detail[i].Barcode+'&session='+Session+'">'+returnData.Detail[i].Title+'</a><br><span class="danger" id="showtime">到期时间：'+returnData.Detail[i].Date+'</span><br><span class="renew">'+returnData.Detail[i].State+'</span></div></div>');
				}else{
					$('#bnum').append('<div class="panel panel-default book_detail"><div class="panel-heading heading"></div><div class="panel-body book_rent_list"><a class="book_detail" href="details.html?barcode='+returnData.Detail[i].Barcode+'&session='+Session+'">'+returnData.Detail[i].Title+'</a><br><span class="danger" id="showtime">到期时间：'+returnData.Detail[i].Date+'</span><br><span class="renew_yes" >我要续借</span></div></div>');
					var every=returnData.Detail[i];
					var barcode=every.Barcode;					
					var Department_id=every.Department_id;
					var Library_id=every.Library_id;

					$('.renew_yes').click(function(returnData){
						$.ajax({
							url: 'http://api.xiyoumobile.com/xiyoulibv2/user/renew',
							type: 'get',
							dataType: 'jsonp',
							data: {session: Session,
								barcode:barcode,
								department_id:Department_id,
								library_id:Library_id},
						})
						.done(function(returnData2) {
							if(returnData2.Result=='true'){
								alert('续借成功！新的还书日期为'+returnData2.Detail);
							}
							else{
								alert('续借失败！');
							}
						})
						.fail(function() {
							console.log("error");
						})
						.always(function() {
							console.log("complete");
						});
					
					});
					
				}
				
				if(oDate>d1){
					outnum++;
				}
				})
			}}
		$('#main_body').html('<table><tbody><tr><td>已借图书：<span class="info">'+rent+'</span>本</td><td>剩余可借：<span class="success">'+(all-rent)+'</span>本</td></tr><tr><td>共可借书：<span class="warning">'+all+'</span>本</td><td>超期图书：<span class="danger">'+  outnum+  '</span>本</td></tr></tbody></table>');
		
		//借书信息
		
		

	})
	.fail(function() {
		console.log("error");
	})
		
	
	
	
	$('#detail').click(function(){
		 window.location.href = "user.html?session=" + Session;
	})
	$('#back').click(function(){
		window.location.href = "main.html?session=" + Session;
	})
	$('#exit').click(function(){
		window.location.href="index.html";
	})
	
	



});