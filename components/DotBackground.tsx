import React from "react"

export function DotBackgroundDemo() {
  return (
    <div className="bg-dot-black/[0.1] dark:bg-dot-white/[0.1] relative flex  h-[70rem] w-full items-center justify-center ">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-zinc-900"></div>
    </div>
  )
}
