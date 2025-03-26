import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/signInService";
import { useUser } from "./userContext";
import { motion } from "framer-motion";

export default function SignOut({ setAuth }) {
    const navigate = useNavigate();
    const { setUser } = useUser();

    useEffect(() => {
        setAuth(false);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem('authToken');
        //localStorage.removeItem("auth");
        //logoutUser(token);
        //localStorage.removeItem("token");
        
        setTimeout(() => {
            navigate("/signin");
        }, 2000); // Delay for smoother transition
    }, [setAuth, navigate, setUser]);

    return (
        <motion.div 
            className="flex justify-center items-center h-screen bg-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <motion.h2 
                className="text-lg font-semibold text-gray-800"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                Signing out...
            </motion.h2>
        </motion.div>
    );
}