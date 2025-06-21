"use client"

import Heading from "@/components/Heading"
import { useGSAP } from "@gsap/react"
import clsx from "clsx"
import React, { useRef } from "react"
import { tinaField } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import gsap from "gsap"

const ExperienceHomePageSection = ({ block }: { block: any }) => {
  const container = useRef(null)
  useGSAP(
    () => {
      // Animate all elements with the g_fadeIn class
      gsap.to(".g_fadeIn", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.inOut",
        stagger: 0.2, // Stagger the animation for a smoother effect
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          toggleActions: "play none none none", // Play the animation once
        },
      })
    },
    { scope: container },
  ) // Scope the animation to this component

  return (
    <div ref={container}>
      <Heading
        size="md"
        className={clsx(
          "g_fadeIn mt-8 font-normal tracking-tighter text-zinc-300 dark:text-zinc-700 ",
        )}
      >
        {block.experienceHeading}
      </Heading>
      <div className="flex w-full flex-col ">
        {block.roles?.map((role: any, i: number) => (
          <div
            key={i}
            className="g_fadeIn mb-20 mt-10 flex w-full flex-col items-start gap-10 lg:flex-row"
          >
            <div
              className={clsx(
                "w-full text-[60px] font-normal  leading-[4rem] tracking-tighter text-zinc-700 dark:text-zinc-300 md:text-[72px]",
              )}
              data-tina-field={role ? tinaField(role, "position") : undefined}
            >
              {role?.position}
            </div>

            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center gap-2  text-zinc-500 dark:text-zinc-500">
                <span
                  className="flex gap-4 pt-0 text-xl font-medium text-emerald-500 dark:text-emerald-300 md:text-2xl"
                  data-tina-field={
                    role ? tinaField(role, "company") : undefined
                  }
                >
                  {role?.company}
                </span>
                <span>&#8226;</span>
                <span
                  data-tina-field={role ? tinaField(role, "date") : undefined}
                >
                  {role?.date}
                </span>
              </div>

              <div
                className=" prose prose-lg text-zinc-700 md:prose-2xl dark:text-zinc-300"
                data-tina-field={
                  role ? tinaField(role, "description") : undefined
                }
              >
                <TinaMarkdown content={role?.description} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExperienceHomePageSection
