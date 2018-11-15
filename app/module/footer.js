define(["jquery"],function($){
	function Footer(){}
	Footer.prototype.ft = function(){
		$("#ft-weixin").hover(
			function(){
				$("#ft-weixin-tip").css({"display":"block"});
			},
			function(){
				$("#ft-weixin-tip").css({"display":"none"});
			}
		)
	}
	return new Footer();
})