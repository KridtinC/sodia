import { IoMdVideocam } from 'react-icons/io'
import { FaPhotoVideo, FaSmile } from 'react-icons/fa'
import { BiLike, BiCommentDetail, BiShareAlt } from 'react-icons/bi'
import { useState } from 'react'

function Feed() {
    return (
        <div className="flex flex-col m-auto gap-4 max-w-2xl mt-6 mb-0 overflow-y-scroll">
            <CreatePostBar />
            <Posts />
        </div>
    )
}

function CreatePostBar() {

    var [showCreatePostButton, setShowCreatePostButton] = useState(false)

    const onInputFocus = () => {
        setShowCreatePostButton(true)
    }
    
    return (
        <div className="bg-zinc-700 rounded-md w-full h-32 p-3">
            <div className="flex flex-col">
                <div className="flex h-10 gap-2">
                    <div className="bg-zinc-600 rounded-2xl h-[40px] w-[40px] flex items-center justify-center p-1">Pic</div>
                    <input type="text" onFocus={onInputFocus} placeholder="What's on your mind?" className="w-[37.5rem] bg-zinc-500 rounded-3xl pl-3 outline-none" />
                    <button onClick={() => console.log('test')} className={`h-full items-center p-2 bg-blue-500 ${showCreatePostButton ? 'block' : 'hidden'}`}>Create</button>
                </div>
                <hr className="border-zinc-400 mt-3 pb-2" />
                <div className="flex justify-between">
                    <CreatePostButton button={<IoMdVideocam className='text-red-400' />} txt="Live video" />
                    <CreatePostButton button={<FaPhotoVideo className='text-green-400' />} txt="Photo/video" />
                    <CreatePostButton button={<FaSmile className='text-yellow-400' />} txt="Feeling/Activity" />
                </div>
            </div>
        </div>
    )
}

const CreatePostButton = ({ button, txt }: { button: React.ReactNode, txt: string }) => {
    return (
        <div className="flex w-[13.5rem] h-10 p-2 justify-center gap-2">
            <div className="rounded-2xl h-6 w-6 flex items-center justify-center p-1">
                {button}
            </div>
            <div>{txt}</div>
        </div>
    )
}

function Posts() {
    return (
        <div className='flex flex-col gap-4'>
            <Post />
            <Post />
            <Post />
        </div >
    )
}

function Post() {
    return (
        <div className="bg-zinc-700 rounded-md w-full h-auto flex flex-col">
            <div className="flex flex-col">
                <div className="flex h-12 pt-3 px-4 mb-3">
                    <div className="bg-zinc-600 rounded-2xl h-10 w-10 flex items-center justify-center p-1 mr-2">Pic</div>
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
                <div className="flex gap-2 h-11 mx-4 py-2.5">
                    <BiLike className='rounded-2xl h-6 w-6 p-1 bg-blue-500' />
                    <p>22</p>
                </div>
                <hr className="border-zinc-400 mx-4" />
                <div className="flex justify-between">
                    <PostButton button={<BiLike />} txt="Like" />
                    <PostButton button={<BiCommentDetail />} txt="Comment" />
                    <PostButton button={<BiShareAlt />} txt="Share" />
                </div>
            </div>
        </div >
    )
}

const PostButton = ({ button, txt }: { button: React.ReactNode, txt: string }) => {
    return (
        <div className="flex w-[13.5rem] h-10 p-2 justify-center gap-2">
            <div className="rounded-2xl h-6 w-6 flex items-center justify-center">
                {button}
            </div>
            <div>{txt}</div>
        </div>
    )
}

export default Feed