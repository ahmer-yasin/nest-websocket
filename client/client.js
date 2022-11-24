/* initiates socket on client side */
const socket = io();

/* Add your socket listeners here! */
socket.on('Subscribe', (data) => {
  // any code here will execute when this socket is triggered
  console.log(data);
  alert(`users: ${data.count}, Status: ${data.status}`);
});

/* Add your socket listeners here! */
socket.on('Unsubscribe', (data) => {
  // any code here will execute when this socket is triggered
  console.log(data);
  alert(`users: ${data.count}, Status: ${data.status}`);
});

/* Add your socket listeners here! */
socket.on('CountSubscribers', (data) => {
  // any code here will execute when this socket is triggered
  console.log(data);
  alert(data.count);
});

/* Add your socket listeners here! */
socket.on('heart_beat', (data) => {
  // any code here will execute when this socket is triggered
  console.log(data);
  alert(data.message);
});

/* Add your socket listeners here! */
socket.on('error', (data) => {
  // any code here will execute when this socket is triggered
  alert(data.error);
});

socket.on('logged off', (msg) => {
  // any code here will execute when this socket is triggered
  // example, I could create a <p> tag with innerText containing the msg and append it to my <div id='app'>
  const child = document.createElement('p');
  const parent = document.getElementById('app');
  child.innerText = msg;
  parent.appendChild(child);
});

function clickMe(type) {
  console.log(`type`, type);
  socket.emit('event', {
    type: type,
  });
}
