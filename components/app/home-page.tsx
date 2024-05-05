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
import { ReactNode } from "react"
import Bounded from "../Bounded"
import ProjectCard from "../ProjectCard"
import PostCard from "../PostCard"
import RenderModel from "../RenderModel"
import { ChonkyCat } from "../models/ChonkyCat"

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

  return (
    <div className="mx-auto mt-20 w-full snap-mandatory">
      <Bounded className=" flex w-full flex-row gap-12" id="introduction">
        {data.page.blocks?.map((block) => {
          switch (block?.__typename) {
            case "PageBlocksWelcomeHero":
              return (
                <section>
                  <section className="flex size-full gap-12">
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
                    className="mt-8 font-normal tracking-tight text-zinc-300 dark:text-zinc-700 "
                  >
                    {block.projectsHeading}
                  </Heading>
                  <div className="mx-auto grid w-full grid-cols-1 gap-4 pt-10 md:grid-cols-3 lg:mx-0">
                    <div key={i} className="grid grid-cols-1 gap-4">
                      {block.projects
                        ?.filter((_: any, i: number) => i % 3 === 0)
                        .map((project: any) => (
                          <ProjectCard key={i} project={project} className="" />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {block.projects
                        ?.filter((_: any, i: number) => i % 3 === 1)
                        .map((project: any) => (
                          <ProjectCard key={i} project={project} className="" />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {block.projects
                        ?.filter((_: any, i: number) => i % 3 === 2)
                        .map((project: any) => (
                          <ProjectCard key={i} project={project} className="" />
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
                <>
                  <Heading
                    size="md"
                    className="mt-8 font-normal tracking-tighter text-zinc-300 dark:text-zinc-700 "
                  >
                    {block.experienceHeading}
                  </Heading>
                  {block.roles?.map((role, i) => (
                    <div
                      key={i}
                      className="mb-20 mt-10 flex items-start gap-10"
                    >
                      <div
                        className=" w-1/2 text-[60px] font-normal leading-9 tracking-tighter text-zinc-700 dark:text-zinc-300 "
                        data-tina-field={
                          role ? tinaField(role, "position") : undefined
                        }
                      >
                        {role?.position}
                      </div>

                      <div className="flex w-1/2 flex-col gap-2">
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
                          className="prose prose-lg text-zinc-700 dark:text-zinc-300"
                          data-tina-field={
                            role ? tinaField(role, "description") : undefined
                          }
                        >
                          <TinaMarkdown content={role?.description} />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
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

      <section className=" mt-[300px]" id="footer">
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
                className="font-medium tracking-tight text-zinc-300 dark:text-zinc-600"
              >
                Thank you for visiting
              </Heading>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
