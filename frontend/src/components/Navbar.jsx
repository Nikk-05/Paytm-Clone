import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
export const Navbar = () => {
    const token = localStorage.getItem('access_token')
    const decoded = jwtDecode(token)
    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.removeItem('access_token')
        navigate('/signin')
    }

    return (
        <div className="h-16 shadow-md flex justify-between items-center px-6 bg-white">
            
            <div className="text-xl font-semibold text-blue-600">
                Paytm Clone
            </div>
            <div className="flex items-center gap-4">
                <div className="text-gray-700 text-base">Hello, <span className="font-medium">{decoded.firstName}</span></div>
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    {decoded?.firstName[0]}
                </div>

                <button className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition" onClick={handleLogOut}>
                    Logout
                </button>
            </div>
        </div>
    );
};
