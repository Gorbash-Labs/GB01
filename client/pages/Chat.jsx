import React, { useEffect } from 'react';
// import WebSocket from 'ws';
import { io } from 'socket.io-client'

function Chat() {
  let sock = new WebSocket('ws://localhost:5000');
  sock.binaryType = 'blob';

  useEffect(() => {
    
    const element = document.querySelector('#chat-box');
    sock.onmessage = (e) => {
        e.data.text().then(data => 
            element.innerHTML += data + '<br>'
        )
    };


    // const socket = io('http://localhost:5000')
    // socket.on('connect', () => { 
    //   displayMessage('You were connected with id:', socket.id)
    //  })

    //  socket.emit('custom-event', {username: 'kevin',
    // message: 'my message'})
  }, []);

  const onClick = () => {
    let text = document.getElementById('text').value;
    sock.send(JSON.stringify(text));
  };

  return (
    <div className="chat-container-main">
      <div id="chat-box"></div>
      <input type="text" id="text" placeholder="Your message"></input>
      <button onClick={onClick}>Submit</button>
      
    </div>
  );
}

export default Chat;
