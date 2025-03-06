import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip"
import { Radio, SunIcon } from "lucide-react"
import Link from "next/link"
import React from "react"

function ProductPill() {
  return (
    <div className="flex h-[80px] w-[130px] justify-between gap-1 rounded-[40px] border border-[#2A3148]/[0.04] bg-[#E1E3EA] p-2 dark:bg-[#535B66] lg:h-[100px] lg:w-[162px]">
      <div className="custom-shadow-light dark:custom-shadow-dark relative flex flex-col items-center justify-center rounded-[32px] p-4 lg:p-8">
        <Radio className="text-[#C5C8D2] dark:text-[#242835]" />
      </div>
      <div className="m-2 flex size-6 items-center justify-center rounded-full bg-gradient-to-b from-[#2D313C] to-[#9B9EA6] lg:size-8 ">
        <div className="flex size-4 items-center justify-center rounded-full bg-gradient-to-b from-[#21242D] to-[#5E626D] lg:size-6">
          <div className="relative size-3 rounded-full border border-[#353535] bg-gradient-radial from-[#939393] to-[#606060] lg:size-4">
            <div className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full  bg-gradient-to-b from-[#FFFFFE] to-[#B6B6B6]/0 lg:size-3"></div>
            <div className=" size-2 rounded-full bg-yellow-300 opacity-0 blur-[1px] transition-opacity duration-300 dark:opacity-100 lg:size-4"></div>
            <div className="absolute size-2 rounded-full bg-yellow-300 opacity-0 blur-[10px] transition-opacity duration-300 dark:opacity-100 lg:size-4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductPill
