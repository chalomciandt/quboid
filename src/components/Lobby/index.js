import React, { Component } from 'react';
import Clock from '../Clock';
import NameForm from '../NameForm';
import PlayerList from '../PlayerList';
import './index.css';

export default class Lobby extends Component {
  render() {
    return (
      <div className={"lobby " + (this.props.show ? "show" : "")}>
        <Clock
          time={this.props.parentState.time}
        />
        <h1>Welcome to Quboid!</h1>
        <PlayerList
          players={this.props.parentState.players}
          whoami={this.props.parentState.whoami}
          sendChallenge={this.props.sendChallenge}
        />
        <NameForm
          handleSubmit={this.props.submitNameForm}
        />
      </div>
    );
  }
}
