define(["jquery"],function($){
	function Addcar(){}
	Addcar.prototype.add = function(){
		var str = location.search.slice(1);
		var arr = str.split("="); 
		var obj = {};
		obj[arr[0]] = arr[1];
		var str = document.cookie;
		var arr = str.split("; ");
		var username = arr[0].split("=");
		var kind = arr[1].split("=");
		obj[username[0]] = username[1];
		obj[kind[0]] = kind[1];
		if(obj[kind[0]]==="man" || obj[kind[0]]==="woman" || obj[kind[0]]==="children"){
			$.ajax({
				url:"http://localhost/FILAserver/api/detail.php",
				data: obj,
				method:"POST",
				dataType:"json",
				success: function(res){
					console.log(res);
					res.product.color = res.product.color.split(" ");
					res.product.color=res.product.color[0];
					if(res.code === 1){
						var data = jQuery.extend(res.product,obj);
						$.ajax({
							url:"http://localhost/FILAserver/api/addcar.php",
							data:data,
							method:"POST",
							dataType:"json",
							success: function(res){
								console.log(res);
								if(res.code === 1){
									alert("添加成功！");
								}else{
									alert("添加失败！");
								}
							}
						})
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
						var data = jQuery.extend(res.products[0],obj);
						$.ajax({
							url:"http://localhost/FILAserver/api/addcar.php",
							data:data,
							method:"POST",
							dataType:"json",
							success: function(res){
								console.log(res);
								if(res.code === 1){
									alert("添加成功！");
								}else{
									alert("添加失败！");
								}
							}
						})
					}
				}
			});
		}
	}
	return new Addcar();
})