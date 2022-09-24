// The JavaScript code that makes the display active.

/*****************Dynamic Table of Contents*********/

var weeklist = [
  {
    label: 'Week 1',
    url: "./week1/week1.html"
  },
  {
    label: "Week 2",
    url: "./week2/week2.html"
  }
];
listWeeklyItems(weeklist,"weekList");

// create the href list (table of contents)
function listWeeklyItems(weekItems, listElementName) {
  //let ol = document.getElementById(listElementName);
  let ol = window.weekList;
  if(ol) {

    //loop through anonymous objects
    weekItems.forEach(element => {

      //create the anchor and set attributes
      let anchor = document.createElement('a');
        anchor.innerHTML = element.label;
        anchor.href = element.url;
        anchor.target="_blank";

      //create list item and attach anchor
      let li = document.createElement('li');
        li.appendChild(anchor);

        ol.appendChild(li);

    });

  }
}

/*****************First Event*********/

function showCongratulations(theButtonClicked){
  document.getElementById('result_display').innerHTML =
    "Congratulations, you did it!<p>You got the page to update!</p>"
  theButtonClicked.innerHTML = "Click Me Again!"  
}

/*****************Story Writer*********/

function loadStory(){
  // English: “Hey document, get the element who’s id is ‘name_input’. Take what you find inside the input box on the screen, its value, and store what you find in a variable named ‘storyName’.”
  var storyName = document.getElementById("name_input").value

  // English: ”Hey local-Storage, get the item stored using what’s in the storyName variable (box) as a key. Put the story you find in a variable (box) called ‘storyHTML’.”
  var storyHTML = localStorage.getItem(storyName)

  // English: “Hey document, get the element who’s id is ‘story_editor’ and put in the visual box on the screen (in its value) what is in the ‘storyHTML’ variable.”  
  document.getElementById("story_editor").value = storyHTML 
}

function saveStory(){
  // English: “Hey document, get the element who’s id is ‘name_input’. Take what you find inside the input box on the screen, its value, and store what you find in a variable named ‘storyName’.”
  var storyName = document.getElementById("name_input").value

  // English:“Hey document, go get the element who’s id is ‘story_editor’. Take what you find inside it, its value, and store what you find in a variable (box) named ‘storyHTML’.”
  var storyHTML = document.getElementById("story_editor").value

  // English: “Hey, localStorage, store what’s in the storyHTML variable (box) and label that stored piece of information with what you find in the storyName variable (box).”  
  localStorage.setItem(storyName, storyHTML)
}

function displayStory(){
  // English:“Hey document, go get the element who’s id is ‘story_editor’. Take what you find inside it, its value, and store what you find in a variable (box) named ‘storyHTML’.”
  var storyHTML = document.getElementById("story_editor").value

  // English: ”Hey document, go get the element who’s id is ‘story_display’ and put what you find in the storyHTML variable between the story_display’s starting and ending tags.”
  document.getElementById("story_display").innerHTML = storyHTML 
}

/*****************Even or Odd?*********/

function checkNumber() {
  
  // English: “Hey document, go get the element who’s id is ‘number_input’. Take what you find inside it, its value, and store what you find in a variable named ‘numberAsText’.”
  var numberAsText = document.getElementById("number_input").value
  
  // English: Take what is in the numberAsText variable and try to parse (convert) it into an integer. Put what parseInt sends back out into a variable called ‘aNumber’.”
  var aNumber = parseInt(numberAsText)

  // English: “If numberAsText is not blank AND what is in aNumber is a number....” ("!isNaN" reads “is a number.”)
  if (numberAsText != "" && !isNaN(aNumber)) {

    // English: “Calculate numberAsText modulo two. Then get the absolute value of the result and put that positive value into the remainder variable.”
    var remainder = Math.abs(aNumber % 2)

    // English: "If what is in aNumber is not 0 and the remainder is equal to 0, then the value of the number in question is even."
    if (aNumber != 0 && remainder == 0) {
      document.getElementById("result_display").innerHTML =
        aNumber + " is even."
    
    // English: "If what is in aNumber is not 0 and the remainder is equal to 1, then the value of the number in question is odd."
    } else if (aNumber != 0 && remainder == 1) {
      document.getElementById("result_display").innerHTML =
        aNumber + " is odd."

    // English: "By process of elimination, what is in aNumber must be 0, therefore the value of the number in question is neiter even nor odd."
    } else {
      document.getElementById("result_display").innerHTML = " 0 is neither even nor odd."
    }
  
  // English: “If numberAsText is blank OR what is in aNumber is NOT a number....”
  } else {
    document.getElementById("result_display").innerHTML = "Please enter a number."
  }
}

