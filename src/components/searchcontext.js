import {createContext,useContext,useState} from 'react'

const SearchContext=createContext()

export const Searchprovider=({children})=>{
    const [filters,setfilters]=useState({
        status:'',
        keyword:'',
        daterange:{start:null,end:null}
    })
    const updateFilters=(newFilters)=>{
      
        setfilters((prev)=>({prev,...newFilters}))
        
    }
    const Resetfilters=()=>{
        setfilters(
            {
                status:'',
                keyword:'',
                daterange:{start:null,end:null}
            }
        )
    }

    return(
        <SearchContext.Provider value={{filters,updateFilters,Resetfilters}}>

            {children}
        </SearchContext.Provider>
    )

}

export const Usesearch=()=>useContext(SearchContext)