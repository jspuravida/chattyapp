import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering MessageList");
    return (
      <div id="message-list">
        {this.props.messages.map(function (message) {
          // message should be an object with an 'username' property and a content property
          return (<Message key={message.id} username={message.username} content={message.content}/>);
        })
        }
      </div>
    );
  }
}
export default MessageList;




