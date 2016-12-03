const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');
// Set the port to 4000
const PORT = 4000;
// Create a new express server
const server = express();
// Make the express server serve static assets (html, javascript, css) from the /public folder
.use(express.static('public'));
.listen(PORT, '0.0.0.0', 'localhost', () =>
  console.log(`Listening on ${ PORT }`));

function notifyEveryoneOfUserCount(wss){
  var usersOnline = wss.clients.length;
  console.log('There are this many users online: ', usersOnline);
  let usersOnlineMessage = {
    type: "userCountNotification",
    count: usersOnline,
  };
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(usersOnlineMessage));
  });
}

// Create the WebSockets server
const wss = new SocketServer({ server });
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  notifyEveryoneOfUserCount(wss);

  ws.on('message', function (msg) {
    let parsedMessage = JSON.parse(msg)
    const parsedNewMessage = {
      id: uuid.v4(),
      username: parsedMessage.username,
      content: parsedMessage.content
    }

    if(parsedMessage.type = 'postMessage') {
      parsedNewMessage.type = 'incomingMessage'
      console.log('I need to broadcast a message');
    } else {
      console.log('I need to broadcast a notification');
      parsedNewMessage.type = 'incomingNotification';
    }

    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(parsedNewMessage));
    })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  });

  ws.on('close', () => {
    // client left?  notice this, and notify everyone.
    notifyEveryoneOfUserCount(wss);
  });
});

