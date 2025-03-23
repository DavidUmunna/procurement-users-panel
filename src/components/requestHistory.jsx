import { useEffect, useState } from "react"
import React from "react"
import {useUser} from "./userContext"
import { getOrders, downloadFile} from "../services/OrderService"

import { FaFilePdf, FaFile } from "react-icons/fa"

const RequestHistory=()=>{
    const {user}=useUser()
    const [Requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [email,setemail]=useState("")
    useEffect(()=>{
        console.log("userfilename:",user.filename)
        //const filename=user.filename
        //console.log(JSON.stringify(filename[0]))
        /*filename.forEach(file=>{
            const query=`?filename=${encodeURIComponent(file  )}`
            const downloadfiles=async(query)=>{
              const downoladrequest=await downloadFile(query)

              console.log(downoladrequest)
            }
            

        })*/
        const fetchUserOrders=async()=>{
            
            if (!user || !user.email) return; 
            try{
          
            const userrequest=await getOrders({email:user.email})
            console.log("fetched orders",userrequest.files)

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

        fetchUserOrders()
    
    },[user?.email])

   

    return(
        <div>
            
            <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gray-100">
           
                <h2 className="text-2xl font-bold text-gray-900 mb-4">My Request History</h2>
        
                {loading ? (
                  <p className="text-center text-gray-500">Loading requests...</p>
                ) : Requests.length === 0 ? (
                  <p className="text-center text-gray-500">No requests found.</p>
                ) : (
                    <div className="w-full overflow-x-auto rounded-lg shadow-md min-h-screen  bg-gray-100 ">
                    <table className="w-full bg-white border-collapse">
                      {/* Table Head */}
                      <thead className="bg-indigo-600 text-white">
                        <tr>
                          <th className="px-4 py-2 text-center">Request</th>
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-left">Quantity</th>
                          <th className="px-4 py-2 text-left">Price</th>
                          <th className="px-4 py-2 text-left">Urgency</th>
                          <th className="px-4 py-2 text-left">File</th>
                          <th className="px-4 py-2 text-left">Remark</th>
                          <th className="px-4 py-2 text-left">Status</th>
                          <th className="px-4 py-2 text-left">Date & Time</th>
                        </tr>
                      </thead>

                  
                      {/* Table Body */}
                      <tbody>
                        {Requests?.map((req) => (
                          <tr key={req._id} className="border-b">
                            {/* Request ID (First Column) */}
                            <td className="px-4 py-2 font-medium text-center border-b">{req.orderNumber}</td>
                  
                            {/* Products Mapping */}
                            <td colSpan="3" className="p-0 border-b">
                              <table className="w-full">
                                <tbody>
                                  {req.products.map((product, index) => (
                                    <tr key={index} className="border-b">
                                      <td className="px-4 py-2">{product.name}</td>
                                      <td className="px-4 py-2">{product.quantity}</td>
                                      <td className="px-4 py-2">{product.price}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </td>
                            <td className="px-4 py-2 font-medium text-center border-b">{req.urgency}</td>
                            <td>
                                {req.file ? (
                                  <a href={`/${req.file}`} target="_blank" rel="noopener noreferrer">
                                    <FaFilePdf color="red" size={20} title="View File" />
                                  </a>
                                ) : (
                                  <FaFile color="gray" size={20} title="No File Available" />
                                )}
                              </td>
                            <td className="px-4 py-2 font-medium text-center border-b">{req.remarks}</td>
                  
                            {/* Status Column */}
                            <td
                              className={`px-4 py-2 font-medium ${
                                req.status === "Approved" || req.status === "Completed"
                                  ? "text-green-600"
                                  : req.status === "Pending"
                                  ? "text-yellow-500"
                                  : "text-red-600"
                              }`}
                            >
                              {req.status}
                            </td>
                  
                            {/* Date Column */}
                            <td className="px-4 py-2 text-gray-600">{req.createdAt.split("T")[0]}</td>
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