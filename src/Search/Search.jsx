import React from 'react'
import "./search.css"
function Search({search,setSearch}) {
  return (
    <div className='SearchDiv'>
      <input type="text" placeholder='Search' className='searchBox' value={search} onChange={(e)=>setSearch(e.target.value)}/>
    </div>
  )
}

export default Search
