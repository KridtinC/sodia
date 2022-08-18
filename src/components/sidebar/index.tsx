function SideBar() {

    var menus = [
        'John Dawson', 'Friends', 'Memories',
        'Saved', 'Pages', 'Groups'
    ]

    return (
        <div className="xl:block hidden w-72 h-full px-2 pt-8 pb-1 overflow-y-auto">
            <div className="flex flex-col">
                {
                    menus.map((menu) => {
                        return (
                            <div className="h-14 flex justify-start items-center">
                                <div className="border-white rounded-2xl border-2 h-9 w-9 flex items-center justify-center p-1 mr-2">Pic</div>
                                <p>{menu}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SideBar