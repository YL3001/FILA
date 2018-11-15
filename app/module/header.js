define(["jquery","jquerycookie"],function($){
	function Header(){}
	Header.prototype.head = function(){
		var str = $.cookie("username");
		console.log(str);
		if(str){
			$(".d_wrap").addClass("ac1");
			$(".a_wrap").addClass("ac2");
			$(".ac2").append ("<span>"+"您好， "+str+"</span>"+"<a id='logout' href='javascript:;'>"+"退出"+"</span>");
			$("#logout").on("click",function(){
				$.cookie("username","",{
					expires: -1,
					path:"/"
				});
				$(".d_wrap").removeClass("ac1");
				$(".a_wrap").removeClass("ac2");
				window.location.reload();
			})
		}
		
	}
	return new Header();
})