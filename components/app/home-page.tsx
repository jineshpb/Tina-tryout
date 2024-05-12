"use client"

import { HomePageQuery, PageQuery } from "@/tina/__generated__/types"
import Link from "next/link"
import { tinaField, useTina } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import moment from "moment"
import Heading from "../Heading"
import SmallAvatar from "../SmallAvatar"
import { RiGithubFill } from "react-icons/ri"
import { FaInstagram } from "react-icons/fa"
import { FaSquareBehance } from "react-icons/fa6"
import BigButton from "../BigButton"
import { ReactNode, Suspense } from "react"
import Bounded from "../Bounded"
import ProjectCard from "../ProjectCard"
import PostCard from "../PostCard"
import RenderModel from "../RenderModel"
import { ChonkyCat } from "../models/ChonkyCat"
import Footer from "../Footer"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { animateWithGsap } from "../utils/animation"

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

export function HomePageComponent(props: {
  data: HomePageQuery
  variables: {}
  query: string
}) {
  const { data } = useTina(props)

  const title = data.page.title

  const postsList = data.postsConnection.edges

  useGSAP(() => {
    animateWithGsap(".g_fadeIn", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
    })
  }, [])

  return (
    <>
      <div className=" mx-auto mt-20 w-full snap-mandatory">
        <Bounded className=" flex w-full flex-row gap-12" id="introduction">
          {data.page.blocks?.map((block, i) => {
            switch (block?.__typename) {
              case "PageBlocksWelcomeHero":
                return (
                  <section
                    className="mt-12 flex w-full flex-col gap-12 lg:flex-row"
                    key={i}
                  >
                    <div className="flex size-full">
                      <div
                        className="text-7xl font-medium tracking-tighter text-zinc-500 dark:text-zinc-400 md:text-8xl lg:text-8xl"
                        data-tina-field={
                          block ? tinaField(block, "title") : undefined
                        }
                      >
                        <AddBreakAfterComma text={block.title} />
                      </div>
                    </div>
                    <div className="flex size-full flex-col justify-between gap-8">
                      <div className="flex flex-col gap-8 md:flex-row ">
                        <div>
                          <SmallAvatar
                            image={block.profileImage}
                            data-tina-field={
                              block
                                ? tinaField(block, "profileImage")
                                : undefined
                            }
                            className="size-56 md:size-32 lg:size-40"
                          ></SmallAvatar>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div
                            className=" text-[46px] font-semibold tracking-tight text-zinc-600 dark:text-zinc-400 "
                            data-tina-field={
                              block ? tinaField(block, "name") : undefined
                            }
                          >
                            {block?.name}
                          </div>
                          <div>
                            <p
                              className="text-2xl font-normal leading-relaxed  text-zinc-500 dark:text-zinc-400"
                              data-tina-field={
                                block
                                  ? tinaField(block, "description")
                                  : undefined
                              }
                            >
                              {block?.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-12">
                        {block?.link?.map((link, i) => {
                          return (
                            <>
                              <div
                                key={i}
                                className="w-full"
                                onClick={() => {
                                  const element =
                                    document.getElementById("footer")
                                  element?.scrollIntoView({
                                    behavior: "smooth",
                                  })
                                }}
                                data-tina-field={
                                  link ? tinaField(link, "cta") : undefined
                                }
                              >
                                <BigButton
                                  linkText={link?.cta || "Hey"}
                                  className="w-full"
                                  size="xl"
                                >
                                  Get in touch
                                </BigButton>
                              </div>
                            </>
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
        </Bounded>

        <Bounded className=" mt-[300px]" id="projects">
          {data.page.blocks?.map((block, i) => {
            switch (block?.__typename) {
              case "PageBlocksProjects":
                return (
                  <>
                    <Heading
                      size="md"
                      className="g_fadeIn mt-8 font-normal tracking-tight text-zinc-300 dark:text-zinc-700 "
                      data-tina-field={
                        block ? tinaField(block, "projectsHeading") : undefined
                      }
                    >
                      {block.projectsHeading}
                    </Heading>
                    <div className="g_fadeIn mx-auto grid w-full grid-cols-1 gap-4 pt-10  lg:mx-0 lg:grid-cols-3 ">
                      <div key={i} className="grid grid-cols-1 gap-4">
                        {block.projects
                          ?.filter((_: any, i: number) => i % 3 === 0)
                          .map((project: any) => (
                            <ProjectCard
                              key={i}
                              project={project}
                              className=""
                            />
                          ))}
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {block.projects
                          ?.filter((_: any, i: number) => i % 3 === 1)
                          .map((project: any) => (
                            <ProjectCard
                              key={i}
                              project={project}
                              className=""
                            />
                          ))}
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {block.projects
                          ?.filter((_: any, i: number) => i % 3 === 2)
                          .map((project: any) => (
                            <ProjectCard
                              key={i}
                              project={project}
                              className=""
                            />
                          ))}
                      </div>
                    </div>
                  </>
                )
            }
          })}
        </Bounded>

        <Bounded className=" mt-[300px]" id="career">
          {data.page.blocks?.map((block) => {
            switch (block?.__typename) {
              case "PageBlocksExperience":
                return (
                  <div>
                    <Heading
                      size="md"
                      className="g_fadeIn mt-8 font-normal tracking-tighter text-zinc-300 dark:text-zinc-700 "
                    >
                      {block.experienceHeading}
                    </Heading>
                    <div className="flex w-full flex-col ">
                      {block.roles?.map((role, i) => (
                        <div
                          key={i}
                          className="g_fadeIn mb-20 mt-10 flex w-full flex-col items-start gap-10 lg:flex-row"
                        >
                          <div
                            className=" w-full text-[72px] font-normal leading-[3rem] tracking-tighter text-zinc-700 dark:text-zinc-300 "
                            data-tina-field={
                              role ? tinaField(role, "position") : undefined
                            }
                          >
                            {role?.position}
                          </div>

                          <div className="flex w-full flex-col gap-2">
                            <div className="flex items-center gap-2  text-zinc-500 dark:text-zinc-500">
                              <span
                                className="flex gap-4 pt-0 text-2xl font-medium text-emerald-500 dark:text-emerald-300"
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
                              className="prose prose-2xl text-zinc-700 dark:text-zinc-300"
                              data-tina-field={
                                role
                                  ? tinaField(role, "description")
                                  : undefined
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

              default:
                return null
            }
          })}
        </Bounded>

        {postsList && postsList?.length > 0 && (
          <Bounded className="mt-[300px]" id="posts">
            <Heading
              size="md"
              className="mt-8 font-normal tracking-tighter text-zinc-300 dark:text-zinc-700  "
            >
              Latest posts
            </Heading>
            <div className="mt-12 ">
              {postsList.map((edge: any, i) => {
                return <PostCard post={edge} key={i} className="" />
              })}
            </div>
          </Bounded>
        )}

        <section id="footer">
          <Footer />
        </section>
      </div>
    </>
  )
}
