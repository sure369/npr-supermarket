import React, { useContext } from 'react'
import { MyContext } from './MyContext'

function ChildCompoent() {
    const data= useContext(MyContext)
  return (
    <h1>{data}</h1>
  )
}

export default ChildCompoent