import { ReactNode } from "react"
import clsx from "clsx"
import Link from "next/link"

type BigButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href: string
}
export default function BigButton({
  href,
  className,
  children,
}: BigButtonProps) {
  return href ? (
    <button className={className}>
      <Link href={href} className="">
        <div
          className={clsx(
            "group relative w-auto rounded-[28px] bg-gradient-to-b from-emerald-300 to-emerald-500 px-8 py-6 text-3xl font-medium text-emerald-900 transition-all ease-in-out hover:bg-gradient-to-b hover:from-emerald-200 hover:to-emerald-500",
          )}
        >
          {children}
          <span className="absolute bottom-[-6px] left-0 -z-10  size-full rounded-[30px] bg-emerald-600 transition-all duration-300 group-hover:bottom-[-5px]"></span>
        </div>
      </Link>
    </button>
  ) : (
    <button className={className}>
      <div
        className={clsx(
          "group relative w-auto rounded-[28px] bg-gradient-to-b from-emerald-300 to-emerald-500 px-8 py-6 text-3xl font-medium text-emerald-900 transition-all ease-in-out hover:bg-gradient-to-b hover:from-emerald-200 hover:to-emerald-500",
        )}
      >
        {children}
        <span className="absolute bottom-[-6px] left-0 -z-10  size-full rounded-[30px] bg-emerald-600 transition-all duration-300 group-hover:bottom-[-5px]"></span>
      </div>
    </button>
  )
}
