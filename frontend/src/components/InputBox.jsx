export const InputBox = ({ title, placeholder, type }) => {
    return (
        <div>
            <div className='text-sm font-medium text-left py-2'>
                <label>{title}</label>
            </div>
            <input type={type} placeholder={placeholder} className="w-full px-2 border-1 rounded-sm py-1 font-semibold"></input>
        </div>
    )
}