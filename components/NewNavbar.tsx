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

export default function NewNavbar(props: {
  data: SettingsConnectionQuery
  variables: {
    relativePath: string
  }
  query: string
}) {
  const [isMobile, setIsMobile] = useState(isMobileDevice())
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
    <nav className="flex w-full justify-between p-10">
      <NameLogo logo={NavList[0]?.node?.logo} />
      {isMobile ? (
        <MobileNav data={NavList} pathname={pathname} />
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
      className="text-xl font-extrabold tracking-tighter text-slate-900"
    >
      <Image src={logo} width={30} height={30} alt="Logo" />
    </Link>
  )
}

function MobileNav({
  data,
  pathname,
}: {
  data: SettingsConnectionQuery
  pathname: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        aria-expanded={open}
        aria-label="Open menu"
        className="block p-2 text-2xl text-slate-800"
        onClick={() => setOpen(true)}
      >
        <MdMenu />
      </button>
      <div
        className={clsx(
          "fixed inset-0 z-50 flex flex-col items-center gap-10 bg-slate-50 pr-4 pt-24 transition-transform duration-300 ease-in-out ",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <button
          aria-label="Close menu"
          aria-expanded={open}
          className="fixed left-6 top-3 block p-2 text-2xl text-slate-800 "
          onClick={() => setOpen(false)}
        >
          <MdClose />
        </button>
        <div>
          {data[0]?.node?.menuItems?.map((item: any, index: any) => (
            <React.Fragment key={index}>
              <li className="flex items-center first:mt-8">
                <Link href={item.link}>
                  <span>{item.label}</span>
                </Link>
              </li>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  )
}

function DesktopNav({ data }: { data: SettingsConnectionQuery }) {
  return (
    <div key={data[0]?.node?.id} className="flex gap-4">
      {data[0]?.node?.menuItems?.map((item: any) => {
        return (
          <div key={item.id}>
            <Link href={item.link}>{item.label}</Link>
          </div>
        )
      })}
    </div>
  )
}
