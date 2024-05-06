import Link from "next/link"

export default function SocialsButton({
  link,
  icon,
  text,
}: {
  link: string
  icon: JSX.Element
  text: string
}) {
  return (
    <Link
      href={link}
      target="_blank"
      className="w-full rounded-[64px] bg-emerald-900 from-emerald-900 to-emerald-950 p-8 text-emerald-400 transition-all duration-500 hover:bg-gradient-to-b"
    >
      <span className="text-[38px]">{text}</span>
      {icon}
    </Link>
  )
}
