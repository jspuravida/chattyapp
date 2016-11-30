import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.detectEnter = this.detectEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    console.log("Rendering ChatBar");
    return (
      <footer>
        <input
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
          value={this.props.currentUser.name}
        />

        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          value={this.state.value}
          onChange={this.handleChange}
          // onSubmit={this.submitMessage}
          onKeyDown={this.detectEnter}
        />
      </footer>
    );
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  detectEnter(event){
    if (event.key == 'Enter') {
      this.props.finishMessage(this.state.value);
      this.setState({value: ''});
    }
  }



}
export default Chatbar;






