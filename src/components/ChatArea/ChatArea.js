import './ChatArea.css';
import ChatHistory from "../ChatHistory/ChatHistory";
import MessageInput from "../MessageInput/MessageInput";

function ChatArea() {
  return (
    <div className='ChatArea'>
      <ChatHistory />
      <MessageInput />
    </div>
  );
}

export default ChatArea;