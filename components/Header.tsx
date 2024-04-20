import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import {
  RxChatBubble,
  RxCode,
  RxDividerVertical,
  RxHome,
  RxPerson,
} from "react-icons/rx"
import { RiGithubFill, RiTwitterXFill, RiYoutubeFill } from "react-icons/ri"
import Image from "next/image"

export default function Header() {
  return (
    <header className="mb-20 mt-4 flex content-center items-center justify-between  text-base">
      <div>
        <Link href="/">
          <Image src="/JB-2.svg" alt="Jinesh logo" width={32} height={32} />
        </Link>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex gap-4">
          <Link href="/about" className="max-sm:hidden">
            About
          </Link>
          <Link href="/about" className="sm:hidden">
            <RxPerson />
          </Link>
          <Link href="/projects" className="max-sm:hidden">
            Projects
          </Link>
          <Link href="/project" className="sm:hidden">
            <RxCode />
          </Link>
          <Link href="/posts" className="max-sm:hidden">
            Blog
          </Link>
          <Link href="/posts" className="sm:hidden">
            <RxChatBubble />
          </Link>
        </div>
        <div className="flex justify-between gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
