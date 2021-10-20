import './ChatHistory.css';
import React from 'react';

function ChatHistory({ username, messages }) {
  console.log('Rendering chat history again')
  if (!messages) messages = [];

  return (
    <div className='ChatHistory'>
      {
        messages.map(m => (
          <div key={m.id}>
            {(username === m.owner && <p>me</p>) || <p>{m.owner}</p>}
            <p>{m.content}</p>
          </div>
        ))
      }
    </div>
  );
}

export default ChatHistory;