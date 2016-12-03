import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        currentUser: {name: "Bob"},
        messages: []
    };
    this.submittedMessage = this.submittedMessage.bind(this);
  }
  componentDidMount() {

    this.socket = new WebSocket("ws://localhost:4000"); // this connects to our socket
    this.socket.onopen = (e) => {
      console.log("Connected to server...", e); // this displays when client has successfully connected to external server
      this.socket.onmessage = (e) => {
        // The message sent from server will arrive here, no matter what
        //    the *intention* of the server was.  So handle them all!
        console.log("This is 1 message event", e.data);
        let updatedMessage = JSON.parse(e.data) // The socket event data is encoded as a JSON string. This line then turns it into an object.

        // don't want our userCountNotification messages to mix with others
        if (updatedMessage.type === 'incomingMessage'
          || updatedMessage.type === 'incomingNotification') {
          const newMessages = this.state.messages.concat(updatedMessage);
          this.setState({messages: newMessages});
        } else if (updatedMessage.type === 'userCountNotification') {
          console.log(updatedMessage.count);
          // this.state.userCount = updatedMessage.count;   // we wish this worked
          this.setState({userCount: updatedMessage.count}); // we gotta do it this way
        }
      }
    }
  }

  submittedMessage(type, username, content) {

    let newMsg = {
      type,
      username,
      content
    };

    console.log('gonna send this to the server', newMsg);
    this.socket.send(JSON.stringify(newMsg));
  }

  updateName(name) {
    this.setState({currentUser: {name}})
  }

  // need to pass some props down to server.js, then we can access the information.
  // We can access the usersOnline #, through usersOnlineMessage.type.count

  render() {
    return (
      <div>
        <nav>
          <h1>Chatty</h1><p>{this.state.userCount} users online</p>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar
          currentUser={this.state.currentUser}
          finishMessage={this.submittedMessage}
          updateName={this.updateName.bind(this)}
        />
      </div>
    );
  }
}

export default App;
// this means MessageList has a prop called 'messages', which points to the state/data above.

