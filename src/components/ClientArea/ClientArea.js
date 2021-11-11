import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { messagesByClient } from "../../graphql/queries";
import './ClientArea.css';
import ChatHistory from "../ChatHistory/ChatHistory";
import MessageInput from "../MessageInput/MessageInput";

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
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user || !user.username) return;
    
    const fetchChat = async (username) => {
      const messagesByClientData = await API.graphql({
        query: messagesByClient, 
        variables: { client: username, sortDirection: 'ASC' }
      });
      // const messagesFromClientData = await API.graphql({
      //   query: messagesByOwner,
      //   variables: { owner: username }
      // });
      // const messagesToClientData = await API.graphql({
      //   query: messagesByReceiver, 
      //   variables: { receiver: username }
      // });

      const _messagesByClient = messagesByClientData?.data?.messagesByClient?.items || [];
      // const messagesToClient = messagesToClientData?.data?.messagesByReceiver?.items || [];

      setMessages([..._messagesByClient]);
    }

    fetchChat(user.username);

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