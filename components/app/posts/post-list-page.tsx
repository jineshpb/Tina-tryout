'use client'

import { PostsConnectionQuery } from "@/tina/__generated__/types"
import Link from "next/link"
import { useTina } from "tinacms/dist/react"

export function PostListPageComponent(props:{
    data:PostsConnectionQuery
    variables:{ 
        relativePath: string 
    }
    query: string
}) {
    const { data } = useTina(props)

    const postList = data.postsConnection.edges

    return(
       <>
       <h1>Blog</h1>
       <div>
        {postList?.map((post:any) => {
            return (
                <div key={post.node.id}>
                    <Link href={`/posts/${post.node._sys.filename}`}>
                        {post.node.title}
                    </Link>
                </div>
            )
        })}
       </div>
       </>
    )
}