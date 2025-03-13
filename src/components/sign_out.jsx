import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignOut({ setAuth }) {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear authentication state
        setAuth(false);
        deleteUserFromSignIn()
        // Redirect to login page
        navigate("/signin");
    }, [setAuth, navigate]);
    const deleteUserFromSignIn = () => {
        const userdelete=await
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <h2 className="text-lg font-semibold">Signing out...</h2>
        </div>
    );
}

