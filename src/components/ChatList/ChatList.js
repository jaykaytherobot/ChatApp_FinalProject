import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { messagesByReceiver } from "../../graphql/queries";

function ChatList({ setRecipient }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    setChats(['johannes'])
  }, []);

  return (
    <ul>
      {chats.map((chat, i) => 
        <li key={i}
            onClick={() => { 
              console.log('change recipient')
              setRecipient(chat) }}
        >{chat}</li>)}
    </ul>
  )
}

export default ChatList;