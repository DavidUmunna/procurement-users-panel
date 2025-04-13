import React from "react"

function Fallback({error}){
    return (
        <div role="alert">
            <p> Something Went Wrong</p>
            <pre>{error.message}</pre>
        </div>
    )
}
export default Fallback