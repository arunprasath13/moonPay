import React from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
const DashBoard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    navigate("/signin")
  }
  return (
    <header>
      <div className='container' style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"0 auto",maxWidth:"1100px",padding:"20px 20px"}}>
        <h1>MouseX</h1>
        <Button value={"Logout"} onClick={handleLogout}/>
      </div>
    </header>
  )
}

export default DashBoard
