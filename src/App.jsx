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
  }

  submittedMessage(msg) {
    this.setState({messages: [{id:4, username:"me", content:msg}]});
  }


// previous messages shouldn't be deleted.
// values for id and username not proper.



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

