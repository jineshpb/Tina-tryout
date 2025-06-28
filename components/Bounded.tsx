"use client"

import React, { useEffect, useState } from "react"
import clsx from "clsx"

type BoundedProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  style?: React.CSSProperties
  id?: string
}

const Bounded = React.forwardRef<HTMLDivElement, BoundedProps>(
  ({ as: Comp = "section", className, children, id, ...restProps }, ref) => {
    const [isMobile, setIsMobile] = useState(isMobileDevice())
    function isMobileDevice() {
      if (typeof window !== "undefined") {
        return window.innerWidth < 768
      }
      return false
    }

    useEffect(() => {
      function handleResize() {
        setIsMobile(isMobileDevice())
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
      <Comp ref={ref} className={clsx("")} {...restProps} id={id}>
        <div
          className={clsx(
            "relative mx-auto w-full max-w-[1440px] px-6 pt-[120px] lg:px-24",
            {
              "px-[16px] pt-20": isMobile,
            },
            className,
          )}
        >
          {children}
        </div>
      </Comp>
    )
  },
)

Bounded.displayName = "Bounded"

export default Bounded
