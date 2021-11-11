import './MessageInput.css';
import Button from '..//Button/Button';
import { API } from 'aws-amplify';
import { createMessage, deleteMessage } from '../../graphql/mutations';
// import { messagesByClient } from '../../graphql/queries';
import { useState } from 'react';
import { messagesByClient } from '../../graphql/queries';

function MessageInput({ username, client }) {
  const [content, setContent] = useState('');

  async function sendMessage() {
    if (!content || !username) return;

    let result = await API.graphql({ 
      query: createMessage, 
      variables: { 
        input: {
          owner: username, 
          client: client, 
          content,
          status: 'PENDING',
        } }
    });
  }

  async function deleteAllMessages(evt) {
    evt.preventDefault();
    let myMessagesData = await API.graphql({
      query: messagesByClient,
      variables: {
        client,
      }
    });
    let myMessages = myMessagesData?.data?.messagesByClient?.items;
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