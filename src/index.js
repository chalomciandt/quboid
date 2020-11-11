import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import socketIOClient from "socket.io-client";
import Board from './components/Board';
const ENDPOINT = "http://localhost:4000";

// ========================================

function Clock(props) {
  const { response } = props;
  console.log(response);
  const formatDate = new Date(response).toLocaleTimeString();
  return (
    <p>
      Server time: <time dateTime={response}>{formatDate}</time>
    </p>
  );
}

function Lobby() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    console.log(socket);
    socket.on("clock", data => {
      setResponse(data);
    });
  }, []);

  return (
    <div className="lobby">
      <Clock
        response = {response}
      />
    </div>
  );
}

ReactDOM.render(
  <Lobby />,
  document.getElementById('root')
);
