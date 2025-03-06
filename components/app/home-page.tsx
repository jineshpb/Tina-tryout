"use client"

import { HomePageQuery } from "@/tina/__generated__/types"
import { tinaField, useTina } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import Heading from "../Heading"
import SmallAvatar from "../SmallAvatar"
import { ReactNode, useEffect, useState } from "react"
import Bounded from "../Bounded"
import PostCard from "../PostCard"
import Footer from "../Footer"
import { useGSAP } from "@gsap/react"

import { EB_Garamond } from "next/font/google"
import clsx from "clsx"

import { DotBackgroundDemo } from "../DotBackground"
import { BackgroundGradient } from "../ui/BackgroundGradient"

import { motion } from "framer-motion"
import { Novatrix } from "uvcanvas"
import { FollowerPointerCard } from "../ui/following-pointer"
import Image from "next/image"
import ProjectGrid from "../ProjectGrid"

import gsap from "gsap"
import CanvasPill from "../CanvasPill"
import ProductPill from "../ProductPill"
import MobileHero from "../MobileHero"
import { Radio } from "lucide-react"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const EbGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
})

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

  return <>{partsWithBreaks}</>
}

const DelayedComponent = ({
  children,
  delay = 0,
}: {
  children: JSX.Element
  delay?: number
}) => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return isReady ? (
    children
  ) : (
    <div className="flex animate-shimmer items-center justify-center rounded-[40px] bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-100 bg-[length:400%_100%] dark:from-zinc-700 dark:via-zinc-600 dark:to-zinc-700 md:h-[60px] md:w-[120px] lg:h-[100px] lg:w-[160px]">
      {/* <Loader className="  animate-spin" /> */}

      {/* <BiLoaderAlt className=" size-12 animate-spin" /> */}
    </div>
  )
}

function UXPill() {
  const cardMotion = {
    initial: {
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },

      y: -10,
      rotate: -5,
    },
  }
  const cardMotion1 = {
    initial: {
      scale: 1,

      x: 0,
      y: 0,
      rotate: 0,
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
      x: 2,
      y: -10,
      rotate: 10,
    },
  }
  const cardMotion2 = {
    initial: {
      scale: 1,

      x: 0,
      y: 0,
      rotate: 0,
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
      x: 2,
      y: -10,
      rotate: 15,
    },
  }

  const starMotion = {
    initial: {
      scale: 1,

      x: 0,
      y: 0,
      rotate: 0,
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
      x: 2,
      y: -10,
      rotate: 15,
    },
  }

  const starMotion1 = {
    initial: {
      scale: 1,

      x: 0,
      y: 0,
      rotate: 0,
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
      x: -20,
      y: -25,
      rotate: -50,
    },
  }
  const starMotion2 = {
    initial: {
      scale: 1,

      x: 0,
      y: 0,
      rotate: 0,
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
      x: 5,
      y: -5,
      rotate: 20,
    },
  }

  const glowMotion = {
    initial: {
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
    },
    hover: {
      scale: 2,
      transition: { duration: 0.3 },
      y: -10,
      rotate: -5,
    },
  }

  return (
    <motion.div
      whileHover="hover"
      id="pill"
      className=" backgroud-image:[url('./Noise.png')] relative z-0 hidden overflow-hidden rounded-full   bg-[#1D1C20]   shadow-[0px_8px_12px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:inline-block md:h-[60px] md:w-[120px] lg:h-[100px] lg:w-[160px] "
    >
      <motion.div>
        <motion.div
          variants={cardMotion}
          id="card-round"
          className="absolute -bottom-4 right-16 z-10 rounded-[8px] bg-[#38343E] md:h-[50px] md:w-[36px] lg:h-[70px] lg:w-[56px]"
          style={{
            boxShadow:
              "-5px -10px 15px rgba(0, 0, 0, 0.3), inset 0 1px 1px #525154",
          }}
        >
          <Image
            src="/Ellipse2.png"
            alt="ellise"
            width={24}
            height={24}
            className="pointer-events-none pl-2 pt-2"
          />
        </motion.div>
        <motion.div
          variants={cardMotion1}
          id="card-rectangle"
          className="absolute -bottom-4 right-12 z-[13] rounded-[8px] bg-[#38343E] md:h-[50px] md:w-[36px] lg:h-[70px] lg:w-[56px]"
          style={{
            boxShadow:
              "-5px -10px 15px rgba(0, 0, 0, 0.3), inset 0 1px 1px #525154",
          }}
        >
          <Image
            src="/Polygon.png"
            alt="rectangle"
            width={24}
            height={24}
            className="pl-2 pt-2"
          />
        </motion.div>

        <motion.div
          variants={cardMotion2}
          id="card-figma"
          className="absolute -bottom-4 right-6 z-[16] rounded-[8px] bg-[#38343E] md:h-[50px] md:w-[36px] lg:h-[70px] lg:w-[56px]"
          style={{
            boxShadow:
              "-5px -10px 15px rgba(0, 0, 0, 0.3), inset 0 1px 1px #525154",
          }}
        >
          <Image
            src="/FigmaLogo.png"
            alt="figma logo"
            width={24}
            height={24}
            className="pointer-events-none pl-2 pt-2 md:w-4 lg:w-6"
          />
        </motion.div>

        <motion.div
          variants={glowMotion}
          className="absolute bottom-0 size-8 w-full bg-[#9563FF] blur-xl"
        ></motion.div>
      </motion.div>
      <motion.img
        variants={starMotion2}
        src="./Star1.png"
        alt="star1"
        className="pointer-events-none absolute  bottom-1 right-6 z-[17] md:size-6 lg:size-8"
      />
      <motion.img
        variants={starMotion}
        src="./Star2.png"
        alt="star1"
        className="pointer-events-none absolute right-12 top-4 z-[13] md:size-3 lg:size-4"
      />
      <motion.img
        variants={starMotion1}
        src="./Star4.png"
        alt="star1"
        className="pointer-events-none absolute bottom-0 left-8 z-[11] md:size-8 lg:size-10"
      />
    </motion.div>
  )
}

