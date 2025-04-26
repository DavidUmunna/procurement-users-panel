import UserDetails from "./UserDetails"
import React, { useState } from 'react';
import { useUser } from "./userContext";
import { getOrders } from "../services/OrderService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"



export const Dashboard=()=>{
    const { user } = useUser();
    const navigate=useNavigate()
    const admin_roles=["admin","procurement_officer","human_resources","internal_auditor","global_admin"]
    const [request,setRequest]=useState()
    const [orders,setorders]=useState([])
    const [approvedOrders, setApprovedOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [rejectedOrders, setRejectedOrders] = useState([]);
    const email=user?.email||"no email provided"
   
    useEffect(()=>{
       
        if (admin_roles.includes(user.role)){
            fetchorder();

        }else{
            fetchuserOrder(email)
        }
    },[])
    const fetchorder=async ()=>{ 
            if (!user || !user.email) return 

            try{
                  const token=localStorage.getItem("authToken")
                  const userReq=await axios.get("/api/orders",{headers:{Authorization:`Bearer ${token}`, 
                    "ngrok-skip-browser-warning": "true"},
                    withCredential:true})
                  console.log("user orders for count:",userReq)
                  if (Array.isArray(userReq.data||[])){
                    const orders=userReq.data
                    console.log("orders",orders)
                    setRequest(orders)
                    
                    
                   
                    setApprovedOrders(orders.filter((order) => order.status === "Approved"));
                    setPendingOrders(orders.filter((order) => order.status === "Pending"));
                    setRejectedOrders(orders.filter((order) => order.status === "Rejected"));
                   
                    //console.log("number approved",Approved)
                 }else{
                    console.error("invalid data format")
                 }
    
    
            
            }catch(err){
              if (err.response?.status===401 || err.response?.status===403){
         
                navigate("/signout");
      
                
              }else{
                console.error("error fetching orders",err)

              }
    
            }
          }
          const fetchuserOrder=async (email)=>{
            if (!user || !user.email) return 
            
            try{
                  const token=localStorage.getItem("authToken")
                  const userReq=await axios.get(`/api/orders/${email}`,{headers:{Authorization:`Bearer ${token}`, 
                    "ngrok-skip-browser-warning": "true"},
                    withCredential:true})
                  console.log("user orders for count:",userReq)
                  if (Array.isArray(userReq.data||[])){
                    const orders=userReq.data
                    console.log("orders",orders)
                    setorders(orders)
                    
                    
                    
                    setApprovedOrders(orders.filter((order) => order.status === "Approved"));
                    setPendingOrders(orders.filter((order) => order.status === "Pending"));
                    setRejectedOrders(orders.filter((order) => order.status === "Rejected"));
                    //console.log("number approved",Approved)
                 }else{
                    console.error("invalid data format")
                 }
    
    
            
            }catch(err){
                console.error("error fetching orders",err)
    
            }

          }

    
    console.log(user)
    console.log("user orders",request)
    console.log(approvedOrders)
    console.log(pendingOrders)
    const request_length=(request)=>{
        return Array.isArray(request) ? request.length : 0;
    }
    const request_amount=request_length(request)
    
   

    return(
        <div className=" min-h-screen bg-gray-300 ">
            
           
           
                
            {user?.name && user.name.split(" ").length > 1 ? (
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome {user.name.split(" ")[1]}
              </h1>
            ) : (
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome {user?.name}
              </h1>
            )}
            <p className="text-gray-600 mt-2">Manage your Requests efficiently.</p>
            <UserDetails user={user}   rejectedOrders={rejectedOrders} request_amount={request_amount} approvedOrders={approvedOrders} pendingOrders={pendingOrders} />
           
            
        </div>
    )
  
}



