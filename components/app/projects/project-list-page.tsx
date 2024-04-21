"use client"

import Heading from "@/components/Heading"
import { LinkCard } from "@/components/LinkCard"
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

  console.log("from project list page", projectList)

  if (!projectList) {
    return
  }

  return (
    <>
      <Heading as="h1">Projects</Heading>

      <div className="mx-auto grid grid-cols-1 gap-4 pt-10 md:grid-cols-3 lg:mx-0">
        <div className="grid grid-cols-1 gap-4">
          {projectList
            .filter((_: any, i: number) => i % 3 === 0)
            .map((project: any) => (
              <LinkCard
                key={project.node.id}
                link={project.node.link}
                title={project.node.title}
                description={project.node.description}
              />
            ))}
        </div>
        <div className="grid grid-cols-1 gap-4">
          {projectList
            .filter((_: any, i: number) => i % 3 === 1)
            .map((project: any) => (
              <LinkCard
                key={project.node.id}
                link={project.node.link}
                title={project.node.title}
                description={project.node.description}
              />
            ))}
        </div>
        <div className="grid grid-cols-1 gap-4">
          {projectList
            .filter((_: any, i: number) => i % 3 === 2)
            .map((project: any) => (
              <LinkCard
                key={project.node.id}
                link={project.node.link}
                title={project.node.title}
                description={project.node.description}
              />
            ))}
        </div>
      </div>
    </>
  )
}
