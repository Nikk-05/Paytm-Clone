import React from 'react'
import { Navbar } from "../components/Navbar.jsx"
import { Balance } from '../components/Balance.jsx'

const Dashboard = () => {
  return (
    <div>
      <Navbar/> 
      <Balance amount = {"10,010"}/> 
    </div>
  )
}

export default Dashboard