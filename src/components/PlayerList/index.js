import React, { Component } from 'react';
import './index.css';

export default class PlayerList extends Component {
  startChallenge(player) {
    const { whoami } = this.props;
    if (!whoami) {
      alert("You need to choose a username first!");
      return;
    }
    if (whoami === player) {
      alert("You can't challenge yourself!");
      return;
    }
    this.props.sendChallenge(player);
  }
  render() {
    const { players, whoami } = this.props;
    return (
      <div className="playerList">
        <p>You're in the player lobby.</p>
        {
          (
            players.length ?
              <p>Click on a player name to challenge them!</p> :
              <p>Waiting for someone to show up...</p>
          )
        }

        {
          players.map(player => {
            return (<div
              key={player}
              className="playerAvatar"
              onClick={() => this.startChallenge(player)}
            >
              <i className="fas fa-2x fa-user-circle"></i>
              <span className={"playerName " + (player === whoami ? 'myself' : '')}>{player}</span>
            </div>);
          })
        }
      </div>
    );
  }
}
