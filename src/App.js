import User from "./components/user-navbar";
import React, { useState } from 'react';
import SignIn from "./components/sign_in"
import CreateOrder from "./components/CreateOrder";
import {  Route, Routes, Navigate } from 'react-router-dom';
import {Dashboard} from "./components/Dashboard"
import { AnimatePresence, motion } from "framer-motion";
import {  useLocation } from "react-router-dom"
import SignOut from "./components/sign_out";

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 3, x: -50 }}
    animate={{ opacity: 5, x: 0 }}
    exit={{ opacity: 6, x: 50 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);
function App() {
  
  const [isauthenticated, setisauthenticated]=useState(false)
  
  React.useEffect(() => {
    console.log("Is Authenticated:", isauthenticated);
  }, [isauthenticated]);



  return (
    
      
      <div>
        <AnimatePresence mode="wait">

          <div >
              <Routes loocation={useLocation()} key={useLocation().pathname} >
                <Route path="/" element={isauthenticated?<Dashboard/>:<Navigate to="/signin"/>}/>
                <Route path="/signin" element={<SignIn setAuth={setisauthenticated}/>}/>
                <Route path="/dashboard" element={isauthenticated ? <Dashboard /> : <PageTransition>  <Navigate to="/signin" /></PageTransition>} />
                <Route path="/user"   element={isauthenticated? <User/> :<PageTransition>  <Navigate to="/signin" /></PageTransition>} />
                <Route path="/createorder" element={isauthenticated? <CreateOrder />:<Navigate to="/signin"/>} />
                <Route path="/signout" element={<SignOut setAuth={setisauthenticated} />} />
             
              </Routes>
          </div>
        </AnimatePresence>
        
      </div>
    
  );
}

export default App