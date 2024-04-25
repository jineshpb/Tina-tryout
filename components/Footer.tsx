import Link from "next/link"
import { RiYoutubeFill, RiTwitterXFill, RiGithubFill } from "react-icons/ri"
import { RxDividerVertical } from "react-icons/rx"
import Bounded from "./Bounded"
import { GrInstagram } from "react-icons/gr"
import { BiLogoBehance } from "react-icons/bi"
import { FaSquareBehance } from "react-icons/fa6"
import { FaInstagram } from "react-icons/fa6"

export default function Footer() {
  return (
    <Bounded>
      <div className="mt-10 py-10 text-center text-sm">
        <hr />
        <div className="mt-6 flex justify-between">
          <p>All rights reserved. © 2024 Jinesh P bhaskaran </p>
          <div className="flex gap-4 text-zinc-400 dark:text-zinc-600 ">
            <Link
              href="https://youtube.com"
              className="transition-all duration-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            >
              <RiGithubFill size={24} />
            </Link>
            <Link
              href="https://instagram.com/jineshpbhaskar"
              target="_blank"
              className="transition-all duration-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            >
              <FaInstagram size={24} />
            </Link>
            <Link
              href="https://instagram.com/jineshpbhaskar"
              target="_blank"
              className="transition-all duration-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            >
              <FaSquareBehance size={24} />
            </Link>
          </div>
        </div>
      </div>
    </Bounded>
  )
}
