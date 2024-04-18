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

export default function Header() {
  return (
    <header className="mb-20 mt-16 flex content-center items-center justify-between font-sans text-base">
      <div className="flex gap-4">
        <Link href="/" className="max-sm:hidden">
          Home
        </Link>
        <Link href="/" className="sm:hidden">
          <RxHome />
        </Link>
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
        <Link href="https://youtube.com">
          <RiYoutubeFill />
        </Link>
        <Link href="https://youtube.com">
          <RiTwitterXFill />
        </Link>
        <Link href="https://youtube.com">
          <RiGithubFill />
        </Link>
        <RxDividerVertical className="text-gray-300" />
        <ThemeToggle />
      </div>
    </header>
  )
}
