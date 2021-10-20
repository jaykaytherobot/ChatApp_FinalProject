import './ChatArea.css';
import ChatHistory from "../ChatHistory/ChatHistory";
import MessageInput from "../MessageInput/MessageInput";
import { useEffect, useState } from 'react';
import { messagesByOwner, messagesByReceiver } from '../../graphql/queries';
import { API } from 'aws-amplify';
import { onCreateMessage } from '../../graphql/subscriptions';


function ChatArea({ user }) {
  const [messages, setMessages] = useState([]);

  const isPersonell = user
    ?.signInUserSession
    ?.accessToken
    ?.payload["cognito:groups"]; 

  useEffect(() => {
    const abortController = new AbortController();
    if (!user) return;

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

    if (user?.username) {
      console.log(isPersonell);
      let owner = 'admin';
      let receiver = 'jóhannes';
      if (isPersonell) {
        owner = receiver;
        receiver = 'Personell';
      }
      console.log(`Subscribing to messages sent to ${receiver} from ${owner}`)
      API.graphql({
        query: onCreateMessage, 
        variables: {
          owner, 
          receiver
        },
      }).subscribe({
        next: data => {
          let content = data?.value?.data?.onCreateMessage;
          console.log(content);
          if (!content) return;
          setMessages(messages => [...messages, content])
        }
      });
    }
    return function cleanup() {
      abortController.abort();
    }
  }, [user]);

  return (
    <div className='ChatArea'>
      <ChatHistory 
        user={user?.username}
        messages={messages}/> 
      <MessageInput username={user?.username}
        receiver={isPersonell ? 'jóhannes' : 'Personell'}
        setMessages={setMessages}/>
    </div>
  );
}

export default ChatArea;