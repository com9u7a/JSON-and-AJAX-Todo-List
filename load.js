var todos = new Array();

function init() {
var submitButton = document.getElementById("submit");
var searchButton= document.getElementById("searchButton");
submitButton.onclick = getFormData;
searchButton.onclick=searchData;
getTodoItems();
}

function checkInputText(value, msg) {
if (value == null || value == "") {
alert(msg);
return true;
}
return false;
}

function addTodoToPage(todoItem) {
var ul = document.getElementById("todoList");
var li = createNewTodo(todoItem);
ul.appendChild(li);
document.forms[0].reset();
}

function monString(todoItem) {
var monthArray=["January","February","March","April","May","June",
"July","August","September","October","November","December"];
var splitDateString=todoItem.dueDate.split("/");
switch (splitDateString[0]) {
case "01": 
var month=monthArray[0];
break;
case "02":
var month=monthArray[1];
break;
case "03":
var month=monthArray[2];
break;
case "04":
var month=monthArray[3];
break;
case "05":
var month=monthArray[4];
break;
case "06":
var month=monthArray[5];
break;
case "07":
var month=monthArray[6];
break;
case "08":
var month=monthArray[7];
break;
case "09":
var month=monthArray[8];
break;
case "10":
var month=monthArray[9];
break;
case "11":
var month=monthArray[10];
break;
case "12":
var month=monthArray[11];
break;
default:
alert("There's something funky with the way your browser processes dates, or there's no dates to process!");
break;
}
var monthString=month+" "+splitDateString[1]+", "+splitDateString[2]+ " ";
return monthString;
}

function daysOverdue(todoItem) {
var dueDate =new Date(todoItem.dueDate);
var currentDate=new Date();
var milliLeft=dueDate.getTime()-currentDate.getTime();
var daysLeft=milliLeft/1000/60/60/24;
if (daysLeft<0) {
var string="(OVERDUE by "+ Math.floor((daysLeft)*(-1)) + " days)";
} else {
var string="("+Math.floor(daysLeft)+" "+"days)";
}
return string;
}

/*This function will trim the value of the search term
* then it will make sure its not null and loop through the objects
* in the todos array and match the regular expression in the search term
* to the object property*/
function searchData() {
var ul=document.getElementById("matchResultsList");
var frag=document.createDocumentFragment();
var searchTerm=document.getElementById("searchTerm").value.trim();
if (searchTerm==null|| searchTerm=="") {
alert("Please enter a search term");
return true;
} else {
for (var i=0; i<todos.length; i++) {
var searchWho=todos[i].who;
var searchTask=todos[i].task;
var regE=new RegExp(searchTerm, "ig");
var whoResults=searchWho.match(regE);
var taskResults=searchTask.match(regE);
if (whoResults==null&&taskResults==null) {
alert("No match found. Continuing iteration");
} else {
alert("Found match");
var li=showResults(todos[i]);
frag.appendChild(li);
}
}ul.appendChild(frag);
}
}

/*This function will append any matching expressions from the search
* to the ul element by way of document fragment*/
function showResults(results) {  
clearResultsList();
var li=document.createElement("li");
li.innerHTML=
"("+results.latitude+", "+results.longitude+") "+results.who +" needs to "+results.task;
return li;
}

/*This function will clear the list items*/
function clearResultsList() {
var ul=document.getElementById("matchResultsList");
while(ul.firstChild) {
ul.removeChild(ul.firstChild);
}
}
