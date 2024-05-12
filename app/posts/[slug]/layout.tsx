import PostsHeader from "@/components/PostsHeader"

export default function PostDetailsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className=" flex h-screen w-full flex-col items-center ">
        <PostsHeader />
        <main className="post-detaisl">{children}</main>
      </div>
    </>
  )
}
