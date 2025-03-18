import UserDetails from "./UserDetails"
import User from "./user-navbar"
import React from 'react';
import { useUser } from "./userContext";
import RequestHistory from "./requestHistory";
//import { useEffect } from "react";
//import  {handleLogin} from "./sign_in"



export const Dashboard=()=>{
    
    
    const { user } = useUser();
    console.log(user)
    
   

    return(
        <div className=" min-h-screen bg-gray-100 ">
            
           
           
                
            <h1 className="text-3xl font-bold text-gray-800">Welcome {user?.name.split(" ")[1]}</h1>
            <p className="text-gray-600 mt-2">Manage your Requests efficiently.</p>
            <UserDetails user={user} />
            
        </div>
    )
  
}



