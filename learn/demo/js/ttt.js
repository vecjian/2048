<script type="text/javascript">
//
//1、点击单元格：
//    1)、出现文本框（创建）
//    2)、把单元格里的内容显示在文本框里
	function edit(tdDom){
		//1、让span消失
		tdDom.firstElementChild.style.display="none";
		//2、让文本框显示(先把文本框作为当前td的孩子)；
		var txtDom = document.getElementById("txtId");
		tdDom.appendChild(txtDom);
		txtDom.style.display="block";

		//3、span的innerHTML赋给文本框的value
		txtDom.value = tdDom.firstElementChild.innerHTML;
		txtDom.focus();//获得焦点
	}




//2、当光标离开文本框：
//    1）、把文本框的内容显示在单元格里
//    2)、把文本框删除掉；


	function save(txtDom){
		//1、让span显示
		txtDom.previousElementSibling.style.display="block";
		//2、让文本框消失
		txtDom.style.display="none";

		//3、文本框的value赋给span的innerHTML
		txtDom.previousElementSibling.innerHTML=txtDom.value;
	}


	window.onload = function(){
		//给需要编辑的单元格增加onclick事件
		var tbody = document.getElementById("t").firstElementChild;
		var trs = tbody.children;
		for(var i=1;i<trs.length;i++){
			for(var j=0;j<trs[i].children.length-2;j++){
				trs[i].children[j].onclick = function(){
				edit(this);//this是td。
			}
		}
	}

}


</script>