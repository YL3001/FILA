require(["config"],function(){
	require(["jquery","template","footer","header"],function($,template,footer,header){
		new Promise(function(resolve, reject){
			$("header").load("/html/component/header.html", function(){
				header.head();
				resolve();
			});
			$("footer").load("/html/component/footer.html", function(){
				footer.ft();
			});
		}).then(function(){
			var obj = {};
			var str = $.cookie("username");
			console.log(str);
			var username = ["username",str];
			obj[username[0]] = username[1];
			if(!str){
				$(".content").addClass("ac");
			}else{
				$.ajax({
					url:"http://localhost/FILAserver/api/car.php",
					method:"POST",
					data:obj,
					dataType:"json",
					success: function(res){
						console.log(res);
						for(var i = 0; i < res.products.length; i++){
							res.products[i].img = res.products[i].img.split(",");
							//console.log(res.products[i].img);
						}
						if(res.code === 1){
							var str = template("car-template",{products: res.products});
							console.log(str);
							$("#tbody").html(str);
							var num = 0;
							var allPrice = 0;
							
							$.each( res.products, function(i, n){
							  console.log(n.num);
							  n.num = parseInt(n.num);
							  n.price = parseInt(n.price);
							  num +=n.num;
							  allPrice += n.num * n.price;
							});
							console.log(num);
							if(num===0){
								$(".nopro").addClass("ac");
							}else{
								$(".container").addClass("ac");
								console.log(allPrice);
								$("#all-num").prepend ("<span>"+num+"</span>");
								$("#all-price").append ("<span>"+allPrice+"</span>");
								$(".all-pay").append ("<span>"+allPrice+"</span>");
									
							}
						}
					}
				})
			}
		}).then(function(){
			tbody.onclick = function(e){
				e = e || event;
				var target = e.target || e.srcElement;
				var tr = target.parentNode.parentNode;
				if(target.className === "delBtn"){
					var id = tr.firstElementChild.innerHTML;
					console.log(id);
					$.ajax({
						url:"http://localhost/FILAserver/api/delete.php",
						data:{id},
						method:"GET",
						dataType:"json",
						success: function(res){
							console.log(res);
							if(res.code === 1){
								alert("删除成功！！");
								window.location.reload();
							}else{
								alert("删除失败！");
							}
						}
					})
				}else if(target.className === "btn-default"){
					var id = tr.firstElementChild.innerHTML;
					var nInput = $("input",tr)[0];
					var num = nInput.value;
					console.log(id,num);
					if(num>1){
						num--;
						$.ajax({
							url:"http://localhost/FILAserver/api/update.php",
							data:{id,num},
							method:"GET",
							dataType:"json",
							success: function(res){
								console.log(res);
								if(res.code === 1){
									alert("更新成功！");
									window.location.reload();
								}
							}
						})
					}
				}else if(target.className === "btn-add"){
					var id = tr.firstElementChild.innerHTML;
					var nInput = $("input",tr)[0];
					var num = nInput.value;
					console.log(id,num);
					num++;
					$.ajax({
						url:"http://localhost/FILAserver/api/update.php",
						data:{id,num},
						method:"GET",
						dataType:"json",
						success: function(res){
							console.log(res);
							if(res.code === 1){
								alert("更新成功！");
								window.location.reload();
							}
						}
					})
				}
			}
		})
	})
})

