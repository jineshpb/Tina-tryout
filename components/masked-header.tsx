import clsx from "clsx"
import Bounded from "./Bounded"

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  size?: "2xl" | "xl" | "lg"
  children: React.ReactNode
  className?: string
  shadowClassName?: string
}

export default function MaskedHeader({
  as: Comp = "h1",
  className,
  children,
  size = "2xl",
  shadowClassName,
}: HeadingProps) {
  return (
    <Comp
      // eslint-disable-next-line tailwindcss/classnames-order
      className={clsx(
        "font-neue-montreal-medium pointer-events-none relative -z-10 w-auto overflow-hidden capitalize leading-tight tracking-normal text-zinc-300 dark:text-zinc-700 lg:-mb-32",
        size === "2xl" && "text-[80px] lg:text-[200px] xl:text-[300px] ",
        size === "xl" && "text-7xl md:text-9xl",
        size === "lg" && "text-6xl md:text-7xl lg:text-8xl",
        className,
      )}
    >
      {children}

      <div
        className={clsx(
          "absolute bottom-0 left-0 size-full  bg-gradient-to-b from-transparent via-white/90 via-65% to-white dark:via-zinc-900 dark:to-zinc-900",
          shadowClassName,
        )}
      />
    </Comp>
  )
}
