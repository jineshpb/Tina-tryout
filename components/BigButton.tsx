import { ReactNode } from "react"
import clsx from "clsx"
import Link from "next/link"

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  size?: "xl" | "lg" | "md" | "sm" | "xs"
  children: React.ReactNode
  className?: string
}

type BigButtonProps = {
  linkText?: string | "" | "Hey"
  href?: string
  target?: string
  className?: string
  children: ReactNode
  size?: "xl" | "lg" | "md" | "sm" | "xs"
}

export default function BigButton({
  linkText,
  href,
  target,
  className,
  children,

  size = "lg",
}: BigButtonProps) {
  return href ? (
    <button className={className}>
      <Link href={href} target={target} className={className}>
        <div
          className={clsx(
            "group relative w-auto rounded-[28px] bg-gradient-to-b from-emerald-300 to-emerald-500 px-8 py-6 text-3xl font-medium text-emerald-900 transition-all ease-in-out hover:from-emerald-200 hover:to-emerald-500",

            size === "xl" && "text-6xl md:text-6xl",
          )}
          style={{
            boxShadow:
              "inset 0 -1px 0 rgba(0, 0, 0, 0.2), inset 0 2px 4px #ffffff",
          }}
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
          "group relative w-auto rounded-[28px] bg-gradient-to-b from-emerald-300 to-emerald-500 px-8 py-6 text-3xl font-medium text-emerald-900 transition-all ease-in-out hover:from-emerald-200 hover:to-emerald-500",
          size === "xl" && "text-6xl md:text-6xl",
        )}
        style={{
          boxShadow:
            "inset 0 -1px 0 rgba(0, 0, 0, 0.2), inset 0 2px 4px #ffffff",
        }}
      >
        {children}
        <span className="absolute bottom-[-6px] left-0 -z-10  size-full rounded-[30px] bg-emerald-600 transition-all duration-300 group-hover:bottom-[-5px]"></span>
      </div>
    </button>
  )
}
