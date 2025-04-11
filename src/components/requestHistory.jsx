import { useEffect, useState } from "react";
import React from "react";
import { useUser } from "./userContext";
import { getOrders, downloadFile } from "../services/OrderService";
import Searchbar from './searchbar'
import {FaFilePdf,FaFile} from "react-icons/fa"



const RequestHistory = () => {
  const { user } = useUser();
  const [Requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentRemark, setCurrentRemark] = useState("");

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!user || !user.email) return;
      try {
        const userrequest = await getOrders({ email: user.email });
        console.log("fetched orders", userrequest);

        if (Array.isArray(userrequest.orders)) {
          setRequests(userrequest.orders || []);
          localStorage.setItem("Request_length",Requests.length)
          console.log(Requests)
        } else {
          throw new Error("invalid data format");
        }
      } catch (err) {
        console.error("user fetching failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [user?.email]);

  const handleFileDownload = async (fileName, event) => {
    event.preventDefault();
    try {
      const fileData = await downloadFile(fileName);
      const url = window.URL.createObjectURL(new Blob([fileData]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleShowRemarks = (remarks) => {
    setCurrentRemark(remarks);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentRemark("");
  };

  return (
    <div>
      <div className="flex justify-center">
        <Searchbar/>
      </div>
      <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Request History</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading requests...</p>
        ) : Requests.length === 0 ? (
          <p className="text-center text-gray-500">No requests found.</p>
        ) : (
          <div className="w-full overflow-x-auto rounded-lg shadow-md min-h-screen bg-gray-100">
            <table className="w-full bg-white border-collapse">
              {/* Table Head */}
              <thead className="bg-gray-800 text-white">
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
                    <td className="px-4 py-2 flex font-medium text-center border-b">
                      {req.filenames && req.filenames.length>0 ? (
                        req.filenames.map((filename,index)=>(
                          <a
                            key={index}
                            href="#"
                            onClick={(event) => handleFileDownload(filename, event)}
                            target="_blank"
                            rel="noopener noreferrer"
                            
                          >

                             <FaFilePdf color="red" size={20}  title={`Download ${filename}`} />
                          </a>
                        ))
                        
                         
                      ) : (
                        <FaFile color="gray" size={20} title="No File Available" />
                      )}
                    </td>
                    <td className="px-4 py-2 font-medium text-center border-b">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => handleShowRemarks(req.remarks)}
                      >
                        View Remarks
                      </button>
                    </td>

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

      {/* Modal for Remarks */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6">
            <div className="flex justify-between items-center pb-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Remarks</h3>
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={handleCloseModal}
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{currentRemark}</p>
            </div>
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestHistory;