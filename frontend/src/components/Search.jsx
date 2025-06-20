import { useEffect, useState, useMemo, useCallback } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'
import { Skeleton } from "./Skeleton.jsx"
import { debounce } from 'lodash'
import { useNavigate } from "react-router-dom"
export const Search = () => {
    const navigate = useNavigate()
    const [filter, setFilter] = useState("")
    const [userList, setUserList] = useState(null)

    const handleSendMoney = (user) => {
        navigate('/send', { state: { user } })
    }

    const fetchUserList = async (searchValue) => {
        try {
            const access_token = localStorage.getItem('access_token')
            const response = await axios.get('http://localhost:3000/api/v1/user/bulk', {
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                params: {
                    filter: searchValue
                }
            })
            const data = response.data;
            setUserList(data.user); // `data.user` hi response me aa raha hai as per your backend

        } catch (error) {
            toast.error(error.message);
        }
    }
    const debounceFetch = useCallback(
        debounce((value) => {
            fetchUserList(value)
        }, 500), [])

    useEffect(() => {
        debounceFetch(filter)
    }, [filter, debounceFetch])

    return (
        <div className="flex flex-col w-full p-3 ">
            <div className='mb-2'>
                <h1 className="font-bold text-2xl">Users</h1>
            </div>
            <div>
                <input type="text" placeholder="Search users.." className=" w-full text-1.5rem font-semibold p-2 rounded-md border"
                    onChange={(e) => { setFilter(e.target.value) }} ></input>
            </div>
            {userList === null ? (
                // Show 5 skeleton loaders
                <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </>
            ) : userList.length > 0 ? (
                userList.map((user) => (
                    <div key={user._id} className="flex my-4 justify-between pt-2 shadow-gray-400 shadow px-2 rounded-md">
                        <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                {user.firstName[0]}
                            </div>
                            <div className="text-1xl font-medium ml-2">
                                {`${user.firstName} ${user.lastName}`}
                            </div>
                        </div>
                        <div className="h-max py-3">
                            <button className="bg-black text-white font-bold px-4 py-2 text-1xl rounded-lg cursor-pointer" onClick={() => handleSendMoney(user)}>
                                Send Money
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div>No users found</div>
            )}


        </div>
    )
}