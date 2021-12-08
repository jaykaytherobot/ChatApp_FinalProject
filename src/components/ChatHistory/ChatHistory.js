import './ChatHistory.css';
import React from 'react';

// Renders the messages 
function ChatHistory({ user, messages }) {
  if (!messages) messages = [];

  // The styling is based on if the logged in user ownes the message being rendered
  return (
    <div className='ChatHistory__ScrollView'>
      <div className='ChatHistory'>
        {
          messages.map(m => (
            <div className={user === m.owner ? 'Message Mine' : 'Message'} key={m.id}>
              <p className='SenderText'>{user === m.owner ? 'me' : m.owner}</p>
              <p className='Content'>{m.content}</p>
              <p className='TimeStamp'>{m.createdAt || ''}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default ChatHistory;