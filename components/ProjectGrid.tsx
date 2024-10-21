import { HomePageQuery } from "@/tina/__generated__/types"
import React from "react"

import { FiExternalLink } from "react-icons/fi"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"

const convertToKebabCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "") // Optional: Remove any character that is not a letter, number, or hyphen
}

function RenderButton({ project }: any) {
  const kebabProjectTitle = convertToKebabCase(project.node.title)
  if (!project.node.link) {
    return null // Do not render anything if project.node.link does not exist
  }

  if (project.node.type === "rive") {
    return (
      <Button className="" variant="ghost">
        <Link
          href={`/projects/${kebabProjectTitle}`}
          className="flex items-center"
        >
          View
        </Link>
      </Button>
    )
  }
  return (
    <Button className="" variant="ghost">
      <Link
        href={project?.node.link}
        className="flex items-center"
        target="_blank"
      >
        <FiExternalLink className="mr-2" />
        View
      </Link>
    </Button>
  )
}

function GridCard({ project }: any) {
  return (
    <div className="mt-12 h-auto w-full  ">
      {project.node.type ? (
        <p className="uppercase text-zinc-300 dark:text-zinc-700">
          {project.node.type}
        </p>
      ) : (
        <p className="uppercase text-zinc-300 dark:text-zinc-700  ">Generic</p>
      )}

      <div
        className="mt-2 overflow-hidden rounded-lg "
        style={{
          backgroundColor: "#ffffff",
          backgroundSize: "10px 10px",
          backgroundImage:
            "repeating-linear-gradient(45deg, #a8a8a8 0, #a8a8a8 1px, #ffffff 0, #ffffff)",
        }}
      >
        <Image
          src={project.node.image}
          alt="Project image"
          width={1440}
          height={1920}
          loading="lazy"
        />
      </div>
      <div className="mt-4 flex w-full items-start justify-between">
        <div>
          <div className=" text-xl font-medium text-zinc-600 dark:text-zinc-300">
            {project.node.title}
          </div>
          <div className="text-zinc-400 dark:text-zinc-600">
            {project.node.description}
          </div>
        </div>
        {<RenderButton project={project} />}
      </div>
    </div>
  )
}

const ProjectGrid = ({ data }: any) => {
  return (
    <div className="w-full">
      <div className="mx-auto grid w-full grid-cols-1 gap-8 pt-12 lg:mx-0 lg:grid-cols-2 2xl:grid-cols-3">
        {[0, 1, 2].map((columnIndex) => (
          <div key={columnIndex} className="h-auto grid-cols-1 gap-4">
            {data
              ?.filter((_: any, i: number) => i % 3 === columnIndex)
              .map((project: any, i: number) => (
                <GridCard key={i} project={project} />
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectGrid
