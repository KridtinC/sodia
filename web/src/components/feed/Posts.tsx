import { Dispatch, useEffect, useState } from "react"
import { BiCommentDetail, BiLike, BiShareAlt } from "react-icons/bi"
import { CgMore } from "react-icons/cg"
import { PostsAction, PostsActionKind } from "."
import { GetPosts } from "../../api/posts"
import { Post } from "../../domain/entity/post"

interface IPostProps {
    posts: Post[],
    dispatch: Dispatch<PostsAction>
}

export function Posts(props: IPostProps) {

    useEffect(() => {
        const fetchPosts = async (userID: string) => {
            let posts = await GetPosts(userID)
            props.dispatch({
                type: PostsActionKind.GETS,
                payload: {
                    getPosts: posts
                }
            })
        }

        fetchPosts("test")
    }, [])

    return (
        <div className='flex flex-col gap-4'>
            {
                props.posts.length === 0 ? <p>loading...</p> :
                    props.posts.map((post: Post) => {
                        return <PostContent dispatch={props.dispatch} key={post.id} post={post} />
                    })
            }
        </div >
    )
}

interface IPostContentProps {
    post: Post
    dispatch: Dispatch<PostsAction>
}


function PostContent(props: IPostContentProps) {

    const [showOption, setShowOption] = useState(false)

    return (
        <div className="bg-zinc-700 rounded-md w-full h-auto flex flex-col">
            <div className="flex flex-col">
                <div className="flex justify-between h-12 pt-3 px-4 mb-3">
                    <div className="flex">
                        <div className="bg-zinc-600 rounded-2xl h-10 w-10 flex items-center justify-center p-1 mr-2">Pic</div>
                        <div className="flex flex-col">
                            <p className="text-left"><b>{props.post.user_id}</b></p>
                            <span className="text-xs">{
                                props.post.created_date
                            }</span>
                        </div>
                    </div>
                    <div className="flex hover:cursor-pointer" onClick={() => setShowOption(true)} onBlur={() => setShowOption(false)}>
                        <CgMore />
                        <li className={`w-32 h-max relative bg-slate-600 ${showOption ? 'block' : 'hidden'}`}>
                            <ul onClick={() => props.dispatch({
                                payload: {
                                    deletedPostID: props.post.id
                                },
                                type: PostsActionKind.DELETE
                            })}>Delete</ul>
                        </li>
                    </div>
                </div>
                <div className="px-4 pb-4 pt-1">
                    <p className="text-left">
                        {props.post.content}
                    </p>
                </div>
                <img src={props.post.img_url} alt="" />
                <div className="flex gap-2 h-11 mx-4 py-2.5">
                    <BiLike className='rounded-2xl h-6 w-6 p-1 bg-blue-500' />
                    <p>{props.post.no_of_liked}</p>
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