import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/signInService";

export default function SignOut({ setAuth }) {
    const navigate = useNavigate();
    
    useEffect(() => {
        // Clear authentication state
        setAuth(false);
        const token=localStorage.getItem('token')
        logoutUser(token)
        localStorage.removeItem("token")
        // Redirect to login page
        navigate("/signin");
    }, [setAuth, navigate]);
   


    return (
        <div className="flex justify-center items-center h-screen">
            <h2 className="text-lg font-semibold">Signing out...</h2>
        </div>
    );
}

