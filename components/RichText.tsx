"use client"

import { TinaMarkdown } from "tinacms/dist/rich-text"
import { Tweet } from "react-tweet"
import { SlUser } from "react-icons/sl"
import { FaRegStar } from "react-icons/fa"
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

gsap.registerPlugin(ScrollTrigger)

import moment from "moment"

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
        <p className="mb-1 text-2xl font-normal opacity-80">{props.quote}</p>
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
    <figure className="flex max-w-7xl flex-col items-center justify-center py-6  md:min-w-full lg:min-w-full xl:min-w-full">
      <img
        src={props.imageUrl}
        alt={props.alt}
        style={{
          maxWidth: "100%",
        }}
      />

      <figcaption className="w-full text-left text-[.8em] italic text-zinc-800 dark:text-zinc-400">
        {props.caption}
      </figcaption>
    </figure>
  )
}

export const FeedbackCard = (props: any) => {
  return (
    <div className="mt-8 flex max-w-3xl flex-col rounded-lg bg-white px-6 py-4 drop-shadow-lg dark:bg-zinc-800 ">
      <div className="flex w-full flex-row-reverse">
        <div className="flex h-full items-start">
          {props.brandLogo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={props.brandLogo}
              className="!my-0 size-24 object-contain"
              alt="brand logo"
            />
          )}
        </div>
        <div className="flex w-full flex-col">
          <div className="mb-2">
            {props.date && (
              <span className="text-sm italic text-zinc-500 dark:text-zinc-400">
                {moment(props.date).format("MMM DD, YYYY")}
              </span>
            )}
          </div>
          <div className="flex gap-4">
            {props.authorImage ? (
              <div className="flex size-16  items-center justify-center overflow-hidden rounded-full border-4 border-emerald-300  dark:border-emerald-500">
                <img
                  src={props.authorImage}
                  className="m-0 size-16 max-w-24 object-cover"
                />
              </div>
            ) : (
              <div className="size-auto rounded-full bg-zinc-200 p-2">
                <SlUser />
              </div>
            )}

            <div className="flex flex-col">
              <div className="w-full text-[18px] font-bold leading-tight">
                {props.author}
              </div>

              <span className="text-[14px] leading-tight">
                {props.location}
              </span>

              <div className="gap-1/2 flex w-auto py-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="py-1">
                    {index < props.rating ? (
                      <FaStar className="h-[16px]" />
                    ) : (
                      <FaRegStar className="h-[16px]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="!my-2 !text-2xl">{props.title}</h3>
        <div className="prose mt-2 flex italic text-zinc-900  dark:text-zinc-200">
          &quot;{props.feedback}&quot;
        </div>
      </div>
    </div>
  )
}

export const ImageTextBlock = (props: any) => {
  return (
    <div className="mt-8">
      <div
        className={`relative flex w-full max-w-4xl flex-col items-start gap-8 rounded-[32px] border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800 md:p-10 ${props.imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"}`}
      >
        <div className="h-80 w-full overflow-hidden rounded-[16px] object-cover">
          <img
            src={props.image}
            alt=""
            className="!my-0 size-full object-cover"
          />
        </div>
        <div className="!my-0 flex w-full flex-col items-start">
          <div className=" flex items-center justify-center rounded-full bg-zinc-200 px-2 dark:bg-zinc-700 ">
            <BsHash />
            <p className=" !my-0 text-[16px] text-zinc-600 dark:text-zinc-300">
              {props.type}
            </p>
          </div>

          <h2 className=" !mb-0 !mt-8 !text-[30px] font-medium tracking-tight">
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
              className={`relative !my-0 flex flex-col max-sm:min-w-[80vw]   lg:min-w-[25rem] ${props.orientation === "landscape" && "max-w-24 lg:min-w-[55rem]"} items-center
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
              <div className="absolute bottom-2 left-4 rounded-full bg-zinc-200/50  dark:bg-zinc-700/50 ">
                {image.caption && (
                  <div className="px-4 text-center text-zinc-600 dark:text-zinc-300">
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
  useGSAP(() => {
    gsap.to("#exploreVideo", {
      scrollTrigger: {
        trigger: "#exploreVideo",
        toggleActions: "play pause reverse restart",
        start: "-10% bottom",
        markers: true, // Add this line
      },
      onComplete: () => {
        if (videoRef.current) {
          videoRef.current.play()
          console.log("playing video")
        }
      },
    })
  }, [])

  return (
    <div className="relative  mt-20 flex w-full items-center justify-center px-10">
      <div className="flex max-w-[400px] items-center  justify-center  drop-shadow-xl md:max-w-[450px] ">
        <div className="absolute left-0 h-full ">
          <img
            src="/iphone_clay_white.png"
            alt=""
            className="!my-0 size-full"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <div className="w-full overflow-hidden rounded-[60px] p-[26px] md:p-[28px]">
          <video
            id="exploreVideo"
            playsInline
            className="-z-10 !my-0 size-full"
            preload="none"
            muted
            autoPlay
            ref={videoRef}
            style={{ objectFit: "contain", width: "100%", height: "100%" }} // Add this line
          >
            <source src={props.url} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  )
}
