const email = document.getElementById("mail");

email.addEventListener("input", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("I am expecting an e-mail address!");
  } else {
    email.setCustomValidity("");
  }
});

// There are many ways to pick a DOM node; here we get the form itself and the email
// input box, as well as the span element into which we will place the error message.
const form = document.getElementsByTagName('form')[0];

// const email = document.getElementById('mail');
const emailError = document.querySelector('#mail + span.error');

email.addEventListener('input', function (event) {
  // Each time the user types something, we check if the
  // form fields are valid.

  if (email.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    emailError.textContent = ''; // Reset the content of the message
    emailError.className = 'error'; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

form.addEventListener('submit', function (event) {
  // if the email field is valid, we let the form submit

  if (!email.validity.valid) {
    // If it isn't, we display an appropriate error message
    showError();
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();
  }
});

function showError() {
  if (email.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    emailError.textContent = 'You need to enter an e-mail address.';
  } else if (email.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    emailError.textContent = 'Entered value needs to be an e-mail address.';
  } else if (email.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    emailError.textContent = `Email should be at least ${ email.minLength } characters; you entered ${ email.value.length }.`;
  }

  // Set the styling appropriately
  emailError.className = 'error active';
}



// check if supported
if (!Modernizer.input.placeholder) {
  // get all the form controls with the placeholder attribute
  var fcToCheck = document.querySelectorAll("*[placeholder]"),
    frmsToCheck = document.querySelectorAll('form'),
    i, count;
  // loop through form controls with placeholder attribute,
  // copy placeholder value into value, clearing on focus and
  // resetting, if empty, on blur
  for (var i = 0, count = fcToCheck.length; i < count; i++) {
    if (fcToCheck[i].value == "") {
      fcToCheck[i].value = fcToCheck[i].getAttribute("placeholder");
      fcToCheck[i].classList.add('placeholder');
      fcToCheck[i].addEventListener('focus', function () {
        if (this.value == this.getAttribute("placeholder")) {
          this.value = '';
          this.classList.remove('placeholder');
        }
      });
      fcToCheck[i].addEventListener('blur', function () {
        if (this.value == '') {
          this.value = this.getAttribute("placeholder");
          this.classList.add('placeholder');
        }
      });
    }
  }
  for (i = 0, count = frmsToCheck.length; i < count; i++) {
    frmsToCheck[i].addEventListener('submit', function (e) {
      var i, count, plcHld;
      // first do all the checking for required
      // element and form validation.
      // Only remove placeholders before final submission
      plcHld = this.querySelectorAll('[placeholder]');
      for (i = 0, count = plcHld.length; i < count; i++) {
        //if the placeholder still equals the value
        if (plcHld[i].value == plcHld[i].getAttribute(
            'placeholder')) {
          // don't submit if required
          if (plcHld[i].hasAttribute('required')) {
            // create error messaging
            plcHld[i].classList.add('error');
            e.preventDefault();
          } else {
            // if not required, clear value before submitting.
            plcHld[i].value = '';
          }
        } else {
          // remove legacy error messaging
          plcHld[i].classList.remove('error');
        }
      }
    });
  }
}