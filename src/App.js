import User from "./components/user-navbar";
import React, { useState } from 'react';
import SignIn from "./components/sign_in"
import CreateOrder from "./components/CreateOrder";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from "./components/dashboard"


function App() {
  
  const [isauthenticated, setisauthenticated]=useState(false)
  
  React.useEffect(() => {
    console.log("Is Authenticated:", isauthenticated);
  }, [isauthenticated]);

  return (
    <Router>
      <div>
        
        <div >
          <Routes>
            <Route path="/" element={isauthenticated?<Dashboard/>:<Navigate to="/signin"/>}/>
            <Route path="/signin" element={<SignIn setAuth={setisauthenticated}/>}/>
            <Route path="/dashboard" element={isauthenticated ? <Dashboard /> : <Navigate to="/signin" />} />
            <Route path="/user"   element={isauthenticated? <User/> :<Navigate to="/signin" />} />
            <Route path="/createorder" element={isauthenticated? <CreateOrder />:<Navigate to="/signin"/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App