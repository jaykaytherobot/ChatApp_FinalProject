import './ChatHistory.css';
import React from 'react';

function ChatHistory({ user, messages }) {
  if (!messages) messages = [];

  console.log(user);
  return (
    <div className='ChatHistory'>
      {
        messages.map(m => (
          <div className={user === m.owner ? 'Message Mine' : 'Message'}key={m.id}>
            <p className='SenderText'>{user === m.owner ? 'me' : m.owner}</p>
            <p className='Content'>{m.content}</p>
            <p className='TimeStamp'>{m.createdAt || ''}</p>
          </div>
        ))
      }
    </div>
  );
}

export default ChatHistory;