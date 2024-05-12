"use client"
import { SettingsConnectionQuery } from "@/tina/__generated__/types"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import { tinaField, useTina } from "tinacms/dist/react"

import { MdClose, MdMenu } from "react-icons/md"
import clsx from "clsx"
import { ThemeToggle } from "./ThemeToggle"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { cn } from "@/lib/utils"

export default function NewNavbar(props: {
  data: SettingsConnectionQuery
  variables: {
    relativePath: string
  }
  query: string
}) {
  const [isMobile, setIsMobile] = useState(true)
  const [open, setOpen] = useState(false)

  const pathname = usePathname()
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

    setIsMobile(isMobileDevice())
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const { data } = useTina(props)

  const NavList = data.settingsConnection.edges
  // rest of the code

  // console.log(newNavlist)

  // return NavList?.map((setting: any) => {
  return (
    <nav
      className="fixed top-0 z-10 w-full items-center  p-10 backdrop-blur-xl "
      style={{
        backdropFilter: "blur(20px)",

        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="mx-auto max-w-[1440px]">
        {isMobile ? (
          <MobileNav
            data={NavList}
            open={open}
            setOpen={setOpen}
            pathname={pathname}
          />
        ) : (
          <DesktopNav data={NavList} className="" />
        )}
      </div>
    </nav>
  )
  // })
}

function isHome(link: string, pathname: string) {
  const pathnameSegments = pathname.split("/")

  const isHome = pathnameSegments.length === 2 && pathnameSegments[1] === ""

  return isHome
}

function NameLogo({ logo }: { logo: any }) {
  // replace any with the actual type of logo
  return (
    <button
      onClick={() => {
        const element = document.getElementById("introduction")
        element?.scrollIntoView({ behavior: "smooth" })
      }}
      aria-label="Home page"
      className="text-xl font-extrabold tracking-tighter text-zinc-900"
    >
      <Image src={logo} width={24} height={24} alt="Logo" />
    </button>
  )
}

function MobileNav({
  data,
  open,
  setOpen,
  pathname,
}: {
  data: SettingsConnectionQuery
  open: boolean
  setOpen: (open: boolean) => void
  pathname: string
}) {
  const tl = gsap.timeline({ paused: true })

  useGSAP(() => {
    gsap.to("#menuItem", {
      duration: 0.5,
      opacity: 1,
      y: 0,
      ease: "power2.inOut",
      stagger: 0.1,
    })
  }, [open])

  // useEffect(() => {
  //   if (open) {
  //     gsap.from("#drawer", { duration: 0.5, opacity: 1 })
  //   } else {
  //     gsap.to("#drawer", { duration: 0.5, opacity: 0 })
  //   }
  // }, [open])

  return (
    <>
      {open ? (
        <div className="z-20 flex flex-col items-end ">
          <div className="flex w-full flex-col items-end">
            <button
              aria-expanded={open}
              aria-label="Open menu"
              className=" p-2 text-2xl text-zinc-800 dark:text-zinc-400"
              onClick={() => {
                setOpen((prev: boolean) => !prev)
              }}
            >
              <MdClose />
            </button>

            <div
              id="drawer"
              className={clsx("flex w-full flex-col items-center gap-8 p-20")}
            >
              {data[0].node.menuItems?.map((item: any, index: any) => (
                <React.Fragment key={index}>
                  <li className="flex  items-center text-zinc-800 first:mt-8 dark:text-zinc-300">
                    <button
                      onClick={() => {
                        setOpen((prev: boolean) => !prev)
                        handleClick(item.link)
                      }}
                    >
                      <div className=" flex h-auto overflow-hidden ">
                        <span
                          id="menuItem"
                          className="left-0  top-0 translate-y-8 text-3xl font-medium tracking-tight text-zinc-900 opacity-0 dark:text-zinc-300"
                        >
                          {item.label}
                        </span>
                      </div>
                    </button>
                  </li>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-row-reverse items-center justify-between ">
          <button
            aria-expanded={open}
            aria-label="Open menu"
            className=" p-2 text-2xl text-zinc-800 dark:text-zinc-400"
            onClick={() => {
              setOpen((prev: boolean) => !prev)
            }}
          >
            <MdMenu />
          </button>
          <ThemeToggle />
        </div>
      )}
    </>
  )
}

function handleClick(link: string) {
  const element = document.getElementById(link)
  element?.scrollIntoView({ behavior: "smooth" })
}

function DesktopNav({
  data,
  className,
}: {
  data: SettingsConnectionQuery
  className?: string
}) {
  return (
    <div className={clsx("flex items-center justify-between gap-8", className)}>
      <NameLogo logo={data[0]?.node?.logo} />
      <div className="flex items-center gap-6">
        <div key={data[0]?.node?.id} className="flex gap-6">
          {data[0]?.node?.menuItems?.map((item: any) => {
            return (
              <button
                key={item.id}
                className="text-xl font-medium tracking-tight text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300 "
                onClick={() => handleClick(item.link)}
                data-tina-ref={item ? tinaField(item, "label") : undefined}
              >
                {item.label}
              </button>
            )
          })}
        </div>
        <ThemeToggle />
      </div>
    </div>
  )
}
