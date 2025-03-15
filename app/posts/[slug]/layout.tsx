"use client"

import PostsHeader from "@/components/PostsHeader"
import { useScreenSize } from "@/utils/useScreenSize"

export default function PostDetailsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const screenSize = useScreenSize()

  return (
    <>
      <div className="w-full">
        {screenSize != "sm" && <PostsHeader />}
        <main className="post-details w-full">{children}</main>
      </div>
    </>
  )
}
