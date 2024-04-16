import Link from "next/link"

export default function Header() {
  return (
    <header className="items center taxt-base mb-20 mt-16 flex content-center justify-between font-sans">
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/posts">Blog</Link>
      </div>
    </header>
  )
}
