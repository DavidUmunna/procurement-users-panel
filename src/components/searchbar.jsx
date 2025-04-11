import React,{useState} from "react"
import { Usesearch } from "./searchcontext"



const Searchbar=()=>{
    const {search}=Usesearch()
    const [filters,updatefilters]=useState("")


    const handleSearch=(e)=>{
       
        updatefilters(e.target.value)
       

    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        if (filters.trim()===""){
            alert("please enter a search term")
            return
        }
        
        
    }

    return (
        <div className="px-20 ">
            <div className="flex justify-center shadow-lg border-2 p-2 min-w-max rounded">
                <input 
                type="text" 
                placeholder="enter search"
                value={filters}
                onChange={handleSearch}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                <button className="bg-blue-500 text-white rounded-lg  hover:bg-blue-600 transition px-3 py-1" onClick={handleSubmit}
                 >Search</button>
            </div>

        </div>
    )
}

export default Searchbar