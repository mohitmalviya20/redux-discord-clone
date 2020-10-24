import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import Chat from './components/Chat';
import { auth } from './components/firebase';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import { selectUser} from "./features/userSlice"
import {login, logout} from "./features/userSlice"

function App() {
  const dispatch =useDispatch()
  const user = useSelector(selectUser)
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(
          login({
            uid:authUser.uid,
            photo:authUser.photoURL,
            email:authUser.email,
            displayName: authUser.displayName
          })
        )

      }
      else{
        dispatch(logout())

      }
    })

  },[dispatch])
  return (
    <div className="App">
      {
        user?(
          <>
          <Sidebar/>
          <Chat/>
          </>
        ):(
          <Login/>
        )
      }
      
    </div>
  );
}

export default App;
