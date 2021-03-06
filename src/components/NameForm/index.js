import React, { Component } from 'react';
import './index.css';

export default class NameForm extends Component {
  state = {
    value: '',
    show: true
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    const { value } = this.state;
    // Adds a random termination to the chosen name to avoid duplicate names in the server
    const uniqueName = value + "#" + (Math.floor(Math.random() * 4095).toString(16));
    this.props.handleSubmit(uniqueName);
    this.setState({ show: false });
    event.preventDefault();
  }
  render() {
    return (
      <form className={"nameForm " + (this.state.show ? 'show' : '')} onSubmit={(e) => this.handleSubmit(e)}>
        <h2>What is your name?</h2>
        <input type="text" value={this.props.value} onChange={(e) => this.handleChange(e)} />
        <input type="submit" className="submit" value="Submit" />
      </form>
    );
  }
}
