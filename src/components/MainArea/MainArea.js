import ClientArea from '../ClientArea/ClientArea'
import PersonellArea from '../PersonellArea/PersonellArea';
import { useEffect, useState } from "react";
import { Auth } from 'aws-amplify'
import './MainArea.css';

// Fetches the logged in user and conditionally renders based on if they are 
// personell or not
function MainArea() {

  const [user, setUser] = useState(null); // logged in user

  useEffect(() => {

    const fetchAuthenticatedUser = async () => {
      let user = await Auth.currentAuthenticatedUser();
      if (!user) return;
      setUser(user);
    }

    fetchAuthenticatedUser();
  }, [])
  
  // A hacky way to check if user belongs to user group 'Personell'.
  // This can probably be exploited to get access to the PersonellArea but I don't think it
  // would expose chats because they are all fetched with authentication.
  let userGroup = user?.signInUserSession?.accessToken?.payload["cognito:groups"];
  let isPersonell = userGroup && userGroup.includes('Personell');

  return (
    <div className='MainArea'>
      { (isPersonell && <PersonellArea user={user}/>)
      || <ClientArea user={user} />} 
    </div>
  );
}

export default MainArea;