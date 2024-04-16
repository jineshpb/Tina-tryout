"use client"

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
    <article>
      <h1 data-tina-field={tinaField(data.posts, "title")}>{title}</h1>
      <section data-tina-field={tinaField(data.posts, "body")}>
        <TinaMarkdown content={content} />
      </section>
    </article>
  )
}
