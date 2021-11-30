import { useEffect, useState } from "react";
import './ChatList.css';
function ChatList({ recipient, setRecipient }) {
  console.log(recipient)
  const [chats, setChats] = useState([]);

  useEffect(() => {
    setChats(['jóhannes', 'gunnar', 'placeholder1', 'placeholder2'])
  }, []);

  return (
    <ul className='ChatList'>
      {chats.map((chat, i) => 
        <li key={i}
            className={recipient===chat ? 'ChatListItem ChatListItem__selected' : 'ChatListItem'}
            onClick={() => { 
              console.log(`change recipient to ${chat}`)
              setRecipient(chat) }}
        >{chat}</li>)}
    </ul>
  )
}

export default ChatList;