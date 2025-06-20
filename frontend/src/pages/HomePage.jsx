import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () =>{
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem('access_token')
        if(token){
            navigate('/dashboard')
        }
        else{
            navigate('/signin')
        }
    },[navigate])
    return null;
}

export default HomePage;