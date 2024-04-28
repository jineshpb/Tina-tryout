"use client"

import Heading from "@/components/Heading"
import { PostsConnectionQuery } from "@/tina/__generated__/types"
import moment from "moment"
import Link from "next/link"
import { useTina } from "tinacms/dist/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Bounded from "@/components/Bounded"

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

  return (
    <Bounded>
      <div className="">
        <Heading size="lg" as="h1">
          Blog
        </Heading>

        <div className="mt-10 flex w-full justify-between md:space-x-12">
          <div>
            <ul className="m-0 pl-0">
              {postList?.map((post: any) => {
                return (
                  <li key={post.node.id} className="pb-10">
                    <Link
                      href={`/posts/${post.node._sys.filename}`}
                      className="text-3xl font-semibold tracking-tight "
                    >
                      {post.node.title}
                    </Link>
                    <div className="flex">
                      <span className="text-sm text-gray-400">
                        {moment(post.node.date).format("MMM DD, YYYY")}
                      </span>
                    </div>
                    {post.node.tags && (
                      <div className="flex flex-wrap gap-2 pt-2  text-sm text-purple-600 dark:text-purple-400">
                        {post.node.tags.map((tag: any) => (
                          <Link
                            href={`/posts/tags/${tag}`}
                            className="underline-offset-2 hover:underline"
                            key={tag}
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
          <Card className=" m-auto hidden flex-col md:flex">
            <CardHeader>
              <CardTitle>Filter by tags</CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href="/posts"
                className={`uppercase ${props.tag === undefined ? "pointer-events-none text-purple-600 dark:text-purple-400" : "text-zinc-700 hover:text-purple-500 dark:text-zinc-300 dark:hover:text-purple-500"}`}
              >
                All posts
              </a>
              <ul>
                {Object.keys(tags)
                  .map((tag: any) => (
                    <li className="my-3" key={tag}>
                      <Link
                        className={`px-3 py-2 text-sm font-medium uppercase ${props.tag === tag ? "pointer-events-none text-purple-600 dark:text-purple-400" : "text-primary hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-500"}`}
                        aria-label={`view posts tagged ${tag}`}
                        href={`/posts/tags/${tag}`}
                      >
                        {tag} ({tags[tag]})
                      </Link>
                    </li>
                  ))
                  .sort((a: any, b: any) => a.key.localeCompare(b.key))}
              </ul>
            </CardContent>
          </Card>

          {/* <div className="hidden h-full max-h-screen min-w-[240px] max-w-[280px] flex-wrap overflow-auto rounded bg-slate-100 pt-2 dark:bg-slate-900 md:flex">
          <div className="px-6 py-4">
            <a
              href="/posts"
              className={`uppercase ${props.tag === undefined ? "pointer-events-none text-purple-600 dark:text-purple-400" : "text-zinc-700 hover:text-purple-500 dark:text-zinc-300 dark:hover:text-purple-500"}`}
            >
              All posts
            </a>
            <ul>
              {Object.keys(tags)
                .map((tag: any) => (
                  <li className="my-3" key={tag}>
                    <Link
                      className={`px-3 py-2 text-sm font-medium uppercase ${props.tag === tag ? "pointer-events-none text-purple-600 dark:text-purple-400" : "text-primary hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-500"}`}
                      aria-label={`view posts tagged ${tag}`}
                      href={`/posts/tags/${tag}`}
                    >
                      {tag} ({tags[tag]})
                    </Link>
                  </li>
                ))
                .sort((a: any, b: any) => a.key.localeCompare(b.key))}
            </ul>
          </div>
        </div> */}
        </div>
      </div>
    </Bounded>
  )
}
