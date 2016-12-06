import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering MessageList");
    return (
      <div id="message-list">
        {this.props.messages.map(function (message) {
          // message should be an object with an 'username' property and a content property
          // question: what was the reasoning behind splitting up the props?
          // as opposed to:
          //  <Message key={message.id} message={message} />
          return (<Message key={message.id} username={message.username} content={message.content} type={message.type} />);
        })
        }
      </div>
    );
  }
}
export default MessageList;




