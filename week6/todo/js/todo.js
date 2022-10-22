/*
private:
read/write localStorage
*/
// import { writeToLS, readFromLS, bindTouch} from './utils.js';

// // we need a place to store our list of todos in memory
// let liveToDos = null;

// // View code here
// function renderList(list, element, toDos, doNotFilter) {
//   console.log(list);
//   element.innerHTML = "";

//   list.forEach(toDo => {
//     const item = document.createElement("li");
//     const formattedDate = new Date(toDo.id).toLocaleDateString("en-US");

//     let cb = null;
//     let btn = null;

//     //first 2 states are used for listing all toDos
//     if (doNotFilter && toDo.done) {
//       li.innerHTML = `<label><input type="checkbox" checked><s>${toDo.content}</s></label><button>X</button>`;
    
//     } else if (doNotFilter && !toDo.done) {
//       li.innerHTML = `<label><input type="checkbox"> ${toDo.content}</label><button>X</button>`;
//       //true when Active filter button clicked
    
//     } else if (!doNotFilter && !toDo.done) {
//       li.innerHTML = `<label><input type="checkbox"> ${toDo.content}</label><button>X</button>`;
//       //true when done filter button clicked - BUG HERE -places no elements into document
    
//     } else if (!doNotFilter && toDo.done) {
//       li.innerHTML = `<label><input type="checkbox" checked><s>${toDo.content}</s></label><button>X</button>`;
//     }
//     // Wire listener to the checkbox
//     cb = item.childNodes[0].childNodes[0];

//     if(cb) {
//       cb.addEventListener("change", function() {
//         toDos.completeToDo(toDo.id);
//       });
//     }

//     // Wire listener to the button
//     btn = item.childNodes[1];
//     if(btn) {
//       btn.addEventListener("click", function() {
//         toDos.removeToDo(toDo.id);
//       });
//     }

//     element.appendChild(item);
//   });
// }

// function getToDos(key) {
//   if (liveToDos === null) {
//     // we need to go read the list from the data store
//     liveToDos = readFromLS(key) || [];
//   }

//   return liveToDos;
// }

// function addToDo(value, key) {
//   // use Date.now() for UTC millisecond string.
//   const newToDo = {
//     id: new Date(),
//     content: value,
//     done: false
//   };

//   liveToDos.push(newToDo);
//   writeToLS(key, liveToDos);
// }

// function deleteToDo(listkey) {
//   let newList = liveToDos.filter(item => item.id != key);
//   liveToDos = newList;
//   writeToLS(listkey, liveToDos);
// }

// // this would be done last if you still have time...and if you haven't blown too many minds.

// function filterToDos(key, done = true) {
//   let toDos = getToDos(key);

//   // return a list of either done or not done toDos based on the parameter.
//   return toDos.filter(item => item.done === hidden);
// }

// // public
// export default class ToDos {

//   constructor(listElement, key) {
//     // opted to store the listElement inside the class.
//     console.log(this.listElement);
//     this.listElement = listElement;
//     console.log(this.listElement);
  
//     // key for localStorage saving and lookup
//     this.key = key;
//     // why bind here?
//     bindTouch("#addToDo", this.newToDo.bind(this));
//     bindTouch("#listAll", this.listToDos.bind(this));
//     bindTouch("#listDone", this.listToDos.bind(this, false));
//     bindTouch("#done", this.showDone.bind(this, false));
//     this.listToDos();
//   }

//   newToDo() {
//     const toDo = document.getElementById("todoInput");
//     addToDo(toDo.value, this.key);
//     toDo.value = "";
//     this.listToDos();
//   }

//   findTodo(id) {
//     let toDo = liveToDos.find( element => {
//       return element.id === id;
//     });

//     return toDo;
//   }
//   completeToDo(id) {
//     console.log(id + "checked");
//     let toDo = this.findTodo(id);

//     if(toDo) {
//       toDo.done = !toDo.done;
//       writeToLS(this.key, liveToDos);
//       renderList(liveToDos, this.listElement, this, true);
//     }
//   }

//   removeToDo(id) {
//     console.log(id + "removed");
//     let toDo = this.findTodo(id);

//     if(toDo) {
//       deleteToDo(id, this.key);
//       renderList(liveToDos, this.listElement, this, true);
//     }
//   }


//   listTodos(hidden = true) {
//     renderList(getTodos(this.key), this.listElement, this, hidden);
//   }
// }


//Imports
import { readFromLS, writeToLS, bindTouch } from "./utils.js";

// Reserve a space in memory for todo list
let liveToDos = null;

//Render Entire List - called after every change
function renderList(list, element, toDos, unfiltered) {
  console.log(list);
  element.innerHTML = "";
  list.forEach((toDo) => {
    const li = document.createElement("li");
    let checkbox = null;
    let button = null;

    //first 2 states are used for listing all toDos
    if (unfiltered && toDo.done) {
      li.innerHTML = `<label><input type="checkbox" checked><s>${toDo.content}</s></label><button>X</button>`;
    } else if (unfiltered && !toDo.done) {
      li.innerHTML = `<label><input type="checkbox"> ${toDo.content}</label><button>X</button>`;
      //true when Active filter button clicked
    } else if (!unfiltered && !toDo.done) {
      li.innerHTML = `<label><input type="checkbox"> ${toDo.content}</label><button>X</button>`;
      //true when done filter button clicked - BUG HERE -places no elements into document
    } else if (!unfiltered && toDo.done) {
      li.innerHTML = `<label><input type="checkbox" checked><s>${toDo.content}</s></label><button>X</button>`;
    }

    //Event listener for check box change
    //notice where checkbox is found li.label.checkbox
    checkbox = li.childNodes[0].childNodes[0];
    if (checkbox) {
      checkbox.addEventListener("change", function () {
        toDos.completeToDo(toDo.id);
      });

      //Event listener for delete button click
      //notice where button is found after label so childNodes[1]
      button = li.childNodes[1];
      if (button) {
        button.addEventListener("click", function () {
          toDos.removeToDo(toDo.id);
        });
      }
      element.appendChild(li);
    }
  });

  //Handle style of each filter button when clicked
  const allFilter = document.querySelector("#all");
  const activeFilter = document.querySelector("#active");
  const doneFilter = document.querySelector("#done");
  allFilter.addEventListener("click", () => {
    allFilter.classList.add(["active"]);
    activeFilter.classList.remove(["active"]);
    doneFilter.classList.remove(["active"]);
  });
  activeFilter.addEventListener("click", () => {
    activeFilter.classList.add(["active"]);
    allFilter.classList.remove(["active"]);
    doneFilter.classList.remove(["active"]);
  });
  doneFilter.addEventListener("click", () => {
    doneFilter.classList.add(["active"]);
    allFilter.classList.remove(["active"]);
    activeFilter.classList.remove(["active"]);
  });
}

/***** private function - READ IN key:toDo from Local Storage ****/
function getToDos(key) {
  if (liveToDos === null) {
    liveToDos = readFromLS(key) || [];
  }
  return liveToDos;
}

/***** private function - ADD NEW TODO to list of toDos ******/
function addNewToDo(value, key) {
  const newToDo = {
    id: new Date(),
    content: value,
    done: false,
  };
  //push onto global activeToDos array
  liveToDos.push(newToDo);
  //update localStorage after every change
  writeToLS(key, liveToDos);
}

/***** private function - DELETE TODO from list of toDos *****/
// keeps every li not equal to key and gets rid of everything that matches key
function deleteToDo(key, listKey) {
  let newList = liveToDos.filter((li) => li.id != key);
  //set global activeToDos to newList
  liveToDos = newList;
  //update localStorage after every change
  writeToLS(listKey, liveToDos);
}

/***** private function - UPDATE # TODOS LEFT */
function numToDosLeft() {
  const toDosLeft = document.querySelector("#numToDosLeft");
  let counter = 0;
  if (liveToDos) {
    for (let i = 0; i < liveToDos.length; i++) {
      if (liveToDos[i].done === false) {
        counter++;
      }
    }
    if (counter !== 1) {
      toDosLeft.innerHTML = `${counter} Tasks Left`;
    } else {
      toDosLeft.innerHTML = `${counter} Tasks Left`;
    }
  }
}

/*******************************************************************
 *                       Public Class -    ToDos                   *
 *******************************************************************/
export default class ToDos {
  constructor(listElement, key) {
    this.listElement = listElement;
    console.log(this.listElement);

    //key for local storage
    //this.key = key represents "toDo"
    this.key = key;
    //binding to this specific object when it executes
    //bindTouch has a callback method and they behave strangely in classes
    //We want to bind it to the button but fire a method on the class
    //console.log reports "this" = [object Object] which I do not understand
    bindTouch("#addNewToDo", this.newToDo.bind(this));
    bindTouch("#all", this.listToDos.bind(this));
    bindTouch("#active", this.showActive.bind(this, false));
    bindTouch("#done", this.showDone.bind(this, false));

    this.listToDos();
  }

  /**** new ToDo ****/
  newToDo() {
    const toDo = document.querySelector("#newToDoInput");
    addNewToDo(toDo.value, this.key);
    toDo.value = "";
    this.listToDos();
  }

  /**** find ToDo ****/
  findToDo(id) {
    let toDo = liveToDos.find((element) => {
      return element.id === id;
    });
    return toDo;
  }

  /****  complete ToDo ****/
  completeToDo(id) {
    console.log(id + " toDo checked");
    let toDo = this.findToDo(id);
    if (toDo) {
      //toggling complete status of toDo
      toDo.done = !toDo.done;
      writeToLS(this.key, liveToDos);
      renderList(liveToDos, this.listElement, this, true);
    }
    numToDosLeft();
  }

  /**** remove ToDo ****/
  removeToDo(id) {
    console.log(id + " toDo removed");
    let toDo = this.findToDo(id);
    if (toDo) {
      deleteToDo(id, this.key);
      renderList(liveToDos, this.listElement, this, true);
      numToDosLeft();
    }
  }

  /**** list ToDos ...render the list ****/
  listToDos(unfiltered = true) {
    renderList(getToDos(this.key), this.listElement, this, unfiltered);
    numToDosLeft();
  }

  /***** show active toDos ************/
  showActive(unfiltered = false) {
    let newList = [];
    let toDos = getToDos(this.key);
    newList = toDos.filter((li) => li.done === false);
    renderList(newList, this.listElement, this, unfiltered);
  }

  /***** show done toDos *********/
  showDone(unfiltered = false) {
    let newList = [];
    let toDos = getToDos(this.key);
    newList = toDos.filter((li) => li.done === true);
    renderList(newList, this.listElement, this, unfiltered);
  }
}


