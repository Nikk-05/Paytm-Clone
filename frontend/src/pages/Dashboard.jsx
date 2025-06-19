
import { Navbar } from "../components/Navbar.jsx"
import { Balance } from '../components/Balance.jsx'
import { Search } from '../components/Search.jsx'

const Dashboard = () => {
  return (
    <div>
      <Navbar/> 
      <Balance amount = {"10,010"}/> 
      <Search/>
    </div>
  )
}

export default Dashboard