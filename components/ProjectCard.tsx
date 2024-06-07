import { Heading } from "lucide-react"
import { LinkCard } from "./LinkCard"
import BigButton from "./BigButton"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/all"
import Image from "next/image"
import { tinaField } from "tinacms/dist/react"

gsap.registerPlugin(ScrollTrigger)

interface ProjectCardProps {
  project: any
  className: any
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  useGSAP(() => {
    gsap.to("#projectVideo", {
      scrollTrigger: {
        trigger: "#projectVideo",
        toggleActions: "play pause reverse restart",
        start: "10% bottom",
        // markers: true,
      },

      onComplete: () => {
        videoRef.current?.play()
      },
    })
  }, [])

  return (
    <>
      <div
        className="group relative flex size-full flex-col justify-between overflow-hidden rounded-[56px]    bg-gradient-to-b  from-zinc-800 to-zinc-300/0 p-4 text-[60px] dark:bg-zinc-800/75  "
        id="projectVideo"
      >
        <div
          className="z-20 flex flex-col text-clip leading-tight tracking-tighter text-zinc-100 dark:text-zinc-400"
          data-tina-field={project ? tinaField(project, "title") : undefined}
        >
          {project.title}
          <span
            className="text-lg leading-normal tracking-normal text-zinc-400 dark:text-zinc-400"
            data-tina-field={
              project ? tinaField(project, "description") : undefined
            }
          >
            {project.description}
          </span>
        </div>
        {project.videoLink ? (
          <video
            playsInline
            className="absolute left-0 top-0 -z-10  size-full object-cover object-center"
            preload="none"
            muted
            autoPlay
            ref={videoRef}
          >
            <source src={project.videoLink} type="video/mp4" />
          </video>
        ) : (
          <img
            src={project.image}
            className=" absolute left-0 top-0 -z-10 size-full object-cover object-center"
          />
        )}

        <div
          className=" z-10  h-[80px] translate-y-24 opacity-80 transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:opacity-100"
          id="CTAButton"
        >
          <BigButton
            linkText="View Project"
            href={project?.link}
            target="_blank"
            className="w-full "
          >
            View Project
          </BigButton>
        </div>
      </div>
    </>
  )
}
