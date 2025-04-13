import UserDetails from "./UserDetails"
//import User from "./user-navbar"
import React, { useState } from 'react';
import { useUser } from "./userContext";
import { getOrders } from "../services/OrderService";
import { useEffect } from "react";
//import  {handleLogin} from "./sign_in"
import { useLocation } from 'react-router-dom';



export const Dashboard=()=>{
    const { user } = useUser();
    const location=useLocation()
    const [request,setRequest]=useState("")
    const [Approved_req,setAproved_req]=useState(0)
    const [Pending_req,setPending_req]=useState(0)
    const [Rejected_req,setRejected_req]=useState(0)
    const [request_amount,setrequest_amount]=useState(0)
    //const [loading,setloading]=useState(false)
    useEffect(()=>{
          const getUsers=async ()=>{
            if (!user || !user.email) return 
            try{const userReq=await getOrders({email:user.email})
                  console.log("user orders for count:",userReq.orders)
                  if (Array.isArray(userReq.orders||[])){
                    const orders=userReq.orders
                    setRequest(orders)
                    const Approved=orders.reduce((count,item)=>count+(item.status==="Approved"?1:0),0)
                    setAproved_req(Approved)
                    setPending_req(orders.reduce((count,item)=>count+(item.status==="Pending"?1:0),0))
                    setRejected_req(orders.reduce((count,item)=>count+(item.status==="Rejected"?1:0),0))
                    //setrequest_amount(orders)
                    
                    console.log("number approved",Approved)
                 }else{
                    throw new Error("invalid data format")
                 }
    
    
            
            }catch(err){
                console.error("error fetching orders",err)
    
            }
          }
        getUsers();
    },[])

    console.log(user)
    
   

    return(
        <div className=" min-h-screen bg-gray-100 ">
            
           
           
                
            <h1 className="text-3xl font-bold text-gray-800">Welcome {user?.name.split(" ")[1]}</h1>
            <p className="text-gray-600 mt-2">Manage your Requests efficiently.</p>
            <UserDetails user={user}  request_amount={request.length} Approved_req={Approved_req} Pending_req={Pending_req} Rejected_req={Rejected_req} />
            
        </div>
    )
  
}



