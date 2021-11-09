import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { messagesByOwner, messagesByReceiver } from "../../graphql/queries";
import './ClientArea.css';
import ChatHistory from "../ChatHistory/ChatHistory";
import MessageInput from "../MessageInput/MessageInput";

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

function ClientArea({ user }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user || !user.username) return;
    
    const fetchChat = async (username) => {
      const messagesFromClientData = await API.graphql({
        query: messagesByOwner,
        variables: { owner: username }
      });
      const messagesToClientData = await API.graphql({
        query: messagesByReceiver, 
        variables: { receiver: username }
      });

      const messagesFromClient = messagesFromClientData?.data?.messagesByOwner?.items || [];
      const messagesToClient = messagesToClientData?.data?.messagesByReceiver?.items || [];

      setMessages([...messagesFromClient, ...messagesToClient])
    }

    fetchChat(user.username);

    const subscription = API.graphql({
      query: onCreateMessageRecipient, 
      variables: {
        receiver: user.username,
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
        username = { user?.username } 
        receiver = 'Personell' 
        setMessages = { setMessages } />
    </div>
  );
}

export default ClientArea;