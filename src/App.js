import User from "./components/user-navbar";
import React, { useState } from 'react';
import SignIn from "./components/sign_in"
import CreateOrder from "./components/CreateOrder";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from "./components/dashboard"
import { AnimatePresence, motion } from "framer-motion";
import {  useLocation } from "react-router-dom"


const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
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
              </Routes>
          </div>
        </AnimatePresence>
        
      </div>
    
  );
}

export default App