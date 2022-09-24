/************* Chapter 1 ***************/

// alert('Welcome to Quiz Ninja!');

/************* Chapter 2 ***************/

// declares a variable called question and assigns a string
// const question = "What is Superman's real name?"

// A prompt dialog allows the player to type in a response, which is then stored in the variable it is assigned to, which is answer in this case.
// const answer = prompt(question);

// Use an alert dialog to display the player's answer using string interpolation to insert the value of answer into the template literal that is displayed in an alert box:
// alert(`You answered ${answer}`);

/************* Chapter 3 ***************/

// Each element in the quiz will be a nested array that contains the question as its first element and the answer as its second element.
// const quiz = [
//   ["What is Superman's real name?","Clark Kent"],
//   ["What is Wonder Woman's real name?","Diana Prince"],
//   ["What is Batman's real name?","Bruce Wayne"]
// ];

// Create and initialize a variable called score to keep track of how many correct answers the player has given:
// let score = 0 // initialize score

// Loop through the array using a for-of loop, assigning the variables question and answer to each key and value in the map. The loop starts by asking the question using a prompt dialog that allows the player to enter an answer that is stored in a variable called response. Then compare this to the actual answer stored as answer:
// for(const [question,answer] of quiz){
//   const response = prompt(question);

  // An if ... else block is used to check if the answer is right or wrong. If it’s right, an alert dialog is shown saying it is correct and the score is incremented by 1, using score++. Otherwise, if the answer is wrong, an alert dialog informs the player and also lets them know the correct answer.
//   if(response === answer){
//       alert('Correct!');
//       score++;
//   } else {
//       alert(`Wrong! The correct answer was ${answer}`);
//   }
// }

// When the loop has finished iterating through each question in the array, it breaks out of the block and finishes by displaying another alert dialog to inform the player the game is over and telling them how many questions they answered correctly. This uses a template literal to display the score:

// At the end of the game, report the player's score
// alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);

// At the end of this template literal, we use the ternary operator to check if the score is not equal to 1. If this is true, the letter 's' is appended to the end of the word 'point' to make it plural.

/*************Chapter 4***************/

// This is an example of refactoring code ― the functionality of the application remains the same, but the underlying code has become more flexible and easier to maintain, as well as being more readable and descriptive due to the use of functions. We have abstracted much of the internal game logic out into separate functions, which means we can change the mechanics of different aspects of the quiz by updating the relevant functions.

// Create a map of questions and answers and store it in the quiz variable.
const quiz = [
  ["What is Superman's real name?","Clark Kent"],
  ["What is Wonder Woman's real name?","Diana Prince"],
  ["What is Batman's real name?","Bruce Wayne"]
];

// Create a function called start(). This is the main game function that contains all the steps of playing the game. This function also contains a number of functions that help to describe how the game runs. It starts by initializing a variable called score to 0.
function start(quiz){
  let score = 0;

  // The for loop iterates over the quiz array and invokes the ask() function for each question.  
  // main game loop
  for(const [question,answer] of quiz){
      const response = ask(question);
      // Invoke the check() function to check if the player's response is correct.
      check(response,answer);
  }

  // The main game has looped through every question in the quiz array so this is the end of main game loop
  gameOver();

  // The ask(), check() and gameOver() functions are defined at the end of the body of the start() function. They need to be placed inside the start() function as nested functions, as this gives them access to any variables defined inside the start() function's scope. Because they are defined using function declarations, they are hoisted, so they can be defined after they are invoked.

  
  // function declarations - this function uses a prompt dialog and returns the text entered by the player, which is then saved in a variable called answer.
  function ask(question){
      return prompt(question);
  }
  // This function will check if the answer entered by the player is the same as the answer stored in the map.
  function check(response,answer){
      // If the answer is correct, increase score by 1. 
      if(response === answer){
      alert('Correct!');
      score++;
      // If the answer is not correct, show the correct answer.
      } else {
      alert(`Wrong! The correct answer was ${answer}`);
      }
  }

  function gameOver(){
      alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);
  }
}

// This invokes the start() function with the quiz variable passed to it as an argument. This is required to actually start the quiz.
start(quiz);