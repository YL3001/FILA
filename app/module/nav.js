define([],function(){
	function Nav(){}
	Nav.prototype.cnav = function(){
		var aList = document.querySelectorAll(".nav-list h4"); 
		var aHide = document.querySelectorAll(".hide");
		var lastIndex = 0;
		for(var i = 0; i < aList.length;i++){
			aList[i].index = i;
			aList[i].isClick = false;
			aList[i].onclick = function(){
				if(this.isClick){
					aHide[this.index].style.height = "0";
					this.isClick = false;
				}else{
					aHide[lastIndex].style.height = "0";
					aHide[this.index].style.height = "auto";
					lastIndex = this.index;
					this.isClick = true;
				}
			}
		}
	}
	return new Nav();
})