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
import clsx from "clsx"
import Bounded from "./Bounded"
import { useTina } from "tinacms/dist/react"
import { SettingsConnectionDocument } from "@/tina/__generated__/types"
import client from "@/tina/__generated__/client"
import NavBar from "./Navbar"
import result from "postcss/lib/result"
import NewNavbar from "./NewNavbar"

export default async function Header({ className }: { className?: string }) {
  const result = await client.queries.settings({
    relativePath: "settings_doc.json",
  })

  const result2 = await client.queries.settingsConnection()
  console.log(result2)

  return (
    <>
      <NewNavbar {...result2} />
      {/* <header
        className={clsx("m-8 flex justify-between gap-4 text-base ", className)}
      >
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
      </header> */}
    </>
  )
}
