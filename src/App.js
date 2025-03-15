import User from "./components/user-navbar";
import { UserProvider } from "./components/userContext";
import React, { useState } from 'react';
import SignIn from "./components/sign_in"
import CreateOrder from "./components/CreateOrder";
import {  Route, Routes, Navigate } from 'react-router-dom';
import {Dashboard} from "./components/Dashboard"
import { AnimatePresence, motion } from "framer-motion";
import {  useLocation } from "react-router-dom"
import SignOut from "./components/sign_out";
import Requesthistory from "./components/requestHistory"
import { useUser } from "./components/userContext";

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
  const {user}=useUser
  console.log(user)
  const [isauthenticated, setisauthenticated]=useState(false)
  const [user_data,setuser_data]=useState({})
  React.useEffect(() => {
    console.log("Is Authenticated:", isauthenticated);

    /*const fetchUserData = async () => {
        try {
            console.log("Fetching user data...");
            const token = localStorage.getItem("token"); // Get stored token

            if (!token) {
                console.log("No token found. User is not authenticated.");
                setisauthenticated(false); // Explicitly set authentication state
                return;
            }

            const response = await fetch("http://localhost:5000/api/users", {
                method: "GET",
                
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Send token
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }

            const data = await response.json();
            console.log("User Data:", data);
            setuser_data(data); // Store user data in state
            
        } catch (error) {
            console.error("Error fetching user data:", error);
            
        }
    };*/
   
    /*fetchUserData()// Call the function*/

}, [isauthenticated]); 

  



  return (
    
    <UserProvider>
      <div>
        <AnimatePresence mode="wait">

          <div >
              <Routes location={useLocation()} key={useLocation().pathname} >
                <Route path="/" element={isauthenticated?<Dashboard user_data={user_data}/>:<Navigate to="/signin"/>}/>
                <Route path="/signin" element={<SignIn setAuth={setisauthenticated}/>}/>
                <Route path="/requesthistory" element={isauthenticated? <Requesthistory  user={user}/>:<PageTransition>  <Navigate to="/signin" /></PageTransition>}/>
                <Route path="/dashboard" element={isauthenticated ? <Dashboard  /> : <PageTransition>  <Navigate to="/signin" /></PageTransition>} />
                <Route path="/user"   element={isauthenticated? <User/> :<PageTransition>  <Navigate to="/signin" /></PageTransition>} />
                <Route path="/createorder" element={isauthenticated? <CreateOrder />:<Navigate to="/signin"/>} />
                <Route path="/signout" element={<SignOut setAuth={setisauthenticated} />} />
              </Routes>
          </div>
        </AnimatePresence>
        
      </div>
    </UserProvider>
  );
}

export default App