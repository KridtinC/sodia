import { AiFillHome } from 'react-icons/ai'
import { MdVideoLibrary, MdLocalGroceryStore, MdGroup } from 'react-icons/md'
import { CgMoreR } from 'react-icons/cg'

function Header() {
    return (
        <div className="bg-gray-800 fixed overflow-x-auto w-full top-0 h-14 px-2 py-1 flex justify-between items-center">
            <div className="bg-slate-700 rounded-2xl h-10 w-10 flex items-center justify-center p-1">So</div>
            <div className="flex gap-4">
                <Button button={<AiFillHome className='w-7 h-7' />} />
                <Button button={<MdVideoLibrary className='w-7 h-7' />} />
                <Button button={<MdLocalGroceryStore className='w-7 h-7' />} />
                <Button button={<MdGroup className='w-7 h-7' />} />
                <Button button={<CgMoreR className='w-7 h-7' />} />
            </div>
            <div className="bg-slate-700 rounded-2xl h-10 w-10 flex items-center justify-center p-1">Usr</div>
        </div>
    )
}

const Button = ({ button }: { button: React.ReactNode }) => {
    return (
        <div className="rounded-2xl h-full w-24 flex justify-center p-1 hover:bg-slate-600">
            {button}
        </div>
    )
}

export default Header