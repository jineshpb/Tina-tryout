import React from "react"
import ProductPill from "./ProductPill"
import CanvasPill from "./CanvasPill"
import { Radio } from "lucide-react"

const MobileHero = () => {
  return (
    <>
      <CanvasPill className="h-[130px] w-[180px]" />
      <h1 className="mt-6 text-center text-5xl font-medium tracking-tighter text-zinc-500 dark:text-zinc-400 md:text-5xl lg:text-5xl xl:text-7xl">
        Product Designer,
        <br /> CG Generalist,
        <br /> Novice coder
      </h1>
      <div className="mx-auto mt-6 flex w-auto items-center justify-center tracking-normal">
        <a
          href="https://live.jineshb.me"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border-2 border-emerald-500 bg-emerald-50 px-3 py-1 text-sm text-emerald-700 transition-colors hover:bg-emerald-100 dark:border-emerald-500 dark:bg-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-700"
        >
          <Radio className="size-3 animate-pulse" />
          <span className="inline-block min-w-fit">Live</span>
        </a>
      </div>
    </>
  )
}

export default MobileHero
