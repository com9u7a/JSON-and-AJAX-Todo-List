function saveTodoItem(todoItem) {
var key="todo" + todoItem.id;
var item=JSON.stringify(todoItem);
localStorage.setItem(key,item);
}  
function getTodoItems() {
for (var i=0; i<localStorage.length; i++) {
var key=localStorage.key(i);
if (key.substring(0,4)=="todo") {
var item=localStorage.getItem(key);
var todoItem=JSON.parse(item);
todos.push(todoItem);
}
}
addTodosToPage();
}

function deleteItem(e) {
var span=e.target;
var id=span.parentElement.id;
console.log("delete an item: "+id);

//find and remove the item in localStorage
var key="todo"+id;
localStorage.removeItem(key);

//find and remove the item in the array
for (var i=0; i<todos.length; i++) {
if (todos[i].id==id) {
todos.splice(i,1);
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
var key="todo"+id;
var item=localStorage.getItem(key);
var itemObject=JSON.parse(item);
//if the classname of the span is not Done do this
if (span.className=="notDone") {
//set the attribute to done when clicked
span.setAttribute("class","done");
span.innerHTML="&nbsp;&#10004;&nbsp;";
//set the parsed JSON item object property to true
//then convert the object back to JSON and update localStorage
var itemTrue=itemObject.done=true;
var itemString=JSON.stringify(itemObject);
localStorage.setItem(key, itemString);
//find the item in the array and replace it with the new object
for (var i=0; i<todos.length; i++) {
if (todos[i].id==id) {
todos.splice(i,1,itemTrue);
break;
}
}
//the inverse is true for the else clause
} else if (span.className=="done") {
span.setAttribute("class","notDone");
span.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
var itemFalse=itemObject.done=false;
var itemString=JSON.stringify(itemObject);
localStorage.setItem(key, itemString);
for (var i=0; i<todos.length; i++) {
if (todos[i].id==id) {
todos.splice(i,1,itemFalse);
break;
}
}
}
}
