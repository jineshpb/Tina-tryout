import { useState, useEffect } from "react"

type ScreenSize = "sm" | "md" | "lg" | "xl" | "2xl"

export function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>("sm")

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth
      if (width < 640) {
        setScreenSize("sm")
      } else if (width < 768) {
        setScreenSize("md")
      } else if (width < 1024) {
        setScreenSize("lg")
      } else if (width < 1280) {
        setScreenSize("xl")
      } else {
        setScreenSize("2xl")
      }
    }

    // Initial check
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return screenSize
}

// Add the isMobile hook
export function useIsMobile(): boolean {
  const screenSize = useScreenSize()
  return screenSize === "sm"
}

// Optional: Add helper functions
export function isSmallScreen(size: ScreenSize): boolean {
  return size === "sm"
}

export function isMediumScreen(size: ScreenSize): boolean {
  return size === "md"
}

export function isLargeScreen(size: ScreenSize): boolean {
  return size === "lg"
}

export function isExtraLargeScreen(size: ScreenSize): boolean {
  return size === "xl"
}

export function is2XLScreen(size: ScreenSize): boolean {
  return size === "2xl"
}
