import Link from "next/link"
import { FaInstagram, FaLinkedin } from "react-icons/fa"
import { FaSquareBehance } from "react-icons/fa6"

const iconMap: Record<string, React.ElementType> = {
  FaLinkedin: FaLinkedin,
  FaInstagram: FaInstagram,
  FaSquareBehance: FaSquareBehance,
}

export default function SocialsButton({
  link,
  icon,
  text,
  className,
  conatainerClassName,
}: {
  link: string
  icon: string // icon name, e.g., 'FaLinkedin'
  text: string
  className?: string
  conatainerClassName?: string
}) {
  const LucideIcon = iconMap[icon]
  return (
    <Link
      href={link}
      target="_blank"
      className={`group relative w-full  overflow-hidden rounded-[64px] bg-emerald-900 from-emerald-900 to-emerald-950 p-8 text-emerald-400 transition-all duration-500 ${conatainerClassName} `}
    >
      <span
        className={` absolute bottom-[-6px] left-0  size-full rounded-[64px] bg-emerald-700/10 transition-all duration-300 group-hover:bottom-[-12px] ${conatainerClassName} `}
      ></span>
      <div className="flex-col items-center justify-start">
        <div className={`z-20 text-[38px] ${className}`}>{text}</div>
        {LucideIcon ? (
          <LucideIcon className="ml-2 inline-block size-12" />
        ) : null}
      </div>
    </Link>
  )
}
