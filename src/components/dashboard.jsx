import UserDetails from "./UserDetails"
import User from "./user-navbar"
import React from 'react';
import CreateOrder from "./CreateOrder";

const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Procurement Manager",
    phone: "+1 234 567 890",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  };


function Dashboard(){
    return(
        <div className=" items-center bg-gray-100 p-4">
            <User />
            
            <h1 className="text-3xl font-bold text-gray-800">Welcome to the Procurement App</h1>
            <p className="text-gray-600 mt-2">Manage your orders and suppliers efficiently.</p>
            <UserDetails user={user} />
        </div>
    )
  
}



export default Dashboard