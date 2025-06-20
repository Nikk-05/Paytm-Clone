import React,{useState} from 'react'
import { Heading } from '../components/Heading.jsx'
import { SubHeading } from '../components/SubHeading.jsx'
import { InputBox } from '../components/InputBox.jsx'
import { Button } from '../components/Button.jsx'
import { BottomWarning } from '../components/BottomWarning.jsx'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")

    const handleClick = async (e) => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                username,
                firstName,
                lastName,
                password
            })
            const data = response.data
            localStorage.setItem('access_token', data.access_token)
            toast(data.message)
            navigate('/dashboard')
        }
        catch (error) {
            toast.error("SignUp Unsuccessful")
        }
    }
    return (
        <div className='h-screen w-screen bg-slate-400 flex justify-center'>
            <div className='flex flex-col justify-center'>
                <div className='rouded-lg w-80 bg-white rounded-lg text-center h-max p-2 px-4'>
                    <Heading label={"Sign Up"} />
                    <SubHeading content={"Enter your information to create an Account"} />
                    <InputBox title={"First Name"} placeholder={"Hritik"} type={"text"} onChange={(e) => {
                        setFirstName(e.target.value)
                    }} />
                    <InputBox title={"Last Name"} placeholder={"Roshan"} type={"text"} onChange={(e) => {
                        setLastName(e.target.value)
                    }} />
                    <InputBox title={"Username"} placeholder={"hritik@gmail.com"} type={"text"} onChange={(e) => {
                        setUsername(e.target.value)
                    }} />
                    <InputBox title={"Password"} placeholder={"********"} type={"password"} onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <Button title={"Sign Up"} onClick={handleClick} />
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} target={"/signin"} />
                </div>
            </div>
        </div>
    )
}

export default SignUp