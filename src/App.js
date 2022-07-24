import './App.css';
import Giphy from './components/Giphy';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {useAuthState} from 'react-firebase-hooks/auth'
// import {useCollectionData} from 'react-firebase-hooks/firestore'


// Initialization
firebase.initializeApp({
  apiKey: "AIzaSyBWtYrBDKw1e8PlZiyZaYs75FeoWAbNiTs",
  authDomain: "react-giphy-searchbox.firebaseapp.com",
  projectId: "react-giphy-searchbox",
  databaseURL: "https://react-giphy-searchbox.firebaseio.com",
  storageBucket: "react-giphy-searchbox.appspot.com",
  messagingSenderId: "587754535957",
  appId: "1:587754535957:web:d231e178b1b35f1df0221c",
  measurementId: "G-V8KZ923VG9"
});

const auth = firebase.auth();

// const firestore = firebase.firestore();


function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className='row'>
        <h1 className='col-9'>
          Welcome to React Giphy SearchBox
        </h1>
        <SignOut/>

      </header>

        {user ? <Giphy/> : <SignIn/>}
    </div>
  );
}

function SignIn(){

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return(
    <div className='sign-in'>
      <button className='btn btn-dark mx-2 col-3' onClick={signInWithGoogle}>Sign in with Google account</button>
    </div>
  )
}

function SignOut(){
  
  return auth.currentUser &&(
    <>
    <button className='btn btn-dark mx-2 col-2' onClick={() => auth.signOut()}>Sign Out</button>
    </>
  )
}


export default App;
