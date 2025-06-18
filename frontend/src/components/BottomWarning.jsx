import {Link} from 'react-router-dom'
export const BottomWarning = ({ label, buttonText, target }) => {
    return (
        <div className='py-2 text-sm flex justify-center'>
            <div>
                {label}
            </div>
            <Link className='pointer underline pl-1 cursor-pointer text-blue-800 font-semibold' to={target}>
                {buttonText}
            </Link>
        </div>
    )
}