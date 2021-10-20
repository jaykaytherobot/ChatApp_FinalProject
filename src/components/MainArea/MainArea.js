import ChatArea from "../ChatArea/ChatArea";
import ChatList from "../ChatList/ChatList";
import { Auth } from 'aws-amplify'
import './MainArea.css';
import { useEffect, useState } from "react";

function MainArea() {
  const [user, setUser] = useState(null); // stores the user that is logged in

  useEffect(() => {
    const asyncFunction = async () => {
      let user = await Auth.currentAuthenticatedUser('');
      if (!user) return;
      setUser(user);
    }
    asyncFunction()
  }, [])
  
  let isPersonell = user?.signInUserSession?.accessToken?.payload["cognito:groups"];

  return (
    <div className='MainArea'>
      { isPersonell && <ChatList />}
      <ChatArea user = {user}/>
    </div>
  );
}

export default MainArea;