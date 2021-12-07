import { useEffect, useState } from "react";
import './ChatList.css';

// Gets the setRecipient from PersonellArea and allows Personell to switch between active
// chats.
function ChatList({ recipient, setRecipient }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    setChats(['jóhannes', 'gunnar', 'placeholder1', 'placeholder2']) // <- HARD CODED VALUES!!!
  }, []);

  return (
    <ul className='ChatList'>
      {chats.map((chat, i) => 
        <li key={i}
            className={recipient===chat ? 'ChatListItem ChatListItem__selected' : 'ChatListItem'}
            onClick={() => { 
              setRecipient(chat) }}
        >{chat}</li>)}
    </ul>
  )
}

export default ChatList;