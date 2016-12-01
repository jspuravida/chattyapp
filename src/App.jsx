import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        currentUser: {name: "Bob"},
        messages: [
          {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
          },
          {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ]
    };
    this.submittedMessage = this.submittedMessage.bind(this);
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 3000);

    this.socket = new WebSocket("ws://localhost:4000"); // this connects to our socket
    this.socket.onopen = (e) => {
      console.log("Connected to server...", e);
    } // this displays when client has successfully connected to external server
  }

  submittedMessage(username, msg) {
    let lastMsgID = this.state.messages[this.state.messages.length - 1].id;
    let newMsgID = lastMsgID+1;  // this is taking the last recorded ID, and adding 1 to it for the next msg.

    let newMsg = {
      id:newMsgID,
      username:username,
      content:msg
    };

    this.setState({messages: this.state.messages.concat(newMsg)})
    this.socket.send(JSON.stringify(newMsg));

  } // This appends the new message to this.state.messages

  render() {
    return (
      <div>
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar
          currentUser={this.state.currentUser}
          finishMessage={this.submittedMessage}
        />
      </div>
    );
  }
}

export default App;
// this means MessageList has a prop called 'messages', which points to the state/data above.

