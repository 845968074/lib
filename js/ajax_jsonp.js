//jsonp简单封装
function getJSONP(op) {
	var _this = arguments.callee;
	if (!_this.count) {
		_this.count = 0;
	}
	var option = {
		//action地址
		url: "",
		//参数
		querystring: "",
		//callback 函数名,支持自动生成
		callbackName: "jsonp" + (++_this.count),
		//callback attr 调用 callback的 querystring变量 例如 callback = a,后端部分则是 a({...})
		callbackQueryAttr: "callback",
		//成功时callback
		success: function() {},

		//失败时callback
		error: function() {}
	};
	if (!op) {
		op = {};
	}
	typeof op.url == "string" ? option.url = op.url : "";
	typeof op.querystring == "string" ? option.querystring = op.querystring : "";
	typeof op.callbackName == "string" ? option.callbackName = op.callbackName : "";
	typeof op.callbackQueryAttr == "string" ? option.callbackQueryAttr = op.callbackQueryAttr : "";
	typeof op.success == "function" ? option.success = op.success : "";
	typeof op.error == "function" ? option.error = op.error : "";
	var dc = document,
		url = option.url + (option.url.split("?").length > 1 ? "&" : "?") + option.querystring + "&" + option.callbackQueryAttr + "=" + option.callbackName,
		callback = option.success,
		script,
		dFragment = dc.createDocumentFragment();
	script = dc.createElement("script");
	script.type = "text/javascript";
	window[option.callbackName] = function(data) {
		try {
			option.success(data);
		} catch (err) {
			option.error();
		} finally {
			dFragment.appendChild(script);
			//script.parentNode.remove(script); 使用这种方式移除script在某些情况下会令到ie6崩溃，故在这里不建议使用
			window[option.callbackName] = null;
		}
	};
	script.src = url;
	dc.getElementsByTagName("head")[0].appendChild(script);
};

/*//调用jsonp示例
 getJSONP({
 url: "http://10.12.12.233:8888/sugg/",
 querystring: "reqtype=card_suggestion&querystr=baidu&num=5",
 success: function (res) {
 alert(res);
 }
 });*/