"use client"

import Bounded from "@/components/Bounded"
import Heading from "@/components/Heading"
import { PostsQuery } from "@/tina/__generated__/types"
import moment from "moment"
import { Metadata } from "next"
import { tinaField, useTina } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"

import {
  CaptionedImage,
  PullQuote,
  TextBox,
  TweetEmbed,
  VideoPlayer,
  FeedbackCard,
  ImageTextBlock,
  ImageCarousel,
  IphoneMockup,
  FigmaPrototype,
  MermaidChart,
} from "@/components/RichText"

import PostPageFooter from "@/components/PostPageFooter"
import { EB_Garamond } from "next/font/google"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { title } from "process"
import { isSmallScreen, useScreenSize } from "@/utils/useScreenSize"
import SuggestedPosts from "@/components/app/posts/SuggestedPosts"

// export const metadata: Metadata = {
//   title: "Tina CMS Blog",
//   description: "My Web dev blog",
// }

export const ArticleHeader = (props: {
  data: PostsQuery
  variables: {
    relativePath: string
  }
  query: string
}) => {
  const { data } = useTina(props)
  const screenSize = useScreenSize()

  const titleSize = {
    sm: "text-4xl",
    md: "text-5xl",
    lg: "text-6xl",
    xl: "text-7xl",
    "2xl": "text-8xl",
  }[screenSize]

  return (
    <div className=" grid grid-cols-1 gap-8 bg-emerald-600 dark:bg-emerald-900 lg:grid-cols-2 ">
      {/* Left: Hero Image */}
      <div className="relative aspect-[4/3] overflow-hidden ">
        {data.posts.coverImage && (
          <Image
            src={data?.posts?.coverImage}
            alt={title}
            width={1000}
            height={1000}
            className="size-full object-cover"
          />
        )}
      </div>

      <div className="relative flex flex-col justify-center lg:space-y-4 lg:px-8">
        <div className="relative block  w-full space-y-4  bg-emerald-600  px-6 py-4 dark:bg-emerald-900 sm:absolute sm:left-[-100px] sm:top-1/2 sm:-translate-y-1/2 lg:p-16">
          {data.posts.tags && data.posts.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.posts.tags.map(
                (tag, i) =>
                  tag && (
                    <span
                      key={i}
                      className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200 lg:text-sm"
                      data-tina-field={tinaField(data.posts, "tags", i)}
                    >
                      {tag}
                    </span>
                  ),
              )}
            </div>
          )}
          <h1
            className="text-3xl font-bold leading-tight tracking-tight text-white dark:text-emerald-400 md:text-6xl lg:text-5xl "
            // data-tina-field={tinaField(data.posts, "title")}
            // className="!mt-16 !text-white "
          >
            {data.posts.title}
          </h1>
          <time className="block text-sm text-emerald-200 dark:text-emerald-500">
            <span data-tina-field={tinaField(data.posts, "date")}>
              {moment(data.posts.date).format("MMM DD, YYYY")}
            </span>
          </time>
        </div>
      </div>
    </div>
  )
}

export const ArticleContent = (props: {
  data: PostsQuery
  variables: {
    relativePath: string
  }
  query: string
}) => {
  const { data } = useTina(props)

  const title = data.posts.title
  const content = data.posts.body

  console.log("article", data)

  return (
    <article className=" max-w-6xl px-4 pb-12">
      {/* Article Body */}
      <div className="prose-headings:font-inter-bold  prose prose-lg  max-w-[680px] dark:prose-invert prose-p:leading-relaxed prose-p:tracking-wide">
        <section data-tina-field={tinaField(data.posts, "body")}>
          <TinaMarkdown
            content={content}
            components={{
              TextBox,
              TweetEmbed,
              PullQuote,
              VideoPlayer,
              CaptionedImage,
              FeedbackCard,
              ImageTextBlock,
              ImageCarousel,
              IphoneMockup,
              FigmaPrototype,
              MermaidChart,
            }}
          />
        </section>
      </div>
    </article>
  )
}

export function PostPageComponentNew(props: {
  data: PostsQuery
  variables: {
    relativePath: string
  }
  query: string
}) {
  const { data, variables, query } = props
  const screenSize = useScreenSize()

  return (
    <>
      <ArticleHeader data={data} variables={variables} query={query} />

      <Bounded className="font-inter ">
        <ArticleContent data={data} variables={variables} query={query} />
        <SuggestedPosts currentPost={data} />
      </Bounded>

      <PostPageFooter />
    </>
  )
}

interface ArticleHeaderProps {
  title: string
  heroImage: string
  imageCredit?: string
  date: string
}
