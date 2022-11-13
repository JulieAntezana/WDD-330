const URL = 'wss://echo.websocket.org/';
const outputDiv = document.getElementById('output');
const form = document.forms[0];
const connection = new WebSocket(URL);

connection.addEventListener('open', () => {
    output('CONNECTED');
}, false);

function output(message) {
    const para = document.createElement('p');
    para.innerHTML = message;
    outputDiv.appendChild(para);
}

form.addEventListener('submit', message, false);

function message(event) {
    event.preventDefault();
    const text = form.message.value;
    output(`SENT: ${text}`);
    connection.send(text);
}

connection.addEventListener('message', (event) => {
    output(`RESPONSE: ${event.data}`);
}, false);

function sendAlert() {
  alert("This is an alert() method!");
}

function scrollBottom() {
  window.scrollTo(0,5000);
}

function scrollBack() {
  window.scrollTo(0,50);
}

function openWindow() {
  const popup = window.open('https://churchofjesuschrist.org','The Church of Jesus Christ of Latter-day Saints','width=400,height=400,resizable=yes');
}

function closeWindow() {
  popup.close();
}

function timerAlert() {
  window.setTimeout( () => alert("Time's Up!"), 3000);
}


