function Todo(id, task, who, dueDate) {
this.id=id;
this.task = task;
this.who = who;
this.dueDate = dueDate;
this.done = false;
}

function addTodosToPage() {
var ul = document.getElementById("todoList");
var listFragment=document.createDocumentFragment();
for (var i = 0; i < todos.length; i++) {
var todoItem = todos[i];
var li = createNewTodo(todoItem);
listFragment.appendChild(li);

}
ul.appendChild(listFragment);   
}

function getFormData() {
try{    


var task = document.getElementById("task").value;
if (checkInputText(task, "Please enter a task")) return;

var who = document.getElementById("who").value;
if (checkInputText(who, "Please enter a person to do the task")) return;

var date = document.getElementById("dueDate").value;
if (checkInputText(date, "Please enter a due date")) return;

var regExp=/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/([0-9]{4})/;

if (!(date.match(regExp))) {
throw "Error: Please enter date in format mm/dd/yyyy";
} 

var id=(new Date()).getTime();
var todoItem = new Todo(id, task, who, date);
todos.push(todoItem);
addTodoToPage(todoItem);
saveTodoItem(todoItem);



} catch (e) {
alert(e);
}    
}



function createNewTodo(todoItem) {
var li = document.createElement("li");
li.setAttribute("id",todoItem.id);

var days=daysOverdue(todoItem);
var monthString=monString(todoItem);

var spanTodo =document.createElement("span");
spanTodo.innerHTML = 
todoItem.who +" needs to "+todoItem.task+" by "+monthString+" "+days;

var spanDone=document.createElement("span");
if (!todoItem.done) {
spanDone.setAttribute("class", "notDone");
spanDone.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
} else {
spanDone.setAttribute("class", "done");
spanDone.innerHTML="&nbsp;&#10004;&nbsp;";
}

spanDone.onclick=updateDone;

var spanDelete=document.createElement("span");
spanDelete.setAttribute("class","delete");
spanDelete.innerHTML="&nbsp;&#10007;&nbsp;";

spanDelete.onclick=deleteItem;

li.appendChild(spanDone);
li.appendChild(spanTodo);
li.appendChild(spanDelete);

return li;
}
