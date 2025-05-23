import User from "./components/user-navbar";
import { UserProvider } from "./components/userContext";
import React, { useState } from 'react';
import SignIn from "./components/sign_in";
import CreateOrder from "./components/CreateOrder";
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import  Dashboard  from "./components/Dashboard";
import { AnimatePresence, motion } from "framer-motion";
import SignOut from "./components/sign_out";
import Requesthistory from "./components/requestHistory";
import axios from "axios";
import Forgotpassword from "./components/forgotpassword"
import {ErrorBoundary} from "react-error-boundary"
import Fallback from "./components/errorboundary";
import UserTasks from "./components/Usertask";


const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

const PageTransition = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();
  const [isauthenticated, setisauthenticated] = useState(null);

  React.useEffect(() => {
    const handleTabclose=()=>{
      navigator.sendBeacon(`${process.env.REACT_APP_API_URL}/api/logout`)
    }
    window.addEventListener("beforeunload",handleTabclose)
    const checkAuth = async () => {
      try {
        const token=localStorage.getItem('authToken')
        const API_URL=`${process.env.REACT_APP_API_URL}/api`
        const response = await axios.get(`${API_URL}/access`,
          {headers:{Authorization:`Bearer ${token}`,"ngrok-skip-browser-warning": "true"},
          
        withCredentials: true });
        setisauthenticated(response.data.authenticated);
        
      } catch (error) {
        setisauthenticated(false);
        console.error(error);
      }
    };
    checkAuth();
    return()=>{
      window.removeEventListener("beforeunload", handleTabclose);
    }
  }, [isauthenticated]);

  if (isauthenticated === null) return <div>Loading...</div>;

  return (
    
    <ErrorBoundary  fallback={<Fallback/>} >

      <UserProvider >
        <div className="min-h-screen bg-gray-100 w-full px-0">
  
        
          {isauthenticated && <User />}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/signin" element={!isauthenticated ? <PageTransition><SignIn setAuth={setisauthenticated} /></PageTransition> : <Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={isauthenticated ? <PageTransition><Dashboard /></PageTransition> : <Navigate to="/signin" />} />
              <Route path="/requesthistory" element={isauthenticated ? <PageTransition><Requesthistory /></PageTransition> : <Navigate to="/signin" />} />
              <Route path="/forgotpassword" element={ <PageTransition><Forgotpassword /></PageTransition> } />
              <Route path="/user" element={isauthenticated ? <PageTransition><User /></PageTransition> : <Navigate to="/signin" />} />
              <Route path="/usertasks" element={isauthenticated ? <PageTransition><UserTasks /></PageTransition> : <Navigate to="/signin" />} />
              <Route path="/createorder" element={isauthenticated ? <PageTransition><CreateOrder /></PageTransition> : <Navigate to="/signin" />} />
              <Route path="/signout" element={<PageTransition><SignOut setAuth={setisauthenticated} /></PageTransition>} />
              <Route path="*" element={<Navigate to={isauthenticated ? "/dashboard" : "/signin"} />} />
            </Routes>
          </AnimatePresence>
        </div>
      </UserProvider>
    
    </ErrorBoundary>
  );
}

export default App;
