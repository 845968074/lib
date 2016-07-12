 $(function(){
      // 循环轮播到某个特定的帧 
      $(".slide-one").click(function(){
         $("#myCarousel").carousel(0);
      });
      $(".slide-two").click(function(){
         $("#myCarousel").carousel(1);
      });
      $(".slide-three").click(function(){
         $("#myCarousel").carousel(2);
      });
      $('.typeahead').typeahead();

      isRemember();
      $('#submit').click( function () {
        if ($('#username')[0].value!= '' && $('#password')[0].value!= '') {
                $.ajax({
                   url: 'http://api.xiyoumobile.com/xiyoulibv2/user/login',
                   type: 'get',
                   dataType: 'jsonp',
                   data: {username: $('#username')[0].value,
                              password:$('#password')[0].value}
                })
                .done(function (returnData) {
                  var Session=returnData.Detail;
                  if(Session=='ACCOUNT_ERROR'){
                     window.location.href="index.html";
                     alert('该用户不能登录哦(⊙o⊙)');
                  }
                  else
                  window.location.href = "main.html?session=" + Session;
                  
                }
                   
                )
                .fail(function() {
                   alert("error");
                })
        } else {
            alert('亲，用户名密码不能为空哦！');
        }
    });
/**cookie相关的函数**/
    /*判断是否记住了密码*/
    function isRemember() {
        if ($.cookie("check") == "true") {
            $("#loginkeeping").attr("checked", true);
            $("#username").val($.cookie("username"));
            $("#password").val($.cookie("password"));
        }
    }

    /*看是否记住密码若记住则保存*/
    function saveUserInfo() {
        if ($("#loginkeeping").is(':checked')) {
            var username = $("#username").val();
            var password = $("#password").val();
            $.cookie("rmbUser", "true", { expires: 7 }); // 存储一个带7天期限的 cookie
            $.cookie("username", username, { expires: 7 }); // 存储一个带7天期限的 cookie
            $.cookie("password", password, { expires: 7 }); // 存储一个带7天期限的 cookie
        }
        else {
            $.cookie("rmbUser", "false", { expires: -1 });
            $.cookie("username", '', { expires: -1 });
            $.cookie("password", '', { expires: -1 });
        }
    }

    $('#ok').click(function(){
             $('#resultBox').html('');
             var text=$('#searchBox')[0].value;
             if(!text){
                      alert('搜索内容不能为空哦~');
             }else{

             $.ajax({
               url: 'http://api.xiyoumobile.com/xiyoulibv2/book/search',
               type: 'GET',
               dataType: 'jsonp',
               data: {keyword: text,
                          matchMethod:'qx',
                          images:'1'},
             })
             .done(function(returnData1) {
               
               if(returnData1.Result=='false'){
                      alert('搜索失败/(ㄒoㄒ)/~~');
               }else{
                var arr=returnData1.Detail.BookData;
                if(arr==null||arr==undefined){
                  alert('无搜索结果！');
                }else{


                if(arr||arr.length!=null){


                      for(var i=0;i<arr.length;i++){
                          $('#resultBox').append('<div class="small"><a class="title" href="details.html?id='+arr[i].ID+'">《'+arr[i].Title+'》</a><p>作者:'+arr[i].Author+'</p><p>出版社：'+arr[i].Pub+'</p></div>');
             }
             }
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


    });

});