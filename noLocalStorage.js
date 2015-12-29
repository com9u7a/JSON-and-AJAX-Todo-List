function getTodoItems() {
var request = new XMLHttpRequest();
request.open("GET", "todo.json");
request.onreadystatechange = function() {
if (this.readyState == this.DONE && this.status == 200) {
if (this.responseText) { 
parseTodoItems(this.responseText);
addTodosToPage();
} else {
console.log("Error: Data is empty");
}
}
};
request.send();
}

function parseTodoItems(todoJSON) {
try {if (todoJSON == null || todoJSON.trim() == "") {
return;
}
var todoArray = JSON.parse(todoJSON);

if (todoArray.length == 0) {
console.log("Error: the to-do list array is empty!");
return;
}
for (var i = 0; i < todoArray.length; i++) {
var todoItem = todoArray[i];
todos.push(todoItem);
}} catch(e){
alert(e);
}
}

function saveTodoItem(_) {
var todoJSON = JSON.stringify(todos);
var request = new XMLHttpRequest();
var div=document.getElementById("status");
var URL = "save.php?data=" + encodeURI(todoJSON);
request.open("GET", URL);
request.setRequestHeader("Content-Type",
"text/plain;charset=UTF-8");
request.onreadystatechange = function() {
if (this.status==200) {
div.innerHTML="The readyState is: "+this.readyState+ 
" and the status is: "+this.status+": Everything is okay";
} else if (this.status==500) {
div.innerHTML="The readyState is: "+this.readyState+ 
" and the status is: "+this.status+": Server error";
} else if (this.status==404) {
div.innerHTML="The readyState is: "+this.readyState+ 
" and the status is: "+this.status+": Page (or script) not found";
}
}
request.send();    
}

function deleteItem(e) {
var span=e.target;
var id=span.parentElement.id;
console.log("delete an item: "+id);



//find and remove the item in the array
for (var i=0; i<todos.length; i++) {
if (todos[i].id==id) {
todos.splice(i,1);
var x;
saveTodoItem(x);
break;
}
}


//find and remove the item in the page
var li=e.target.parentElement;
var ul=document.getElementById("todoList");
ul.removeChild(li);
}

function updateDone(e) {
var span=e.target;
var id=span.parentElement.id;

//if the classname of the span is not Done do this
if (span.className=="notDone") {
//set the attribute to done when clicked
span.setAttribute("class","done");
span.innerHTML="&nbsp;&#10004;&nbsp;";
//set the parsed JSON item object property to true
//then convert the object back to JSON and update localStorage


//find the item in the array and replace it with the new object
for (var i=0; i<todos.length; i++) {
if (todos[i].id==id) {
todos[i].done=true;
var x;
saveTodoItem(x);
break;
}
}
//the inverse is true for the else clause
} else if (span.className=="done") {
span.setAttribute("class","notDone");
span.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
for (var i=0; i<todos.length; i++) {
if (todos[i].id==id) {
todos[i].done=false;
var x;
saveTodoItem(x);
break;
}
}
}
}
