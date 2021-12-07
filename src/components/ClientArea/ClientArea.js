import { messagesByClient } from "../../graphql/queries";
import MessageInput from "../MessageInput/MessageInput";
import ChatHistory from "../ChatHistory/ChatHistory";
import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import './ClientArea.css';

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

function ClientArea({ user }) {
  const [messages, setMessages] = useState([]); // list of messages

  useEffect(() => {
    // There has to be a logged in user for us to fetch them messages
    if (!user || !user.username) return;
    
    const fetchChat = async (username) => {

      const messagesByClientData = await API.graphql({
        query: messagesByClient, 
        variables: { client: username, sortDirection: 'ASC' }
      });

      const _messagesByClient = messagesByClientData?.data?.messagesByClient?.items || [];

      setMessages([..._messagesByClient]);

    }

    fetchChat(user.username);

    // Subscription on new messages where Client is the logged in user
    const subscription = API.graphql({
      query: onCreateMessageClient, 
      variables: {
        client: user.username,
      }
    }).subscribe({
      next: (data) => {
        let content = data?.value?.data?.onCreateMessage;
        if (!content) return;
        
        setMessages(messages => [...messages, content])
      }
    });

    return function cleanup() {
      subscription.unsubscribe();
    }

  }, [user]);

  return (
    <div className='ClientArea'>
      <ChatHistory
        user = {user?.username }
        messages = { messages } />
      <MessageInput 
        username = {user?.username }
        client = { user?.username } 
        setMessages = { setMessages } />
    </div>
  );
}

export default ClientArea;