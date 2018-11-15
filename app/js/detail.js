require(["config"],function(){
	require(["jquery","template","bootstrap","footer","header","addcar"],function($,template,bootstrap,footer,header,addcar){
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
			console.log(obj[arr[0]]);
			var str = $.cookie("kind");
			console.log(str);
			var kind = ["kind",str];
			console.log(kind);
			obj[kind[0]] = kind[1];
			console.log(obj);
			if(obj[kind[0]]==="man" || obj[kind[0]]==="woman" || obj[kind[0]]==="children"){
				$.ajax({
					url:"http://localhost/FILAserver/api/detail.php",
					data: obj,
					method:"POST",
					dataType:"json",
					success: function(res){
						console.log(res);
						res.product.img = res.product.img.split(",");
						console.log(res.product.img);
						res.product.color = res.product.color.split(" ");
						console.log(res.product.color);
						console.log(res.product);
						if(res.code === 1){
							var str = template("detil-template",{product: res.product});
							$("#detail").html(str);
							console.log(str);
						}
					}
				})
			}
			if(obj[kind[0]]==="rap"){
				$.ajax({
					data:obj,
					method:"get",
					url:"http://rap2api.taobao.org/app/mock/116609/products",
					success:function(res){
						console.log(res);
						console.log(res.products);
						console.log(res.products[0]);
						if(res.code === 1){
							var str = template("rap-template",{product: res.products});
							$("#detail").html(str);
						}
					}
				});
			}
		}).then(function(){
			$("body").delegate("#buy","click",function(){
				addcar.add();
				location.href = "http://localhost:3001/html/car.html";
			});
			$("body").delegate("#car","click",function(){
				addcar.add();
			});
		})
	})
})
