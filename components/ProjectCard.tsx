import { Heading } from "lucide-react"
import { LinkCard } from "./LinkCard"
import BigButton from "./BigButton"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ProjectCardProps {
  project: any
  className: any
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useGSAP(() => {
    gsap.to("#exploreVideo", {
      scrollTrigger: {
        trigger: "#exploreVideo",
        toggleActions: "play pause reverse restart",
        start: "0% bottom",
      },
      onComplete: () => {
        videoRef.current?.play()
      },
    })
  }, [])
  return (
    <>
      <div className="group relative flex size-full flex-col justify-between overflow-hidden rounded-[56px]  bg-zinc-800/75 p-4 text-[60px] ">
        <div className="flex flex-col text-clip leading-tight tracking-tighter text-zinc-100 dark:text-zinc-400">
          {project.title}
          <span className="text-lg leading-normal tracking-normal text-zinc-500">
            {project.description}
          </span>
        </div>
        <video
          playsInline
          id="exploreVideo"
          className="absolute left-0 top-0 -z-10 size-full object-cover object-center"
          preload="none"
          muted
          autoPlay
          ref={videoRef}
        >
          <source src="./black_betty_video.mp4" type="video/mp4" />
        </video>

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
