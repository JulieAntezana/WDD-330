// Helper function...just a wrapper for document.querySelector
// Example of a named export...
// function qs(selectorName) {
//   return document.querySelector(selectorName);
// }

/******** Read from Local Storage ******/
export function readFromLS(key) {
  return JSON.parse(localStorage.getItem(key));
}

/******** Write to Local Storage ******/
export function writeToLS(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/****  Event listener to each li ******/
export function bindTouch(selector, callback) {
  const element = document.querySelector(selector);
  element.addEventListener("click", callback);
}
