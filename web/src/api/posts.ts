import { Post } from "../domain/entity/post"

export interface GetPostsResponse {
    posts: Post[]
}

export interface CreatePostResponse {
    post: Post
}

export const GetPosts = async (userID: string): Promise<Post[]> => {
    try {
        var resp = await fetch(`http://localhost:8080/posts?userId=${userID}`)
        const respbody: GetPostsResponse = await resp.json()
        return respbody.posts
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
            body: JSON.stringify(post)
        })
        const respbody: CreatePostResponse = await resp.json()
        return respbody.post

    } catch (e: any) {
        console.log(e)
    }
    return post
}