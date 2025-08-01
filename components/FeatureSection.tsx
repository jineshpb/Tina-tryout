import Link from "next/link"
import React from "react"
import { Button } from "./ui/button"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import NeedsPasswordPill from "./needs-password-pill"

const FeatureSection = () => {
  return (
    <div className="flex w-full  gap-4 ">
      <div className="relative mx-auto flex max-w-2xl flex-col items-center justify-between gap-8 rounded-2xl border border-gray-200 bg-white  p-6 pb-16 dark:border-gray-800 dark:bg-neutral-900 md:flex-row md:items-start  md:pb-6">
        <div className="absolute bottom-0 left-1/2 z-0  size-32 -translate-x-1/2 md:bottom-0 md:left-auto md:right-4 md:translate-x-0">
          <DotLottieReact
            src="https://lottie.host/6f077cf8-c686-4621-ae6b-39ba6e076e70/9T6qoJOb6X.lottie"
            loop
            autoplay
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-center justify-start gap-2 md:flex-row md:items-center">
            <NeedsPasswordPill />
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-500">
              Selected Works
            </h2>
          </div>

          <p className="text-sm text-gray-500 ">
            This is a selection of the UI/UX projects I have worked on.
            <br /> I have tried to include at least one project from every year.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="z-[1] flex flex-col gap-4">
            <Link href="/password-protected/figma-slides" target="_blank">
              <Button variant="outline" className="w-fit">
                View slides
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureSection
