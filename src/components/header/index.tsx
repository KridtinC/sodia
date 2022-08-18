function Header() {
    return (
        <div className="bg-gray-800 fixed overflow-x-auto w-full top-0 h-14 px-2 py-1 flex justify-between items-center">
            <div className="border-white rounded-2xl border-4 h-10 w-10 flex items-center justify-center p-1">S</div>
            <div className="flex gap-4">
                <div className="border-white rounded-2xl border-4 h-full w-24 flex items-center justify-center p-1">Home</div>
                <div className="border-white rounded-2xl border-4 h-full w-24 flex items-center justify-center p-1">Video</div>
                <div className="border-white rounded-2xl border-4 h-full w-24 flex items-center justify-center p-1">Market</div>
                <div className="border-white rounded-2xl border-4 h-full w-24 flex items-center justify-center p-1">Group</div>
                <div className="border-white rounded-2xl border-4 h-full w-24 flex items-center justify-center p-1">More</div>
            </div>
            <div className="border-white rounded-2xl border-4 h-10 w-10 flex items-center justify-center p-1">User</div>
        </div>
    )
}

export default Header