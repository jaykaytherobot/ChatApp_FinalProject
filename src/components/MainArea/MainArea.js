import ClientArea from '../ClientArea/ClientArea'
import PersonellArea from '../PersonellArea/PersonellArea';
import { Auth } from 'aws-amplify'
import './MainArea.css';
import { useEffect, useState } from "react";

function MainArea() {
  const [user, setUser] = useState(null); // stores the user that is logged in

  useEffect(() => {
    const fetchAuthenticatedUser = async () => {
      let user = await Auth.currentAuthenticatedUser();
      if (!user) return;
      setUser(user);
        
    }
    fetchAuthenticatedUser();
  }, [])
  
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