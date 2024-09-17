import moment from "moment"
import Link from "next/link"
import { tinaField } from "tinacms/dist/react"
import { FaLock } from "react-icons/fa" // Import the lock icon

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
      className="mt-1 list-none gap-4 border-b-2 border-zinc-100 dark:border-zinc-800 lg:mt-3"
    >
      <Link
        href={`/posts/${post.node._sys.filename}`}
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col items-start ">
          {post.node.password && (
            <div className="flex items-center rounded-xl  border border-zinc-100 px-2 py-1 text-sm text-gray-400 shadow-sm dark:border-zinc-800">
              <FaLock className="mr-2 text-gray-400" />
              <p>needs password</p>
            </div>
          )}
          <div
            className="text-[40px] font-normal leading-tight tracking-tighter text-zinc-700 hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-300 md:text-[60px]"
            data-tina-field={
              post.node ? tinaField(post.node, "title") : undefined
            }
          >
            {post.node.title}{" "}
          </div>
        </div>

        <div className="flex items-center gap-2 pb-2 text-sm text-gray-400">
          {" "}
          {moment(post.node.date).format("MMM DD, YYYY")}
        </div>
      </Link>
    </div>
  )
}
