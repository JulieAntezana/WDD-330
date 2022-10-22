/*
private:
read/write localStorage
*/
import { writeToLS, readFromLS, bindTouch} from './utils.js';

// we need a place to store our list of todos in memory
let liveToDos = null;

// View code here
function renderList(list, element, toDos, hidden) {
  console.log(list);
  element.innerHTML = "";

  list.forEach(toDo => {
    const item = document.createElement("li");
    const formattedDate = new Date(toDo.id).toLocaleDateString("en-US");

    let cb = null;
    let btn = null;

    if(hidden && toDo.done) {
      item.innerHTML = `<label><input type="checkbox" checked><strike> ${toDo.content}</strik></label><button>X</button>`;
    }
    else {
      item.innerHTML = `<label><input type "checkbox"> ${toDo.content}</label><button>X</button>`;
    }

    // Wire listener to the checkbox
    cb = item.childNodes[0].childNodes[0];

    if(cb) {
      cb.addEventListener("change", function() {
        toDos.completeToDo(toDo.id);
      });
    }

    // Wire listener to the button
    btn = item.childNodes[1];
    if(btn) {
      btn.addEventListener("click", function() {
        toDos.removeToDo(toDo.id);
      });
    }

    element.appendChild(item);
  });
}

function getToDos(key) {
  if (liveToDos === null) {
    // we need to go read the list from the data store
    liveToDos = readFromLS(key) || [];
  }

  return liveToDos;
}

function addToDo(value, key) {
  // use Date.now() for UTC millisecond string.
  const newToDo = {
    id: new Date(),
    content: value,
    done: false
  };

  liveToDos.push(newToDo);
  writeToLS(key, liveToDos);
}

function deleteToDo(key) {
  let newList = liveToDos.filter(item => item.id != key);
  liveToDos = newList;
  writeToLS(key, liveToDos);
}

// this would be done last if you still have time...and if you haven't blown too many minds.

function filterToDos(key, done = true) {
  let toDos = getToDos(key);

  // return a list of either done or not done toDos based on the parameter.
  return toDos.filter(item => item.done === hidden);
}

// public
export default class ToDos {

  constructor(listElement, key) {
    // opted to store the listElement inside the class.
    console.log(this.listElement);
    this.listElement = listElement;
    console.log(this.listElement);
  
    // key for localStorage saving and lookup
    this.key = key;
    // why bind here?
    bindTouch("#addToDo", this.newToDo.bind(this));
    this.listToDos();
  }

  newToDo() {
    const toDo = document.getElementById("todoInput");
    addToDo(toDo.value, this.key);
    toDo.value = "";
    this.listToDos();
  }

  findTodo(id) {
    let toDo = liveToDos.find( element => {
      return element.id === id;
    });

    return toDo;
  }
  completeToDo(id) {
    console.log(id + "checked");
    let toDo = this.findTodo(id);

    if(toDo) {
      toDo.done = !toDo.done;
      writeToLS(this.key, liveToDos);
      renderList(liveToDos, this.listElement, this, true);
    }
  }

  removeToDo(id) {
    console.log(id + "removed");
    let toDo = this.findTodo(id);

    if(toDo) {
      deleteToDo(id);
      renderList(liveToDos, this.listElement, this, true);
    }
  }


  listTodos(hidden = true) {
    renderList(getTodos(this.key), this.listElement, this, hidden);
  }
}

