"use client"
import { SettingsConnectionQuery } from "@/tina/__generated__/types"
import Image from "next/image"

import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import { tinaField, useTina } from "tinacms/dist/react"

import { MdClose, MdMenu } from "react-icons/md"
import clsx from "clsx"
import { ThemeToggle } from "./ThemeToggle"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export default function NewNavbar(props: { data: SettingsConnectionQuery }) {
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

  const { data } = useTina({
    query: "settings_doc.json",
    variables: {},
    data: props.data,
  })

  const NavList = data.settingsConnection.edges

  return (
    <nav
      className="fixed left-0 top-0 z-10 w-full items-center p-6 lg:backdrop-blur-xl "
      style={{
        boxSizing: "border-box",
      }}
    >
      <div className="mx-auto w-full max-w-[1440px]">
        {isMobile ? (
          <MobileNav
            data={NavList as unknown as SettingsConnectionQuery} // Cast NavList to SettingsConnectionQuery type
            open={open}
            setOpen={setOpen}
            pathname={pathname ?? ""}
          />
        ) : (
          <DesktopNav
            data={NavList as unknown as SettingsConnectionQuery}
            className=""
          /> // Cast NavList to SettingsConnectionQuery type
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
  data: any
  open: boolean
  setOpen: (open: boolean) => void
  pathname: string
}) {
  return (
    <>
      {open ? (
        <div className="z-20 flex flex-col items-end ">
          <div
            className="flex w-full flex-col items-end backdrop-blur-xl"
            style={{
              backdropFilter: "blur(20px)",

              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <button
              aria-expanded={open}
              aria-label="Open menu"
              className=" p-2 text-2xl text-zinc-800 dark:text-zinc-400"
              onClick={() => {
                setOpen(!open)
              }}
            >
              <MdClose />
            </button>

            <div
              id="drawer"
              className={clsx(" w-full flex-col items-center gap-8 p-20 ")}
            >
              {data[0]?.node.menuItems?.map((item: any, index: any) => (
                <React.Fragment key={index}>
                  <li className="flex  items-center text-zinc-800 first:mt-8 dark:text-zinc-300">
                    <button
                      onClick={() => {
                        setOpen(!open)
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
        <div className="flex flex-row-reverse items-center justify-between ">
          <button
            aria-expanded={open}
            aria-label="Open menu"
            className="text-2xl text-zinc-800 dark:text-zinc-400"
            onClick={() => {
              setOpen(!open)
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
      {Array.isArray(data) &&
        data.map((item: any, index: number) => (
          <NameLogo logo={item.node.logo} key={index} />
        ))}
      <div className="flex items-center gap-6">
        {Array.isArray(data) &&
          data.map((item: any) => {
            return (
              <div key={item.id} className="flex gap-6">
                {item.node.menuItems.map((item: any) => (
                  <button
                    key={item.id}
                    className="text-xl font-medium tracking-tight text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300 "
                    onClick={() => handleClick(item.link)}
                    data-tina-ref={
                      item.label ? tinaField(item.node, "label") : undefined
                    }
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )
          })}
        <ThemeToggle />
      </div>
    </div>
  )
}
