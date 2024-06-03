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
} from "@/components/RichText"

import PostPageFooter from "@/components/PostPageFooter"

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
    <>
      <Bounded className=" mt-32 max-sm:!px-[8px] ">
        <div className="flex w-full">
          <Heading
            as="h1"
            size="lg"
            data-tina-field={tinaField(data.posts, "title")}
            className="leading-tight text-zinc-500 dark:text-zinc-300"
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
        <hr className=" mt-2  border-zinc-300 dark:border-zinc-700 " />
        <article
          className="prose prose-zinc w-full !max-w-none   dark:prose-invert lg:prose-xl 
      prose-headings:max-w-3xl prose-p:max-w-3xl  prose-a:break-words prose-a:text-emerald-500 prose-code:max-w-4xl prose-img:max-w-7xl prose-video:max-w-4xl dark:prose-a:text-emerald-400 "
        >
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
              }}
            />
          </section>
        </article>
      </Bounded>
      <PostPageFooter />
    </>
  )
}
