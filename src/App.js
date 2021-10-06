import Amplify, { Auth } from 'aws-amplify';
import awsmobile from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import './App.css';
import MainArea from './components/MainArea/MainArea';

Amplify.configure(awsmobile);
Auth.configure(awsmobile);

function App() {
  return (
    <div className="App">
      <MainArea />
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
