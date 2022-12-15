//import ToDos class from toDo module
import ToDos from "./todo.js";

//get the toDoList from DOM
const list = document.querySelector("#toDoList");

//create new instance of ToDos with list and key for localStorage
// Constant named myToDos = create a new list and store it under the name "todo"
const myToDos = new ToDos(list, "toDo");


