import { messagesByClient } from '../../graphql/queries';
import MessageInput from "../MessageInput/MessageInput";
import ChatHistory from "../ChatHistory/ChatHistory";

import ChatList from "../ChatList/ChatList";

import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import './PersonellArea.css';

// Custom graphql subscription query to subscribe on createMessages with specific client.
const onCreateMessageClient = `
subscription OnCreateMessage($client: String) {
  onCreateMessage(client: $client) {
    id
    status
    content
    owner
    client
    createdAt
    updatedAt
  }
}
`;

function PersonellArea({ user }) {
  
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState('jóhannes'); // <- HARD CODED INITIAL VALUE!!!

  useEffect(() => {
    // only load chats if both the recipient and the user are defined
    if (!user || !user?.username || !recipient) return;

    // Fetches the chat history where Client is the defined recipient
    const fetchChat = async () => {

      const messagesByClientData = await API.graphql({
        query: messagesByClient,
        variables: { client: recipient },
      });
      
      const _messagesByClient = messagesByClientData?.data?.messagesByClient?.items || [];

      setMessages([..._messagesByClient]);

    }

    fetchChat(user.username);

    // Subscription on new messages where Client is the defined recipient
    const subscription = API.graphql({
      query: onCreateMessageClient, 
      variables: {
        client: recipient,
      }
    }).subscribe({
      next: (data) => {
        let content = data?.value?.data?.onCreateMessage;
        if (!content) return;
        setMessages(messages => [...messages, content]);
      }
    });

    return function cleanup() {
      subscription.unsubscribe();
    }
  }, [user, recipient]);

  return (
    <>
    <ChatList recipient={ recipient } setRecipient={ setRecipient }/>
    <div className='PersonellArea'>
      <ChatHistory 
        user = { user?.username }
        messages = { messages }/> 
      <MessageInput 
        username={ user?.username }
        client={ recipient }
        setMessages = { setMessages }/>
    </div>
    </>
  );
}

export default PersonellArea;