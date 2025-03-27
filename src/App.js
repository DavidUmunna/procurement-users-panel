import User from "./components/user-navbar";
import { UserProvider } from "./components/userContext";
import React, { useState } from 'react';
import SignIn from "./components/sign_in";
import CreateOrder from "./components/CreateOrder";
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Dashboard } from "./components/dashboard";
import { AnimatePresence, motion } from "framer-motion";
import SignOut from "./components/sign_out";
import Requesthistory from "./components/requestHistory";
import axios from "axios";
import Forgotpassword from "./components/forgotpassword"


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
    const checkAuth = async () => {
      try {
        const token=localStorage.getItem('authToken')
        console.log(token)
        const response = await axios.get("http://localhost:5000/api/access",
          {headers:{Authorization:`Bearer ${token}`},
        withCredentials: true });
        setisauthenticated(response.data.authenticated);
        console.log(response.data)
      } catch (error) {
        setisauthenticated(false);
        console.error(error);
      }
    };
    checkAuth();
  }, [isauthenticated]);

  if (isauthenticated === null) return <div>Loading...</div>;

  return (
    <UserProvider>
      {isauthenticated && <User />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/signin" element={!isauthenticated ? <PageTransition><SignIn setAuth={setisauthenticated} /></PageTransition> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isauthenticated ? <PageTransition><Dashboard /></PageTransition> : <Navigate to="/signin" />} />
          <Route path="/requesthistory" element={isauthenticated ? <PageTransition><Requesthistory /></PageTransition> : <Navigate to="/signin" />} />
          <Route path="/forgotpassword" element={ <PageTransition><Forgotpassword /></PageTransition> } />
          <Route path="/user" element={isauthenticated ? <PageTransition><User /></PageTransition> : <Navigate to="/signin" />} />
          <Route path="/createorder" element={isauthenticated ? <PageTransition><CreateOrder /></PageTransition> : <Navigate to="/signin" />} />
          <Route path="/signout" element={<PageTransition><SignOut setAuth={setisauthenticated} /></PageTransition>} />
          <Route path="*" element={<Navigate to={isauthenticated ? "/dashboard" : "/signin"} />} />
        </Routes>
      </AnimatePresence>
    </UserProvider>
  );
}

export default App;
