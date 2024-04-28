"use client"
import { SettingsConnectionQuery } from "@/tina/__generated__/types"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useTina } from "tinacms/dist/react"
import { Button } from "./ui/button"
import { MdClose, MdMenu } from "react-icons/md"
import clsx from "clsx"
import { ThemeToggle } from "./ThemeToggle"
import gsap from "gsap"

export default function NewNavbar(props: {
  data: SettingsConnectionQuery
  variables: {
    relativePath: string
  }
  query: string
}) {
  const [isMobile, setIsMobile] = useState(isMobileDevice())
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

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const { data } = useTina(props)
  console.log(data.settingsConnection.edges)

  const NavList = data.settingsConnection.edges
  // rest of the code

  console.log(NavList)

  // return NavList?.map((setting: any) => {
  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between p-10">
      <NameLogo logo={NavList[0]?.node?.logo} />
      {isMobile ? (
        <MobileNav
          data={NavList}
          open={open}
          setOpen={setOpen}
          pathname={pathname}
        />
      ) : (
        <DesktopNav data={NavList} />
      )}
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
    <Link
      href="/"
      aria-label="Home page"
      className="text-xl font-extrabold tracking-tighter text-zinc-900"
    >
      <Image src={logo} width={24} height={24} alt="Logo" />
    </Link>
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

  // useEffect(() => {
  //   if (open) {
  //     gsap.from("#drawer", { duration: 0.5, opacity: 1 })
  //   } else {
  //     gsap.to("#drawer", { duration: 0.5, opacity: 0 })
  //   }
  // }, [open])

  return (
    <div>
      <div className="flex items-center gap-6">
        <ThemeToggle />

        <button
          aria-expanded={open}
          aria-label="Open menu"
          className="block p-2 text-2xl text-zinc-800 dark:text-zinc-400"
          onClick={() => {
            if (!open) {
              setOpen(!open)
            } else {
              setOpen(!open)
            }
          }}
        >
          {open ? (
            <MdMenu />
          ) : (
            <>
              <MdClose />
              <div
                id="drawer"
                className={clsx(
                  "fixed left-0 top-0 z-[-1]  flex size-full flex-col items-center gap-8 bg-zinc-300 px-10 pt-20 dark:bg-zinc-900",
                )}
              >
                {data[0]?.node?.menuItems?.map((item: any, index: any) => (
                  <React.Fragment key={index}>
                    <li className="flex items-center text-zinc-800 first:mt-8 dark:text-zinc-300">
                      <Link href={item.link}>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function DesktopNav({ data }: { data: SettingsConnectionQuery }) {
  return (
    <div className="flex items-center justify-center gap-8">
      <div key={data[0]?.node?.id} className="flex gap-6">
        {data[0]?.node?.menuItems?.map((item: any) => {
          return (
            <div
              key={item.id}
              className=" font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300 "
            >
              <Link href={item.link}>{item.label}</Link>
            </div>
          )
        })}
      </div>
      <div className=" flex  items-center justify-center">
        <ThemeToggle />
      </div>
    </div>
  )
}
