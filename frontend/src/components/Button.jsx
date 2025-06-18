export const Button = ({title}) => {
    return (
        <div className = 'bg-black text-white text-1.5rem font-medium py-2 px-2 mt-4 rounded-md h-max cursor-pointer'>
            <button type="submit">{title}</button>
        </div>
    )
}