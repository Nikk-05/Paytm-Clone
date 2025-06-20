import { useEffect, useState } from 'react'
import { Navbar } from "../components/Navbar.jsx"
import { Balance } from '../components/Balance.jsx'
import { Search } from '../components/Search.jsx'
import axios from 'axios'

const Dashboard = () => {
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const access_token = localStorage.getItem('access_token')
        const response = await axios.get('http://localhost:3000/api/v1/user/balance', {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        })
        setAmount(response.data.amount)
      }
      catch (error) {
        console.error(error.message)
      }
    }
    fetchBalance()

  }, [amount])

  return (
    <div>
      <Navbar/>
      <Balance amount={amount} />
      <Search />
    </div>
  )
}

export default Dashboard