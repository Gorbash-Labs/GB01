import React, { useEffect } from 'react';
// import WebSocket from 'ws';

function Chat() {
  let sock = new WebSocket('ws://localhost:5000');
  sock.binaryType = 'blob';

  useEffect(() => {
    
    const element = document.querySelector('#item');
    sock.onmessage = (e) => {
        e.data.text().then(data => 
            element.innerHTML += data + '<br>'
        )
    };
  }, []);

  const onClick = () => {
    let text = document.getElementById('text').value;
    sock.send(JSON.stringify(text));
  };

  return (
    <div className="chat-container-main">
      Chat Feature
      <input type="text" id="text" placeholder="Your message"></input>
      <button onClick={onClick}>Submit</button>
      <div id="item"></div>
    </div>
  );
}

export default Chat;
