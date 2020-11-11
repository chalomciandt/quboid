import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import socketIOClient from "socket.io-client";
import Board from './components/Board';
const ENDPOINT = "http://localhost:4000";

// ========================================

function Clock(props) {
  const { time } = props;
  const formatDate = (time === '' ? '?' : new Date(time).toLocaleTimeString());
  return (
    <p className="clock">
      Server time: <time dateTime={time}>{formatDate}</time>
    </p>
  );
}

class PlayerList extends Component {
  render() {
    const { players } = this.props;
    return (
      <div className="playerList">
        <p>You're in the player lobby.</p>
        <p>Click on a player name to challenge them!</p>
        {
          players.map(player => {
            console.log(player);
            return (<div
              key={player}
              className="playerAvatar"
            >
              <i class="fas fa-2x fa-user-circle"></i>
              <span className="playerName">{player}</span>
            </div>);
          })
        }
      </div>
    );
  }
}

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', show: true };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }
  handleSubmit(event) {
    const socket = socketIOClient(ENDPOINT);
    socket.emit("newplayer", this.state.value);
    this.setState({show: false});
    event.preventDefault();
  }

  render() {
    console.log(this.state.show);
    return (
      <form className={"nameForm " + (this.state.show ? 'show' : '')} onSubmit={this.handleSubmit}>
        <h2>What is your name?</h2>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class Lobby extends Component {
  state = {
    time: '',
    players: []
  }

  constructor(props) {
    super(props);
    const socket = socketIOClient(ENDPOINT);
    socket.on("clock", time => {
      this.setState({time: time});
    });
    socket.on("lobbyplayers", players => {
      this.setState({players: players});
    });
  }

  render() {
    return (
      <div className="lobby">
        <Clock
          time={this.state.time}
        />
        <h1>Welcome to Quboid!</h1>
        <PlayerList
          players={this.state.players}
        />
        <NameForm />
      </div>
    );
  }
}

ReactDOM.render(
  <Lobby />,
  document.getElementById('root')
);
