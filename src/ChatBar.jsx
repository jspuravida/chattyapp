import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      username: '',
      message: ''
    };
    // this.detectEnter = this.detectEnter.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  render() {
    console.log("Rendering ChatBar");
    return (
      <footer>
        <input
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
          value={this.state.username}
          onChange={this.handleUsernameChange}
          onKeyDown={this.changeUserName.bind(this)}
        />

        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          value={this.state.message}
          onChange={this.handleContentChange}
          onKeyDown={this.contentEntered.bind(this)}
          // onKeyDown={this.detectEnter}
        />
      </footer>
    );
  }

  handleUsernameChange(event) {
     this.setState({username: event.target.value});
  }

  handleContentChange(event) {
    this.setState({message: event.target.value});
  }

  changeUserName(event) {
    const { keyCode } = event;
    const userName = this.state.username;
    const { name } = this.props.currentUser;

    if (keyCode === 13) {
      if (userName !== name) {
        const notifMsg = `${name} just paid for a namechange to ${userName}`;
        this.props.finishMessage("postNotification", name, notifMsg);
        this.props.updateName(userName);
      }
    }
  }

  contentEntered(event) {
    const { keyCode } = event;
    const userName = this.state.username;
    const { name } = this.props.currentUser;
    const msg = this.state.message;
    if (keyCode === 13) {
      if (userName !== name) {
        this.props.updateName(userName);
      }
      this.props.finishMessage("postMessage", userName, msg);
      this.setState({message: ''});
    }
  }

  // detectEnter(event){
  //   if (event.key == 'Enter') {
  //     this.props.finishMessage(this.state.type, this.state.username, this.state.message);
  //     this.setState({username: '', message: ''});
  //   }
  // }

}
export default Chatbar;






