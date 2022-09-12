import { IoMdVideocam } from 'react-icons/io'
import { FaPhotoVideo, FaSmile } from 'react-icons/fa'
import { BiLike, BiCommentDetail, BiShareAlt } from 'react-icons/bi'
import { useEffect, useReducer, useState } from 'react'
import { Post } from '../../domain/entity/post'
import { formatRFC3339, parse, format } from 'date-fns'
import { CreatePostBar } from './CreatePostBar'
import { Posts } from './Posts'

export enum PostsActionKind {
    CREATE = 'CREATE',
    GETS = 'GETS',
    DELETE = 'DELETE'
}

export interface PostsAction {
    type: PostsActionKind
    payload: {
        createdPost?: Post
        deletedPostID?: string
        getPosts?: Post[]
    }
}

function postsReducer(state: Post[], action: PostsAction): Post[] {
    switch (action.type) {
        case PostsActionKind.CREATE:
            return [action.payload.createdPost!, ...state]
        case PostsActionKind.GETS:
            return action.payload.getPosts!
        case PostsActionKind.DELETE:
            return state.filter((post) => post.id != action.payload.deletedPostID)
        default:
            return state
    }
}

function Feed() {

    const [posts, dispatch] = useReducer(postsReducer, [] as Post[])

    return (
        <div className="flex flex-col m-auto gap-4 max-w-2xl mt-6 mb-0 overflow-y-scroll">
            <CreatePostBar dispatch={dispatch} />
            <Posts dispatch={dispatch} posts={posts} />
        </div>
    )
}

export default Feed