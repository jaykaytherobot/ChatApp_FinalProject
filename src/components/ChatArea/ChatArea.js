import './ChatArea.css';
import ChatHistory from "../ChatHistory/ChatHistory";
import MessageInput from "../MessageInput/MessageInput";
import { useEffect, useState } from 'react';
import { messagesByOwner, messagesByReceiver } from '../../graphql/queries';
import { API } from 'aws-amplify';
import { onCreateMessage } from '../../graphql/subscriptions';

const onCreateMessageRecipient = `
subscription OnCreateMessage($receiver: String) {
  onCreateMessage(receiver: $receiver) {
    id
    status
    content
    owner
    receiver
    createdAt
    updatedAt
  }
}
`;

// user : User obj frá aws
// isPersonell: truthy value hvort user sé personell eða ekki
// recipient: String - nafn þess sem að user er að tala við
function ChatArea({ user, isPersonell, recipient }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // only load chats if both the recipient and the user are defined
    if (!user || !recipient) return;

    let subscription;

    // Fetches the chat history of two user
    // TODO make it fetch chat history of two users
    async function fetchChat(username) {
      if (!username) return;

      const dataFromMe = await API.graphql({
        query: messagesByOwner,
        variables: { owner: username },
      });
      if (isPersonell) username = 'Personell';
      const dataToMe = await API.graphql({
        query: messagesByReceiver, 
        variables: { receiver: username }
      });
      
      console.log('setting messages')
      setMessages([...dataFromMe?.data?.messagesByOwner?.items, ...dataToMe?.data?.messagesByReceiver?.items] || []);
    }

    fetchChat(user.username);

    if (user.username) {
      console.log(`Subscribing to messages sent to ${user.username}`)//` from ${recipient}`);
      // Subscribe to messages sent by recipient to me
      subscription = API.graphql({
        query: onCreateMessageRecipient, 
        variables: {
          //owner: null,// recipient, 
          receiver: (isPersonell && 'Personell') || user.username
        },
      }).subscribe({
        next: data => {
          let content = data?.value?.data?.onCreateMessage;
          if (!content) return;
          setMessages(messages => [...messages, content])
        }
      });
    }
    return function cleanup() {
      if (subscription) subscription.unsubscribe();
    }
  }, [user, recipient]);

  return (
    <div className='ChatArea'>
      <ChatHistory 
        user = { user?.username }
        messages = { messages }/> 
      <MessageInput username={ user?.username }
        receiver = { recipient }
        setMessages = { setMessages }/>
    </div>
  );
}

export default ChatArea;