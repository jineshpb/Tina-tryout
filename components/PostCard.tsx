import moment from "moment"
import Link from "next/link"

export default function PostCard({
  post,
  className,
}: {
  post: any
  className: any
}) {
  return (
    <div key={post.node.id} className="my-0 mt-6 list-none gap-4 border-b-2">
      <Link href={`/posts/${post.node._sys.filename}`}>
        <div className="text-[60px] font-normal leading-tight tracking-tighter text-zinc-700 hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-300">
          {post.node.title}{" "}
        </div>
        <span className="text-sm text-gray-400">
          {" "}
          - {moment(post.node.date).format("MMM DD, YYYY")}
        </span>
      </Link>
    </div>
  )
}
