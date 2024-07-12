"use client"

import Bounded from "@/components/Bounded"
import Heading from "@/components/Heading"
import { LinkCard } from "@/components/LinkCard"
import { ProjectsConnectionQuery } from "@/tina/__generated__/types"
import Link from "next/link"
import { useTina } from "tinacms/dist/react"

export function ProjectListPageComponent(props: {
  data: ProjectsConnectionQuery
}) {
  const { data } = useTina({
    query: "",
    variables: {},
    data: props.data,
  })

  const projectList = data.projectsConnection.edges

  if (!projectList) {
    return
  }

  return (
    <Bounded>
      <div className=" flex flex-col">
        <Heading as="h1">Projects</Heading>

        <div className="mx-auto grid w-full grid-cols-1 gap-4 pt-10 md:grid-cols-3 lg:mx-0">
          <div className="grid grid-cols-1 gap-4">
            {projectList
              .filter((_: any, i: number) => i % 3 === 0)
              .map((project: any) => (
                <LinkCard
                  key={project.node.id}
                  link={`/projects/${project.node.title}`}
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
      </div>
    </Bounded>
  )
}
