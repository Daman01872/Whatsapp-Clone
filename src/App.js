import './App.css';
import Chat from './components/chatsidebar/Chat';
import Sidebar from './components/sidebar/Sidebar';
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/login/Login';
import { useStateValue } from './components/context/StateProvider';
import { auth } from './firebase';

function App() {

  const [{user}, dispatch] = useStateValue();
  // console.log(user);

  useEffect(()=> {
    auth.onAuthStateChanged(user => {
      dispatch({
        type:"SET_USER",
        user:user
      })
    })

  },[])
  return (

    <div className="App">
        {!user ? (<Login/>) : (

      <div className="app_body">
    <Router>
        {/* Side Bar */}
        <Sidebar />
      <Switch>
        
        <Route exact path = "/">
        {/* Chat */}
             <Chat/>
        </Route>

        <Route path = '/room/:roomId'>
             <Chat/>
        </Route>
        {/* <h1> Whatsapp Clone </h1> */}
        </Switch>
    </Router>
          </div>
        ) }
        </div>
  );
}

export default App;
