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
        console.log("This is 1 message event", e.data);
        let updatedMessage = JSON.parse(e.data) // The socket event data is encoded as a JSON string. This line then turns it into an object.

        const newMessages = this.state.messages.concat(updatedMessage)
        this.setState({messages: newMessages})
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
    this.setState({currentUser: { name }})
  }

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
          updateName={this.updateName.bind(this)}
        />
      </div>
    );
  }
}

export default App;
// this means MessageList has a prop called 'messages', which points to the state/data above.

