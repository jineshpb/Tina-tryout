import Link from "next/link"

export default function SocialsButton({
  link,
  icon,
  text,
  className,
  conatainerClassName,
}: {
  link: string
  icon: JSX.Element
  text: string
  className?: string
  conatainerClassName?: string
}) {
  return (
    <Link
      href={link}
      target="_blank"
      className={`group relative w-full overflow-hidden rounded-[64px] bg-emerald-900 from-emerald-900 to-emerald-950 p-8 text-emerald-400 transition-all duration-500 ${conatainerClassName} `}
    >
      <span
        className={`absolute bottom-[-6px] left-0 z-10  size-full rounded-[64px] bg-emerald-700/10 transition-all duration-300 group-hover:bottom-[-12px] ${conatainerClassName} `}
      ></span>
      <span className={`z-20 text-[38px] ${className}`}>{text}</span>
      {icon}
    </Link>
  )
}
