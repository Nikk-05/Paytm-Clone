import { Heading } from "./Heading.jsx"
export const Search = () => {
    return (
        <div className="flex flex-col w-screen p-3 ">
            <div className='mb-2'>
                <h1 className="font-bold text-2xl">Users</h1>
            </div>
            <div>
                <input type="text" placeholder="Search users.." className=" w-full text-1.5rem font-semibold p-1 rounded-md border" ></input>
            </div>
            <div className="flex my-4 justify-between pt-2 shadow-gray-400 shadow px-2 rounded-md">
                <div className="flex items-center" >
                    <div className='rounded-full h-12 w-12 bg-slate-200 flex justify-center'>
                        <div className="flex flex-col justify-center h-full text-center">
                            N
                        </div>
                    </div>
                    <div className="text-1xl font-medium ml-2">Nikhil Singh</div>
                </div>
                <div className="h-max py-3">
                    <button className="bg-black text-white font-bold px-4 py-2 text-1xl rounded-lg cursor-pointer">Send Money</button>
                </div>
            </div>

        </div>
    )
}