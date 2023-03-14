import React from 'react'
import { MyContext } from './MyContext'
import ChildCompoent from './ChildCompoent'

function ParentComponent() {
    const data ="Hello from Parent Component"

  return (
   <MyContext.Provider value={data}>
    <ChildCompoent/>
   </MyContext.Provider>
  )
}

export default ParentComponent