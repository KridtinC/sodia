import { Post } from "../domain/entity/post"

export interface GetPostsResponse {
    status: number
    data?: {
        posts: Post[]
    }
    error_message?: string
}

export interface CreatePostResponse {
    status: number
    data?: {
        post: Post
    }
    error_message?: string
}

export interface DeletePostResponse {
    status: number
}

export const GetPosts = async (): Promise<Post[]> => {
    try {
        var resp = await fetch(`http://localhost:8080/posts`, {
            method: 'GET',
            credentials: 'include'
        })
        const respbody: GetPostsResponse = await resp.json()
        return respbody.data!.posts
    } catch (e: any) {
        console.log(e)
    }
    return []
}

export const CreatePost = async (post: Post): Promise<Post> => {
    try {
        var resp = await fetch(`http://localhost:8080/posts`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post),
            credentials: 'include'
        })
        const respbody: CreatePostResponse = await resp.json()
        return respbody.data!.post

    } catch (e: any) {
        console.log(e)
    }
    return post
}

export const DeletePost = async (postID: string): Promise<boolean> => {
    try {
        var resp = await fetch(`http://localhost:8080/posts/${postID}`, {
            method: "DELETE",
            credentials: 'include'
        })
        const respbody: DeletePostResponse = await resp.json()
        console.log(respbody)
        if (respbody.status === 0) {
            return true
        }
        return false

    } catch (e: any) {
        console.log(e)
    }
    return false
}