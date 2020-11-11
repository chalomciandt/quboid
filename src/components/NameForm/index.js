import React, { Component } from 'react';
import './index.css';

export default class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', show: true };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    this.props.socket.emit("newplayer", this.state.value);
    this.setState({ show: false });
    event.preventDefault();
  }

  render() {
    return (
      <form className={"nameForm " + (this.state.show ? 'show' : '')} onSubmit={this.handleSubmit}>
        <h2>What is your name?</h2>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" className="submit" value="Submit" />
      </form>
    );
  }
}
