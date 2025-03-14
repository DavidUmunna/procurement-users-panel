import { useEffect, useState } from "react"
import React from "react"
import {useUser} from "./userContext"
import { getOrders } from "../services/OrderService"
import Usernav from "./user-navbar"

const RequestHistory=()=>{
    const {user} =useUser
    const [Requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email,setemail]=useState("")
    useEffect(()=>{
        
        if (user?.email) fetchUserOrders();
    },[])

    const fetchUserOrders=async()=>{
        try{
            setemail(user.email)
            const userrequest=await getOrders(email)
            console.log("fetched orders",userrequest)

            if (Array.isArray(userrequest)){
                setRequests(userrequest||[])
            }else{
                throw new Error("invalid data format")
            }


            }catch(err){
                console.error("user fetching failed:",err)
            }finally{
                setLoading(false);}
        }
    

    return(
        <div>
            <nav className="sticky top-0  ">
                            <Usernav />
            </nav>
            <div className="max-w-4xl mx-auto p-6">
           
                <h2 className="text-2xl font-bold text-gray-900 mb-4">My Request History</h2>
        
                {loading ? (
                  <p className="text-center text-gray-500">Loading requests...</p>
                ) : Requests.length === 0 ? (
                  <p className="text-center text-gray-500">No requests found.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                      <thead className="bg-indigo-600 text-white">
                        <tr>
                          <th className="px-4 py-2 text-left">Request</th>
                          <th className="px-4 py-2 text-left">Status</th>
                          <th className="px-4 py-2 text-left">Date & Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Requests.map((req) => (
                          <tr key={req._id} className="border-b">
                            <td className="px-4 py-2">{req.products.name}</td>
                            <td className="px-4 py-2">{req.products.quantity}</td>
                            <td className="px-4 py-2">{req.products.price}</td>
                            <td
                              className={`px-4 py-2 font-medium ${
                                req.status === "Approved"
                                ? "text-green-600"
                                : req.status === "Pending"
                                ? "text-yellow-500"
                                : "text-red-600"
                            }`}
                          >
                            {req.status}
                          </td>
                          <td className="px-4 py-2 text-gray-600">{new Date(req.timestamp).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                )}
            </div>
        </div>
        
    );




}

export default RequestHistory