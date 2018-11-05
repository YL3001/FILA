require(["config"],function(){
	require(["jquery","tools","move","nav"],function($,tools,move,nav){
		
		tools.ajax("GET","/html/component/header.html",null,function(data){
			document.getElementsByTagName("header")[0].innerHTML = data;
		},false);
		
		new Promise(function(resolve, reject){
			tools.ajax("GET", "/html/component/nav.html",null, function(data){
				document.getElementsByClassName(nav).innerHTML = data;
				resolve();
			},false);
		}).then(function(){
			nav.cnav();
		})
		
		
		var lub = function(){
			var box = tools.$("#lbt"),
				ul = tools.$("ul",box)[0],
				aLi =ul.children,
				len = aLi.length;
				liWidth = aLi[0].offsetWidth,
			    timer = null,
				index = 0,
				flag = false;
				
			ul.appendChild(aLi[0].cloneNode(true));
			ul.style.width = liWidth * (len+1) + "px";
			
			box.onmouseleave = (function autoPlay(){
				timer = setInterval(function(){
					if(!flag){
						flag = true;
						index++;
						//判断边界
						if(index === len){
							//index作为下标不能超出len-1,所以重置为0
							//但是，ul会移动到len的位置（追加的那一张图）
							index = 0;
							move(ul, {left:-len*liWidth},function(){
								flag = false;
								//运动结束之后立马拉回第0张图的位置
								ul.style.left = "0px";
							});
						}else{
							move(ul,{left: -index*liWidth},function(){
								flag = false;
							})
						}
					}
				},3000);
				return autoPlay;
			})();
			
			box.onmouseenter = function(){
				clearInterval(timer);
			}
		}
		var wx = tools.$("#ft-weixin");
		var ewm = tools.$("#ft-weixin-tip");
		wx.onmouseenter = function(){
			ewm.style.display = "block";
		}
		wx.onmouseleave = function(){
			ewm.style.display = "none";
		}
		lub();
	})
})

