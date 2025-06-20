import { useLocation } from "react-router-dom"
import { useState } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'

const SendMoney = () => {
  const location = useLocation()
  const receiver = location.state?.user //Sending value with route so component can render and show data
  const [amount, setAmount] = useState()
  const receiverName = `${receiver.firstName} ${receiver.lastName}`

  const transferMoney = async () => {
    try {
      const access_token = localStorage.getItem('access_token')
      const response = await axios.post(
        'http://localhost:3000/api/v1/account/transfer',
        {
          receiver: receiver._id,
          amount: amount
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      );
      console.log(response.data)
      toast('Transfer Successful')
    }
    catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-slate-300'>
      <div className='rounded-lg h-max w-90 bg-white flex flex-col px-5 py-8 '>
        <div className=' mt-5 mb-8'>
          <h1 className="font-bold text-3xl text-center">Send Money</h1>
        </div>
        <div className='p-2'>
          <div className='flex flex-row items-center'>
            <div className='rounded-full bg-green-400 h-12 w-12 flex justify-center items-center mr-2'>
              <div className='text-white font-medium text-2xl'>A</div>
            </div>
            <div className='font-medium text-2xl'>{receiverName}</div>
          </div>
          <div className='flex flex-col '>
            <label className='font-semibold my-2'>Amount (in Rs)</label>
            <input type='text' placeholder='Enter amount' className='border p-1 rounded-sm font-semibold' onChange={(e) => (setAmount(e.target.value))}></input>
          </div>
          <div className='bg-green-400 text-white text-1.5rem font-medium py-2 px-2 mt-4 rounded-md h-max  text-center hover:bg-green-500'>
            <button type="submit" onClick={transferMoney} className="w-full cursor-pointer ">Transfer</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendMoney