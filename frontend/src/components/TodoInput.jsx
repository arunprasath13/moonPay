import React, { useState } from 'react'

const TodoInput = () => {

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");

    const submitApi = (e) => {
        e.preventDefault();
        const payload = {
            title,
            description
        }

        try{
            fetch("http://localhost:3000/todo",{
                method:"post",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(payload)
            })
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <div className='todo__container'>
       <input type='title' onChange={(e) => setTitle(e.target.value)}/>
       <input type='description' onChange={(e) => setDescription(e.target.value)}/>
       <button onClick={submitApi}>Submit</button>
    </div>
  )
}

export default TodoInput
