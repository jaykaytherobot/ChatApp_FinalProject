import './MessageInput.css';
import Button from '..//Button/Button';
import { API } from 'aws-amplify';
import { createMessage, deleteMessage } from '../../graphql/mutations';
import { messagesByOwner } from '../../graphql/queries';
import { useState } from 'react';

function MessageInput({ username, receiver, setMessages }) {
  const [content, setContent] = useState('');

  async function sendMessage() {
    if (!content || !username) return;

    let result = await API.graphql({ 
      query: createMessage, 
      variables: { 
        input: {
          owner: username, 
          receiver: receiver, 
          content,
          status: 'PENDING',
        } }
    });
    console.log(result);
    setMessages(messages => [...messages, result.data.createMessage]);
  }

  async function deleteAllMessages(evt) {
    evt.preventDefault();
    let myMessagesData = await API.graphql({
      query: messagesByOwner,
      variables: {
        owner: username,
      }
    });
    let myMessages = myMessagesData?.data?.messagesByOwner?.items;
    if (!myMessages) return;
    for (let message of myMessages) {
      let id = message.id;
      let deletedMessage = await API.graphql({
        query: deleteMessage,
        variables: { input: { id }},
      });
      console.log(deletedMessage)
    }
  }

  return (
    <div className='MessageInput'>
      <input className='input' 
        onChange={e => setContent(e.target.value)}
        />
      <Button 
        text='Send'
        onClick={sendMessage}
      />
      <Button 
        text='delete my messages' 
        onClick={deleteAllMessages} />

    </div>
  );
}

export default MessageInput;