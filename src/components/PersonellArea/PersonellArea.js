// import './ChatArea.css';
import MessageInput from "../MessageInput/MessageInput";
import ChatHistory from "../ChatHistory/ChatHistory";
import ChatList from "../ChatList/ChatList";
import './PersonellArea.css';

import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { onCreateMessage } from '../../graphql/subscriptions';
import { messagesByOwner, messagesByReceiver } from '../../graphql/queries';

// user : User obj frá aws
// isPersonell: truthy value hvort user sé personell eða ekki
// recipient: String - nafn þess sem að user er að tala við
function PersonellArea({ user }) {
  
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState('jóhannes');

  useEffect(() => {
    // only load chats if both the recipient and the user are defined
    if (!user || !user?.username || !recipient) return;

    // Fetches the chat history of two user
    // TODO make it fetch chat history of two users
    const fetchChat = async () => {
      const messagesFromClientData = await API.graphql({
        query: messagesByOwner,
        variables: { owner: recipient },
      });

      const messagesToClientData = await API.graphql({
        query: messagesByReceiver, 
        variables: { receiver: recipient }
      });
      
      const messagesFromClient = messagesFromClientData?.data?.messagesByOwner?.items || [];
      const messagesToClient = messagesToClientData?.data?.messagesByReceiver?.items || [];

      console.log('setting messages')
      setMessages([...messagesFromClient, ...messagesToClient]);
    }

    fetchChat(user.username);

    const subscription = API.graphql({
      query: onCreateMessage, 
      variables: {
        owner: recipient, 
        receiver: 'Personell',
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
    <ChatList setRecipient={setRecipient}/>
    <div className='PersonellArea'>
      <ChatHistory 
        user = { user?.username }
        messages = { messages }/> 
      <MessageInput 
        username={ user?.username }
        receiver = { recipient }
        setMessages = { setMessages }/>
    </div>
    </>
  );
}

export default PersonellArea;