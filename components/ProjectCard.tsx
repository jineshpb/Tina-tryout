import { Heading } from "lucide-react"
import { LinkCard } from "./LinkCard"
import BigButton from "./BigButton"

interface ProjectCardProps {
  project: any
  className: any
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <>
      <div className="group flex size-full flex-col justify-between rounded-[56px] bg-zinc-300 p-4 text-[60px] dark:bg-zinc-800 ">
        <div className="flex flex-col leading-tight tracking-tighter text-zinc-700 dark:text-zinc-400">
          {project.title}
          <span className="text-lg leading-normal tracking-normal text-zinc-500">
            {project.description}
          </span>
        </div>

        <div className="z-10 h-[80px]">
          <BigButton
            href={project.link}
            className="hidden w-full group-hover:block"
          >
            View Project
          </BigButton>
        </div>
      </div>
    </>
  )
}
