import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: ''
    };
    this.detectEnter = this.detectEnter.bind(this);
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
          onKeyDown={this.detectEnter}
        />

        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          value={this.state.message}
          onChange={this.handleContentChange}
          onKeyDown={this.detectEnter}
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

  detectEnter(event){
    if (event.key == 'Enter') {
      this.props.finishMessage(this.state.username, this.state.message);
      this.setState({username: '', message: ''});
    }
  }

}
export default Chatbar;






