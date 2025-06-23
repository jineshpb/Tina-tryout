"use client"

import { TinaMarkdown } from "tinacms/dist/rich-text"
import { Tweet } from "react-tweet"
import { SlUser } from "react-icons/sl"
import { FaPause, FaPlay, FaRegStar } from "react-icons/fa"
import { FaStar } from "react-icons/fa"
import { BsHash } from "react-icons/bs"
import { motion } from "framer-motion"
import animationData from "@/data/swipeLeft.json"
import * as LottiePlayer from "@lottiefiles/lottie-player"

import dynamic from "next/dynamic"
import Image from "next/image"
import React, { use, useEffect, useRef, useState } from "react"
import Lottie from "react-lottie"
import { animateWithGsap } from "./utils/animation"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

import { ScrollTrigger } from "gsap/ScrollTrigger"

import { CardStack } from "../components/ui/card-stack"

gsap.registerPlugin(ScrollTrigger)

import moment from "moment"
import { cn } from "@/utils/cn"
import Mermaid from "@/components/ui/mermaid"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { toast } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2, Sparkles, ChevronDown } from "lucide-react"

export const TextBox = (props: any) => {
  return (
    <>
      <div className="bg-zinc-100 px-8 py-1 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <TinaMarkdown content={props.text} />
      </div>
    </>
  )
}

export const TweetEmbed = (props: any) => {
  return (
    <div className="flex items-center justify-center">
      <Tweet id={`${props.tweetId}`} />
    </div>
  )
}

export const PullQuote = (props: any) => {
  return (
    <>
      <blockquote className="mb-1 border-l-4 border-zinc-200 leading-10 dark:border-zinc-700">
        <p className=" mb-1 text-2xl font-normal opacity-80">{props.quote}</p>
        {props.author && (
          <a href={props.authorLink} className="text-[0.8em] italic opacity-80">
            - {props.author}
          </a>
        )}
      </blockquote>
    </>
  )
}

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

export const VideoPlayer = (props: any) => {
  return (
    <div className="max-w-4xl">
      <ReactPlayer url={props.url} controls width="100%" />
    </div>
  )
}

export const CaptionedImage = (props: any) => {
  return (
    <figure className="flex max-w-7xl flex-col items-center justify-center py-6 md:min-w-full lg:min-w-full xl:min-w-full">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex w-full items-center justify-center overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <img
              src={props.imageUrl}
              alt={props.alt}
              style={{
                maxWidth: "100%",
              }}
              className="cursor-zoom-in transition-all hover:opacity-90"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="max-h-[95vh] max-w-[95vw] p-0 md:max-w-[85vw]">
          <div className="relative flex aspect-auto w-full items-center justify-center">
            <img
              src={props.imageUrl}
              alt={props.alt}
              className="size-auto max-w-full object-contain"
            />
            <button
              className="absolute right-4 top-4 rounded-full bg-zinc-100/90 p-2 opacity-70 transition-opacity hover:opacity-100 dark:bg-zinc-900/90"
              onClick={() =>
                (
                  document.querySelector(
                    'button[aria-label="Close"]',
                  ) as HTMLButtonElement
                )?.click()
              }
            >
              <X className="size-4" />
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <figcaption className="w-full text-left text-[.8em] italic text-zinc-800 dark:text-zinc-400">
        {props.caption}
      </figcaption>
    </figure>
  )
}

export const testComponent = (props: any) => {
  return (
    <div className="not-prose">
      <CardStack items={props} />
    </div>
  )
}

export const FeedbackCard = (props: any) => {
  return <CardStack items={props} />
}

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const isBold = className?.includes("font-bold")

  return (
    <span
      className={cn(
        "bg-emerald-100 px-1 py-0.5",
        isBold
          ? "font-bold text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500"
          : "",
        className,
      )}
    >
      {children}
    </span>
  )
}

export const ImageTextBlock = (props: any) => {
  return (
    <div className="not-prose mt-8 h-full">
      <div
        className={`relative flex size-full max-w-4xl flex-col  gap-8 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 shadow-xl  dark:border-zinc-700 dark:bg-zinc-800  ${props.imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"}`}
      >
        <div className="flex items-center justify-center overflow-hidden max-sm:max-h-60">
          <img
            src={props.image}
            alt=""
            className="size-full h-full object-cover"
          />
        </div>
        <div className="!my-0 flex w-full flex-col items-start p-4 md:p-10">
          <div className=" flex items-center justify-center rounded-full bg-zinc-200 px-2 dark:bg-zinc-700 ">
            <BsHash />
            <p className=" !my-0 text-[16px] text-zinc-600 dark:text-zinc-300">
              {props.type}
            </p>
          </div>

          <h2 className=" !my-8 !text-[30px] font-medium leading-tight tracking-tight">
            {props.title}
          </h2>
          <TinaMarkdown content={props.body} />
        </div>
      </div>
    </div>
  )
}

