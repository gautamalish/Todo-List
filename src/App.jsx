import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Search from './Search/Search'
import './App.css'
import { MdDelete } from "react-icons/md";
function App() {
  const [items,setItems]=useState(JSON.parse(localStorage.getItem("listItem")) || [])
  const [itemName,setItemName]=useState("")
  const [error,setError]=useState("")
  const [search,setSearch]=useState("")
  const itemToDisplay=items.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))
  console.log(itemToDisplay)
  function onDeleteClick(ind){
    const newList=items.filter((item,index)=>index!==ind)
    setItems(newList)
    localStorage.setItem("listItem",JSON.stringify(newList))
  }
  function toggleCheck(id){
    const listItems=items.map((item,index)=>index==id?{...item,checked:!item.checked}:item)
    setItems(listItems)
    localStorage.setItem("listItem",JSON.stringify(listItems))
  }
  function AddTodo(){
    const listItem=[...items,{name:itemName,checked:false}]
    if(itemName.trim()){
      setItems(listItem)
      localStorage.setItem("listItem",JSON.stringify(listItem))
      setError("")
      setItemName("")
    }
    else{
      setError("Please enter an Item")
      return
    }
      
  }
  return (
    <div className='mainDiv'>
      <div className='errorDiv'>
      <p>{error}</p>
      </div>
      
      <div className='todoAdd'>
        <input type="text" placeholder='Enter Todo' value={itemName} onChange={(e)=>setItemName(e.target.value)} />
        <button onClick={AddTodo}>Add Todo</button>
      </div>
      <Search search={search} setSearch={setSearch}/>
      <ul className='itemsUl'>
        {itemToDisplay.map((item,index)=>{
          return (
            
          <div className='listItemDiv' key={index}>
            <input type="checkbox" className='itemCheckBox' onChange={()=>toggleCheck(index)} checked={item.checked}/>
            <li className='todoItems' style={(item.checked)?{textDecoration:"line-through"}:null}>{item.name}</li>
            <MdDelete style={{fontSize:"30px",cursor:"pointer"}}  className="deleteIcon" onClick={()=>onDeleteClick(index)}/>
          </div> 
          )
        })}
      </ul>
    </div>
  )
}

export default App
