import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heading } from '../components/Heading.jsx'
import { SubHeading } from '../components/SubHeading.jsx'
import { InputBox } from '../components/InputBox.jsx'
import { Button } from '../components/Button.jsx'
import { BottomWarning } from '../components/BottomWarning.jsx'
import axios from 'axios'
import { toast } from 'react-toastify';


const SignIn = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password
      })
      const data = response.data
      localStorage.setItem('access_token', data.access_token)
      navigate('/dashboard')
      toast.success("Sign In Successful")
    }
    catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className='h-screen w-screen bg-slate-400 flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rouded-lg w-80 bg-white rounded-lg text-center h-max p-2 px-4'>
          <Heading label={"Sign In"} />
          <SubHeading content={"Enter your information to Login"} />
          <InputBox
            title={"Username"}
            placeholder={"nikhil123@gmail.com"}
            type={"text"}
            onChange={(e) => {
              setUsername(e.target.value)
            }
            } />
          <InputBox
            title={"Password"}
            placeholder={"********"}
            type={"password"}
            onChange={(e) => {
              setPassword(e.target.value)
            }
            }
          />
          <Button title={"Sign In"} onClick={handleClick} />
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} target={"/signup"} />
        </div>
      </div>
    </div>
  )
}

export default SignIn