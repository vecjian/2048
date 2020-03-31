
// 全局变量
var array = new Array();//二维数组存放数据
var time=1;//计时时间
var flag=false;//判断是否需要提醒不能滑动
var score;//总得分

// 1.初始时，在表格中随机分布两个数字
function init(){
	for(let i = 0;i<4;i++){
		array[i]=new Array();
		for(let j = 0;j<4;j++){
			array[i][j]=undefined;
		}
	}
	//clearTab();
	var x = random();
	var y = random();
	
	while(x.col==y.col&&x.row==y.row){
		y=random();
	}

	array[x.row][x.col] = x.num;
	array[y.row][y.col] = y.num;
	time=1;
	score = 0;
	showTime();
	updateTab();
}

//生成随机出现的数字
function random(){
	var data={};
	data.col = Math.floor(Math.floor(Math.random()*11)/3);
	data.row = Math.floor(Math.floor(Math.random()*11)/3);
	data.num = Math.floor(Math.random()*10)>4?2:4;
	if(array[data.row][data.col]!=undefined){
		data=random();
	}
	return data;
}

function clearTab(){
	var table = document.getElementById("tab");
	for(let i =0;i<4;i++){
		for(let j = 0;j<4;j++){
			table.rows[i].cells[j].innerHTML = "";
		}
	}
}
//
function updateTab(){
	isOver();//判断游戏是否结束
	showScore();//更新当前分数
	clearTab();//先将表格元素置为空
	var table = document.getElementById("tab");
	for(let i =0;i<4;i++){
		for(let j = 0;j<4;j++){
			// console.log(array[i][j]);
			if(array[i][j]){
				table.rows[i].cells[j].innerHTML = array[i][j];
			}   
		}
		 // console.log("\t")
	}
	
}

//将所有数字放到最左边
function leftMove(i,a){
	// flag.left = false;
	for(let j=3;j>=0;j--){
		if(array[i][j]!=undefined){
			for(let t=j-1;t>=0;t--){
				if(array[i][t]==undefined){
					array[i][t]=array[i][t+1];
					array[i][t+1]=undefined;
					// flag.left = true;
					a=true;
				}
			}
		}
		
	}
	return a;
}

//左滑
function leftSlide(){
	flag = false;
	let temp=false;
	//滑动
	for(let i=0;i<4;i++){
		temp=leftMove(i,temp);
	}
	// 相邻相同数字相加
	for(let i =0;i<4;i++){
		for(let j = 0;j<3;j++){
			if(array[i][j]!=undefined&&array[i][j+1]!=undefined&&array[i][j]==array[i][j+1]){
				array[i][j] *=2;
				score += array[i][j];
				array[i][j+1]=undefined;
				temp=true;
			}
		}
		//有空缺时，移动数字
		leftMove(i);//true
	}
	// flag.left = temp;
	updateTab();
	
	if(!temp&&!flag){
		alert("不能向左滑动");
		return;
	}
	//有数字移动或计算，增加随机点
	else{
		let x=random();
		array[x.row][x.col] = x.num;
		updateTab();
	}
}


//右滑
function rightMove(i,temp){
	for(let j =0;j<4;j++){
		if(array[i][j]!=undefined){
			for(let t = j+1;t<4;t++){
				if(array[i][t]==undefined){//找到为空的值，所有数字向右移动
					array[i][t]=array[i][t-1];
					array[i][t-1]=undefined;
					temp = true;
				}
			}		
		}
	}
	return temp;
}

//数字右滑
// 相同数字相加
function rightSlide(){
	flag = false;
	
	let temp = false;
	for(let i =0;i<4;i++){
		temp = rightMove(i,temp);
	}
	
	for(let i = 0;i<4;i++){
		for(let j = 3;j>0;j--){
			if(array[i][j-1]!=undefined&&array[i][j]!=undefined&&array[i][j-1]==array[i][j]){
				array[i][j] *=2;
				score += array[i][j];
				array[i][j-1] = undefined;
				temp = true;
			}
		}
		rightMove(i,temp);
	}
	updateTab();
	
	if(!temp&&!flag){
		alert("不能向右滑");
		return;
	}else{
		let x=random();
		array[x.row][x.col] = x.num;
		updateTab();
	}
}

//向上滑,第j列
function upMove(j,temp){
	for(let i = 3;i>=0;i--){
		if(array[i][j]!=undefined){
			for(let t = i-1;t>=0;t--){
				if(array[t][j]==undefined){
					array[t][j]=array[t+1][j];
					array[t+1][j] = undefined;
					temp = true;
				}
			}
		}
	}
	return temp;
}

//所有数字向上滑再相加
// 生成新的随机位置的2或4
function upSlide(){
	flag = false;
	let temp = false;
	
	for(let j = 0;j<4;j++){
		temp = upMove(j,temp);
	}
	
	for(let j = 0;j<4;j++){
		for(let i = 0;i<3;i++){
			if(array[i][j]!=undefined&&array[i+1][j]!=undefined&&array[i+1][j]==array[i][j]){
				array[i][j] *=2;
				score += array[i][j];
				array[i+1][j]=undefined;
				temp = true;
			}
		}
		upMove(j,temp);
	}
	updateTab();
	
	if(!temp&&!flag){
		alert("不能向上滑")
		return;
	}else{
		//滑动完成，在空白处生成新的随机数
		var x = random();
		array[x.row][x.col] = x.num;
		updateTab();//更新表格
	}
	
}

//向下滑,第j列
function downMove(j,temp){
	for(let i = 0;i<4;i++){
		if(array[i][j]!=undefined){
			for(let t = i+1;t<4;t++){
				if(array[t][j]==undefined){
					array[t][j]=array[i][j];
					array[i][j]=undefined;
					temp= true;
				}
			}
		}
	}
	return temp;
}

//向下移动再相加
//生成新的随机位置的2或4
function downSlide(){
	flag = false;
	let temp = false;
	for(let j = 0;j<4;j++){
		temp = downMove(j,temp);
	}
	
	//相邻相同数字相加
	for(let j = 0;j<4;j++){
		for(let i = 3;i>0;i--){
			if(array[i][j]!=undefined&&array[i-1][j]!=undefined&&array[i-1][j]==array[i][j]){
				array[i][j] *=2;
				score += array[i][j];
				array[i-1][j]=undefined;
				temp= true;
			}
		}
		downMove(j,temp);
	}
	updateTab();
	
	if(!temp&&!flag){
		alert("不能向下滑")
		return;
	}else{
		//滑动完成，在空白处生成新的随机数
		var x = random();
		array[x.row][x.col] = x.num;
		updateTab();//更新表格
	}
	
}

function isOver(){
	var x = over();
	if(!x){
		alert("游戏结束");
		flag = true;
		return;
	}
}
//判断游戏是否结束
function over(){
	for(let i = 0;i<4;i++){
		for(let j = 0;j<4;j++){
			if(array[i][j]==undefined){
				return 1;
			}else if(array[i][j]!=undefined){
				if(i<3&&j<3){
					if(array[i][j]==array[i+1][j]||array[i][j]==array[i][j+1]){
						return 1;
					}
				}else if(i==3&&j==3){
					return 0;
				}else if(i==3&&j<3){
					if(array[i][j]==array[i][j+1]){
						return 1;
					}
				}
			}
		}
	}
	return 0;//无空缺,也不存在可计算的相邻的相同数字
}




//显示游戏时间
function timer(){
	if(time+1>60){
		time++;
		document.getElementById("timer").innerHTML =Math.floor(time/60)+"min"+ time%60+"s";
	}else{
		document.getElementById("timer").innerHTML = time++;
	}
}

//
function showTime(){
	setInterval("timer()",1000);//每秒改变一次，记录与上次的时间间隔
}

// 滑动操作
//获取鼠标位置
class Mouse{
	constructor(){
		this.x = null;
		this.y = null;
	}
	
	getMousePos(){
		var event = window.event;
		this.x = event.screenX;
		this.y = event.screenY;
	}
	
	getX(){
		return this.x;
	}
	
	getY(){
		return this.y;
	}
}

var pos1 = new Mouse();
var pos2 = new Mouse();
function position(){
	var pos = new Mouse();
	pos.getMousePos();
	return pos;
}

// 点击获取坐标1,2
function getPostion1(){
	pos1 = position();
}
function getPostion2(){
	pos2 = position();
}
//判断滑动的方向
function direction(){
	getPostion2();//松开鼠标的同时，判断滑动方向
	console.log(pos1.x,pos1.y);
	console.log(pos2.x,pos2.y);
	//根据鼠标前后两次的位置坐标差判断
	var delta_x = pos2.x-pos1.x;
	var delta_y = pos2.y-pos1.y;
	if(delta_x>0&&delta_y>0){
		if(Math.abs(delta_x)>=Math.abs(delta_y)){
			rightSlide();
		}else{
			downSlide();
		}
	}
	else if(delta_x>0&&delta_y<0){
		if(Math.abs(delta_x)>=Math.abs(delta_y)){
			rightSlide();
		}else{
			upSlide();
		}
	}
	else if(delta_x<0&&delta_y>0){
		if(Math.abs(delta_x)>=Math.abs(delta_y)){
			leftSlide();
		}else{
			downSlide();
		}
	}
	else{
		if(Math.abs(delta_x)>=Math.abs(delta_y)){
			leftSlide();
		}else{
			upSlide();
		}
	}
}


//计分
function showScore(){
	console.log(score);
	document.getElementById("score").innerHTML = score;
}
