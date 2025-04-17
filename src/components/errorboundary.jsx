import React from "react"

function Fallback({error}){
    return (
        <div className=" flex justify-center items-center min-h-screen" role="alert">
            <p className="flex justify-center align-middle font-extrabold font"s> Something Went Wrong</p>
            {error&&<pre>{error.message}</pre>}
            
        </div>
    )
}
export default Fallback