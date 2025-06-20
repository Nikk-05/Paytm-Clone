export const Skeleton = () => {
    return (
        <div className="flex my-4 justify-between pt-2 shadow-gray-400 shadow px-2 rounded-md animate-pulse">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-gray-300" />
                <div className="ml-2">
                    <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>
            </div>
            <div className="h-max py-3">
                <div className="bg-gray-300 h-8 w-24 rounded-lg"></div>
            </div>
        </div>
    );
};