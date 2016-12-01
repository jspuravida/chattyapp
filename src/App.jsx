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
      console.log("Connected to server...", e);
      this.socket.onmessage = (e) => {
        console.log("This is 1 message event", e.data);
        let updatedMessage = JSON.parse(e.data)
        const newMessages = this.state.messages.concat(updatedMessage)
        this.setState({messages: newMessages})
      }
    } // this displays when client has successfully connected to external server
  }

  submittedMessage(username, msg) {

    let newMsg = {
      username:username,
      content:msg
    };
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

