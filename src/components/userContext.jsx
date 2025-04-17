import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();
const getInitialState=()=>{
    const  user=sessionStorage.getItem("user")
    return user ? JSON.parse(user) : null
}
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(getInitialState);
    useEffect(()=>{
        sessionStorage.setItem("user",JSON.stringify(user))
        // tab A - when user logs in
    localStorage.setItem("user", JSON.stringify(user));
    
    // tab B - detect changes
    window.addEventListener("storage", (event) => {
        if (event.key === "user") {
        const newUser = JSON.parse(event.newValue);
        setUser(newUser); // update your context or state
        }
    });

    },[user])
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
