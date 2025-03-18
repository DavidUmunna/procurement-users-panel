import { useState } from "react";
import { motion } from "framer-motion";
//import { Input } from "@/components/ui/input";
//import { Button } from "@/components/ui/button";
import { updateUser, getuserbymail } from "../services/userService";
//import {  AnimatePresence } from "framer-motion"

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [Error,setError]=useState("")
  const [step, setStep] = useState(1);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const handleEmailSubmit = () => {
    try{
        console.log(email)
        const email_verification= getuserbymail(email)
        if(email_verification){
            console.log("email verified")
        }else{
            console.log(email_verification.data.message)
        }
    }catch(error){
        if (error.response) {
            setError(error.response.data.message)
        }
    
    // Simulate API request for sending reset email
    setTimeout(() => setStep(2), 1000);
    };
   }

  const handleResetPassword = () => {
    if (newPassword === confirmPassword) {
      const response= updateUser(email,newPassword)
      if (response){
        console.log("user password updated successfully")
      }else{
        console.log("user password update failed")
      }
      // Simulate password reset API request
      
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        {step === 1 && (
          <div>
              <motion.div exit={{ opacity: 0 }}>
                <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
                <p className="text-gray-600 mb-4">Enter your email to receive a reset link.</p>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button onClick={handleEmailSubmit} className="mt-4 w-full">Send Reset Link</button>
              </motion.div>
              
              {Error}
                              
          </div>
          
        )}

        {step === 2 && (
          <motion.div exit={{ opacity: 0 }}>
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-2" />
            <button onClick={handleResetPassword} className="mt-4 w-full">Reset Password</button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div exit={{ opacity: 0 }}>
            <h2 className="text-xl font-bold mb-4">Success!</h2>
            <p className="text-green-600">Your password has been reset successfully.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

