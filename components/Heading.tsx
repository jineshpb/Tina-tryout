import clsx from "clsx"

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  size?: "2xl" | "xl" | "lg" | "md" | "sm" | "xs"
  children: React.ReactNode
  className?: string
}

export default function Heading({
  as: Comp = "h1",
  className,
  children,
  size = "lg",
}: HeadingProps) {
  return (
    <Comp
      className={clsx(
        "w-auto font-bold leading-tight tracking-tight  text-emerald-300 dark:text-emerald-400",
        size === "2xl" && "text-9xl md:text-[200px]",
        size === "xl" && "text-7xl md:text-9xl",
        size === "lg" && "text-6xl md:text-7xl lg:text-8xl",
        size === "md" && "text-5xl md:text-6xl",
        size === "sm" && "text-3xl md:text-4xl",
        size === "xs" && " text-lg md:text-2xl",
        className,
      )}
    >
      {children}
    </Comp>
  )
}
