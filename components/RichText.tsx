import { TinaMarkdown } from "tinacms/dist/rich-text"
import { Tweet } from "react-tweet"

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
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

export const VideoPlayer = (props: any) => {
  return <ReactPlayer url={props.url} controls width="100%" />
}

export const CaptionedImage = (props: any) => {
  return (
    <figure className="xl:min-w-calc(100%+260px)] flex flex-col items-center justify-center py-6  md:min-w-[calc(100%+100px)] lg:min-w-[calc(100%+200px)]">
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
