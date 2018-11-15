require(["config"],function(){
	require(["jquery","tools","footer","header"],function($,tools,footer,header){
		
		new Promise(function(resolve, reject){
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
			$(function(){
				var $ul = $("#lbt ul"),
					$imgs = $("#lbt ul li");
					
				var index = 0,
					len = $imgs.length,
					flag = false,
					timer = null,
					imgWidth = $imgs.eq(0).width();
					
				$imgs.each(function(){
					$("<li>").html($(this).index()+1);
				});
				$imgs.eq(0).clone(true).appendTo($ul);
				$ul.css("width", imgWidth*(len+1));
				
				$("#lbt").hover(function(){
					clearInterval(timer);
				},(function autoPlay(){
					timer = setInterval(function(){
						if(!flag){
							flag = true;
							if(++index >= len){
								$ul.animate({"left":-len*imgWidth},"slow",function(){
									$ul.css("left", 0);
									//$ul.css({"left": 0});
									flag = false;
								})
								index = 0;
							}else{
								$ul.animate({"left":-index*imgWidth},"slow", function(){
									flag = false;
								})
							}
						}
					},2000);
					return autoPlay;
				})());
			})

		})
	
	})
})

