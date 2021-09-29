import './MessageInput.css';
import Button from '..//Button/Button';
function MessageInput() {
  return (
    <div className='MessageInput'>
      <input className='input' />
      <Button 
        text='Send'  
      />
    </div>
  );
}

export default MessageInput;