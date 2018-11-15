require(["config"],function(){
	require(["jquery","footer","header","jquerycookie"],function($,footer,header){
		
		new Promise(function(resolve, reject){
			$("header").load("/html/component/header.html", function(){
				header.head();
				resolve();
			});
			$("footer").load("/html/component/footer.html", function(){
				footer.ft();
			});
		}).then(function(){
			$("form").submit(function(e){
				//构造请求携带的参数
				var data = {
					username: $("#name").val(),
					password: $("#pwd").val()
				};

				$.ajax({
					method:"post",
					data: data,
					dataType:"json",
					url:"http://localhost/FILAserver/api/login.php",
					success: function(res){
						console.log(res);
						if(res.code === 1){
							//document.cookie = "login=true;path=/"; //使用cookie记录登录状态
							$.cookie("username",data.username,{
								path:"/"
							})
							alert("登录成功！！");
							location.href = "http://localhost:3001/index.html";
						}else{
							alert("用户名或者密码错误");
						}
					}
				})

				e.preventDefault();
			})

		})
	
	})
})