import React from "react"
import BigButton from "./BigButton"
import { ThemeToggle } from "./ThemeToggle"
import { FaArrowLeft } from "react-icons/fa"
import Heading from "./Heading"
import { FiHome } from "react-icons/fi"

const PostsHeader = () => {
  return (
    <div className="absolute left-1/2 top-6 z-[99] flex w-full max-w-[1440px] -translate-x-1/2 items-center justify-between px-4">
      <div className="flex items-center gap-6">
        <BigButton className="" href="/" linkText="Back Home" useBack>
          <div className="flex">
            <FiHome />
          </div>
        </BigButton>
        {/* <Heading
          className="font-medium text-zinc-400 dark:text-zinc-700"
          size="sm"
        >
          Jinesh Bhaskaran
        </Heading> */}
      </div>
      <div className="p-4">
        <ThemeToggle />
      </div>
    </div>
  )
}

export default PostsHeader
