import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import MainArea from './components/MainArea/MainArea';
import Amplify, { Auth } from 'aws-amplify';
import awsmobile from './aws-exports';
import './App.css';

// Configure backend services
Amplify.configure(awsmobile);
Auth.configure(awsmobile);

// Component rendered for logged in users
function App() {
  return (
    <div className="App">
      <MainArea />
      <AmplifySignOut />
    </div>
  );
}

// App wrapped in the Authenticator component.
// Provides us with log in and sign up functionality.
export default withAuthenticator(App);
