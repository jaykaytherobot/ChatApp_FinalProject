import { useEffect, useState } from "react";

function ChatList({ setRecipient }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    setChats(['jóhannes', 'gunnar'])
  }, []);

  return (
    <ul>
      {chats.map((chat, i) => 
        <li key={i}
            onClick={() => { 
              console.log(`change recipient to ${chat}`)
              setRecipient(chat) }}
        >{chat}</li>)}
    </ul>
  )
}

export default ChatList;