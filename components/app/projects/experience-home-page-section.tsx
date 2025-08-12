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
      // Animate the timeline line
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
          },
        },
      )

      // Animate timeline markers with stagger
      gsap.fromTo(
        ".timeline-marker",
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.3,
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
          },
        },
      )

      // Animate content cards
      gsap.fromTo(
        ".timeline-content",
        {
          x: -50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
          },
        },
      )
    },
    { scope: container },
  )

  return (
    <div ref={container} className="relative">
      <Heading
        size="md"
        className={clsx(
          "mb-16 font-normal tracking-tighter text-zinc-300 dark:text-zinc-700",
        )}
      >
        {block.experienceHeading}
      </Heading>

      {/* Timeline Container */}
      <div className="relative">
        {/* Gradient Timeline Line */}
        {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
        <div className="timeline-line absolute left-8 top-0 h-full w-1 origin-top">
          <div className="size-full rounded-full bg-gradient-to-b from-transparent via-blue-400 via-green-400 via-purple-500 via-20% to-transparent"></div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-16">
          {block.roles?.map((role: any, i: number) => (
            <div key={i} className="relative flex items-start">
              {/* Timeline Marker */}
              {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
              <div className="timeline-marker absolute left-[26px] top-4 z-10 size-4 rounded-full border-4 border-zinc-200 bg-white shadow-lg dark:border-zinc-700"></div>

              {/* Content Card */}
              {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
              <div className="timeline-content ml-16 flex-1">
                <div>
                  {/* Position Title */}
                  <div
                    className={clsx(
                      "mb-1 text-xl font-normal leading-tight tracking-tighter text-zinc-700 dark:text-zinc-300 md:text-2xl",
                    )}
                    data-tina-field={
                      role ? tinaField(role, "position") : undefined
                    }
                  >
                    {role?.position}
                  </div>

                  {/* Company and Date */}
                  <div className="mb-2 flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
                    <span
                      className="text-lg font-medium text-emerald-500 dark:text-emerald-300"
                      data-tina-field={
                        role ? tinaField(role, "company") : undefined
                      }
                    >
                      {role?.company}
                    </span>
                    <span className="size-1 rounded-full bg-zinc-400"></span>
                    <span
                      className="text-sm"
                      data-tina-field={
                        role ? tinaField(role, "date") : undefined
                      }
                    >
                      {role?.date}
                    </span>
                  </div>

                  {/* Description */}
                  <div
                    className="prose prose-sm prose-zinc  max-w-3xl dark:prose-invert"
                    data-tina-field={
                      role ? tinaField(role, "description") : undefined
                    }
                  >
                    <TinaMarkdown content={role?.description} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExperienceHomePageSection
