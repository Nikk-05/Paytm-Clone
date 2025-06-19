export const Balance = ({ amount }) => {
    return (
        <div className="flex flex-col w-screen p-3 ">
            <div className="text-2xl font-bold">
                {`Your Balance is: ₹${amount}`}
            </div>
        </div >
    )
}