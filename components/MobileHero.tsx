import React from "react"
import ProductPill from "./ProductPill"
import CanvasPill from "./CanvasPill"

const MobileHero = () => {
  return (
    <>
      <CanvasPill className="h-[130px] w-[180px]" />
      <h1 className="mt-6 text-center text-5xl font-medium tracking-tighter text-zinc-500 dark:text-zinc-400 md:text-5xl lg:text-5xl xl:text-7xl">
        Product Designer,
        <br /> CG Generalist,
        <br /> Novice coder
      </h1>
    </>
  )
}

export default MobileHero
