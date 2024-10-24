import React from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import Users from '../components/Users';
const DashBoard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    navigate("/signin")
  }
  return (
    <header className='' style={{margin:"0 auto",maxWidth:"1100px"}}>
      <div className='container' style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 20px"}}>
        <h1>MouseX</h1>
        <Button value={"Logout"} onClick={handleLogout}/>
      </div>

      <section>
        <Users />
      </section>
    </header>
  )
}

export default DashBoard