/*****************Even or Odd in an Array?*********/

function checkNumbers() {
  var someNumbers = [25, 11, -2, 14, "what?? This isn't a number!", -1, -10];
  for (var i = 0; i < 7; i++) {
    var numberAsText = someNumbers[i];
    var aNumber = parseInt(numberAsText);
    if (numberAsText != "" && !isNaN(aNumber)) {
      var remainder = Math.abs(aNumber % 2);
      if (aNumber != 0 && remainder == 0) {
        document.getElementById("result_display").innerHTML +=
          "<p>" + aNumber + " is even.</p>";
      } else if (aNumber != 0 && remainder == 1) {
        document.getElementById("result_display").innerHTML +=
          "<p>" + aNumber + " is odd.</p>";
      } else {
        document.getElementById("result_display").innerHTML +=
          "<p>" + "0 is neither even nor odd.</p>";
      }
    } else {
      document.getElementById("result_display").innerHTML +=
        "<p>Oops. Found something that wasn't a number in position " +
        i +
        ".</p>";
    }
  }
}

/*****************Note It!*******************/

function saveNote() {

  // English: “Hey page, create a new date and time stamp and put it in the currentDateAndTime variable.”
  var currentDateAndTime = new Date();

  // English: “Hey document, get the element who’s id is ‘description_input’. Take what you find inside the input box on the screen, its value, and store what you find in a variable named ‘aNoteDescription’.”
  var aNoteDescription = document.getElementById("description_input").value;


  // English: "Hey document, go get the element who’s id is ‘note_editor’. Take what you find inside it, its value, and store what you find in a variable (box) named 'aNoteText'."
  var aNoteText = document.getElementById("note_editor").value;

  console.log(aNoteDescription, aNoteText);

  // English: “Get what is in the currentDateAnd-Time variable and convert it into a string depending on my current locale. Then append ‘--’ and what is in the aNoteDescription variable. After completing this, put the result into the aCompleteNote variable.”
  var aCompleteNote =
    currentDateAndTime.toLocaleString() + "--" + aNoteDescription;

   // English: reads,”Hey browser, make some text that is a starting paragraph tag, append to that little bit of text whatever you find in the aNoteText variable, then also append an ending paragraph tag. Then take that whole piece of text, append it to what is in the aCompleteNote variable and put everything back in the aCompleteNote variable.”
  aCompleteNote += "<p>" + aNoteText + "</p>";

  // English: “Hey, local storage, get the stuff that was stored with the key ‘all_notes’ and put it in the storedNotesString variable.
  var storedNotesString = localStorage.getItem("all_notes");

  // English: “Hey JSON parse the string you find in the storedNotesString variable and put the result into the allNotes variable.”
  var allNotes = JSON.parse(storedNotesString);

  // English: ”If what’s in the allNotes variable is equal to null, put an empty array into the allNotes variable.”
  if (allNotes == null) {
    allNotes = [];
  }

  // English: ”Push aCompleteNote onto the end of the allNotes array.”
  allNotes.push(aCompleteNote);

  // English: “Hey JSON, convert everything in the array in the allNotes variable into one string and put the string you create into the allNotesString variable.”
  var allNotesString = JSON.stringify(allNotes);

  // English: “Hey localStorage, store the allNotesString using the key ‘all_notes’ so I can get it back later.”
  localStorage.setItem("all_notes", allNotesString);

  showAllNotes();
  // document.getElementById("description_input").value = null;
  // document.getElementById("note_editor").value = null;
  // aNoteDescription.value = "";
  // aNoteText.value = "";
}

