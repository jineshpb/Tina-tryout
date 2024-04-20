"use client"

import Heading from "@/components/Heading"
import { PostsQuery } from "@/tina/__generated__/types"
import { tinaField, useTina } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"

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
    <article className="prose">
      <Heading
        as="h1"
        size="md"
        data-tina-field={tinaField(data.posts, "title")}
      >
        {title}
      </Heading>

      <section data-tina-field={tinaField(data.posts, "body")}>
        <TinaMarkdown content={content} />
      </section>
    </article>
  )
}
