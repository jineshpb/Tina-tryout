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

export default function Footer() {
  const [copied, setCopied] = useState(false)
  return (
    <section className=" mt-[300px] flex flex-col rounded-t-[56px] bg-emerald-800 ">
      <div className="relative mx-auto mt-[200px] flex w-full max-w-[1440px] flex-col items-start gap-4">
        <div className="flex w-full flex-col gap-4 px-6">
          <Heading
            className="font-normal tracking-tighter text-emerald-400 dark:text-emerald-400"
            as="h1"
            size="lg"
          >
            Socials
          </Heading>
          <div className="mx-auto flex w-full  flex-col items-center gap-4 md:flex-row">
            <SocialsButton
              link="https://www.linkedin.com/in/jineshpb/"
              text="linkedin"
              icon={<FaLinkedin size={48} />}
            />
            <SocialsButton
              link="https://www.instagram.com/jineshpbhaskar/"
              text="Instagram"
              icon={<FaInstagram size={48} />}
            />
          </div>
          <SocialsButton
            link="https://www.behance.net/jineshpb"
            text="Behance"
            icon={<FaSquareBehance size={48} />}
          />

          <button
            className="relative flex w-full flex-col rounded-[64px] bg-emerald-900 p-8 text-[38px] text-emerald-400"
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
            {copied ? "Email Copied!" : "Copy Email"}

            {!copied ? <MdOutlineAlternateEmail size={48} /> : <FaCheck />}
            <span className="absolute bottom-[-6px] left-0 z-10  size-full rounded-[64px] bg-emerald-700/10 transition-all duration-300 group-hover:bottom-[-12px]"></span>
            <Toaster />
          </button>
        </div>
      </div>
      <div className="relative flex w-full flex-col items-end overflow-hidden text-clip">
        <div className="bottom-0 z-10 h-[600px] w-full">
          {/* <RenderModel className="">
            <ChonkyCat />
          </RenderModel> */}
        </div>
        <div className="absolute -bottom-[500px] z-10  h-[1200px] w-full">
          {/* <GravityBalls /> */}
        </div>

        <div className=" absolute w-full ">
          <div className="mx-auto mt-[100px] max-w-[1440px] px-8 ">
            <Heading
              as="h3"
              size="2xl"
              className=" font-medium leading-[12rem] tracking-tight text-emerald-700 dark:text-emerald-700"
            >
              Thank you for visiting
            </Heading>
          </div>
        </div>
      </div>

      <hr className=" border-emerald-700" />
      <div className="relative my-[50px] flex flex-col items-center gap-4 ">
        <div className="flex flex-col items-center text-center text-emerald-400 dark:text-emerald-600">
          <p>All rights reserved. © 2024 Jinesh P bhaskaran </p>
          <span>
            Cat model from Sketchfab by <br /> Kanna-Nakajima
          </span>
        </div>

        <div className="flex gap-4 text-zinc-400 *:fill-emerald-400 dark:text-zinc-600 ">
          <Link
            href="https://youtube.com"
            className=" text-emerald-600 transition-all duration-500 hover:text-emerald-300"
          >
            <RiGithubFill size={24} />
          </Link>
          <Link
            href="https://instagram.com/jineshpbhaskar"
            target="_blank"
            className="text-emerald-600 transition-all duration-500 hover:text-emerald-300"
          >
            <FaInstagram size={24} />
          </Link>
          <Link
            href="https://instagram.com/jineshpbhaskar"
            target="_blank"
            className="text-emerald-600 transition-all duration-500 hover:text-emerald-300"
          >
            <FaSquareBehance size={24} />
          </Link>
        </div>
      </div>
    </section>
  )
}
