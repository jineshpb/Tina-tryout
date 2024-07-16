import { PostsQuery, ProjectsQuery } from "@/tina/__generated__/types"
import React from "react"

export function ProjectPageComponent(props: {
  data: PostsQuery
  variables: {
    relativePath: string
  }
  query: string
}) {
  return <div>ProjectPageComponent</div>
}
