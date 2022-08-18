function ChatBar() {

    var users = [
        'Mr.A', 'Mr.B', 'Mr.C',
        'Mr.A', 'Mr.B', 'Mr.C',
        'Mr.A', 'Mr.B', 'Mr.C',
        'Mr.A', 'Mr.B', 'Mr.C',
        'Mr.A', 'Mr.B', 'Mr.C',
        'Mr.A', 'Mr.B', 'Mr.C'
    ]

    return (
        <div className="lg:block hidden w-72 h-full px-2 pt-8 pb-1 overflow-y-auto">
            <div className="flex h-8 justify-between">
                <p>Contacts</p>
                <div className="flex gap-1">
                    <div className="border-white rounded-2xl border-2 h-full w-8 flex items-center justify-center p-1">Call</div>
                    <div className="border-white rounded-2xl border-2 h-full w-8 flex items-center justify-center p-1">Search</div>
                    <div className="border-white rounded-2xl border-2 h-full w-8 flex items-center justify-center p-1">...</div>
                </div>
            </div>
            <div className="flex flex-col">
                {
                    users.map((user) => {
                        return (
                            <div className="h-14 flex justify-start items-center">
                                <div className="border-white rounded-2xl border-2 h-9 w-9 flex items-center justify-center p-1 mr-2">Pic</div>
                                <p>{user}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ChatBar