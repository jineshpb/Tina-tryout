import React from "react"
import BigButton from "./BigButton"
import { TbSmartHome } from "react-icons/tb"
import Bounded from "./Bounded"
import Header from "./Header"
import Heading from "./Heading"

const PostsHeader = () => {
  return (
    <div className="mx-auto my-8 flex w-full max-w-[1440px] items-center gap-8 px-4 ">
      <BigButton className="" href="/" linkText="Back Home">
        <div className="flex">
          <TbSmartHome className="mr-4" />
          Back home
        </div>
      </BigButton>
      <Heading className="font-medium text-zinc-400" size="sm">
        Jinesh Bhaskaran
      </Heading>
    </div>
  )
}

export default PostsHeader
