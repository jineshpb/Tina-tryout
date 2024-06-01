"use client"

import { TinaMarkdown } from "tinacms/dist/rich-text"
import { Tweet } from "react-tweet"
import { SlUser } from "react-icons/sl"
import { FaRegStar } from "react-icons/fa"
import { FaStar } from "react-icons/fa"
import { BsHash } from "react-icons/bs"
import { motion } from "framer-motion"

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

import dynamic from "next/dynamic"
import Image from "next/image"
import React, { use, useEffect, useRef } from "react"
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

export const VideoPlayer = (props: any) => {
  return <ReactPlayer url={props.url} controls width="100%" />
}

export const CaptionedImage = (props: any) => {
  return (
    <figure className="flex flex-col items-center justify-center py-6 md:min-w-full  lg:min-w-full xl:min-w-full">
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
    <div className="flex flex-col rounded-lg bg-white px-6 py-4 drop-shadow-lg dark:bg-zinc-800 ">
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
              <div className="flex size-16  items-center justify-center overflow-hidden rounded-full border-4 border-emerald-300 object-cover dark:border-emerald-500">
                <img src={props.authorImage} className="m-0 max-w-24" />
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
    <div>
      <div
        className={`flex w-full flex-col items-start gap-4 px-4 pt-8 ${props.imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"}`}
      >
        <div className="w-full overflow-hidden object-fill">
          <img
            src={props.image}
            alt=""
            className="max-w-100vw !my-0 rounded-xl lg:max-w-[400px]"
          />
        </div>
        <div className="!my-0 flex w-full flex-col items-start">
          <div className=" flex items-center justify-center rounded-full bg-zinc-200 px-2 ">
            <BsHash />
            <p className=" !my-0 text-[16px]">{props.type}</p>
          </div>

          <h2 className=" !mb-0 !mt-4 !text-[30px] font-medium tracking-tight">
            {props.title}
          </h2>
          <p className="!mt-4">{props.body}</p>
        </div>
      </div>
    </div>
  )
}

export const ImageCarousel = (props: any) => {
  const [width, setWidth] = React.useState(0)
  const carousel = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [])

  return (
    <motion.div
      className="motion-parent relative overflow-hidden "
      ref={carousel}
      whileTap={{ cursor: "grabbing" }}
    >
      <motion.div
        className="  flex gap-6   "
        drag="x"
        dragConstraints={{
          right: 0,
          left: -width,
        }}
      >
        {props.images?.map((image: any, index: number) => (
          <motion.div
            key={index}
            className={`flex ${props.orientation === "portrait" && "min-h-[60rem]"} w-full   min-w-[40rem] items-center justify-center overflow-hidden rounded-2xl`}
          >
            <img
              style={{
                pointerEvents: "none",
              }}
              src={image.image}
              alt={image.caption}
              className="!my-0 !size-full !object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
