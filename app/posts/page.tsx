import { PostListPageComponent } from "@/components/app/posts/post-list-page"
import client from "@/tina/__generated__/client"
import React from "react"

export default async function PostListPage() {
  const result = await client.queries.postsConnection()
  return <PostListPageComponent {...result} />
}
