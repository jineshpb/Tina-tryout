import { ProjectListPageComponent } from "@/components/app/projects/project-list-page"
import client from "@/tina/__generated__/client"
import React from "react"

export default async function ProjectListPage() {
  const result = await client.queries.projectsConnection({
    variables: { relativePath: "" }, // Add the variables property here
  })
  return (
    <ProjectListPageComponent
      data={result.data}
      variables={{ relativePath: "" }}
      query={result.query}
    />
  )
}
