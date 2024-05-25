import moment from "moment"
import Link from "next/link"
import { tinaField } from "tinacms/dist/react"

export default function PostCard({
  post,
  className,
}: {
  post: any
  className: any
}) {
  return (
    <div
      key={post.node.id}
      className="my-0 list-none gap-4 border-b-2 border-zinc-100 dark:border-zinc-800"
    >
      <Link
        href={`/posts/${post.node._sys.filename}`}
        className="flex flex-col gap-2"
      >
        <div
          className="text-[60px] font-normal leading-tight tracking-tighter text-zinc-700 hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-300"
          data-tina-field={
            post.node ? tinaField(post.node, "title") : undefined
          }
        >
          {post.node.title}{" "}
        </div>
        <span className="pb-2 text-sm text-gray-400">
          {" "}
          {moment(post.node.date).format("MMM DD, YYYY")}
        </span>
      </Link>
    </div>
  )
}
