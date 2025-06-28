"use client"

import { HomePageQuery } from "@/tina/__generated__/types"
import { useTina } from "tinacms/dist/react"
import Heading from "../Heading"
import Bounded from "../Bounded"
import { DotBackgroundDemo } from "../DotBackground"
import ProjectGrid from "../ProjectGrid"
import PostCard from "./posts/PostCard"
import PageHero from "./landing/page-hero"
import ExperienceHomePageSection from "./projects/experience-home-page-section"
import { useIsMobile } from "@/utils/useScreenSize"

export function HomePageComponent(props: {
  data: HomePageQuery
  variables: {}
  query: string
}) {
  const isMobile = useIsMobile()
  const { data } = useTina(props)

  let projectSectionDescription = ""
  let projectSectionHeading = ""
  let postsSectionDescription = ""
  let postsSectionHeading = ""
  let experienceSectionDescription = ""
  let experienceSectionHeading = ""

  data.page.blocks?.forEach((block) => {
    switch (block?.__typename) {
      case "PageBlocksProjects":
        projectSectionDescription = block.projectsSectionDescription || ""
        projectSectionHeading = block.sectionHeading || ""
        break
      case "PageBlocksPosts":
        postsSectionDescription = block.postsSectionDescription || ""
        postsSectionHeading = block.sectionHeading || ""
        break
      case "PageBlocksExperience":
        experienceSectionDescription = block.experienceSectionDescription || ""
        experienceSectionHeading = block.sectionHeading || ""
        break
      default:
        break
    }
  })

  const postsList = data.postsConnection.edges

  const projectList = data.projectsConnection.edges
  const sortedProjectList =
    projectList?.sort((a, b) => {
      const dateA = new Date(a?.node?.date ?? "")
      const dateB = new Date(b?.node?.date ?? "")
      return dateB.getTime() - dateA.getTime() // Sort in descending order (newest first)
    }) ?? []

  return (
    <>
      <div className=" mx-auto  mt-20 w-full snap-mandatory">
        <div className="absolute left-0 top-0  -z-20 size-full overflow-hidden">
          <DotBackgroundDemo />
        </div>
        <Bounded className=" flex w-full flex-row gap-12" id="introduction">
          {data.page.blocks?.map((block, i) => {
            switch (block?.__typename) {
              case "PageBlocksWelcomeHero":
                return <PageHero block={block} key={i} />
              default:
                return null
            }
          })}
        </Bounded>
        <div className=" relative mt-[300px] w-full px-6" id="projects">
          {sortedProjectList && sortedProjectList?.length > 0 && (
            <div className="flex flex-col gap-6 lg:mt-24 lg:pt-24">
              <div className="flex flex-col gap-4">
                <Heading
                  size="lg"
                  className="mt-8 font-medium tracking-tighter text-zinc-300 dark:text-zinc-700  "
                >
                  {projectSectionHeading}
                </Heading>
                <p className="prose leading-tight text-zinc-400 dark:text-zinc-600">
                  {projectSectionDescription}
                </p>
              </div>

              <ProjectGrid data={sortedProjectList} />
            </div>
          )}
        </div>

        <Bounded className=" mt-[300px]" id="career">
          <Heading
            size="md"
            className="mt-8 font-medium tracking-tighter text-zinc-300 dark:text-zinc-700  "
          >
            {experienceSectionHeading}
          </Heading>
          {experienceSectionDescription && (
            <p className="prose leading-tight text-zinc-400 dark:text-zinc-600">
              {experienceSectionDescription}
            </p>
          )}
          <div className="mt-12 flex flex-col gap-6 ">
            {data.page.blocks?.map((block) => {
              switch (block?.__typename) {
                case "PageBlocksExperience":
                  return <ExperienceHomePageSection block={block} />
                default:
                  return null
              }
            })}
          </div>
        </Bounded>

        {postsList && postsList?.length > 0 && (
          <Bounded className="mt-[300px]" id="posts">
            <div className="flex flex-col gap-4">
              <Heading
                size="md"
                className="mt-8 font-normal tracking-tighter text-zinc-300 dark:text-zinc-700  "
              >
                {postsSectionHeading}
              </Heading>
              <p className="prose leading-tight text-zinc-400 dark:text-zinc-600">
                {postsSectionDescription}
              </p>
            </div>
            <div className="mt-12 flex flex-col gap-6 ">
              {postsList.map((edge: any, i) => {
                return <PostCard post={edge} key={i} className="" />
              })}
            </div>
          </Bounded>
        )}
      </div>
    </>
  )
}