export const ImageCarousel = (props: any) => {
  const [width, setWidth] = React.useState(0)
  const [autoplay, setAutoplay] = React.useState(true)

  const carousel = useRef<HTMLDivElement | null>(null)

  const handlePlay = () => {
    setAutoplay(false)
  }

  useEffect(() => {
    const container = carousel.current
    if (container) {
      setWidth(container.scrollWidth - container.offsetWidth)
    }
  }, [])

  return (
    <div className=" mt-8 !px-0 ">
      <motion.div
        ref={carousel}
        className="not-prose relative w-full overflow-hidden"
        whileTap={{ cursor: "grabbing" }}
        onClick={() => handlePlay()}
        onTouchStart={() => handlePlay()}
      >
        <div className="absolute right-0 top-0 z-10 size-24">
          {autoplay && (
            <Lottie
              options={{
                loop: true,
                autoplay: true, // The autoplay value is always true here
                animationData,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
            />
          )}
        </div>
        <motion.div
          className=" flex gap-6"
          drag="x"
          dragConstraints={{
            right: 0,
            left: -width,
          }}
        >
          {props.images?.map((image: any, index: number) => (
            <motion.div
              key={index}
              className={`relative !my-0 flex flex-col sm:min-w-[80vw] lg:min-w-[25rem] ${props.orientation === "landscape" && "min-w-[80vw] lg:min-w-[55rem]"} items-center
               justify-center overflow-hidden rounded-2xl `}
            >
              <img
                style={{
                  pointerEvents: "none",
                  width: "100%",
                  height: "100%",
                }}
                src={image.image}
                alt={image.caption}
                className="!my-0 !size-full !object-cover"
              />
              <div className="absolute bottom-2 left-4 rounded-full bg-zinc-200/50 py-2 backdrop-blur-sm dark:bg-zinc-700/50 ">
                {image.caption && (
                  <div className="text-pretty px-4 text-left text-[12px] leading-tight text-zinc-600 dark:text-zinc-300 md:text-[16px]">
                    {image.caption}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export const IphoneMockup = (props: any) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isPlaying, setIsPlaying] = useState(true)

  useGSAP(() => {
    gsap.to("#exploreVideo", {
      scrollTrigger: {
        trigger: "#exploreVideo",
        toggleActions: "play pause none none",
        start: "-10% bottom",
      },
      onPlay: () => {
        setIsPlaying(true)
      },
      onComplete: () => {
        setIsPlaying(false)
        if (videoRef.current) {
          // videoRef.current.play()
          // setIsPlaying(true)
        }
      },
    })
  }, [])

  const [isComplete, setIsComplete] = useState(false)

  useGSAP(() => {
    gsap.to("#exploreVideo", {
      scrollTrigger: {
        trigger: "#exploreVideo",
        toggleActions: "play pause none none",
        start: "-10% bottom",
      },
      onPlay: () => {
        setIsPlaying(true)
        setIsComplete(false)
      },
      onComplete: () => {
        setIsPlaying(false)
        setIsComplete(true)
      },
    })
  }, [])

  const handleClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
        setIsComplete(false)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  return (
    <div className="relative  mt-20 flex items-center justify-center px-10">
      <div className="relative flex items-center justify-center drop-shadow-xl  lg:max-w-[70%]">
        <div className="absolute left-0 size-full">
          <img
            src="/iphone_clay_white.png"
            alt=""
            className="not-prose !my-0 size-full"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <div className="w-full overflow-hidden ">
          <video
            id="exploreVideo"
            playsInline
            className="-z-10 !my-0 size-full rounded-[8%] p-[5%] lg:p-[6%] "
            preload="none"
            muted
            autoPlay
            ref={videoRef}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          >
            <source src={props.url} type="video/mp4" />
          </video>

          <div className="absolute bottom-2 left-2 z-20   text-[16px] ">
            <button
              onClick={handleClick}
              className="flex items-center justify-center rounded-full bg-zinc-200/50 p-2 shadow-xl dark:bg-zinc-700/50 dark:text-zinc-300"
            >
              {isPlaying ? (
                <FaPause />
              ) : (
                <>{isComplete ? <FaPause /> : <FaPlay />}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const FigmaPrototype = (props: any) => {
  const { url, width = "100%", height = "450" } = props
  return (
    <div className="my-8">
      <iframe
        className="rounded-lg border-none"
        src={url}
        width={width}
        height={height}
        allowFullScreen
      />
    </div>
  )
}

export const MermaidChart = (props: any) => {
  return (
    <div className="my-8">
      <Mermaid chart={props.chart} />
    </div>
  )
}
