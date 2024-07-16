import { HomePageQuery } from "@/tina/__generated__/types"
import React from "react"

import { FiExternalLink } from "react-icons/fi"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"

function GridCard({ project }: any) {
  console.log("Grid card project", project)
  console.log("Grid card project")

  return (
    <div className="mt-12 h-auto w-full rounded-xl  ">
      {project.node.type ? (
        <p className="uppercase text-zinc-300 dark:text-zinc-700 ">
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
        {project.node.link && (
          <Button className="" variant="ghost">
            <Link
              href={project?.node.link}
              target="_blank"
              className="flex items-center"
            >
              <FiExternalLink className="mr-2" />
              View
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}

const ProjectGrid = ({ data }: any) => {
  console.log("projects", data)

  return (
    <div className="w-full">
      <div className="mx-auto grid w-full grid-cols-1 gap-8  pt-12 lg:mx-0 lg:grid-cols-2  ">
        <div className=" h-auto   grid-cols-1 gap-4 ">
          {data
            ?.filter((_: any, i: number) => i % 2 === 0)
            .map((project: any, i: number) => (
              <GridCard key={i} project={project} />
            ))}
        </div>
        <div className=" h-auto   grid-cols-1 gap-4 ">
          {data
            ?.filter((_: any, i: number) => i % 2 === 1)
            .map((project: any, i: number) => (
              <GridCard key={i} project={project} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectGrid
