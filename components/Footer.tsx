"use client"

import Link from "next/link"
import { RiYoutubeFill, RiTwitterXFill, RiGithubFill } from "react-icons/ri"
import { RxDividerVertical } from "react-icons/rx"
import Bounded from "./Bounded"
import { GrInstagram } from "react-icons/gr"
import { BiLogoBehance } from "react-icons/bi"
import { FaSquareBehance } from "react-icons/fa6"
import { FaInstagram } from "react-icons/fa6"
import RenderModel from "./RenderModel"
import { ChonkyCat } from "./models/ChonkyCat"
import Heading from "./Heading"
import { FaCheck, FaLinkedin } from "react-icons/fa"
import { MdOutlineAlternateEmail } from "react-icons/md"
import SocialsButton from "./SocialsButton"
import toast, { Toaster } from "react-hot-toast"
import { GravityBalls } from "./GravityBalls"
import copy from "copy-to-clipboard"
import { useState } from "react"
import Lottie from "react-lottie"
import animationData from "@/data/confetti.json"
import {
  HomePageQuery,
  SettingsConnectionQuery,
} from "@/tina/__generated__/types"
import { useTina } from "tinacms/dist/react"

function copyEmail({ copyId }: { copyId: string }) {
  // let inputElement = document.createElement("input")
  // inputElement.type = "text"
  // let copyText = document.getElementById(copyId)?.innerHTML ?? ""
  // inputElement.value = copyText
  // document.body.appendChild(inputElement)
  // inputElement.select()
  copy("jineshpb@gmail.com")
  // navigator.clipboard.writeText(copyText) // Replace deprecated document.execCommand("copy")
  // document.body.removeChild(inputElement)
}

const handleCopy = ({
  setCopied,
}: {
  setCopied: (copied: boolean) => void
}) => {
  copy("jineshpb@gmail.com")

  setCopied(true), {}
  toast.success("Email copied!", {
    style: {
      borderRadius: "32px",
      background: "#FAFAFA",
      color: "#10B981",
      letterSpacing: "-0.5px",
      fontWeight: 500,
      padding: "16px",
      fontSize: "24px",
    },

    iconTheme: {
      primary: "#10B981",
      secondary: "#FAFAFA",
    },
  })
}

export default function Footer(props: {
  data: HomePageQuery
  variables: {}
  query: string
}) {
  const { data } = useTina(props)

  const [copied, setCopied] = useState(false)

  const footerDescription = data.page.blocks?.find(
    (block) => block?.__typename === "PageBlocksFooter",
  )?.footerSectionDescription

  const footerHeading = data.page.blocks?.find(
    (block) => block?.__typename === "PageBlocksFooter",
  )?.sectionHeading

  const footerLinksHeading = data.page.blocks?.find(
    (block) => block?.__typename === "PageBlocksFooter",
  )?.footerLinksHeading

  const foterLinksDescription = data.page.blocks?.find(
    (block) => block?.__typename === "PageBlocksFooter",
  )?.footerLinksDescription

  const footerLinks = data.page.blocks?.find(
    (block) => block?.__typename === "PageBlocksFooter",
  )?.footerLinks

  return (
    <section
      className=" mt-[300px] flex flex-col rounded-t-[56px] bg-emerald-800 "
      id="footer"
    >
      <div className="relative mx-auto mt-[200px] flex w-full max-w-[1440px] flex-col items-start gap-4">
        <div className="flex w-full flex-col gap-4 px-6">
          <div>
            <Heading className=" tracking-tight text-emerald-400 dark:text-emerald-400">
              {footerHeading}
            </Heading>

            <p className="prose mt-8 text-2xl text-emerald-200">
              {footerDescription}
            </p>
          </div>
          <div className="flex flex-col gap-0">
            <Heading
              className="mt-20 font-normal tracking-tighter text-emerald-400 dark:text-emerald-400"
              as="h1"
              size="lg"
            >
              {footerLinksHeading}
            </Heading>
            <p className="prose  leading-tight text-emerald-600">
              {foterLinksDescription}
            </p>
          </div>
          <div className="mx-auto mt-4 flex w-full  flex-col items-center gap-4 md:flex-row">
            {footerLinks?.map(
              (link) =>
                link && (
                  <SocialsButton
                    key={link.link || link.label}
                    link={link.link || "#"}
                    text={link.label || ""}
                    icon={link.icon || "FaLinkedin"}
                  />
                ),
            )}
          </div>
          <button
            className="relative flex w-full flex-col-reverse items-start gap-4 rounded-[64px] bg-emerald-900 p-8 text-[38px] text-emerald-400"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault()

              {
                !copied && handleCopy({ setCopied: setCopied })
              }
            }}
            onTouchStart={(event) => {
              event.preventDefault()
              // Call the copyEmail function and notify on touch start

              {
                !copied && handleCopy({ setCopied: setCopied })
              }
            }}
          >
            {!copied ? (
              <MdOutlineAlternateEmail size={48} />
            ) : (
              <FaCheck size={48} />
            )}
            {copied ? "Email Copied!" : "Copy Email"}

            <span className="absolute bottom-[-6px] left-0 z-10  size-full rounded-[64px] bg-emerald-700/10 transition-all duration-300 group-hover:bottom-[-12px]"></span>
            <Toaster />
            {copied && (
              <div className="absolute -bottom-5 right-1/2 ">
                <Lottie
                  options={{
                    loop: false,
                    autoplay: copied,
                    animationData,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                />
              </div>
            )}
          </button>
        </div>
      </div>
      <div className="relative flex w-full flex-col items-end overflow-hidden text-clip bg-gradient-to-t from-amber-800 via-amber-800 to-emerald-800">
        <div className="bottom-0 z-10 h-[600px] w-full">
          <RenderModel className="">
            <ChonkyCat />
          </RenderModel>
        </div>
        <div className="absolute -bottom-[500px] z-10 h-[1200px] w-full">
          {/* <GravityBalls /> */}
        </div>

        <div className=" absolute w-full ">
          <div className="mx-auto mt-[100px] max-w-[1440px] px-8 ">
            <Heading
              as="h3"
              size="2xl"
              className=" font-bold leading-[11rem] tracking-tight text-gray-700/20 dark:text-gray-700/20"
            >
              Thank you for visiting
            </Heading>
          </div>
        </div>
      </div>

      <hr className="border-amber-900" />
      <div className="relative flex flex-col items-center gap-4 bg-amber-800 py-[50px]">
        <div className="flex flex-col items-center text-center text-amber-400 dark:text-amber-600">
          <p>All rights reserved. © 2025 Jinesh P Bhaskaran </p>
          <span>
            Cat model from Sketchfab by <br /> Kanna-Nakajima, Thanks
            Aceternity, uv canvas UI
          </span>
        </div>

        <div className="flex gap-4 text-zinc-400 *:fill-amber-400 dark:text-zinc-600 ">
          <Link
            target="_blank"
            href="https://github.com/jineshpb"
            className=" text-amber-600 transition-all duration-500 hover:text-amber-300"
          >
            <RiGithubFill size={24} />
          </Link>
          <Link
            href="https://instagram.com/jineshpbhaskar"
            target="_blank"
            className="text-amber-600 transition-all duration-500 hover:text-amber-300"
          >
            <FaInstagram size={24} />
          </Link>
          <Link
            href="https://www.behance.net/jineshpb"
            target="_blank"
            className="text-amber-600 transition-all duration-500 hover:text-amber-300"
          >
            <FaSquareBehance size={24} />
          </Link>
        </div>
      </div>
    </section>
  )
}
