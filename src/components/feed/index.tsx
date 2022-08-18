function Feed() {
    return (
        <div className="flex flex-col relative m-auto gap-6 max-w-2xl my-6 overflow-y-scroll">
            <CreatePostBar />
            <Posts />
        </div>
    )
}

function CreatePostBar() {
    return (
        <div className="bg-zinc-700 rounded-md w-full h-32 p-3">
            <div className="flex flex-col">
                <div className="flex h-10">
                    <div className="border-white rounded-2xl border-2 h-10 w-10 flex items-center justify-center p-1 mr-2">Pic</div>
                    <input type="text" placeholder="What's on your mind?" className="w-[37.5rem] bg-zinc-500 rounded-3xl pl-3 outline-none" />
                </div>
                <hr className="border-zinc-400 mt-3 pb-2" />
                <div className="flex justify-between">
                    <div className="flex w-[13.5rem] h-10 p-2 justify-center gap-2">
                        <div className="border-white rounded-2xl border-2 h-6 w-6 flex items-center justify-center p-1">V</div>
                        <p>Live video</p>
                    </div>
                    <div className="flex w-[13.5rem] h-10 p-2 justify-center gap-2">
                        <div className="border-white rounded-2xl border-2 h-6 w-6 flex items-center justify-center p-1">P</div>
                        <p>Photo/video</p>
                    </div>
                    <div className="flex w-[13.5rem] h-10 p-2 justify-center gap-2">
                        <div className="border-white rounded-2xl border-2 h-6 w-6 flex items-center justify-center p-1">F</div>
                        <p>Feeling/Activity</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Posts() {
    return (
        <div className="bg-zinc-700 rounded-md w-full h-auto">
            <div className="flex flex-col">
                <div className="flex h-12 pt-3 px-4 mb-3">
                    <div className="border-white rounded-2xl border-2 h-10 w-10 flex items-center justify-center p-1 mr-2">Pic</div>
                    <div className="flex flex-col">
                        <p className="text-left"><b>Big C</b></p>
                        <span className="text-xs">Sponsored</span>
                    </div>
                </div>
                <div className="px-4 pb-4 pt-1">
                    <p className="text-left">
                        ตอนนี้กำลังมีประเด็นการ #ล้างหนี้กยศ
                        ที่มีการผลักดันกฏหมาย ยกเลิกหนี้ให้คนที่ติดหนี้ กยศ บอกว่ามีหนี้สินแล้วไร้แรงจูงใจในการเริ่มต้นชีวิต บลาๆ ทำให้เกิดความเหลื่อมล้ำ บลาๆ
                        อันนี้ไม่เห็นด้วยอย่างยิ่ง ในฐานะที่ จ่าก็เป็นคนนึงที่เรียนจบมาด้วยการกู้ กยศ ขอบอกว่า การกู้หนี้ กยศ นี่ช่วยสร้างอนาคตให้คนจำนวนมากทั่วประเทศ
                        แต่มันมีคนเห็นแก่ตัวจำพวกนึง ซึ่ง บ้านไม่จน แต่กู้หนี้ กยศ มาจ่ายสุรุ่ยสุร่าย ออกรถ ออกมือถืองี้ อันนี้มีตั้งแต่รุ่นจ่าละ คนที่เดือดร้อนจริงๆก็นั่งตาปริบๆ เพราะกู้ไม่ได้ เงินกองทุนเกลี้ยง เจอคนพวกนี้ชิงกู้ไปซะเยอะ
                    </p>
                </div>
                <img src="https://i.picsum.photos/id/1084/536/354.jpg?grayscale&hmac=Ux7nzg19e1q35mlUVZjhCLxqkR30cC-CarVg-nlIf60" alt="" />
                <div className="flex justify-between h-11 mx-4 py-2.5">
                    <div className="border-white rounded-2xl border-2 h-6 w-6 flex items-center justify-center p-1">L</div>
                </div>
                <hr className="border-zinc-400 mx-4" />
                <div className="flex justify-between">
                    <div className="flex w-[13.5rem] h-10 p-2 justify-center gap-2">
                        <div className="border-white rounded-2xl border-2 h-4.5 w-4.5 flex items-center justify-center p-1">L</div>
                        <p>Like</p>
                    </div>
                    <div className="flex w-[13.5rem] h-10 p-2 justify-center gap-2">
                        <div className="border-white rounded-2xl border-2 h-4.5 w-4.5 flex items-center justify-center p-1">C</div>
                        <p>Comment</p>
                    </div>
                    <div className="flex w-[13.5rem] h-10 p-2 justify-center gap-2">
                        <div className="border-white rounded-2xl border-2 h-4.5 w-4.5 flex items-center justify-center p-1">S</div>
                        <p>Share</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {
    CreatePostBar,
    Posts
}

export default Feed