const TitleComponent = ({ title }: { title: string }) => (
  <div className="flex items-center space-x-2">
    <Image
      src="/slightly-smiling-face_1f642.png"
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p></p>
    <p>{title}</p>
  </div>
)

export function HomePageComponent(props: {
  data: HomePageQuery
  variables: {}
  query: string
}) {
  const [isMobile, setIsMobile] = useState(isMobileDevice())
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

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  const { data } = useTina(props)

  const postsList = data.postsConnection.edges

  const projectList = data.projectsConnection.edges
  const sortedProjectList =
    projectList?.sort((a, b) => {
      const dateA = new Date(a?.node?.date ?? "")
      const dateB = new Date(b?.node?.date ?? "")
      return dateB.getTime() - dateA.getTime() // Sort in descending order (newest first)
    }) ?? []

  // console.log("sortedProjectList", sortedProjectList)

  useGSAP(() => {
    gsap.fromTo(
      ".g_fadeIn",
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.2 },
    )
  }, [])

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
                return (
                  <section
                    className="relative  flex w-full flex-col gap-12 lg:mt-24 lg:flex-row"
                    key={i}
                  >
                    <div className=" mt-24 hidden w-full md:flex ">
                      <div className=" w-full items-center justify-center text-6xl font-medium tracking-tighter text-zinc-500 dark:text-zinc-400 md:text-7xl  lg:text-8xl xl:text-9xl ">
                        <div className="mx-auto w-full items-center justify-center space-y-6 ">
                          <div className=" flex w-full items-center justify-center gap-4">
                            <h1>Product</h1>

                            <DelayedComponent>
                              <ProductPill />
                            </DelayedComponent>
                            <h1>designer,</h1>
                          </div>
                          <h1 className=" flex items-start justify-center   ">
                            CG{" "}
                            <DelayedComponent>
                              <CanvasPill className="h-[80px] w-[130px] lg:h-[130px] lg:w-[180px]" />
                            </DelayedComponent>
                            generalist,
                          </h1>

                          <div className="flex items-center justify-center gap-4">
                            novice coder{" "}
                            <DelayedComponent>
                              <FollowerPointerCard
                                title={<TitleComponent title={"That's me"} />}
                              >
                                <div
                                  onClick={() => {
                                    const element =
                                      document.getElementById("footer")
                                    element?.scrollIntoView({
                                      behavior: "smooth",
                                    })
                                  }}
                                >
                                  <BackgroundGradient className=" size-full">
                                    <SmallAvatar
                                      image={block?.profileImage}
                                      data-tina-field={
                                        block
                                          ? tinaField(block, "profileImage")
                                          : undefined
                                      }
                                    ></SmallAvatar>
                                  </BackgroundGradient>
                                </div>
                              </FollowerPointerCard>
                            </DelayedComponent>
                          </div>
                          <div className="mx-auto flex w-full items-center justify-center">
                            <h3 className="mt-6 font-ppeditorial text-3xl tracking-wide text-zinc-300 dark:text-zinc-700 ">
                              and generally curious.
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className=" mb-16 flex w-full flex-col items-center justify-center px-6 text-center text-5xl font-semibold tracking-tighter text-zinc-500 dark:text-zinc-400 md:hidden ">
                      {/* {block?.title} */}
                      <MobileHero />
                      <div className="mx-auto flex w-full items-center justify-center">
                        <h3 className="mt-4 font-ppeditorial text-lg font-normal tracking-wide text-zinc-300 dark:text-zinc-700 ">
                          and generally curious.
                        </h3>
                      </div>
                    </div>
                  </section>
                )

              default:
                return null
            }
          })}
        </Bounded>

        <div className=" mt-[300px] w-full px-6" id="projects">
          {sortedProjectList && sortedProjectList?.length > 0 && (
            <div>
              <Heading
                size="md"
                className="mt-8 font-normal tracking-tighter text-zinc-300 dark:text-zinc-700  "
              >
                Projects
              </Heading>
              <div className="flex flex-col gap-6 lg:mt-20">
                <ProjectGrid data={sortedProjectList} />
              </div>
            </div>
          )}
        </div>
        {/* 
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
                    <div
                      className="g_fadeIn mx-auto grid w-full grid-cols-1 gap-4  pt-10 lg:mx-0 lg:grid-cols-3 "
                      style={{ gridAutoRows: "fr" }}
                    >
                      <div
                        key={i}
                        className="grid auto-rows-fr grid-cols-1 gap-4"
                      >
                        {block.projects
                          ?.filter((_: any, i: number) => i % 3 === 0)
                          .map((project: any) => (
                            <ProjectCard
                              key={project.id}
                              project={project}
                              className="h-full min-h-80"
                            />
                          ))}
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {block.projects
                          ?.filter((_: any, i: number) => i % 3 === 1)
                          .map((project: any) => (
                            <ProjectCard
                              key={project.id}
                              project={project}
                              className="h-full min-h-80"
                            />
                          ))}
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {block.projects
                          ?.filter((_: any, i: number) => i % 3 === 2)
                          .map((project: any) => (
                            <ProjectCard
                              key={project.id}
                              project={project}
                              className="h-full min-h-80"
                            />
                          ))}
                      </div>
                    </div>
                  </>
                )
            }
          })}
        </Bounded> */}

        <Bounded className=" mt-[300px]" id="career">
          {data.page.blocks?.map((block) => {
            switch (block?.__typename) {
              case "PageBlocksExperience":
                return (
                  <div>
                    <Heading
                      size="md"
                      className={clsx(
                        "g_fadeIn mt-8 font-normal tracking-tighter text-zinc-300 dark:text-zinc-700 ",
                      )}
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
                            className={clsx(
                              "w-full text-[60px] font-normal  leading-[4rem] tracking-tighter text-zinc-700 dark:text-zinc-300 md:text-[72px]",
                            )}
                            data-tina-field={
                              role ? tinaField(role, "position") : undefined
                            }
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
                                data-tina-field={
                                  role ? tinaField(role, "date") : undefined
                                }
                              >
                                {role?.date}
                              </span>
                            </div>

                            <div
                              className="prose prose-lg text-zinc-700 md:prose-2xl dark:text-zinc-300"
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
            <div className="mt-12 flex flex-col gap-6 ">
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
