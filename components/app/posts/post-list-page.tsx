"use client"

import { PostsConnectionQuery } from "@/tina/__generated__/types"
import moment from "moment"
import Link from "next/link"
import { useTina } from "tinacms/dist/react"

export function PostListPageComponent(props: {
  data: PostsConnectionQuery
  variables: {}
  query: string
  tag?: string
}) {
  const { data } = useTina(props)

  //   const postList = data.postsConnection.edges

  const postList = props.tag
    ? data.postsConnection.edges?.filter((post: any) => {
        if (post.node.tags && post.node.tags.includes(props.tag)) {
          return post
        }
      })
    : data.postsConnection.edges

  postList?.sort((a: any, b: any) => {
    const dateA: any = new Date(a.node.date)
    const dateB: any = new Date(b.node.date)

    return dateB - dateA
  })

  const tags = data?.postsConnection?.edges?.reduce((acc: any, post: any) => {
    if (post.node.tags) {
      post.node.tags.forEach((tag: any) => {
        if (acc[tag]) {
          acc[tag]++
        } else {
          acc[tag] = 1
        }
      })
    }
    return acc
  }, {})

  console.log(tags)

  return (
    <>
      <h1>Blog</h1>
      <div>
        <ul className="m-0 pl-0">
          {postList?.map((post: any) => {
            return (
              <li key={post.node.id} className="mt-0 pb-2">
                <div className="flex">
                  <span className="text-sm text-gray-400">
                    {moment(post.node.date).format("MMM DD, YYYY")}
                  </span>
                </div>
                <Link href={`/posts/${post.node._sys.filename}`}>
                  {post.node.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
