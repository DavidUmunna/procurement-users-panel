import UserDetails from "./UserDetails"
import User from "./user-navbar"
import React from 'react';
import { useUser } from "./userContext";
//import { useEffect } from "react";
//import  {handleLogin} from "./sign_in"



export const Dashboard=()=>{
    
    
    const { user } = useUser();
    
   

    return(
        <div className=" min-h-screen bg-gray-100 ">
            
            <nav className="sticky top-0  ">
                <User />
            </nav>
           
                
            <h1 className="text-3xl font-bold text-gray-800">Welcome {user?.name}</h1>
            <p className="text-gray-600 mt-2">Manage your Requests efficiently.</p>
            <UserDetails user={user} />
        </div>
    )
  
}



