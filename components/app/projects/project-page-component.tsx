"use client"

import { PostsQuery, ProjectsQuery } from "@/tina/__generated__/types"
import React, { lazy, Suspense, useEffect, useState } from "react"
import Rive, { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas"
import Image from "next/image"
import { IoArrowBack } from "react-icons/io5"
import Link from "next/link"
import { BiLoaderAlt } from "react-icons/bi"

const RiveWrapper = () => {
  const { RiveComponent } = useRive({
    src: "https://res.cloudinary.com/dhuk11prd/raw/upload/v1722429691/portfolio-tina/brio-carplay_xaw0k7.riv",
    stateMachines: "State Machine 1",
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  })

  return <RiveComponent />
}

const LazyRiveWrapper = lazy(() => Promise.resolve({ default: RiveWrapper }))

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
    <div className="z-10 flex items-center justify-center gap-2 text-red-700 ">
      <BiLoaderAlt className=" size-4 animate-spin" />
      Loading
    </div>
  )
}

export function ProjectPageComponent(props: {
  data: ProjectsQuery
  variables: {
    relativePath: string
  }
  query: string
}) {
  const { RiveComponent, rive } = useRive({
    src: "https://res.cloudinary.com/dhuk11prd/raw/upload/v1722429691/portfolio-tina/brio-carplay_xaw0k7.riv",

    stateMachines: "State Machine 1",

    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  })

  function trackCursorPosition(event: React.MouseEvent<HTMLDivElement>) {
    const x = event.clientX
    const y = event.clientY
    console.log("Cursor position:", x, y)

    if (typeof (trackCursorPosition as any).prevX !== "undefined") {
      if (x > (trackCursorPosition as any).prevX) {
        console.log("Cursor is moving to the right")
      } else if (x < (trackCursorPosition as any).prevX) {
        console.log("Cursor is moving to the left")
      }
    }

    if (x === (trackCursorPosition as any).prevX) {
      console.log("Cursor is at rest")
    }

    ;(trackCursorPosition as any).prevX = x
    ;(trackCursorPosition as any).prevY = y
  }

  return (
    <div className="d:h-screen relative flex h-[calc(100dvh)] w-full flex-col items-center justify-center overflow-hidden bg-[#090909]">
      <div
        className="absolute left-1/2 top-8 h-auto w-full max-w-[1800px] -translate-x-1/2  "
        style={{
          filter: "blur(1px)",
        }}
      >
        <div className="flex w-full  justify-between px-8 xl:px-32">
          <div className="flex items-center gap-2 ">
            <Link href="/">
              <IoArrowBack className=" size-8 text-red-700" />
            </Link>

            <Image
              src="https://res.cloudinary.com/dhuk11prd/image/upload/v1722431902/portfolio-tina/brio%20x%20carplay/english_logo_nxbt6y.svg"
              alt="brio-carplay"
              width={182}
              height={43}
            />
          </div>

          <Image
            src="https://res.cloudinary.com/dhuk11prd/image/upload/v1722431903/portfolio-tina/brio%20x%20carplay/jap_logo_jnkdnd.svg"
            alt="japanese logo"
            width={140}
            height={77}
            className="hidden md:flex"
          />
        </div>
      </div>
      <div
        className="absolute bottom-8 left-1/2 z-10 w-full max-w-[1800px]  -translate-x-1/2 px-8 xl:px-32"
        style={{
          filter: "blur(1px)",
        }}
      >
        <Image
          src="https://res.cloudinary.com/dhuk11prd/image/upload/v1722431903/portfolio-tina/brio%20x%20carplay/para_heading_woomlf.svg"
          width={591}
          height={37}
          alt="honda-brio-japanese"
        />

        <div className="hidden w-full  gap-2 break-all pt-4 text-xs  text-red-700 md:flex">
          <p>
            It&rsquo;s not just a car. It&rsquo;s a Honda Brio. My Honda Brio.
            Sleek, stylish, and as sharp as a fresh haircut on a Saturday
            morning. It&rsquo;s the kind of car that makes you feel like you’ve
            got the world at your feet, even when you’re stuck in traffic.
          </p>
          <p>
            I remember the first time I sat behind the wheel. The seats felt
            like they were hugging me, the dashboard glowing with a promise of
            endless possibilities. The engine roared to life with a gentle purr,
            like a cat that knows it’s the king of the jungle. Every turn of the
            steering wheel, every press of the pedal,
          </p>
          <p>
            The Brio’s tech is top-notch. It’s got this infotainment system
            that’s more like a mate who knows all the best tunes. Connects to my
            phone without a fuss, plays my playlists, and makes sure I never
            miss a call. It’s like having my own personal DJ and PA rolled into
            one.
          </p>
          <p>
            So here’s to my Honda Brio. For the long drives, the short trips,
            and all the memories yet to be made. For the times when it’s just
            me, my Brio, and the open road, ready for whatever comes next.
          </p>
        </div>
        <div className="mx-auto mt-2 w-full items-center justify-center">
          <Image
            src="https://res.cloudinary.com/dhuk11prd/image/upload/v1722431903/portfolio-tina/brio%20x%20carplay/honda_logo_j9tjgl.svg"
            width={100}
            height={100}
            alt="honda-logo"
          />
        </div>
      </div>
      <div
        className="flex h-screen w-[130%] max-w-[1800px] flex-col items-center justify-center"
        onMouseMove={trackCursorPosition}
      >
        <DelayedComponent>
          <RiveComponent />
        </DelayedComponent>
      </div>
      <div className="absolute bottom-0 h-2/5 w-full bg-gradient-to-b from-[#090909]/0 via-[#090909] to-[#090909] md:h-[25vh] "></div>
    </div>
  )
}
