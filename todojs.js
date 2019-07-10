var inputDom = document.querySelector("#write");
var todoList = document.querySelector(".todo .clist");
var doneList = document.querySelector(".done .clist");
var todoNumSpan = document.querySelector(".todo h1 .number");
var doneNumSpan = document.querySelector(".done h1 .number");
var main = document.querySelector(".main");
//判断localStorage有没有dataList
//JSON.parse-->将JSON格式的字符串转换成数组对象
var dataList = localStorage.dataList?JSON.parse(localStorage.dataList):[];
renderlist();

inputDom.onkeypress = function(e){
	//console.log(e)
	//当用户在输入框按下回车键，并且输入框有内容，就将输入框的内容放在待办事项里
	if(e.key=="Enter"&&inputDom.value!=""){
		//往dataList数据里添加待办事项数据
		//数据对象
		var data={
			content:inputDom.value,
			type:"todo"
		}
		dataList.push(data);
		
		//根据数据渲染列表
		renderlist();
        console.log("1");
	}
}


function renderlist(){
	//JSON.stringify将对象转换成JSON格式字符串
	localStorage.dataList = JSON.stringify(dataList);
	//每次渲染将之前的内容清空，重新渲染
	todoList.innerHTML = "";
	doneList.innerHTML = "";
	var todoNum = 0;
	var doneNum = 0;
	dataList.forEach(function(item,index){
		var newDiv = document.createElement("div");
		newDiv.className="item";
		//未勾选
		if(item.type=="todo"){
			todoNum++;
			newDiv.innerHTML=`
			<span class="checkbox">
				<input type="checkbox" name="check" data-index="${index}" value="">
			</span>
			<span class="content">
				${item.content}
			</span>
			<span class="delete" data-index="${index}">
								
			</span>				
		`;
		todoList.appendChild(newDiv);
		}else{ 
			doneNum++;
			newDiv.innerHTML=`
			<span class="checkbox">
				<input type="checkbox" name="check" checked="checked" data-index="${index} value="">
			</span>
			<span class="content">
				${item.content}
			</span>
			<span class="delete" data-index="${index}">
								
			</span>				
		`;
		doneList.appendChild(newDiv);
		}
		
	})
	 todoNumSpan.innerHTML = todoNum;
	 doneNumSpan.innerHTML = doneNum;
}

//数据改变
todoList.onchange = function(e){
	var index = e.target.dataset.index;
	console.log(index);
//	将dataList的数据类型改为done
	dataList[index].type = "done";
//	重新渲染
	renderlist();
}

//删除事项
main.addEventListener("click",function(e){
	if(e.target.className=="delete"){
		var index = e.target.dataset.index;
		dataList.splice(index,1);
		renderlist();
	}
		
})