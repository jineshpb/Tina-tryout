"use client"

import { HomePageQuery, PageQuery } from "@/tina/__generated__/types"
import { tinaField, useTina } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import Heading from "../Heading"
import SmallAvatar from "../SmallAvatar"
import BigButton from "../BigButton"
import { ReactNode, useEffect, useRef, useState } from "react"
import Bounded from "../Bounded"
import ProjectCard from "../ProjectCard"
import PostCard from "../PostCard"
import Footer from "../Footer"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { animateWithGsap } from "../utils/animation"
import { EB_Garamond } from "next/font/google"
import clsx from "clsx"
import { Spotlight } from "../Spotlight"
import { DotBackgroundDemo } from "../DotBackground"
import { BackgroundGradient } from "../ui/BackgroundGradient"
import RenderModel from "../RenderModel"
import { ChonkyCat } from "../models/ChonkyCat"
import { motion, MotionConfig, useAnimationControls } from "framer-motion"
import { Lumiflex, Novatrix } from "uvcanvas"

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
      className="backgroud-image:[url('./Noise.png')] relative z-20 hidden h-[100px] w-[160px] overflow-hidden rounded-full  bg-[#1D1C20] md:inline-block"
      style={{
        boxShadow:
          "inset 0 -1px 1px rgba(0, 0, 0, 0.2), inset 0 1px 1px #A1A1AA",
      }}
    >
      <motion.div>
        <motion.div
          variants={cardMotion}
          id="card-round"
          className="absolute -bottom-4 right-16 z-10 h-[70px] w-[56px] rounded-[8px] bg-[#38343E]"
          style={{
            boxShadow:
              "-5px -10px 15px rgba(0, 0, 0, 0.3), inset 0 1px 1px #525154",
          }}
        >
          <img src="./Ellipse2.png" alt="" className="pl-2 pt-2" />
        </motion.div>
        <motion.div
          variants={cardMotion1}
          id="card-rectangle"
          className="absolute -bottom-4 right-12 z-[13] h-[70px] w-[56px] rounded-[8px] bg-[#38343E]"
          style={{
            boxShadow:
              "-5px -10px 15px rgba(0, 0, 0, 0.3), inset 0 1px 1px #525154",
          }}
        >
          <img src="./Polygon.png" alt="" className="pl-2 pt-2" />
        </motion.div>

        <motion.div
          variants={cardMotion2}
          id="card-figma"
          className="absolute -bottom-4 right-6 z-[16] h-[70px] w-[56px] rounded-[8px] bg-[#38343E]"
          style={{
            boxShadow:
              "-5px -10px 15px rgba(0, 0, 0, 0.3), inset 0 1px 1px #525154",
          }}
        >
          <img src="./FigmaLogo.png" alt="" className="pl-2 pt-2" />
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
        className="absolute  bottom-1 right-6 z-[17] size-8"
      />
      <motion.img
        variants={starMotion}
        src="./Star2.png"
        alt="star1"
        className="absolute right-12 top-4 z-[13]"
      />
      <motion.img
        variants={starMotion1}
        src="./Star4.png"
        alt="star1"
        className="absolute bottom-4 left-11 z-[11]"
      />
    </motion.div>
  )
}

function CGPill() {
  return (
    <div className="relative hidden h-[100px] w-[160px] md:block">
      <motion.div
        id="pill"
        className="absolute z-20 inline-block h-[100px] w-[160px] overflow-hidden  rounded-full  "
        style={{
          boxShadow:
            "inset 0 -4px 4px rgba(0, 0, 0, 0.4), inset 0 2px 2px #A1A1AA",
        }}
        initial={{ zIndex: 10 }}
      >
        <div className="absolute inset-0 z-0 flex size-full items-center justify-center opacity-90">
          <Novatrix />
        </div>
      </motion.div>
    </div>
  )
}

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

  const title = data.page.title

  const postsList = data.postsConnection.edges

  useGSAP(() => {
    animateWithGsap(".g_fadeIn", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
    })
  }, [])

  return (
    <>
      <div className=" mx-auto mt-20 w-full snap-mandatory">
        <div className="absolute left-0 top-0 -z-20 size-full overflow-hidden">
          <DotBackgroundDemo />
        </div>
        <Bounded className=" flex w-full flex-row gap-12" id="introduction">
          {data.page.blocks?.map((block, i) => {
            switch (block?.__typename) {
              case "PageBlocksWelcomeHero":
                return (
                  <section
                    className="relative mt-12 flex w-full flex-col gap-12 lg:mt-24 lg:flex-row"
                    key={i}
                  >
                    <div className="flex w-full md:w-1/2">
                      <div className="hidden antialiased lg:block">
                        {/* <Spotlight
                          fill="white"
                          className="-top-40  left-40 md:-top-20 md:left-32"
                        /> */}

                        {/* <Spotlight
                          fill="#D4D4D8"
                          className="left-1/2 top-10 h-[80vh] w-[50vw] "
                        /> */}
                        {/* <Spotlight
                          fill="#047857"
                          className="left-80 top-28 h-[80vh] w-[50vw]"
                        /> */}
                      </div>

                      <div className="g_fadeIn text-6xl font-medium tracking-tighter text-zinc-500 dark:text-zinc-400 md:text-[68px] xl:text-8xl ">
                        <div className="hidden md:block">
                          <div className="my-2 flex items-center gap-2">
                            <h1>UI/UX</h1> {<UXPill />}
                          </div>
                          <h1 className=" flex  ">designer, CG </h1>
                          <div className="my-2 flex items-center  gap-2">
                            {<CGPill />} generalist,
                          </div>
                          novice coder
                        </div>
                        <div className="mb-16 flex w-full flex-col items-center justify-center text-left text-6xl md:hidden">
                          {block?.title}
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full  flex-col  justify-between gap-8 md:w-1/2">
                      <div className="g_fadeIn flex flex-col gap-10 xl:flex-row ">
                        <div className="flex items-start justify-start">
                          <BackgroundGradient className="flex">
                            <SmallAvatar
                              image={block.profileImage}
                              data-tina-field={
                                block
                                  ? tinaField(block, "profileImage")
                                  : undefined
                              }
                              className="size-56 md:size-32 lg:size-40"
                            ></SmallAvatar>
                          </BackgroundGradient>
                        </div>
                        <div className="g_fadeIn flex flex-col gap-2">
                          <div
                            className="text-[34px] font-semibold tracking-tight text-zinc-600 dark:text-zinc-400 md:text-[46px] "
                            data-tina-field={
                              block ? tinaField(block, "name") : undefined
                            }
                          >
                            {block?.name}
                          </div>
                          <div>
                            <p
                              className=" text-xl font-normal  text-zinc-500 dark:text-zinc-400 md:text-2xl"
                              style={{
                                lineHeight: "1.6",
                              }}
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
                      <div className="mt-12" key={i}>
                        {block?.link?.map((link, i) => {
                          return (
                            <>
                              <div
                                key={i}
                                className="g_fadeIn w-full"
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
                                  size={isMobile ? "lg" : "xl"}
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
