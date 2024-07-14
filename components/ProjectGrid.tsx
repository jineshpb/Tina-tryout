import { HomePageQuery } from "@/tina/__generated__/types"
import React from "react"

import { FiExternalLink } from "react-icons/fi"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"

function GridCard({ project }: any) {
  return (
    <div className="mt-12 h-auto w-full rounded-xl  ">
      <p className="uppercase text-zinc-300 ">Project Type</p>
      <div
        className="mt-2 overflow-hidden rounded-lg "
        style={{
          backgroundColor: "#ffffff",
          backgroundSize: "10px 10px",
          backgroundImage:
            "repeating-linear-gradient(45deg, #a8a8a8 0, #a8a8a8 1px, #ffffff 0, #ffffff)",
        }}
      >
        <img src={project.image} alt="Project image" loading="lazy" />
      </div>
      <div className="mt-2 flex w-full items-start justify-between">
        <div>
          <div className="text-xl font-bold text-zinc-600">{project.title}</div>
          <div className="text-zinc-400">{project.description}</div>
        </div>
        {project.link && (
          <Button className="" variant="ghost">
            <Link
              href={project?.link}
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

const ProjectGrid = (data: HomePageQuery) => {
  return (
    <div className="w-full">
      {data.page.blocks?.map((block, i) => {
        switch (block?.__typename) {
          case "PageBlocksProjects":
            return (
              <div className="mx-auto grid w-full grid-cols-1 gap-8  pt-12 lg:mx-0 lg:grid-cols-2  ">
                <div className=" h-auto   grid-cols-1 gap-4 ">
                  {block.projects
                    ?.filter((_: any, i: number) => i % 2 === 0)
                    .map((project: any) => (
                      <GridCard key={i} project={project} />
                    ))}
                </div>
                <div className=" h-auto  grid-cols-1 gap-4 ">
                  {block.projects
                    ?.filter((_: any, i: number) => i % 2 === 1)
                    .map((project: any) => (
                      <GridCard key={i} project={project} />
                    ))}
                </div>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

export default ProjectGrid
