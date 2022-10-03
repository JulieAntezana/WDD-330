/*************Chapter 5***************/

// Each element in the array contains information about the superheroes used in our quiz, and have properties of name and realName that will be used to form the questions and answers. We're going to store our questions as objects inside an array. Open up main.js and enter the following at the top of the file:

const quiz = [
  { name: "Superman",realName: "Clark Kent" },
  { name: "Wonder Woman",realName: "Diana Prince" },
  { name: "Batman",realName: "Bruce Wayne" },
];

// Each element in the array contains information about the superheroes used in our quiz. These objects replace the nested arrays we used in the previous chapters, and have properties of name and realName that will be used to form the questions and answers.

// Now we’re going to namespace the functions we created in the last chapter. We do this by placing them inside an object called game that will be the namespace. This means that any references to the functions need to be replaced with game.function() outside the object or this.function() inside the object.

// Add the following code below the array of questions:

// const game = {
//   start(quiz){
//       this.questions = [...quiz];
//       this.score = 0;
//       // main game loop
//       for(const question of this.questions){
//       this.question = question;
//       this.ask();
//       }
//       // end of main game loop
//       this.gameOver();
//   },
//   ask(){
//       const question = `What is ${this.question.name}'s real name?`;
//       const response =  prompt(question);
//       this.check(response);
//   },
//   check(response){
//       const answer = this.question.realName;
//       if(response === answer){
//       alert('Correct!');
//       this.score++;
//       } else {
//       alert(`Wrong! The correct answer was ${answer}`);
//       }
//   },
//   gameOver(){
//       alert(`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
//   }
// }

// // After this, we have to edit the function that starts the game, so it includes the namespace:
// game.start(quiz);

// Save these changes then have a go at playing the game again. Once again, we haven't actually added any functionality, but we have made our code more organized by placing all of the functions inside an object. 

/************* Chapters 6 - 7 ***************/

// Now we’ve learned about the Document Object Model, we can start to add some dynamic markup to display the questions in our quiz. This will mean we won't need as many alert dialogs.

// The first thing to do is add some empty <div> elements to the HTML by updating index.html to add four <div> elements that will be used to show the questions and provide feedback about whether the user has answered a question correctly or not. We've also added a <div> element inside the <header> that can be used to display the score as the game is being played.

// The ID attributes of these elements will act as hooks that allow us to easily gain access to that element using the document.getElementById() method. These will be namespaced inside an object called view, as they all relate to the view. Add the following code at the start of the main.js file, just after the array of questions:
// View Object
const view = {
  score: document.querySelector('#score strong'),
  question: document.getElementById('question'),
  result: document.getElementById('result'),
  info: document.getElementById('info'),
  start: document.getElementById('start'),
  render(target,content,attributes) {
      for(const key in attributes) {
          target.setAttribute(key, attributes[key]);
      }
      target.innerHTML = content;
  },
  show(element){
    element.style.display = 'block';
  },
  hide(element){
      element.style.display = 'none';
  }
};

// This uses the document.querySelector() method to access the elements we require and assign them to a variable. So, for example, the div with an id of question can be accessed in the Javascript code using view.question.

// We've also added a helper function called render() that can be used to update the content of an element on the page. This function has three parameters: the first is the element that displays the content, the second is for the content it’s to be updated with, and the last is an object of any HTML attributes that can be added to the element.

// The function loops through any attributes provided as the third argument, and uses the setAttribute() method to update them to the values provided. It then uses the innerHTML property to update the HTML with the content provided.

const game = {
  start(quiz){
      this.questions = [...quiz];
      this.score = 0;
      // main game loop
      for(const question of this.questions){
      this.question = question;
      this.ask();
      }
      // end of main game loop
      this.gameOver();
  },

  ask(){
    const question = `What is ${this.question.name}'s real name?`;
    view.render(view.question,question);
    const response =  prompt(question);
    this.check(response);
  },
  check(response){
    const answer = this.question.realName;
    if(response === answer){
    view.render(view.result,'Correct!',{'class':'correct'});
    alert('Correct!');
    this.score++;
    view.render(view.score,this.score);
    } else {
    view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
    alert(`Wrong! The correct answer was ${answer}`);
    }
  },
  gameOver(){
    view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
    view.show(view.start);
  }
}

view.start.addEventListener('click', () => game.start(quiz), false);

// In most cases we have placed a call to view.render() wherever there is an alert() or prompt() dialog that displays the same information in the HTML. We've also used the view.render() method to update the score if a player gains any points.

// Unfortunately, if you have a go at playing the quiz by opening index.html in a browser, you won't notice much difference until right at the end when all the dialogs have finished displaying. You'll notice that the HTML has also been updating in the background.
// This is definitely starting to look better, although it would be good if we could see the results of our HTML updates all the way through the game. Don't worry about this, though, because we'll not be using prompts for much longer.

// We have used our knowledge of the DOM to dynamically update the markup on the page. We've also continued to keep our code organized by keeping any properties and methods to do with the view in a separate object.