"use client"

import { PostsQuery } from "@/tina/__generated__/types"
import Link from "next/link"
import Image from "next/image"
import moment from "moment"
import Heading from "@/components/Heading"

interface SuggestedPostsProps {
  currentPost: PostsQuery["posts"]
  suggestedPosts: any[]
}

export default function SuggestedPosts({ 
  currentPost, 
  suggestedPosts 
}: SuggestedPostsProps) {
  if (!suggestedPosts.length) return null

  return (
    <div className="mt-20 border-t border-zinc-200 pt-20 dark:border-zinc-700">
      <Heading
        size="md"
        className="mb-12 font-normal tracking-tighter text-zinc-300 dark:text-zinc-700"
      >
        You might also like
      </Heading>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {suggestedPosts.map((post, i) => (
          <Link
            href={`/posts/${post._sys.filename}`}
            key={i}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {post.coverImage && (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h3 className="text-xl font-medium text-zinc-700 dark:text-zinc-300">
                  {post.title}
                </h3>
                <time className="mt-2 block text-sm text-zinc-500">
                  {moment(post.date).format("MMM DD, YYYY")}
                </time>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map(
                    (tag: string, i: number) =>
                      tag && (
                        <span
                          key={i}
                          className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-800 dark:bg-emerald-800/30 dark:text-emerald-200"
                        >
                          {tag}
                        </span>
                      ),
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
