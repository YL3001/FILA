require(["config"],function(){
	require(["jquery","template","footer","header","jquerycookie"],function($,template,footer,header){
		new Promise(function(resolve,reject){
			$("header").load("/html/component/header.html", function(){
				header.head();
			});
			$("#nav").load("/html/component/nav.html", function(){
				resolve();
			});
			$("footer").load("/html/component/footer.html", function(){
				footer.ft();
			});
		}).then(function(){
			var str = location.search.slice(1);
			var arr = str.split("=");
			var obj = {};
			obj[arr[0]] = arr[1];
			console.log(obj);
			if(obj[arr[0]]==="man" || obj[arr[0]]==="woman" || obj[arr[0]]==="children"){
				$.ajax({
					url:"http://localhost/FILAserver/api/list.php",
					data:obj,
					method:"POST",
					dataType:"json",
					success: function(res){
						console.log(res);
						for(var i = 0; i < res.products.length; i++){
							console.log(res.products[i]);
							res.products[i].img = res.products[i].img.split(",");
						}
						if(res.code === 1){
							var html = template("pro-template",{products: res.products});
							console.log(html);
							$("#proList").html(html);
						}
					}
				})
			}
			if(obj[arr[0]]==="rap"){
				$.ajax({
					method:"get",
					url:"http://rap2api.taobao.org/app/mock/116609/products",
					success:function(res){
						console.log(res);
						for(var i = 0; i < res.products.length; i++){
							console.log(res.products[i]);
							res.products[i].img = res.products[i].img.split(",");
						}
						var html = template("pro-template",{products: res.products});
						console.log(html);
						$("#proList").html(html);
					}
				});
			}
			$.cookie("kind",obj[arr[0]],{
				path:"/"
			})
			
						
			
		})
	})
})
