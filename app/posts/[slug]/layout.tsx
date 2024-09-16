import PostsHeader from "@/components/PostsHeader"

export default function PostDetailsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className=" flex w-full flex-col items-center ">
        <PostsHeader />
        <main className="post-details w-full">{children}</main>
      </div>
    </>
  )
}
