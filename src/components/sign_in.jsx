import { useState } from "react";
//import { validate } from "../../../procurement_api/models/users";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import  app from "../App" 
import {Dashboard} from "./Dashboard";


export default function Sign_in({setAuth}) {
        //const setAuth=app.setisauthenticated()
        const navigate = useNavigate();
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState("");
        
        

        const handleLogin = async (e) => {
            e.preventDefault();
        
            try {
                const response = await axios.post("http://localhost:5000/api/signin", {
                    username,
                    password
                });
        
                console.log(response.data);
        
                 if (response.data.success) {
                    setAuth(true);
                    navigate("/dashboard");
                } else {
                    setError(response.data.message);
                }
                Dashboard(response.data)
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
                    setError("An error occurred. Please try again.");
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
              alt="Your Company"
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
  
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Can't sign in?{' '}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
               contact IT team
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  