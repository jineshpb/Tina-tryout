import BigButton from "./BigButton"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/all"

import { tinaField } from "tinacms/dist/react"
import { Playfair_Display } from "next/font/google"
import { cn } from "@/lib/utils"
import { GeistSans } from "geist/font/sans"

gsap.registerPlugin(ScrollTrigger)

interface ProjectCardProps {
  project: any
  className: any
}

const Playfair = Playfair_Display({ subsets: ["latin"] })

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const [isMobile, setIsMobile] = useState(false)

  function isMobileDevice() {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768
    }
    return false
  }

  useEffect(() => {
    function handleResize() {
      setIsMobile(isMobileDevice())
    }

    setIsMobile(isMobileDevice())
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const videoRef = useRef<HTMLVideoElement | null>(null)
  useGSAP(() => {
    gsap.to("#projectVideo", {
      scrollTrigger: {
        trigger: "#projectVideo",
        toggleActions: "play pause reverse restart",
        start: "10% bottom",
      },

      onComplete: () => {
        videoRef.current?.play()
      },
    })
  }, [])

  return (
    <>
      <div
        className={cn(
          "group relative flex size-full flex-col justify-between overflow-hidden rounded-[56px] bg-gradient-to-b  from-zinc-800 to-zinc-300/0 p-4 text-[60px] dark:bg-zinc-800/75",
          className,
        )}
        id="projectVideo"
      >
        <div
          className="z-20 flex flex-col text-clip p-4 leading-[60px]  tracking-tight  text-zinc-100 dark:text-zinc-400"
          data-tina-field={project ? tinaField(project, "title") : undefined}
        >
          {project.title}
          <span
            className={cn(
              "text-lg  leading-normal tracking-normal text-zinc-400 dark:text-zinc-400",
              GeistSans.className,
            )}
            data-tina-field={
              project ? tinaField(project, "description") : undefined
            }
          >
            {project.description}
          </span>
        </div>
        {project.videoLink && !isMobile ? (
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