function showAllNotes() {
  // English: “Hey, local storage, get the stuff that was stored with the key ‘all_notes’ and put it in the storedNotesString variable.
  var storedNotesString = localStorage.getItem("all_notes");

  // English: “Hey, local storage, get the stuff that was stored with the key ‘all_notes’ and put it in the storedNotesString variable.
  allNotes = JSON.parse(storedNotesString);

  // English: ”If what’s in the allNotes variable is NOT equal to null...”
  if (allNotes != null) {

    // English: “Hey document, go get the element who’s id is ‘all_notes_display’ and put the section you find in the noteDisplayer variable.”
    var noteDisplayer = document.getElementById("all_notes_display");

    // English: “Take nothing and put it between the beginning and ending tags of the noteDisplayer section.”
    noteDisplayer.innerHTML = null;

    // English: “Hey array in the allNotes variable, tell me how many notes you have in you and put that number in the numberOfNotes variable.”
    var numberOfNotes = allNotes.length;

    // English: “keep going while the i variable is less than the number in the numberOfNotes variable.”
    for (var i = 0; i < allNotes.length; i++) {

      // English: ”Hey allNotes array, when i is zero get me the zeroth note from the array. When i is 1 get me the oneth note, etc., etc. In other words, give me the ith note and put it in the aNote variable.”
      var aNote = allNotes[i];

      // English: ”Hey browser, make some text that is a starting paragraph tag, append to that little bit of text whatever you find in the aNote variable, then also append an ending paragraph tag. Then take that whole piece of text, append it to what is in the noteDisplayer variable and put everything back in the noteDisplayer variable.”
      noteDisplayer.innerHTML += "<hr><p>" + aNote + "</p>";
    }
  }
}

/******************Customers*****************/

function addAndSaveCustomer() {
  var aName = document.getElementById("name_input").value;
  var anAge = document.getElementById("age_input").value * 1;
  var anInseam = document.getElementById("inseam_input").value * 1;

  // English: says,”Create a variable called aClothingCustomer and put into the variable an associative array with the properties....”
  var aClothingCustomer = {

    // English: "Give the associative array an attribute (key) called ‘name’, 'age', 'inseam' and set the value of the attribute (key) to whatever user input is, (for example, ‘Manual’, '22', '32.5')."
    name: aName,
    age: anAge,
    inseam: anInseam,
  };
  var allCustomers = null;
  var storedCustomersString = localStorage["all_customers"];
  if (storedCustomersString == null) {
    allCustomers = [];
  } else {
    allCustomers = JSON.parse(storedCustomersString);
  }
  allCustomers.push(aClothingCustomer);
  var allCusomersString = JSON.stringify(allCustomers);
  localStorage["all_customers"] = allCusomersString;
  showAllCustomers();

  document.getElementById("name_input").value = null;
  document.getElementById("age_input").value = null;
  document.getElementById("inseam_input").value = null;
}
// Retrieve customers' attributes using key - value pairs in order to to display.
function showAllCustomers() {
  var storedCustomersString = localStorage["all_customers"];
  if (storedCustomersString != null) {
    var allCustomers = JSON.parse(storedCustomersString);
    var customerDisplayer = document.getElementById("all_customers_display");
    customerDisplayer.innerHTML = null;
    var numberOfCustomers = allCustomers.length;
    for (var i = 0; i < allCustomers.length; i++) {
      var aClothingCustomer = allCustomers[i];
      customerDisplayer.innerHTML +=
        "<hr><p>Customer: " +
        aClothingCustomer["name"] +
        "</p>" +
        "<p>Age: " +
        aClothingCustomer["age"] +
        "</p>" +
        "<p>Inseam: " +
        aClothingCustomer["inseam"] +
        "</p>";
    }
  }
}