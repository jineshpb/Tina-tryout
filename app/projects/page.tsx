import { ProjectListPageComponent } from "@/components/app/projects/project-list-page"
import client from "@/tina/__generated__/client"
import React from "react"

export default async function ProjectListPage() {
  const result = await client.queries.projectsConnection()
  return <ProjectListPageComponent {...result} />
}
