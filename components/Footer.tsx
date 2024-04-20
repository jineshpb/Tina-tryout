import Link from "next/link"
import { RiYoutubeFill, RiTwitterXFill, RiGithubFill } from "react-icons/ri"
import { RxDividerVertical } from "react-icons/rx"

export default function Footer() {
  return (
    <div className="mt-10 py-10 text-center text-sm">
      <hr />
      <div className="mt-6 flex justify-between">
        <p>
          A{" "}
          <Link
            href="https://jineshb.me"
            target="_blank"
            className="underline-offset-2 hover:text-emerald-500 hover:underline"
          >
            Jinesh
          </Link>{" "}
          Template
        </p>
        <div className="flex gap-2">
          <Link href="https://youtube.com">
            <RiYoutubeFill />
          </Link>
          <Link href="https://youtube.com">
            <RiTwitterXFill />
          </Link>
          <Link href="https://youtube.com">
            <RiGithubFill />
          </Link>
        </div>
      </div>
    </div>
  )
}
