"use client"

import { ProjectsConnectionQuery } from "@/tina/__generated__/types"
import Link from "next/link"
import { useTina } from "tinacms/dist/react"

export function ProjectListPageComponent(props: {
  data: ProjectsConnectionQuery
  variables: {
    relativePath: string
  }
  query: string
}) {
  const { data } = useTina(props)

  const projectList = data.projectsConnection.edges

  if (!projectList) {
    return
  }

  return (
    <>
      <h1>Projects</h1>
      <div>
        {projectList?.map((project: any) => {
          return (
            <div key={project.node.id}>
              <Link href={project.node.link}>{project.node.title}</Link>
            </div>
          )
        })}
      </div>
    </>
  )
}
