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
    <div className="sticky top-0 z-10 w-full ">
      <NewNavbar {...result2} />
    </div>
  )
}
