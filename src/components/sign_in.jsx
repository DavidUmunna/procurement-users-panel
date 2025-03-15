
//import { validate } from "../../../procurement_api/models/users";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import {useUser} from "./userContext"
import {Dashboard} from "./Dashboard";
import { useState } from "react";
//import { Card, CardContent } from "@/components/ui/card";
//import { Button } from "@/components/ui/button";
//import { Mail, Phone, X } from "lucide-react";



export default function Sign_in({setAuth}) {
        //const setAuth=app.setisauthenticated()
        const navigate = useNavigate();
        const { setUser } = useUser();
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState("");
        const [userData, setUserData] = useState(null)
        const [isVisible, setIsVisible] = useState(false);
        
        
        const handleLogin = async (e) => {
            e.preventDefault();
            //console.log(setUser)
            try {
                const response = await axios.post("http://localhost:5000/api/signin", {
                    username,
                    password
                });
                const token=localStorage.setItem("token",response.data.token)
                console.log(token)
                console.log(response.data);
        
                 if (response.data.success) {
                    setAuth(true);
                    setUser(response.data.user);
                    setUserData(response.data.user)
                    navigate("/dashboard");
                } else {
                    setError(response.data.message);
                }
                console.log(response.data)
               
               
            } catch (error) {
                console.error("Login failed:", error);
        
                // Handle different error cases
                if (error.response) {
                    // Server responded with a status other than 2xx
                    setError(error.response.data.message || "Login failed.");
                } else if (error.request) {
                    // Request was made, but no response received
                    setError("Server is unreachable. Please check your connection.");
                } else {
                    // Something else happened
                    setError("An error occurred. Please try again.",error);
                }
            } finally {
                setUsername("");
                setPassword("");
                
            }
        };
        
      
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Halden"
              src={require("./assets/procurement.png")}
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleLogin} method="POST" className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="username"
                    required
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
            </form>
            <div className="flex justify-center m-4">
              <p className="mt-10 text-center text-sm/6 text-gray-500">
              Can't sign in?{' '}
              </p>

                {/* Contact IT Button */}
                <a 
                  onClick={() => setIsVisible(true)} 
                   className=" flex items-end font-bold text-blue-700  text-sm transition cursor-pointer"
                >
                  Contact IT Team
                </a>
          
            </div>
            {/* IT Contact Card */}
            {isVisible && (
              <div className="mt-6 w-full bg-white shadow-lg rounded-lg p-6 sm:max-w-sm md:max-w-lg">
                <h2 className="text-xl font-bold text-gray-800">IT Support</h2>
                <p className="text-gray-600 mt-2">Need help? Contact our IT team.</p>
      
                <div className="mt-4">
                  <p className="text-gray-800 font-semibold">Email:</p>
                  <p className="text-gray-600">c.onu@hamldengroup.ng</p>
                </div>
      
                <div className="mt-2">
                  <p className="text-gray-800 font-semibold">Phone:</p>
                  <p className="text-gray-600">+2347068911690</p>
                </div>
      
                <div className="mt-4 sm:max-w-sm">
                  <button 
                    onClick={() => setIsVisible(false)} 
                    className="bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            </div>
              
         </div>
            
          {userData && <Dashboard userData={userData} />}
        
      </>
    )
  }
  