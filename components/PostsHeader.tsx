import React from "react"
import BigButton from "./BigButton"
import { TbSmartHome } from "react-icons/tb"
import Bounded from "./Bounded"
import Header from "./Header"
import Heading from "./Heading"
import { ThemeToggle } from "./ThemeToggle"

const PostsHeader = () => {
  return (
    <div className="mx-auto my-8 flex w-full max-w-[1440px] items-center justify-between px-4 ">
      <div className="flex items-center gap-6">
        <BigButton className="" href="/" linkText="Back Home">
          <div className="flex">
            <TbSmartHome className="mr-4" />
            Back home
          </div>
        </BigButton>
        {/* <Heading
          className="font-medium text-zinc-400 dark:text-zinc-700"
          size="sm"
        >
          Jinesh Bhaskaran
        </Heading> */}
      </div>
      <ThemeToggle />
    </div>
  )
}

export default PostsHeader
