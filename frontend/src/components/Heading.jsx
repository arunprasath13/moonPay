import React from 'react'
import "./Heading.css"
const Heading = ({title,className}) => {
  return (
    <div className='heading'>
      <h1 className={className}>{title}</h1>
    </div>
  )
}

export default Heading
