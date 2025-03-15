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
} from "@/components/RichText"

import PostPageFooter from "@/components/PostPageFooter"
import { EB_Garamond } from "next/font/google"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { title } from "process"

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

  console.log("data", data)

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Left: Hero Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        {data.posts.coverImage && (
          <Image
            src={data?.posts?.coverImage}
            alt={title}
            className="size-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-4">
          {data.posts.tags && data.posts.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.posts.tags.map(
                (tag, i) =>
                  tag && (
                    <span
                      key={i}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                      data-tina-field={tinaField(data.posts, "tags", i)}
                    >
                      {tag}
                    </span>
                  ),
              )}
            </div>
          )}
          <h1
            className="font-whyte-bold text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl"
            data-tina-field={tinaField(data.posts, "title")}
          >
            {data.posts.title}
          </h1>
          <time className="block text-sm text-zinc-500">
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
    <article className=" max-w-6xl px-4 py-12">
      {/* Article Body */}
      <div className="prose-headings:font-inter-bold  prose prose-lg mt-10  max-w-[680px] dark:prose-invert prose-p:leading-relaxed prose-p:tracking-wide">
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
  const { data, variables, query } = props // Destructure all props

  return (
    <>
      <Bounded className="font-inter mt-32 max-sm:!px-[8px]">
        <ArticleHeader data={data} variables={variables} query={query} />
        <ArticleContent data={data} variables={variables} query={query} />
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
