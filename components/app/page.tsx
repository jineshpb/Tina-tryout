"use client"

import { PageQuery } from "@/tina/__generated__/types"
import { tinaField, useTina } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import Heading from "../Heading"
import Avatar from "../Avatar"
import { Button } from "../ui/button"
import Link from "next/link"

import { ReactNode } from "react"
import Bounded from "../Bounded"
import RenderModel from "../RenderModel"
import { ChonkyCat } from "../models/ChonkyCat"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { animateWithGsap } from "../utils/animation"
import BigButton from "../BigButton"
import SmallAvatar from "../SmallAvatar"
import { FaInstagram } from "react-icons/fa"
import { FaSquareBehance } from "react-icons/fa6"
import { RiGithubFill } from "react-icons/ri"

function AddBreakAfterComma({ text }: { text: string }) {
  // Split the text by commas
  // Split the text by commas
  const parts = text.split(",")
  // Create an array to hold parts with line breaks
  const partsWithBreaks: ReactNode[] = []

  // Iterate through the parts
  parts.forEach((part, index) => {
    // Push the part into the array
    partsWithBreaks.push(part.trim())

    // If it's not the last part, add a comma and a line break
    if (index !== parts.length - 1) {
      partsWithBreaks.push(
        <span key={index}>
          ,<br />
        </span>,
      )
    }
  })

  return <div>{partsWithBreaks}</div>
}

export function PageComponent(props: {
  data: PageQuery
  variables: {
    relativePath: string
  }
  query: string
}) {
  console.log(props.data.page.blocks)

  useGSAP(() => {
    gsap.to(".g_fadeIn", {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 1,
      ease: "power2.inOut",
    })
  }, [])

  const { data } = useTina(props)

  const title = data.page.title

  return (
    <>
      <Bounded>
        <div className="flex flex-col gap-12 md:flex-row">
          {/* <div className="mt-4 flex w-1/2 md:w-1/2">
            
            <Avatar image={"/jinesh-mug.jpg"}></Avatar>
          </div> */}
          <div className="w-full">
            {data.page.blocks?.map((block, i) => {
              switch (block?.__typename) {
                case "PageBlocksWelcomeHero":
                  return (
                    <section key={i} className="flex size-full gap-12">
                      <div className="flex h-full w-1/2">
                        <Heading
                          size="lg"
                          className="text-base font-medium tracking-tighter text-zinc-500 dark:text-zinc-400"
                        >
                          <AddBreakAfterComma text={block.title} />
                        </Heading>
                      </div>
                      <div className="flex h-full w-1/2 flex-col justify-between gap-4">
                        <div className="flex gap-4 ">
                          <SmallAvatar image={block.profileImage}></SmallAvatar>
                          <div className="flex flex-col gap-2">
                            <div className=" text-[46px] font-semibold tracking-tight text-zinc-600 dark:text-zinc-400 ">
                              {block?.name}
                            </div>
                            <div>
                              <div className="flex gap-4 px-4 text-zinc-400 dark:text-zinc-600 ">
                                <Link
                                  href="https://youtube.com"
                                  className="transition-all duration-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                                >
                                  <RiGithubFill size={32} />
                                </Link>
                                <Link
                                  href="https://instagram.com/jineshpbhaskar"
                                  target="_blank"
                                  className="transition-all duration-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                                >
                                  <FaInstagram size={32} />
                                </Link>
                                <Link
                                  href="https://instagram.com/jineshpbhaskar"
                                  target="_blank"
                                  className="transition-all duration-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                                >
                                  <FaSquareBehance size={32} />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" pt-4">
                          {block?.link?.map((link, i) => {
                            return (
                              <BigButton
                                key={i}
                                data-tina-ref={
                                  link ? tinaField(link, "cta") : undefined
                                }
                                className="w-full"
                                href={link?.url || "#"}
                              >
                                {link?.cta}
                              </BigButton>
                            )
                          })}
                        </div>
                      </div>
                    </section>
                  )

                default:
                  return null
              }
            })}
          </div>
        </div>

        <section className="mt-10">
          {data.page.blocks?.map((block, i) => {
            console.log(block)

            switch (block?.__typename) {
              case "PageBlocksProjects":
                return (
                  <div key={i}>
                    {block.projects?.map((project, i) => {
                      return <div key={i}>{project?.title}</div>
                    })}
                  </div>
                )
            }
          })}
        </section>

        <section className="mt-10">
          {data.page.blocks?.map((block, i) => {
            switch (block?.__typename) {
              case "PageBlocksExperience":
                return (
                  <section key={i} className="mt-40">
                    <Heading
                      size="lg"
                      className=" py-0 text-zinc-300 dark:text-zinc-600"
                    >
                      {block.experienceHeading}
                    </Heading>

                    <div>
                      {block.roles?.map((role, i) => {
                        return (
                          <div key={i} className="mb-20 mt-10">
                            <span
                              className=" text-3xl font-bold text-zinc-700 dark:text-zinc-300 "
                              data-tina-field={
                                role ? tinaField(role, "position") : undefined
                              }
                            >
                              {role?.position}
                            </span>
                            <div className="flex gap-2  text-zinc-500 dark:text-zinc-500">
                              <span
                                className="flex gap-4 pt-0 font-medium text-purple-500 dark:text-purple-300"
                                data-tina-field={
                                  role ? tinaField(role, "company") : undefined
                                }
                              >
                                {role?.company}
                              </span>
                              <span>&#8226;</span>
                              <span
                                data-tina-field={
                                  role ? tinaField(role, "date") : undefined
                                }
                              >
                                {role?.date}
                              </span>
                            </div>

                            <div
                              className="prose prose-lg text-zinc-700 dark:text-zinc-300"
                              data-tina-field={
                                role
                                  ? tinaField(role, "description")
                                  : undefined
                              }
                            >
                              <TinaMarkdown content={role?.description} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </section>
                )
              default:
                return null
            }
          })}
        </section>

        {/* <section data-tina-field={tinaField(data.page, "body")}>
        <TinaMarkdown content={content} />
      </section> */}
      </Bounded>
      <div className="relative mt-[200px] flex w-full flex-col items-end ">
        <div className="bottom-0 z-10 h-[400px] w-full">
          <RenderModel className="">
            <ChonkyCat />
          </RenderModel>
        </div>

        <div className=" absolute w-full ">
          <div className="mx-auto w-full max-w-7xl px-8 ">
            <Heading
              as="h1"
              size="xl"
              className="text-zinc-300 dark:text-zinc-600"
            >
              Thank you for visiting
            </Heading>
          </div>
        </div>
      </div>
    </>
  )
}
