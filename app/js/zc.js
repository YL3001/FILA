require(["config"],function(){
	require(["jquery","gVerify","footer","header","jquerycookie"],function($,gVerify,footer,header){
		new Promise(function(resolve, reject){
			$("header").load("/html/component/header.html", function(){
				header.head();
				resolve();
			});
			$("footer").load("/html/component/footer.html", function(){
				footer.ft();
			});
		}).then(function(){
			var verifyCode = new GVerify("v_container");
			var regname = /^\w{1,}$/;
			var regpwd = /^.{6,}$/;
			
			$("form").on("submit", function(e){	
				var name = $("#login_name").val(),
					pwd1 = $("#login_password").val(),
					pwd2 = $("#psw_confirm").val(),
					yzm = verifyCode.validate($("#img_vcode").val());
				if(regname.test(name)){
					if(regpwd.test(pwd1)){
						if(pwd1==pwd2){
							if(yzm){
								var data = {
									username:name,
									password:pwd1
								};
								console.log(data);
								$.ajax({
									url:"http://localhost/FILAserver/api/zc.php",
									data:data,
									method:"POST",
									dataType:"json",
									success: function(res){
										console.log(res);
										if(res.code === 1){
											alert("注册成功！");
											location.href = "http://localhost:3001/index.html";
										}else{
											alert("注册失败！");
										}
									}
								})
							}else{
								alert("验证码错误");
							}
						}else{
							alert("两次密码输入不一致");
						}
					}else{
						alert("密码要在6位以上");
					}
				}else{
					alert("用户名格式不正确！");
				}
				e.preventDefault();
			});
		})
	
	})
})

