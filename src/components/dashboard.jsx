import UserDetails from "./UserDetails"
import User from "./user-navbar"
import React from 'react';
//import { useEffect } from "react";
//import  {handleLogin} from "./sign_in"

/*const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Procurement Manager",
    phone: "+1 234 567 890",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  };*/

export const Dashboard=({user_data})=>{
    
   
    

    return(
        <div className=" min-h-screen bg-gray-100 ">
            
            <nav className="sticky top-0  ">
                <User />
            </nav>
           
                
            <h1 className="text-3xl font-bold text-gray-800">Welcome {user_data?.name}</h1>
            <p className="text-gray-600 mt-2">Manage your Requests efficiently.</p>
            <UserDetails user={user_data} />
        </div>
    )
  
}



