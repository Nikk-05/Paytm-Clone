import React from 'react'
import { Heading } from '../components/Heading.jsx'
import { SubHeading } from '../components/SubHeading.jsx'
import { InputBox } from '../components/InputBox.jsx'
import { Button } from '../components/Button.jsx'
import { BottomWarning } from '../components/BottomWarning.jsx'

const SignUp = () => {
    return (
        <div className='h-screen w-screen bg-slate-400 flex justify-center'>
            <div className='flex flex-col justify-center'>
                <div className='rouded-lg w-80 bg-white rounded-lg text-center h-max p-2 px-4'>
                    <Heading label={"Sign Up"} />
                    <SubHeading content={"Enter your information to create an Account"} />
                    <InputBox title={"First Name"} placeholder={"Hritik"} type={"text"} />
                    <InputBox title={"Last Name"} placeholder={"Roshan"} type={"text"} />
                    <InputBox title={"Username"} placeholder={"hritik@gmail.com"} type={"text"} />
                    <InputBox title={"Password"} placeholder={"********"} type={"password"} />
                    <Button title={"Sign Up"} />
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} target={"/signin"} />
                </div>
            </div>
        </div>
    )
}

export default SignUp