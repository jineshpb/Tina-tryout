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
} from "@/components/RichText"

// export const metadata: Metadata = {
//   title: "Tina CMS Blog",
//   description: "My Web dev blog",
// }

export function PostPageComponent(props: {
  data: PostsQuery
  variables: {
    relativePath: string
  }
  query: string
}) {
  const { data } = useTina(props)

  const title = data.posts.title
  const content = data.posts.body

  return (
    <Bounded className="mt-32">
      <div className="flex w-full">
        <Heading
          as="h1"
          size="lg"
          data-tina-field={tinaField(data.posts, "title")}
          className="text-zinc-500 dark:text-zinc-300"
        >
          {title}
        </Heading>
      </div>
      <p className="mt-4">
        {data.posts.tags?.map((tag) => (
          <span
            key={tag}
            className="mr-2 text-lg text-emerald-500 dark:text-emerald-300"
          >
            {tag}
          </span>
        ))}
      </p>
      <p className="mt-6">
        <span data-tina-field={tinaField(data.posts, "date")}>
          {moment(data.posts.date).format("MMM DD, YYYY")}
        </span>
      </p>
      <hr className=" mt-2 border-zinc-300 dark:border-zinc-700" />
      <article className=" prose prose-zinc w-full dark:prose-invert  lg:prose-xl  prose-a:break-words prose-a:text-emerald-500 dark:prose-a:text-emerald-400 ">
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
            }}
          />
        </section>
      </article>
    </Bounded>
  )
}
