import React, { useEffect, useState } from "react"
import ProductPill from "./ProductPill"
import CanvasPill from "./CanvasPill"
import { FollowerPointerCard } from "@/components/ui/following-pointer"
import Image from "next/image"
import { BackgroundGradient } from "@/components/ui/BackgroundGradient"
import SmallAvatar from "@/components/SmallAvatar"
import MobileHero from "@/components/MobileHero"
import { tinaField } from "tinacms/dist/react"

const DelayedComponent = ({
  children,
  delay = 0,
}: {
  children: JSX.Element
  delay?: number
}) => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return isReady ? (
    children
  ) : (
    <div className="mx-2 flex animate-shimmer items-center justify-center rounded-[40px] bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-100 bg-[length:400%_100%] dark:from-zinc-700 dark:via-zinc-600 dark:to-zinc-700 md:h-[60px] md:w-[120px] lg:h-[100px] lg:w-[160px]">
      {/* <Loader className="  animate-spin" /> */}

      {/* <BiLoaderAlt className=" size-12 animate-spin" /> */}
    </div>
  )
}
const TitleComponent = ({ title }: { title: string }) => (
  <div className="flex items-center space-x-2">
    <Image
      src="/slightly-smiling-face_1f642.png"
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p></p>
    <p>{title}</p>
  </div>
)

const PageHero = ({ block }: { block: any }) => {
  return (
    <section className="relative flex w-full flex-col gap-12 lg:mt-24 lg:flex-row">
      <div className=" mt-24 hidden w-full md:flex ">
        <div className=" w-full items-center justify-center text-6xl font-medium tracking-tighter text-zinc-500 dark:text-zinc-400 md:text-7xl  lg:text-8xl xl:text-9xl ">
          <div className="mx-auto w-full items-center justify-center space-y-6 ">
            <div className="select-none">
              <div className="flex w-full items-center justify-center gap-4">
                <h1>Product</h1>
                <DelayedComponent>
                  <ProductPill />
                </DelayedComponent>
                <h1>designer,</h1>
              </div>
            </div>
            <h1 className=" flex select-none items-center justify-center   ">
              CG{" "}
              <DelayedComponent>
                <CanvasPill className="h-[80px] w-[130px] lg:h-[130px] lg:w-[180px]" />
              </DelayedComponent>
              generalist,
            </h1>

            <div className="flex select-none items-center justify-center gap-4">
              novice coder{" "}
              <DelayedComponent>
                <FollowerPointerCard
                  title={<TitleComponent title={"That's me"} />}
                >
                  <div
                    onClick={() => {
                      const element = document.getElementById("footer")
                      element?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }}
                  >
                    <BackgroundGradient className=" size-full">
                      <SmallAvatar
                        image={block?.profileImage}
                        data-tina-field={
                          block ? tinaField(block, "profileImage") : undefined
                        }
                      ></SmallAvatar>
                    </BackgroundGradient>
                  </div>
                </FollowerPointerCard>
              </DelayedComponent>
            </div>
            <div className="mx-auto flex w-full items-center justify-center">
              <h3 className="mt-6 font-ppeditorial text-3xl tracking-wide text-zinc-300 dark:text-zinc-700 ">
                and generally curious.
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className=" mb-16 flex w-full flex-col items-center justify-center px-6 text-center text-5xl font-semibold tracking-tighter text-zinc-500 dark:text-zinc-400 md:hidden ">
        {/* {block?.title} */}
        <MobileHero />
        <div className="mx-auto flex w-full items-center justify-center">
          <h3 className="mt-4 font-ppeditorial text-lg font-normal tracking-wide text-zinc-300 dark:text-zinc-700 ">
            and generally curious.
          </h3>
        </div>
      </div>
    </section>
  )
}

export default PageHero
