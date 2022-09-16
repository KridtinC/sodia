import { Dispatch, FormEvent, useState } from "react"
import { FaPhotoVideo, FaSmile } from "react-icons/fa"
import { IoMdVideocam } from "react-icons/io"
import { PostsAction, PostsActionKind } from "."
import { CreatePost, CreatePostResponse } from "../../api/posts"
import { Post } from '../../domain/entity/post'

interface CreatePostBarProps {
    dispatch: Dispatch<PostsAction>
}

export function CreatePostBar(props: CreatePostBarProps) {

    var [showCreatePostButton, setShowCreatePostButton] = useState(false)

    const onInputFocus = () => {
        setShowCreatePostButton(true)
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let content = (e.currentTarget.elements.namedItem("content") as HTMLInputElement).value
        let post: Post = {
            content: content
        }
        post = await CreatePost(post)
        props.dispatch({
            payload: {
                createdPost: post
            },
            type: PostsActionKind.CREATE
        })
    }

    return (
        <div className="bg-zinc-700 rounded-md w-full h-32 p-3">
            <div className="flex flex-col">
                <form className="flex h-10 gap-2" onSubmit={onSubmit}>
                    <div className="bg-zinc-600 rounded-2xl h-[40px] w-[40px] flex items-center justify-center p-1">Pic</div>
                    <input id="content" type="text" onFocus={onInputFocus} placeholder="What's on your mind?" className="w-[37.5rem] bg-zinc-500 rounded-3xl pl-3 outline-none" />
                    <button className={`h-full items-center p-2 bg-blue-500 ${showCreatePostButton ? 'block' : 'hidden'}`}>Create</button>
                </form>
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