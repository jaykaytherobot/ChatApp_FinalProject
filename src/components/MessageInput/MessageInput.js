import './MessageInput.css';
import Button from '..//Button/Button';
import { API } from 'aws-amplify';
import { createMessage, deleteMessage } from '../../graphql/mutations';
import { useState } from 'react';
import { messagesByOwner } from '../../graphql/queries';

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
    
    setContent('');
    document.getElementById('messageContainer').value = '';
  }

  async function deleteAllMessages(evt) {
    evt.preventDefault();
    let myMessagesData = await API.graphql({
      query: messagesByOwner,
      variables: {
        owner: username,
      }
    });
    console.log(myMessagesData);
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
      <form className='formInput' 
            onSubmit={e => { e.preventDefault(); sendMessage() }}
            autocomplete="off">
        <input className='input' id='messageContainer' 
          onChange={e => setContent(e.target.value)}
          />
        <input type='submit' hidden/>
      </form>
      <Button 
        text='Send'
        _className='SendArrow'
        onClick={sendMessage}
      />
      <Button 
        text='delete my messages' 
        _className={false}
        onClick={deleteAllMessages} />

    </div>
  );
}

export default MessageInput;