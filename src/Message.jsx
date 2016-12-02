import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering Message");
    var msg;
    if (this.props.type === 'incomingMessage') {
      return (
        <div>
          <div className="message">
           <span className="username">{this.props.username}</span>
           <span className="content">{this.props.content}</span>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="message system">
           { this.props.content }
         </div>
        </div>
      )
    }

  }
}
export default Message;




